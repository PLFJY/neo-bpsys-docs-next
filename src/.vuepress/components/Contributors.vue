<script setup lang="ts">
type Contributor = {
  avatar: string
  name: string
  contribution: string
  link?: {
    href: string
    label: string
    icon?: string
  }
}

const contributors = [
  {
    avatar: './assets/zack.jpg',
    name: 'Zack',
    contribution: '测试 对局引导 多语言 使用文档',
    link: { href: 'https://github.com/ZackZhao233', label: 'GitHub', icon: 'fa6-brands:github' }
  },
  {
    avatar: './assets/tianqi.jpg',
    name: '天启',
    contribution: '插件系统初步',
    link: { href: 'https://github.com/tianqiqaq', label: 'GitHub', icon: 'fa6-brands:github' }
  },
  {
    avatar: './assets/zhangzhilv.jpg',
    name: '张之律',
    contribution: '提供了 v1.3 版本基于 2025 IVL 秋季赛规则的默认前台 UI'
  },
  {
    avatar: './assets/tp.jpg',
    name: 'tp',
    contribution: '提供了 v2.0 版本的默认前台 UI'
  }
]
</script>

<template>
  <h2 class="section-title">贡献者</h2>
  <section class="contributors">
    <div class="contributors__grid">
      <div
        v-for="c in contributors"
        :key="c.link?.href || c.name"
        class="contributors__item"
      >
        <img class="contributors__avatar" :src="c.avatar" :alt="c.name" loading="lazy" />
        <div class="contributors__name">{{ c.name }}</div>
        <div class="contributors__contribution">{{ c.contribution }}</div>
        <a
          v-if="c.link?.href"
          class="contributors__link"
          :href="c.link.href"
          target="_blank"
          rel="noopener noreferrer"
        >
          <VPIcon v-if="c.link.icon" :icon="c.link.icon" size="14px" vertical-align="-1px" />
          <span>{{ c.link.label }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contributors {
  max-width: 800px;
  margin: 0 auto 3rem;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px var(--vp-c-shadow);
  background: var(--vp-c-control);
}
.contributors__title { margin: 0 0 10px; font-size: 1.05rem; font-weight: 600; }
.contributors__grid {
  --item-width: 320px;
  --item-height: 220px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  align-items: stretch;
}
.contributors__item {
  width: min(100%, var(--item-width));
  height: var(--item-height);
  display: grid; justify-items: center; gap: 8px;
  grid-template-rows: auto auto 1fr auto;
  align-content: stretch;
  padding: 10px 8px; border: 1px solid var(--vp-c-border);
  border-radius: 14px; text-decoration: none;
}
.contributors__item:hover { transform: translateY(-1px); }
.contributors__avatar {
  width: 56px; height: 56px; border-radius: 999px;
  object-fit: cover; border: 1px solid var(--vp-c-border);
}
.contributors__name { font-size: .92rem; color: var(--vp-c-text); text-align: center; }
.contributors__contribution {
  font-size: .84rem;
  color: var(--vp-c-text-2);
  text-align: center;
  line-height: 1.4;
  padding: 0 8px;
  overflow-wrap: anywhere;
  align-self: center;
}
.contributors__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  font-size: .85rem;
  color: var(--vp-c-text);
  text-decoration: none;
  border: 1px solid var(--vp-c-border);
  border-radius: 999px;
  background: var(--vp-c-bg);
}
.contributors__link:hover { border-color: var(--vp-c-text); }
</style>
