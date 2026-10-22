import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/user-guide/": [
    { text: "前言", icon: "book-open", link: "introduction" },
    { text: "快速开始", icon: "compass", link: "quick-start" },
    { text: "对局信息及对局引导", icon:"signs-post", link: "game-info-and-guidance" },
    { text: "双方阵营及换边", icon:"right-left", link: "camp-and-swap" },
    { text: "队伍信息编辑", icon:"users", link: "team-info" },
    { text: "计时器", icon:"stopwatch", link: "countdown" },
    { text: "前台管理", icon:"window-maximize", link: "fronted-manager" },
    { text: "地图禁选", icon:"map", link: "map-bp" },
    { text: "禁用角色", icon:"user-lock", link: "ban-character" },
    { text: "选择角色", icon:"user-check", link: "pick-character" },
    { text: "天赋特质", icon:"person-running", link: "talents-and-trait" },
    { text: "比分系统", icon:"table", link: "score-system" },
    { text: "赛后数据", icon:"list-ol", link: "match-statistics" },
    { text: "智慧 BP", icon:"robot", link: "smart-bp" },
    { text: "设置页面", icon:"gears", link: "settings" },
    {
      text: "高级选项",
      icon: "screwdriver-wrench",
      prefix: "advanced/",
      children: "structure",
    },
    { text: "常见问题及解决方案", icon: "question", link: "faq" },
  ]
});
