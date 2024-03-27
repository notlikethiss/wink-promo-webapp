import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { TelegramProvider } from "./api/TelegramProvider";

declare global {
  interface Window {
    ym: any;
    Telegram: any;
    dataLayer: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    TelegramProvider.initializeApp();
  }, []);

  return <Component {...pageProps} />;
}
