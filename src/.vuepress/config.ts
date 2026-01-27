import { defineUserConfig } from "vuepress";
import { getDirname, path } from 'vuepress/utils'

import { registerComponentsPlugin } from '@vuepress/plugin-register-components'

import theme from "./theme.js";
const __dirname = import.meta.dirname || getDirname(import.meta.url)

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "neo-bpsys-wpf",
      description: "第五人格民间赛专属的直播BP展示工具",
    },
    "/en/": {
      lang: "en-US",
      title: "neo-bpsys-wpf",
      description: "A Identity V BP display tool for unofficial tournaments",
    },
    "/ja/": {
      lang: "ja-JP",
      title: "neo-bpsys-wpf",
      description: "第五人格非公式大会専用のライブBP展示ツールです",
    }
  },

  theme,

  plugins :[
    registerComponentsPlugin({
      components: {
        HomeLanding: path.resolve(__dirname, './components/HomeLanding.vue'),
        Contributors: path.resolve(__dirname, './components/Contributors.vue'),
      },
    }),
  ]

  // Enable it with pwa
  // shouldPrefetch: false,
});
