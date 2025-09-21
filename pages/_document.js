import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="description" content="Gamified learning platform for rural Odisha with offline-first capabilities." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
