<template>
  <h2 class="section-title">主要开发者</h2>
  <section class="author-section">

    <div class="author-card acrylic">
      <div class="author-header">
        <img :src="authorUrl" alt="作者头像" class="author-avatar" />
        <h2 class="author-name">零风PLFJY</h2>
        <p class="author-title">第五人格BP软件开发者 &amp; 技术爱好者</p>
      </div>

      <p>一个第五人格爱好者，专注于为民间赛开发最好的BP软件</p>

      <div class="author-links">
        <a target="_blank" rel="noopener noreferrer" href="https://plfjy.top/" class="author-link">
          <VPIcon icon="house" />
          个人主页
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://blog.plfjy.top/" class="author-link">
          <VPIcon icon="blog" />
          个人博客
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://space.bilibili.com/453909624/"
          class="author-link">
          <VPIcon icon="fa6-brands:bilibili" />
          B站主页
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/PLFJY/" class="author-link">
          <VPIcon icon="fa6-brands:github" />
          GitHub主页
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { withBase } from "@vuepress/client";

const authorUrl = computed(() => withBase("assets/plfjy.jpg"));
</script>

<style scoped>
/* 作者信息 */
.author-section {
  text-align: center;
  margin-top: 3rem;
  padding: 10px;
}

.author-card {
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem;
  border-radius: 16px;
  background: var(--vp-c-control);
}

.author-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.author-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.5rem;
  border: 3px solid var(--primary-color);
}

.author-name {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.author-title {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.author-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.author-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-primary);
  background: var(--vp-c-control);
  transition: all 0.3s ease;
}

.author-link:hover {
  background: var(--vp-c-control-hover);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px var(--vp-c-shadow);
}

.author-link i {
  font-size: 1.2rem;
}

a::after {
  display: none !important
}
</style>