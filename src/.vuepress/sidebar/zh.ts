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
      children: [
        { text: "修改引导规则", icon: "list-check", link: "advanced/edit-guidance-rule" },
        { text: "从 Json 文件导入队伍信息", icon: "file-import", link: "advanced/import-team-from-json" },
        { text: "v3 前台设计器", icon: "pen-ruler", link: "advanced/v3-designer" },
        { text: "插件系统", icon: "puzzle-piece", link: "advanced/plugin-system" },
      ],
    },
    { text: "常见问题及解决方案", icon: "question", link: "faq" },
  ],
  "/dev/": [
    { text: "开发文档", icon: "screwdriver-wrench", children: "structure" },
  ],
});
