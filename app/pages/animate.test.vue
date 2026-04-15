<template>
  <ThirdReason
    v-if="stage === 0"
    ref="sReasonRef"
    title1="为什么选择我们？"
    title2="Why choose us?"
    description="我们致力于打造一个开放、包容、创新的社区，欢迎每一个热爱科技、热爱创新的你加入我们！"
    @on-complete="stage = 1"
  />
</template>

<script lang="ts" setup>
import ThirdReason from '@/components/animate/ThirdReason.vue';

definePageMeta({
  layout: 'fullscreen',
});

const stage = ref(0);
const sReasonRef = ref<InstanceType<typeof ThirdReason>>();

onMounted(() => {
  sReasonRef.value?.playFull();
});
</script>
