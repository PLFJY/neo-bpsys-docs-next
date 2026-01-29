import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/user-guide/": [
    {
      text: "前言",
      icon: "book-open",
      link: "introduction"
    },
    {
      text: "快速开始",
      icon: "compass",
      link: "quick-start"
    },
    {
      text: "后台",
      icon: "sliders",
      prefix: "backend/",
      children: "structure",
    },
    {
      text: "前台输出",
      icon: "window-maximize",
      prefix: "fronted/",
      children: "structure",
    },
    {
      text: "高级选项",
      icon: "screwdriver-wrench",
      prefix: "advanced/",
      children: "structure",
    },
    {
      text: "常见问题及解决方案",
      icon: "question",
      link: "faq"
    },
  ],
  "/dev/": [
    {
      text: "开发文档",
      icon: "screwdriver-wrench",
      children: "structure",
    },
  ],
  "/api/": [
    {
      text: "API 参考",
      icon: "gears",
      children: "structure",
    },
  ]
});
