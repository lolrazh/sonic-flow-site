import crypto from 'crypto';

export function verifyPaddleWebhook(rawBody: string, signature: string): boolean {
  if (!process.env.PADDLE_PUBLIC_KEY) {
    console.error('PADDLE_PUBLIC_KEY is not set');
    return false;
  }

  try {
    const verifier = crypto.createVerify('sha256');
    verifier.update(rawBody);
    return verifier.verify(
      process.env.PADDLE_PUBLIC_KEY,
      signature,
      'base64'
    );
  } catch (error) {
    console.error('Webhook verification error:', error);
    return false;
  }
} 