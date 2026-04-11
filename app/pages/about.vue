<template>
  <div>
    <ProjectIntro
      title="COSMO 过往项目展示"
      :project-list="[
        {
          id: 1,
          name: '深中漫游指南',
          desc: '整合校园资讯、社团介绍、学习资源的平台',
          tag: 'Nuxt 项目',
          cover: 'https://picsum.photos/id/180/800/450',
        },
        {
          id: 2,
          name: '校园广播站点歌系统',
          desc: '深中风华子衿广播站点歌系统',
          tag: '前端项目',
          cover: 'https://picsum.photos/id/119/800/450',
        },
        {
          id: 3,
          name: 'COSMO 官网',
          desc: '组织宣传、招新、成果展示一体化官网',
          tag: '当前项目',
          cover: 'https://picsum.photos/id/48/800/450',
        },
      ]"
    />
  </div>
</template>
