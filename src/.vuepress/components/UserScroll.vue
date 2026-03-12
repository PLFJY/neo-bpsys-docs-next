<template>
  <h2 class="section-title">
    {{ t.userScroll.title }}<br />
    {{ subtitle }}
  </h2>
  <div class="users-wrap">
    <div class="scroll-mask scroll-mask-left"></div>
    <div class="scroll-mask scroll-mask-right"></div>

    <section ref="userScrollRef" class="user-scroll">
      <div class="user-track">
        <div v-for="(t, idx) in marqueeTournaments" :key="`${idx}-${t}`" v-html="t" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onBeforeUnmount, ref } from "vue";

const fallback = {
  userScroll: {
    title: "庞大的用户群",
    subtitle: "有 {count}+ 个民间赛事团队曾有使用",
  },
};

const homeI18n = inject("homeI18n", computed(() => fallback));
const t = computed(() => homeI18n.value ?? fallback);

const tournaments = ref<string[]>([
  'ASG<br>(本家定制版)',
  'MGF',
  'IZL/CVA<br>(自改版)',
  'FLN/JRL<br>(定制版)',
  'IPL<br>(易语言版)',
  '上海科技大学校内赛',
  'PAL<br>(易语言版)',
  'cew',
  '广西大学杯大众赛',
  '欧美服IEAL',
  'IGL广州初高中联赛',
  '东大第五人格赛事INL<br>(东北大学)',
  'IEL星球杯',
  '北航校内赛',
  'GLIV',
  '济南第五人格高中联赛',
  'QWQ/MCY',
  'NJUPT',
  '上海SHISL第五人格高中生联赛<br>(定制版)',
  'FIAC福州市高中赛',
  '福州大学校内赛',
  'USTC校内赛<br>(中国科学技术大学)',
  '第五人格西区杯',
  '抖音东仔水友赛<br>(UI画面定制)',
  '小甜甜水友赛',
  'ACS档案馆秘闻<br>(自改版)',
  'DZ',
  '中南财经政法大学校内赛',
  '江苏理工校友赛',
  '南京师范大学校内赛',
  'ASU',
  'FEG复旦大学校内赛',
  '第五人格IVF赛事',
  '武汉高校第五人格赛事<br>(华中科技大学)',
  '南通大学第五人格赛事',
  '武汉理工大学校内赛',
  '山艺第五人格赛事',
  'USST上海理工大学校内赛',
  'ICR第五人格联合赛事',
  '第五人格SIV赛事',
  '第五人格KBL赛事<br>(易语言版)',
  'SUL苏大第五人格',
  '第五人格ICU赛事',
  'COH第五人格海湾校赛',
  'EVO 赛事',
  'IVBL',
  '西宁市第五人格校内赛',
  'RCE',
  'SIV',
  '中北大学第五人格赛事',
  'SVA',
  'Tsia M',
  'THC',
  '湖南理工友谊赛',
  '上海海洋大学校内赛',
  '风铃杯 X 青岛平度RE动漫游戏嘉年华',
  '柠檬水赛事ILL, COL',
  '第五人格KCC赛事',
  'RCF第五人格赛事',
  'IVX第五人格赛事',
  'MNIL',
  '第五人格台州市高中生邀请赛',
  '荣漫第五人格水友赛',
  '西南交大第五人格赛事',
  '第五人格FDM赛事',
  '第五人格FDM赛事',
  '北京大学第五人格赛事<br>PIL',
  '浙工大第五人格赛事',
  'XSL',
  'IQJC',
  '中南大学第五人格赛事',
  '第五人格北京高中联赛',
  'SIL',
  'CSU',
  'SWG',
  'CTCU水友赛',
  '张之律水友赛',
  '齐鲁工业大学校内赛',
  'TMU校内联谊赛',
  'ZUL',
  'ZNJU',
  '西狮电子竞技俱乐部哥特杯',
  '上海海洋大学<br>Shou第五人格赛事',
  '首经贸第五人格杯',
  "武汉大学第五人格校内赛",
  "中国传媒大学（白杨杯）",
  "华政杯",
  "南昌大学校内赛",
  "白杨杯",
  "TIVL",
  "第五人格事务所杯",
  "航母杯",
  "YTS",
  "IIL",
  "遵义市中建拾光荟跨年比赛",
  "第五人格CPL高校宣传赛",
  "星赛事",
  "北京大学第五人格赛事",
  "IFL、IUL",
  "ICL",
  "广东财经大学",
  "温州医科大学校内赛",
  "第五人格湛江市高中邀请赛"
]);

const tournaments_count = Math.floor(tournaments.value.length / 10) * 10;
const marqueeTournaments = computed(() => [...tournaments.value, ...tournaments.value]);
const subtitle = computed(() =>
  t.value.userScroll.subtitle.replace("{count}", String(tournaments_count))
);

// 自动滚动逻辑
const userScrollRef = ref<HTMLElement | null>(null);
let teardownAutoScroll: (() => void) | null = null;

function setupEnhancedAutoScroll() {
  const scrollElement = userScrollRef.value as HTMLElement | null;
  if (!scrollElement) return () => {};

  const trackElement = scrollElement.querySelector(".user-track") as HTMLElement | null;
  if (!trackElement) return () => {};

  const scrollSpeed = 2;
  const scrollInterval = 30;
  let rafId = 0;
  let isScrolling = true;
  let lastTimestamp = 0;
  let loopWidth = trackElement.scrollWidth / 2;
  let resumeTimer = 0;

  const refreshLoopWidth = () => {
    loopWidth = trackElement.scrollWidth / 2;
  };

  const scrollStep = (timestamp: number) => {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const delta = timestamp - lastTimestamp;

    if (delta > scrollInterval && isScrolling && loopWidth > 0) {
      lastTimestamp = timestamp;
      scrollElement.scrollLeft += scrollSpeed;

      if (scrollElement.scrollLeft >= loopWidth) {
        scrollElement.scrollLeft -= loopWidth;
      }
    }

    rafId = requestAnimationFrame(scrollStep);
  };

  const pauseScroll = () => {
    isScrolling = false;
    if (resumeTimer) {
      window.clearTimeout(resumeTimer);
      resumeTimer = 0;
    }
  };
  const resumeScroll = () => {
    if (resumeTimer) window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(() => {
      isScrolling = true;
      lastTimestamp = 0;
    }, 900);
  };
  const onFocusIn = () => {
    pauseScroll();
  };
  const onFocusOut = (event: FocusEvent) => {
    const nextFocused = event.relatedTarget as Node | null;
    if (!nextFocused || !scrollElement.contains(nextFocused)) {
      resumeScroll();
    }
  };

  refreshLoopWidth();
  const resizeObserver = new ResizeObserver(() => {
    refreshLoopWidth();
  });
  resizeObserver.observe(trackElement);

  scrollElement.addEventListener("mouseenter", pauseScroll);
  scrollElement.addEventListener("mouseleave", resumeScroll);
  scrollElement.addEventListener("touchstart", pauseScroll, { passive: true });
  scrollElement.addEventListener("touchend", resumeScroll, { passive: true });
  scrollElement.addEventListener("touchcancel", resumeScroll, { passive: true });
  scrollElement.addEventListener("focusin", onFocusIn);
  scrollElement.addEventListener("focusout", onFocusOut);
  rafId = requestAnimationFrame(scrollStep);

  return () => {
    cancelAnimationFrame(rafId);
    if (resumeTimer) window.clearTimeout(resumeTimer);
    resizeObserver.disconnect();
    scrollElement.removeEventListener("mouseenter", pauseScroll);
    scrollElement.removeEventListener("mouseleave", resumeScroll);
    scrollElement.removeEventListener("touchstart", pauseScroll);
    scrollElement.removeEventListener("touchend", resumeScroll);
    scrollElement.removeEventListener("touchcancel", resumeScroll);
    scrollElement.removeEventListener("focusin", onFocusIn);
    scrollElement.removeEventListener("focusout", onFocusOut);
  };
}

onMounted(() => {
  teardownAutoScroll = setupEnhancedAutoScroll();
});

onBeforeUnmount(() => {
  teardownAutoScroll?.();
  teardownAutoScroll = null;
});
</script>

<style scoped>

.users-wrap {
  position: relative;
  max-width: 100rem;
  margin: 2rem auto 3rem;
}

.user-scroll {
  height: 8rem;
  overflow-x: auto;
  overflow-y: hidden;
  border-radius: 16px;
  box-shadow: 0 10px 30px var(--vp-c-shadow);
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: var(--primary-color) var(--surface-dark);
  background: var(--vp-c-control);
}

/* 自定义滚动条样式 */
.user-scroll::-webkit-scrollbar {
  height: 4px;
}

.user-scroll::-webkit-scrollbar-track {
  background: var(--surface-dark);
  border-radius: 2px;
}

.user-scroll::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 2px;
}

.user-scroll::-webkit-scrollbar-thumb:hover {
  background: var(--primary-light);
}

.user-scroll {
  transition: scrollbar-color 0.3s ease;
}

.user-scroll:not(:hover)::-webkit-scrollbar-thumb {
  background: transparent;
}

.user-scroll:not(:hover) {
  scrollbar-color: transparent var(--surface-dark);
}

.scroll-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 120px;
  z-index: 100;
  pointer-events: none;
}

.scroll-mask-left {
  left: 0;
  background: linear-gradient(to right, var(--background-dark, var(--vp-c-bg)) 0%, transparent 100%);
}

.scroll-mask-right {
  right: 0;
  background: linear-gradient(to left, var(--background-dark, var(--vp-c-bg)) 0%, transparent 100%);
}

.user-track {
  display: flex;
  padding: 10px;
  gap: 10px;
  width: max-content;
}

.user-track>div {
  flex: 0 0 150px;
  height: 100px;
  background: var(--vp-c-control);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-size: 1.2rem;
  color: var(--text-primary);
  text-align: center;
  transition: all 0.3s ease;
}

.user-track>div:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}
</style>
