import { navbar } from "vuepress-theme-hope";

export const jaNavbar = navbar([
  "/",
  {
    text: "使用文档",
    icon: "lightbulb",
    link: "/user-guide/introduction"
  },
  {
    text: "开发文档",
    icon: "desktop",
    link: "/dev/"
  },
]);
