import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/en/user-guide/": [
    {
      text: "Introduction",
      icon: "book-open",
      link: "introduction",
    },
    {
      text: "Quick Start",
      icon: "compass",
      link: "quick-start",
    },
    {
      text: "Advanced Options",
      icon: "screwdriver-wrench",
      prefix: "advanced/",
      children: "structure",
    },
    {
      text: "FAQ",
      icon: "question",
      link: "faq",
    },
  ],
});
