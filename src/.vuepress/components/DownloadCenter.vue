<template>
  <h2 class="section-title">{{ t.download.title }}</h2>
  <section class="hero">
    <div class="hero-content">
      <div class="system-requirements">
        {{ t.download.systemRequirements }}<VPIcon class="req-icon" icon="fa6-brands:windows" />
        {{ t.download.systemWindows }}
      </div>
      <a v-if="isZh" ref="btnGhproxy1" id="download-button-ghproxy-1" :href="downloadHrefFallback"
        class="download-btn" :class="{ disabled: !isWindows }" :aria-disabled="!isWindows ? 'true' : 'false'"
        :title="!isWindows ? t.download.unsupportedTitle : ''" @click="onPrimaryDisabledClick">
        <div class="line1">
          <VPIcon icon="download" />
          {{ isWindows ? t.download.downloadNow : t.download.unsupported }}
        </div>
        <div class="line2">{{ versionText }}</div>
      </a>

      <a v-else ref="btnGithub" id="download-button-github-primary" :href="githubHref" class="download-btn"
        :class="{ disabled: !isWindows || githubDisabled }"
        :aria-disabled="!isWindows || githubDisabled ? 'true' : 'false'"
        :title="!isWindows ? t.download.unsupportedTitle : (githubDisabled ? t.download.githubDisabledTitle : '')"
        @click="onPrimaryGithubDisabledClick">
        <div class="line1">
          <VPIcon icon="download" />
          {{ isWindows ? t.download.downloadNow : t.download.unsupported }}
        </div>
        <div class="line2">{{ versionText }}</div>
      </a>

      <div v-if="isWindows && isZh" class="backup-download-btns">
        <a ref="btnGhproxy2" id="download-button-ghproxy-2" :href="downloadHrefFallback"
          class="download-btn2">
          <div class="line1">
            <VPIcon icon="link" />
            {{ t.download.backup1 }}
          </div>
        </a>
        <a ref="btnGhproxy3" id="download-button-ghproxy-3" :href="downloadHrefFallback"
          class="download-btn2">
          <div class="line1">
            <VPIcon icon="link" />
            {{ t.download.backup2 }}
          </div>
        </a>
        <a ref="btnGithub" id="download-button-github" :href="downloadHrefFallback" class="download-btn2"
          :class="{ disabled: githubDisabled }" :aria-disabled="githubDisabled ? 'true' : 'false'"
          :title="githubDisabled ? t.download.githubDisabledTitle : ''" @click="onGithubDisabledClick">
          <div class="line1">
            <VPIcon icon="link" />
            {{ t.download.github }}
          </div>
        </a>
      </div>
      <div v-if="githubDisabled" class="download-disabled-tip">
        <VPIcon class="tip-icon" icon="fa6-solid:circle-info" />
        {{ t.download.downloadDisabledTip }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref, watch } from "vue";
import { useRouteLocale } from "@vuepress/client";

const fallback = {
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
};

const homeI18n = inject("homeI18n", computed(() => fallback));
const t = computed(() => homeI18n.value ?? fallback);
const routeLocale = useRouteLocale();
const isZh = computed(() => routeLocale.value === "/");

const downloadHrefFallback =
  "https://github.com/plfjy/neo-bpsys-wpf/releases/latest/download/neo-bpsys-wpf_Installer.exe";

const githubHref = ref(downloadHrefFallback);
const versionText = ref(t.value.download.versionLoading);
const isVersionLoading = ref(true);
const githubDisabled = ref(false);
const isWindows = ref(false);

const btnGithub = ref<HTMLAnchorElement | null>(null);
const btnGhproxy1 = ref<HTMLAnchorElement | null>(null);
const btnGhproxy2 = ref<HTMLAnchorElement | null>(null);
const btnGhproxy3 = ref<HTMLAnchorElement | null>(null);

function onGithubDisabledClick(e: MouseEvent) {
  if (githubDisabled.value) e.preventDefault();
}

function onPrimaryDisabledClick(e: MouseEvent) {
  if (!isWindows.value) e.preventDefault();
}

function onPrimaryGithubDisabledClick(e: MouseEvent) {
  if (!isWindows.value || githubDisabled.value) e.preventDefault();
}

async function updateLatestRelease() {
  try {
    const res = await fetch(
      "https://gh-releases.plfjy.top/?repo=PLFJY/neo-bpsys-wpf&latest=true&ua=neo-bpsys-wpf"
    );
    const data = await res.json();

    const installerAsset = (data.assets || []).find(
      (a: any) => a?.name === "neo-bpsys-wpf_Installer.exe"
    );

    if (installerAsset) {
      versionText.value = data.tag_name || "latest";
      isVersionLoading.value = false;

      const raw = installerAsset.browser_download_url as string;

      githubHref.value = raw;
      if (btnGithub.value) btnGithub.value.href = raw;
      if (btnGhproxy1.value) btnGhproxy1.value.href = "https://ghproxy.net/" + raw;
      if (btnGhproxy2.value) btnGhproxy2.value.href = "https://gh-proxy.com/" + raw;
      if (btnGhproxy3.value) btnGhproxy3.value.href = "https://ghfast.top/" + raw;

      githubDisabled.value = false;
    } else {
      versionText.value = t.value.download.versionNotFound;
      isVersionLoading.value = false;
      githubDisabled.value = true;
    }
  } catch (e) {
    console.error("获取release失败:", e);
    versionText.value = t.value.download.versionFailed;
    isVersionLoading.value = false;
  }
}

onMounted(() => {
  isWindows.value = typeof navigator !== "undefined" && /windows/i.test(navigator.userAgent);
  updateLatestRelease();
});

watch(
  () => t.value.download.versionLoading,
  (loadingText) => {
    if (isVersionLoading.value) versionText.value = loadingText;
  }
);
</script>

<style scoped>
/* 主视觉区域 */
.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
  background-color: var(--surface-dark);
}

.hero-content {
  max-width: 800px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.system-requirements {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  color: var(--text-secondary);
  font-size: 0.95rem;
  text-align: center;
}

.system-requirements .req-icon {
  color: var(--primary-light);
  font-size: 1rem;
}

/* 下载按钮 */
.download-btn {
  display: inline-block;
  padding: 1rem 2rem;
  background: var(--vp-c-accent-bg);
  border-radius: 8px;
  color: var(--vp-c-accent-text);
  text-decoration: none;
  font-size: 1.2rem;
  text-align: center;
  margin: 1.5rem 0;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--vp-c-border);
  cursor: pointer;
  min-width: 200px;
  transform: translateY(0);
  will-change: transform;
}

a.disabled {
  opacity: 0.5;
  pointer-events: none;
  color: var(--vp-c-text);
  background-color: var(--vp-c-control-disabled);
}

.download-btn:not(.disabled):hover,
.download-btn:not(.disabled):focus-visible {
  background: var(--vp-c-accent-hover);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.download-btn .line1 {
  font-weight: bold;
  font-size: 1.3rem;
}

.download-btn .line2 {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 5px;
}

/* 备用下载按钮 */
.backup-download-btns {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.download-btn2 {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: var(--vp-c-control);
  border-radius: 8px;
  color: var(--text-primary);
  text-decoration: none;
  text-align: center;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  min-width: 150px;
  transform: translateY(0);
  will-change: transform;
}

.download-btn2:not(.disabled):hover,
.download-btn2:not(.disabled):focus-visible {
  background: var(--vp-c-control-hover);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.download-btn2 .line1 {
  font-weight: bold;
  font-size: 1rem;
}

.download-disabled-tip {
  margin-top: 0.75rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.download-disabled-tip .tip-icon {
  color: var(--primary-light);
  font-size: 0.95rem;
}

a::after {
  display: none !important
}
</style>
