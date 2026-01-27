import { navbar } from "vuepress-theme-hope";

export const jaNavbar = navbar([
  "/ja/",
  {
    text: "ユーザーガイド",
    icon: "lightbulb",
    link: "ja/user-guide/introduction"
  },
  {
    text: "開発ドキュメント",
    icon: "desktop",
    link: "ja/dev/start"
  },
]);
