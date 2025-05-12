-- Fix profiles table schema and trigger function
ALTER TABLE public.profiles 
DROP COLUMN IF EXISTS full_name,
DROP COLUMN IF EXISTS avatar_url,
DROP COLUMN IF EXISTS paddle_subscription_id,
DROP COLUMN IF EXISTS subscription_status;

-- Add correct columns
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS display_name TEXT;

-- Drop existing trigger function
DROP FUNCTION IF EXISTS public.create_profile_for_new_user();

-- Create new trigger function with correct fields
CREATE OR REPLACE FUNCTION public.create_profile_for_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, display_name)
    VALUES (NEW.id, NEW.email, NULL);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add INSERT policy for profiles
CREATE POLICY "Allow profile creation on signup"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Add DELETE policy for profiles
CREATE POLICY "Users can delete their own profile"
ON public.profiles
FOR DELETE
TO authenticated
USING (auth.uid() = id); 