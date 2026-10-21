import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/user-guide/": [
    { text: "前言", icon: "book-open", link: "introduction" },
    { text: "快速开始", icon: "compass", link: "quick-start" },
    { text: "禁用角色", link: "ban-character" },
    { text: "双方阵营及换边", link: "camp-and-swap" },
    { text: "计时器", link: "countdown" },
    { text: "前台管理", link: "fronted-manager" },
    { text: "对局信息及对局引导", link: "game-info-and-guidance" },
    { text: "地图禁选", link: "map-bp" },
    { text: "赛后数据", link: "match-statistics" },
    { text: "选择角色", link: "pick-character" },
    { text: "比分系统", link: "score-system" },
    { text: "设置页面", link: "settings" },
    { text: "天赋特质", link: "talents-and-trait" },
    { text: "队伍信息编辑", link: "team-info" },
    {
      text: "高级选项",
      icon: "screwdriver-wrench",
      prefix: "advanced/",
      children: "structure",
    },
    { text: "常见问题及解决方案", icon: "question", link: "faq" },
  ],
  "/dev/": [
    { text: "开发文档", icon: "screwdriver-wrench", children: "structure" },
  ],
});
