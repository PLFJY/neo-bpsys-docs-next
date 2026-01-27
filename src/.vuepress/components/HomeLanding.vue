<template>
  <div class="plfjy-home-root">
    <!-- 项目前身 -->
    <ProjectTimeline />
    
    <!-- 用户群滚动展示 -->
    <UserScroll />
    
    <!--下载中心-->
    <a id="download-center"></a>
    <DownloadCenter />
    
    <!-- 作者信息 -->
    <AuthorCard />

    <!-- Contributors -->
    <Contributors />

  </div>
</template>

<script setup lang="ts">
import { computed, provide } from "vue";
import { useRouteLocale, withBase } from "@vuepress/client";

import ProjectTimeline from "./ProjectTimeline.vue";
import Contributors from "./Contributors.vue";
import UserScroll from "./UserScroll.vue";
import DownloadCenter from "./DownloadCenter.vue";
import AuthorCard from "./AuthorCard.vue";

const routeLocale = useRouteLocale();

const messages = {
  "/": {
    sections: {
      projectTimeline: "项目前身",
      userScroll: "庞大的用户群",
      downloadCenter: "下载中心",
      author: "主要开发者",
      contributors: "贡献者",
    },
    timeline: [
      {
        name: "idv-bp-asg-e",
        desc: "最初的BP系统原型，采用易语言制作",
      },
      {
        name: "idv-fln-bp-e",
        desc: "FLN/JRL赛事定制版，基于idv-bp-asg-e",
      },
      {
        name: "bp-sys-wpf",
        desc: "WPF进行重写，比起上面两个功能更强大，是这个软件的前身",
      },
    ],
    userScroll: {
      title: "庞大的用户群",
      subtitle: "有 {count}+ 个民间赛事团队曾有使用",
    },
    download: {
      title: "下载中心",
      systemRequirements: "系统要求：",
      systemWindows: "Windows 10 20H2 及以上",
      downloadNow: "立即下载",
      unsupported: "系统不支持",
      versionLoading: "获取版本中...",
      versionNotFound: "未找到安装程序",
      versionFailed: "获取失败",
      backup1: "备用线路一",
      backup2: "备用线路二",
      github: "Github (不推荐)",
      unsupportedTitle: "当前系统不支持下载",
      githubDisabledTitle: "当前无法获取安装包，请稍后再试",
      downloadDisabledTip: "下载入口暂不可用，请稍后再试或关注公告",
    },
    author: {
      title: "主要开发者",
      name: "零风PLFJY",
      role: "第五人格BP软件开发者 & 技术爱好者",
      desc: "一个第五人格爱好者，专注于为民间赛开发最好的BP软件",
      avatarAlt: "作者头像",
      links: {
        home: "个人主页",
        blog: "个人博客",
        bilibili: "B站主页",
        github: "GitHub主页",
      },
    },
    contributors: {
      title: "贡献者",
      items: [
        {
          avatar: withBase("/assets/avatars/zack.jpg"),
          name: "Zack",
          contribution: "测试 对局引导 多语言 使用文档",
          link: {
            href: "https://github.com/ZackZhao233",
            label: "GitHub",
            icon: "fa6-brands:github",
          },
        },
        {
          avatar: withBase("/assets/avatars/tianqi.jpg"),
          name: "天启",
          contribution: "插件系统初步",
          link: {
            href: "https://github.com/tianqiqaq",
            label: "GitHub",
            icon: "fa6-brands:github",
          },
        },
        {
          avatar: withBase("/assets/avatars/zhangzhilv.jpg"),
          name: "张之律",
          contribution: "提供了 v1.3 版本基于 2025 IVL 秋季赛规则的默认前台 UI",
        },
        {
          avatar: "./assets/avatars/tp.jpg",
          name: "tp",
          contribution: "提供了 v2.0 版本的默认前台 UI",
        },
      ],
    },
  },
  "/en/": {
    sections: {
      projectTimeline: "Project Origins",
      userScroll: "Large User Base",
      downloadCenter: "Download Center",
      author: "Lead Developer",
      contributors: "Contributors",
    },
    timeline: [
      {
        name: "idv-bp-asg-e",
        desc: "The earliest BP system prototype built with EPL",
      },
      {
        name: "idv-fln-bp-e",
        desc: "FLN/JRL tournament custom build based on idv-bp-asg-e",
      },
      {
        name: "bp-sys-wpf",
        desc: "A WPF rewrite with more features and the direct predecessor",
      },
    ],
    userScroll: {
      title: "Large User Base",
      subtitle: "{count}+ community teams have used it",
    },
    download: {
      title: "Download Center",
      systemRequirements: "System requirements:",
      systemWindows: "Windows 10 20H2 or later",
      downloadNow: "Download Now",
      unsupported: "Unsupported System",
      versionLoading: "Fetching version...",
      versionNotFound: "Installer not found",
      versionFailed: "Fetch failed",
      unsupportedTitle: "This system is not supported",
      githubDisabledTitle: "Installer unavailable, please try again later",
      downloadDisabledTip: "Download is temporarily unavailable. Please retry or check announcements.",
    },
    author: {
      title: "Lead Developer",
      name: "Zero PLFJY",
      role: "Identity V BP software developer & tech enthusiast",
      desc: "An Identity V fan focused on building the best BP tool for community tournaments",
      avatarAlt: "Author avatar",
      links: {
        home: "Homepage",
        blog: "Blog",
        bilibili: "Bilibili",
        github: "GitHub",
      },
    },
    contributors: {
      title: "Contributors",
      items: [
        {
          avatar: withBase("/assets/avatars/zack.jpg"),
          name: "Zack",
          contribution: "Testing, match guidance, localization, docs",
          link: {
            href: "https://github.com/ZackZhao233",
            label: "GitHub",
            icon: "fa6-brands:github",
          },
        },
        {
          avatar: withBase("/assets/avatars/tianqi.jpg"),
          name: "Tianqi",
          contribution: "Initial plugin system",
          link: {
            href: "https://github.com/tianqiqaq",
            label: "GitHub",
            icon: "fa6-brands:github",
          },
        },
        {
          avatar: withBase("/assets/avatars/zhangzhilv.jpg"),
          name: "Zhang Zhilv",
          contribution: "Default UI for v1.3 based on 2025 IVL Autumn rules",
        },
        {
          avatar: withBase("/assets/avatars/tp.jpg"),
          name: "tp",
          contribution: "Default UI for v2.0",
        },
      ],
    },
  },
  "/ja/": {
    sections: {
      projectTimeline: "プロジェクトの前身",
      userScroll: "大規模なユーザー基盤",
      downloadCenter: "ダウンロードセンター",
      author: "メイン開発者",
      contributors: "貢献者",
    },
    timeline: [
      {
        name: "idv-bp-asg-e",
        desc: "EPLで作られた最初期のBPシステム",
      },
      {
        name: "idv-fln-bp-e",
        desc: "idv-bp-asg-eを基にしたFLN/JRL大会向けカスタム版",
      },
      {
        name: "bp-sys-wpf",
        desc: "WPFで再構築され、機能が強化された前身",
      },
    ],
    userScroll: {
      title: "大規模なユーザー基盤",
      subtitle: "これまでに {count}+ のコミュニティチームが使用",
    },
    download: {
      title: "ダウンロードセンター",
      systemRequirements: "システム要件：",
      systemWindows: "Windows 10 20H2 以上",
      downloadNow: "今すぐダウンロード",
      unsupported: "非対応システム",
      versionLoading: "バージョン取得中...",
      versionNotFound: "インストーラが見つかりません",
      versionFailed: "取得に失敗しました",
      unsupportedTitle: "このシステムは非対応です",
      githubDisabledTitle: "インストーラを取得できません。しばらくしてからお試しください",
      downloadDisabledTip: "ダウンロードが一時的に利用できません。後で再試行するかお知らせをご確認ください。",
    },
    author: {
      title: "メイン開発者",
      name: "ゼロ風 PLFJY",
      role: "Identity V BPソフト開発者 & 技術愛好家",
      desc: "コミュニティ大会向けの最高のBPツールを目指すIdentity Vファン",
      avatarAlt: "作者のアバター",
      links: {
        home: "ホームページ",
        blog: "ブログ",
        bilibili: "Bilibili",
        github: "GitHub",
      },
    },
    contributors: {
      title: "貢献者",
      items: [
        {
          avatar: withBase("/assets/avatars/zack.jpg"),
          name: "Zack",
          contribution: "テスト、対局ガイド、多言語、ドキュメント",
          link: {
            href: "https://github.com/ZackZhao233",
            label: "GitHub",
            icon: "fa6-brands:github",
          },
        },
        {
          avatar: withBase("/assets/avatars/tianqi.jpg"),
          name: "天启",
          contribution: "プラグインシステムの初期版",
          link: {
            href: "https://github.com/tianqiqaq",
            label: "GitHub",
            icon: "fa6-brands:github",
          },
        },
        {
          avatar: withBase("/assets/avatars/zhangzhilv.jpg"),
          name: "张之律",
          contribution: "2025 IVL 秋季ルールに基づく v1.3 既定UIを提供",
        },
        {
          avatar: withBase("/assets/avatars/tp.jpg"),
          name: "tp",
          contribution: "v2.0 の既定UIを提供",
        },
      ],
    },
  },
};

const t = computed(() => messages[routeLocale.value] ?? messages["/"]);

provide("homeI18n", t);
</script>

<style scoped>
/* 定义颜色变量 */
:root {
  --primary-color: #0067c0;
  --primary-light: #3d8ee8;
  --text-primary: var(--vp-c-text);
  --text-secondary: var(--vp-c-text);
  --accent-color: #9bf0e1;
}

/* 重置 VuePress 主题的干扰 */
.plfjy-home-root {
  font-family: var(--vp-font);
  background-color: var(--vp-c-bg);
  color: var(--text-primary);
  min-height: 100vh;
  padding-top: 60px;
  /* 为导航栏留出空间 */
}

:deep(.section-title) {
  margin: 1rem 0 1.5rem;
  text-align: center;
  color: var(--accent-color);
  font-size: 2rem;
}

:deep(a),
:deep(a:hover),
:deep(a:focus),
:deep(a:focus-visible),
:deep(a:visited),
:deep(a::after) {
  text-decoration: none!important;
}

.plfjy-home-root * {
  box-sizing: border-box;
}

/* Fluent Design 亚克力效果 */
.acrylic {
  background: var(--surface-dark-acrylic);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

</style>
