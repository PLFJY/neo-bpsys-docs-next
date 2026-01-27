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
// Import the new components
import ProjectTimeline from "./ProjectTimeline.vue";
import Contributors from "./Contributors.vue";
import UserScroll from "./UserScroll.vue";
import DownloadCenter from "./DownloadCenter.vue";
import AuthorCard from "./AuthorCard.vue";
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
