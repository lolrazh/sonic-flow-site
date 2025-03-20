import { NextResponse } from 'next/server';
import { PaddleSDK } from '@paddle/paddle-node-sdk';

const paddle = new PaddleSDK(process.env.PADDLE_API_KEY!, {
  environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === 'sandbox' ? 'sandbox' : 'production',
});

export async function POST(request: Request) {
  try {
    const { customerId, customerEmail, locale } = await request.json();

    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      );
    }

    const { data: session } = await paddle.customerPortalSessions.create({
      customerId,
    });

    return NextResponse.json({
      url: session.urls.general.overview,
    });
  } catch (error) {
    console.error('Error creating portal session:', error);
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    );
  }
} 