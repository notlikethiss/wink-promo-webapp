export const TelegramProvider = {
  initializeApp: () => {
    const tg = window?.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      tg.enableClosingConfirmation();
      tg.setBackgroundColor("#1b1b1b");
    }
  },
  updateButton: (pathname: string, push: any) => {
    const tg = window?.Telegram?.WebApp;

    const backButton = tg?.BackButton;
    const excludedPaths: string[] = ["/", "/?loaded=loaded"];

    if (excludedPaths.includes(pathname)) {
      backButton?.hide();
    } else {
      backButton?.onClick(() => push("/"));
      backButton?.show();
    }
  },
};
