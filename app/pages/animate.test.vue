<template>
  <FirstReason
    v-if="stage === 0"
    title1="第一个原因"
    title2="的占位符"
    description="占位的文字,这里应该放点介绍"
    @on-complete="() => {
      stage++;
      console.log('First reason animation completed, moving to stage', stage);
    }"
  />
  <SecondReason
    v-if="stage === 1"
    title1="第二个原因"
    title2="的占位符"
    description="占位的文字,这里应该放点介绍"
    @on-complete="() => {
      stage++;
      console.log('Second reason animation completed, moving to stage', stage);
    }"
  />
  <ThirdReason
    v-if="stage === 2"
    title1="第三个原因"
    title2="的占位符"
    description="占位的文字,这里应该放点介绍"
    @on-complete="() => {
      console.log('Third reason animation completed, moving to stage', stage);
    }"
  />
</template>

<script lang="ts" setup>
import FirstReason from '@/components/animate/FirstReason.vue';
import SecondReason from '@/components/animate/SecondReason.vue';
import ThirdReason from '@/components/animate/ThirdReasons.vue';

definePageMeta({
  layout: 'fullscreen',
});

const stage = ref(-1);

onMounted(() => {
  setTimeout(() => {
    stage.value = 0;
  }, 1000);
});
</script>
