<template>
  <el-scrollbar
    ref="root"
    :vertical="false"
    class="scroll-container"
    @wheel.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script lang="ts">
import { noop } from 'lodash-es';
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue';
// const tagAndTagSpacing = 4; // tagAndTagSpacing

export default defineComponent({
  name: 'ScrollPane',
  emits: ['scroll'],
  setup(props, { emit }) {
    const left = ref(0);
    const root = ref<any>();

    const scrollWrapper = computed(() => root.value.wrap);

    onMounted(() => {
      scrollWrapper.value.addEventListener('scroll', emitScroll, true);
    });

    onBeforeUnmount(() => {
      scrollWrapper.value.removeEventListener('scroll', emitScroll);
    });

    const handleScroll = (e) => {
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      const $scrollWrapper = scrollWrapper.value;
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
    };

    const emitScroll = () => {
      emit('scroll');
    };
    // const moveToTarget = (currentTag) => {
    //   const $container = this.$refs.scrollContainer.$el;
    //   const $containerWidth = $container.offsetWidth;
    //   const $scrollWrapper = this.scrollWrapper;
    //   const tagList = this.$parent.$refs.tag;

    //   let firstTag = null;
    //   let lastTag = null;

    //   // find first tag and last tag
    //   if (tagList.length > 0) {
    //     firstTag = tagList[0];
    //     lastTag = tagList[tagList.length - 1];
    //   }

    //   if (firstTag === currentTag) {
    //     $scrollWrapper.scrollLeft = 0;
    //   } else if (lastTag === currentTag) {
    //     $scrollWrapper.scrollLeft =
    //       $scrollWrapper.scrollWidth - $containerWidth;
    //   } else {
    //     // find preTag and nextTag
    //     const currentIndex = tagList.findIndex((item) => item === currentTag);
    //     const prevTag = tagList[currentIndex - 1];
    //     const nextTag = tagList[currentIndex + 1];

    //     // the tag's offsetLeft after of nextTag
    //     const afterNextTagOffsetLeft =
    //       nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing;

    //     // the tag's offsetLeft before of prevTag
    //     const beforePrevTagOffsetLeft =
    //       prevTag.$el.offsetLeft - tagAndTagSpacing;

    //     if (
    //       afterNextTagOffsetLeft >
    //       $scrollWrapper.scrollLeft + $containerWidth
    //     ) {
    //       $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
    //     } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
    //       $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
    //     }
    //   }
    // };

    return {
      left,
      root,
      scrollWrapper,
      handleScroll,
      moveToTarget: noop,
    };
  },
});
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  :deep(.el-scrollbar__bar) {
    bottom: 0px;
  }
  :deep(.el-scrollbar__wrap) {
    height: 49px;
  }
}
</style>
