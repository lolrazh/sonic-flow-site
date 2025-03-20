import { NextResponse } from 'next/server';
import type { Environment } from '@paddle/paddle-node-sdk';
import { Paddle } from '@paddle/paddle-node-sdk';

const paddle = new Paddle(process.env.PADDLE_API_KEY!, {
  environment: (process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === 'sandbox' ? 'sandbox' : 'production') as Environment,
});

export async function POST(request: Request) {
  try {
    const { customerId } = await request.json() as { 
      customerId: string;
      customerEmail?: string;
      locale?: string;
    };

    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      );
    }

    const session = await paddle.customerPortalSessions.create(customerId, []);

    if (!session?.urls?.general?.overview) {
      throw new Error('Invalid session response');
    }

    return NextResponse.json({
      url: session.urls.general.overview,
    });
  } catch (error: unknown) {
    console.error('Error creating portal session:', error);
    if (error && typeof error === 'object' && 'message' in error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    );
  }
} 