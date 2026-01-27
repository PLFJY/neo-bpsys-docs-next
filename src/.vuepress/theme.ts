import { hopeTheme } from "vuepress-theme-hope";

import { enNavbar, zhNavbar, jaNavbar } from "./navbar/index.js";
import { enSidebar, zhSidebar, jaSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://bpsys.plfjy.top/",

  author: {
    name: "Zero PLFJY",
    url: "https://plfjy.top/",
  },

  logo: "logo.png",

  repo: "PLFJY/neo-bpsys-wpf",

  docsDir: "src",

  locales: {
    "/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      footer: "本文档以 CC BY-NC-SA 4.0 许可协议授权",

      displayFooter: true,

      // page meta
      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },

    /**
     * English
     */
    "/en/": {
      // navbar
      navbar: enNavbar,

      // sidebar
      sidebar: enSidebar,

      footer: "This document is licensed under the CC BY-NC-SA 4.0 license.",

      displayFooter: true,

      metaLocales: {
        editLink: "Edit this page on GitHub",
      },
    },

    /**
     * English
     */
    "/ja/": {
      // navbar
      navbar: jaNavbar,

      // sidebar
      sidebar: jaSidebar,

      footer: "本ドキュメントは CC BY-NC-SA 4.0 ライセンスに基づき公開されています。",

      displayFooter: true,

      metaLocales: {
        editLink: "GitHubでこのページを編集",
      },
    },
  },

  encrypt: {
    config: {
    },
  },

  // These features are enabled for demo, only preserve features you need here
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,

    // uncomment these if you need TeX support
    // math: {
    //   // install katex before enabling it
    //   type: "katex",
    //   // or install @mathjax/src before enabling it
    //   type: "mathjax",
    // },

    // install chart.js before enabling it
    // chartjs: true,

    // install echarts before enabling it
    // echarts: true,

    // install flowchart.ts before enabling it
    // flowchart: true,

    // install mermaid before enabling it
    mermaid: true,

    // playground: {
    //   presets: ["ts", "vue"],
    // },

    // install @vue/repl before enabling it
    // vuePlayground: true,

    // install sandpack-vue3 before enabling it
    // sandpack: true,

    // install @vuepress/plugin-revealjs and uncomment these if you need slides
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },
  },

  plugins: {
    // Note: This is for testing ONLY!
    // You MUST generate and use your own comment service in production.
    comment: {
      provider: "Giscus",
      repo: "PLFJY/neo-bpsys-docs-next",
      repoId: "R_kgDOQUOHOg",
      category: "Announcements",
      categoryId: "DIC_kwDOQUOHOs4C1cVP",
    },

    components: {
      components: ["Badge", "VPCard"],
    },

    icon: {
      // assets: "fontawesome-with-brands",
      prefix: "fa6-solid:",
    },
  },
});