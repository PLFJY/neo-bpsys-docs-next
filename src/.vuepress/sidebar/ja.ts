import { sidebar } from "vuepress-theme-hope";

export const jaSidebar = sidebar({
  "/ja/user-guide/": [
    {
      text: "はじめに",
      icon: "book-open",
      link: "introduction",
    },
    {
      text: "クイックスタート",
      icon: "compass",
      link: "quick-start",
    },
    {
      text: "詳細設定",
      icon: "screwdriver-wrench",
      prefix: "advanced/",
      children: "structure",
    },
    {
      text: "よくある質問",
      icon: "question",
      link: "faq",
    },
  ],
});
