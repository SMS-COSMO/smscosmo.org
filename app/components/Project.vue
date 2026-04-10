<template>
  <div
    ref="cardRef"
    class="project-card"
    :class="[isInView ? 'is-in-view' : '']"
    @click="openGithubLink"
  >
    <!-- 项目封面图 -->
    <div class="project-img">
      <img
        :src="picture"
        alt="项目封面"
        loading="lazy"
      >
    </div>

    <!-- Markdown内容渲染 -->
    <div class="project-content">
      <ContentDoc :path="markdown" class="markdown-body" />
    </div>

    <!-- GitHub跳转提示 -->
    <div class="project-link">
      <span>查看GitHub仓库 →</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ProjectProps {
  markdown: string;
  picture: string;
  linkTo: string;
}

const { markdown, picture, linkTo } = defineProps<ProjectProps>();

const cardRef = ref<HTMLElement | null>(null);
const isInView = ref<boolean>(false);
const hasAnimated = ref<boolean>(false);

function openGithubLink(): void {
  window.open(linkTo, '_blank', 'noopener noreferrer');
}

useIntersectionObserver(
  cardRef,
  ([entry]) => {
    if (entry && entry.isIntersecting && !hasAnimated.value) {
      isInView.value = true;
      hasAnimated.value = true;
    }
  },
  {
    threshold: 0.2,
  },
);
</script>

<style scoped>
:root {
  --primary-color: #4f46e5;
  --card-bg: rgba(255, 255, 255, 0.08);
  --text-main: #ffffff;
  --text-secondary: #cccccc;
  --card-radius: 12px;
}

.project-card {
  background: var(--card-bg) !important;
  border-radius: var(--card-radius);
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.4s ease, transform 0.4s ease;
  width: 100%;
  display: block;
}

.project-card.is-in-view {
  opacity: 1;
  transform: translateY(0);
}

.project-img {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #1e293b;
}

.project-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.project-content {
  padding: 20px;
  color: var(--text-main) !important;
  display: block;
}

.markdown-body {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary) !important;
}

.markdown-body h1, .markdown-body h2, .markdown-body h3 {
  font-size: 18px;
  margin-bottom: 8px;
  color: var(--text-main) !important;
  font-weight: 600;
}

.project-link {
  padding: 0 20px 20px;
  font-size: 12px;
  color: var(--primary-color) !important;
  font-weight: 500;
  display: block;
}
</style>
