<template>
  <section class="project-intro">
    <div class="container">
      <h2 class="title">
        {{ title }}
      </h2>
      <div class="project-list">
        <div
          v-for="(item, index) in projectList"
          :key="item.id"
          class="project-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="project-img">
            <img :src="item.cover" :alt="item.name" loading="lazy">
          </div>
          <div class="project-info">
            <h3 class="project-name">
              {{ item.name }}
            </h3>
            <p class="project-desc">
              {{ item.desc }}
            </p>
            <p v-if="item.developTime" class="project-meta">
              开发时间：{{ item.developTime }}
            </p>
            <span class="project-tag">
              {{ item.tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ProjectItem {
  id: number;
  name: string;
  desc: string;
  tag: string;
  cover: string;
  developTime?: string;
  team?: string;
  detailLink?: string;
}

withDefaults(
  defineProps<{
    title?: string;
    projectList: ProjectItem[];
  }>(),
  {
    title: 'COSMO 过往项目',
  },
);
</script>

<style scoped>
.project-intro {
  padding: 60px 20px !important;
  background-color: #0a0a0f !important;
  color: #fff !important;
  width: 100%;
  min-height: 100vh;
}

.project-intro .container {
  max-width: 1200px;
  margin: 0 auto;
}

.project-intro .title {
  font-size: 32px;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 600;
  color: #fff !important;
}

.project-intro .project-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.project-intro .project-card {
  background: rgba(255, 255, 255, 0.05) !important;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease !important;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.project-intro .project-card:hover {
  transform: translateY(-6px) !important;
}

.project-intro .project-img {
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: rgba(255,255,255,0.1);
}

.project-intro .project-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-intro .project-info {
  padding: 16px;
}

.project-intro .project-name {
  font-size: 18px;
  margin-bottom: 8px;
  color: #fff !important;
}

.project-intro .project-desc {
  font-size: 14px;
  color: #ccc !important;
  line-height: 1.5;
  margin-bottom: 12px;
}

.project-intro .project-meta {
  font-size: 12px;
  color: #999 !important;
  margin-bottom: 8px;
}

.project-intro .project-tag {
  display: inline-block;
  padding: 4px 10px;
  font-size: 12px;
  background: #4f46e5 !important;
  color: #fff !important;
  border-radius: 6px;
}

@media (max-width: 1024px) {
  .project-intro .title {
    font-size: 28px;
  }
  .project-intro .project-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .project-intro .title {
    font-size: 24px;
  }
  .project-intro .project-list {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .project-intro .project-img {
    height: 160px;
  }
}
</style>
