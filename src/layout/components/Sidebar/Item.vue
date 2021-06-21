<template>
  <template v-if="$props.icon">
    <i
      v-if="$props.icon.includes('el-icon')"
      :class="[$props.icon, 'sub-el-icon']"
    ></i>
    <svg-icon v-else :icon-class="$props.icon"></svg-icon>
  </template>
  <slot name="header">
    <span>{{ $props.title }}</span>
  </slot>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
