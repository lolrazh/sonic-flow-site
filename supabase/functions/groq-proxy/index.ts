import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Groq from "https://esm.sh/groq-sdk@0.3.2"; // Use esm.sh for Deno compatibility
import { Buffer } from "https://deno.land/std@0.168.0/io/buffer.ts"; // For base64 decoding

// WARNING: Ensure these environment variables are set in your Supabase project's Function settings
const GROQ_API_KEY = Deno.env.get('GROQ_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

// Standard CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Adjust in production!
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Ensure required keys are set
  if (!GROQ_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Missing environment variables for Groq/Supabase integration.");
      return new Response(JSON.stringify({ error: 'Internal configuration error.' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
  }

  // Initialize Supabase Admin Client (essential for verifying JWTs securely)
  const supabaseAdmin = createClient(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  try {
    // 1. Check Authorization Header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.warn("Missing or invalid Authorization header.");
      return new Response(JSON.stringify({ error: 'Unauthorized: Missing token.' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const token = authHeader.split(' ')[1];

    // 2. Verify JWT and get user
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !user) {
      console.error("JWT validation failed:", userError?.message);
      return new Response(JSON.stringify({ error: `Unauthorized: ${userError?.message || 'Invalid token.'}` }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    console.log(`Request authorized for user: ${user.id}`);

    // 3. Check Subscription Status (RBAC)
    const { data: subscription, error: subError } = await supabaseAdmin
      .from('subscriptions') // Ensure this table exists
      .select('status, current_period_end')
      .eq('user_id', user.id)
      .in('status', ['active', 'trialing']) // Check for active or trialing status
      .maybeSingle(); // Use maybeSingle to handle users without subscription record

    if (subError) {
      console.error(`Subscription check failed for user ${user.id}:`, subError);
      return new Response(JSON.stringify({ error: 'Failed to verify subscription status.' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // Check if subscription is active or within trial period
    const isActive = subscription && (
        subscription.status === 'active' ||
        (subscription.status === 'trialing' && new Date(subscription.current_period_end) > new Date())
    );

    if (!isActive) {
        console.warn(`Subscription inactive/expired for user ${user.id}. Status: ${subscription?.status}`);
        return new Response(JSON.stringify({ error: 'Forbidden: Active subscription required.' }), {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
    console.log(`User ${user.id} has active subscription/trial.`);

    // 4. Process Request Body (expecting JSON with base64 audio)
    let audioBase64: string;
    try {
        const body = await req.json();
        if (!body.audio || typeof body.audio !== 'string') {
            throw new Error("Missing or invalid 'audio' field in request body.");
        }
        audioBase64 = body.audio;
        console.log(`Received audio data (base64 length): ${audioBase64.length}`);
    } catch (e) {
        console.error("Failed to parse request body:", e);
        return new Response(JSON.stringify({ error: `Bad Request: ${e.message}` }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // 5. Initialize Groq Client
    const groq = new Groq({ apiKey: GROQ_API_KEY });

    // 6. Call Groq API
    console.log("Calling Groq API...");
    // Decode base64 audio back to buffer/Uint8Array
    const audioBuffer = Buffer.from(audioBase64, 'base64');
    // Groq SDK expects a file-like object. We can simulate this.
    const audioFile = new Blob([audioBuffer], { type: 'audio/webm' }); // Assuming webm format
    // Create a dummy file name
    const fileName = `upload-${user.id}-${Date.now()}.webm`;


    const transcription = await groq.audio.transcriptions.create({
        // Pass the blob directly; SDK might handle it, or convert to ReadableStream if needed
        // For Deno/Edge environments, creating a ReadableStream might be more robust
        file: new File([audioFile], fileName, { type: 'audio/webm'}), // Use File API
        model: "distil-whisper-large-v3-en", // Or your chosen model
        language: "en",
        response_format: "json",
        temperature: 0.0
    });
    console.log("Groq API call successful.");

    // TODO: Log usage in 'usage_logs' table

    // 7. Return Transcription
    return new Response(JSON.stringify({ success: true, text: transcription.text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Unhandled error in Groq Proxy function:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
}) 