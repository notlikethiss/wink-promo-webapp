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
  const { push } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const tg = window?.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      tg.enableClosingConfirmation();
      tg.setBackgroundColor("#1b1b1b");
    }
  }, []);

  useEffect(() => {
    const tg = window?.Telegram?.WebApp;

    const backButton = tg?.BackButton;
    const excludedPaths: string[] = ["/"];

    if (excludedPaths.includes(pathname)) {
      backButton?.hide();
    } else {
      backButton?.onClick(() => push("/"));
      backButton?.show();
    }
  }, [pathname, push]);

  return <Component {...pageProps} />;
}
