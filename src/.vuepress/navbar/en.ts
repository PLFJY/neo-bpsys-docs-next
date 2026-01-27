import { navbar } from "vuepress-theme-hope";

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
    link: "en/dev/start"
  },
  {
    text: "API Reference",
    icon: "cubes",
    link: "api/"
  },
]);
