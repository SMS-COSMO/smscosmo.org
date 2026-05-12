import type AnimationHandler from '@/components/animate/AnimateHandler.vue';

type AnimationHandlerInstance = InstanceType<typeof AnimationHandler>;

export function useAnimationHandler() {
  const handlerRef = ref<AnimationHandlerInstance | null>(null);

  const expose = {
    playInit: async () => { await handlerRef.value?.runInitSequence?.(); },
    playEnter: async () => { await handlerRef.value?.runEnterSequence?.(); },
    playExit: async () => { await handlerRef.value?.runExitSequence?.(); },
    playFull: async () => { await handlerRef.value?.runFullSequence?.(); },
    getStatus: () => handlerRef.value?.aniStatus,
  };

  return { handlerRef, expose };
}
