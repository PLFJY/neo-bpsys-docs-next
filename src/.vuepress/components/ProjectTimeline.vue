<template>
  <h2 class="section-title">{{ t.sections.projectTimeline }}</h2>
  <section class="timeline">
    <a class="project" href="https://github.com/PLFJY/idv-bp-asg-e" target="_blank" rel="noopener noreferrer">
      <VPIcon class="project-icon" icon="code-branch" />
      <div class="project-content">
        <h3>idv-bp-asg-e</h3>
        <p>{{ t.timeline[0].desc }}</p>
      </div>
    </a>

    <a class="project" href="https://github.com/PLFJY/idv-fln-bp-e" target="_blank" rel="noopener noreferrer">
      <VPIcon class="project-icon" icon="code-branch" />
      <div class="project-content">
        <h3>idv-fln-bp-e</h3>
        <p>{{ t.timeline[1].desc }}</p>
      </div>
    </a>

    <a class="project" href="https://github.com/PLFJY/bp-sys-wpf" target="_blank" rel="noopener noreferrer">
      <VPIcon class="project-icon" icon="code-branch" />
      <div class="project-content">
        <h3>bp-sys-wpf</h3>
        <p>{{ t.timeline[2].desc }}</p>
      </div>
    </a>
  </section>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";

const fallback = {
  sections: {
    projectTimeline: "项目前身",
  },
  timeline: [
    { desc: "最初的BP系统原型，采用易语言制作" },
    { desc: "FLN/JRL赛事定制版，基于idv-bp-asg-e" },
    { desc: "WPF进行重写，比起上面两个功能更强大，是这个软件的前身" },
  ],
};

const homeI18n = inject("homeI18n", computed(() => fallback));
const t = computed(() => homeI18n.value ?? fallback);
</script>

<style scoped>
/* timeline */
.timeline {
  max-width: 100rem;
  margin: 0 auto 3rem;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px var(--vp-c-shadow);
  background: var(--vp-c-control);
}

.project {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  text-decoration: none;
  color: var(--text-primary);
  background: var(--vp-c-control);
  font-size: 20px;
  border-radius: 16px;
  transition: transform 0.3s, background-color 0.3s;
}

.project::after {
  display: none !important;
}

.project:hover {
  transform: translateX(10px);
  background: var(--vp-c-control-hover);
}

.project-icon {
  color: var(--accent-color);
  size: 1.5rem;
  width: 40px;
  text-align: center;
}

.project-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 3.2rem;
}

.project h3 {
  font-size: 1.4rem;
  line-height: 1.3;
  margin: 0 0 0.4rem 0;
  color: var(--accent-color);
}

.project p {
  font-size: 1rem;
  line-height: 1.4;
  color: var(--text-secondary);
  margin: 0;
}

a::after {
  display: none !important
}
</style>
