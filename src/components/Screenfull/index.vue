<template>
  <div v-bind="$attrs">
    <svg-icon
      :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="click"
    />
  </div>
</template>

<script>
import screenfull from 'screenfull';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { message } from '@/utils';

export default {
  name: 'Screenfull',
  setup() {
    const isFullscreen = ref(false);

    onMounted(() => {
      init();
    });
    onBeforeUnmount(() => {
      destroy();
    });

    const click = () => {
      if (!screenfull.enabled) {
        message({
          message: 'you browser can not work',
          type: 'warning',
        });
        return false;
      }
      screenfull.toggle();
    };
    const change = () => {
      isFullscreen.value = screenfull.isFullscreen;
    };
    const init = () => {
      if (screenfull.enabled) {
        screenfull.on('change', change);
      }
    };
    const destroy = () => {
      if (screenfull.enabled) {
        screenfull.off('change', change);
      }
    };

    return {
      isFullscreen,
      click,
    };
  },
};
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
