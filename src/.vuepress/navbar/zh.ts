import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "使用文档",
    icon: "lightbulb",
    link: "/user-guide/introduction"
  },
  {
    text: "开发文档",
    icon: "desktop",
    link: "/dev/start"
  },
  {
    text: "API 参考",
    icon: "cubes",
    link: "api/"
  },
]);
