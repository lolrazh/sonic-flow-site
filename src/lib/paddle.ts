export interface PaddleEventData {
  checkout?: {
    id: string;
    completed: boolean;
    prices: Array<{
      product: { id: string; name: string };
      billing: { interval: string; frequency: number };
      unit_price: { amount: string; currency_code: string };
    }>;
    customer: { email: string; id: string };
  };
  subscription?: {
    id: string;
    status: 'active' | 'trialing' | 'paused' | 'canceled';
    next_billed_at: string;
    current_period_end: string;
  };
  transaction?: {
    id: string;
    status: 'completed' | 'failed' | 'refunded';
    amount: string;
    currency_code: string;
  };
}

interface PaddleCheckoutOptions {
  items: Array<{ priceId: string }>;
  customer?: { email?: string; id?: string };
  settings: {
    displayMode: 'overlay' | 'inline';
    theme: 'light' | 'dark';
  };
  successCallback?: () => void;
  closeCallback?: () => void;
}

interface PaddleWindow {
  Paddle?: {
    Environment: {
      set: (env: string) => void;
    };
    Setup: (options: { vendor: number | string; eventCallback?: (data: PaddleEventData) => void }) => void;
    Checkout: {
      open: (options: PaddleCheckoutOptions) => void;
    };
  };
}

declare global {
  interface Window extends PaddleWindow {}
}

let paddleInitialized = false;
let paddleInitializing = false;
const paddleCallbacks: ((data: PaddleEventData) => void)[] = [];

export const waitForPaddle = (): Promise<void> => {
  return new Promise((resolve) => {
    if (window.Paddle) {
      resolve();
      return;
    }

    const checkPaddle = () => {
      if (window.Paddle) {
        resolve();
      } else {
        setTimeout(checkPaddle, 100);
      }
    };

    checkPaddle();
  });
};

export const initPaddle = async (callback?: (data: PaddleEventData) => void) => {
  if (typeof window === 'undefined') return;
  
  if (callback) {
    paddleCallbacks.push(callback);
  }

  // If already initialized, just call the callback
  if (paddleInitialized && window.Paddle) {
    callback?.(undefined as any);
    return;
  }

  // If initialization is in progress, wait for it
  if (paddleInitializing) {
    return;
  }

  paddleInitializing = true;

  try {
    await waitForPaddle();
    setupPaddle();
    paddleInitialized = true;
    paddleInitializing = false;
    // Call all registered callbacks
    paddleCallbacks.forEach(cb => cb(undefined as any));
    paddleCallbacks.length = 0; // Clear the callbacks
  } catch (error) {
    console.error('Failed to initialize Paddle:', error);
    paddleInitializing = false;
  }
};

const setupPaddle = () => {
  if (!window.Paddle) return;

  // Set environment based on NODE_ENV
  if (process.env.NODE_ENV === 'development') {
    window.Paddle.Environment.set('sandbox');
  }

  // Initialize Paddle
  window.Paddle.Setup({
    vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID),
    eventCallback: (data: PaddleEventData) => {
      // Call all registered callbacks
      paddleCallbacks.forEach(callback => callback(data));
    },
  });
};

export const openCheckout = async ({
  email,
  customerId,
  successCallback,
  closeCallback,
}: {
  email?: string;
  customerId?: string;
  successCallback?: () => void;
  closeCallback?: () => void;
}) => {
  if (!window.Paddle) {
    try {
      await waitForPaddle();
    } catch (error) {
      console.error('Failed to load Paddle:', error);
      return;
    }
  }

  window.Paddle?.Checkout.open({
    items: [{ 
      priceId: process.env.NEXT_PUBLIC_PADDLE_PLAN_ID as string
    }],
    customer: {
      email,
      id: customerId
    },
    settings: {
      displayMode: 'overlay',
      theme: 'dark'
    },
    successCallback,
    closeCallback,
  });
}; 