import { navbar } from "vuepress-theme-hope";
import { apiLink } from "./apiLink";

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
    link: "/dev/"
  },
  {
    text: "API 参考",
    icon: "cubes",
    link: apiLink
  },
  {
    text: "软件官网",
    icon: "window-restore",
    link: "https://bpsys.plfjy.top/"
  },
]);