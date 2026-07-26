import { navbar } from "vuepress-theme-hope";
import { apiLink } from "./apiLink";

export const enNavbar = navbar([
  "/en/",
  {
    text: "User Guide",
    icon: "lightbulb",
    link: "en/user-guide/introduction"
  },
  {
    text: "Development Documentation",
    icon: "desktop",
    link: "/dev/"
  },
  {
    text: "API Reference",
    icon: "cubes",
    link: apiLink
  },
]);