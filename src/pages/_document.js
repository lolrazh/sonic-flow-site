import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preload polyfills if necessary */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Fix for older browsers if needed
                if (!window.fetch) {
                  console.log('Polyfilling fetch');
                }
              })();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 