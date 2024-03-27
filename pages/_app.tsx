import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { TelegramProvider } from "./api/TelegramProvider";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

declare global {
  interface Window {
    ym: any;
    Telegram: any;
    dataLayer: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const { asPath, push } = useRouter();

  useEffect(() => {
    TelegramProvider.initializeApp();
    TelegramProvider.updateButton(asPath, push);
  }, [asPath, push]);

  return <Component {...pageProps} />;
}
