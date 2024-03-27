import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Wame.tools x Wink.ru" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src="https://telegram.org/js/telegram-web-app.js"
        ></script>
      </Head>
      <title>Wink x Wame Promo</title>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
