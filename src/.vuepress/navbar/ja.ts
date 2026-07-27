import { navbar } from "vuepress-theme-hope";
import { apiLink } from "./apiLink";

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
    link: "/dev/"
  },
  {
    text: "API リファレンス",
    icon: "cubes",
    link: apiLink
  },
  {
    text: "公式サイト",
    icon: "window-restore",
    link: "https://bpsys.plfjy.top/"
  },
]);