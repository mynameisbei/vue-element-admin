<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { RouteRaw } from '@/router';
import { compile } from 'path-to-regexp';
import { defineComponent, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const levelList = ref<RouteRaw[]>([]);

    watch(
      () => route.path,
      (val) => {
        // if you go to the redirect page, do not update the breadcrumbs
        if (!val.startsWith('/redirect/')) {
          getBreadcrumb();
        }
      },
    );

    const getBreadcrumb = () => {
      // only show routes with meta.title
      let matched = route.matched.filter(
        (item) => item.meta && item.meta.title,
      );
      levelList.value = matched.filter(
        (item) =>
          item.meta && item.meta.title && item.meta.breadcrumb !== false,
      );
    };
    const pathCompile = (path) => {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = route;
      var toPath = compile(path);
      return toPath(params);
    };
    const handleLink = (item) => {
      const { redirect, path } = item;
      if (redirect) {
        router.push(redirect);
        return;
      }
      router.push(pathCompile(path));
    };

    getBreadcrumb();

    return {
      levelList,
      handleLink,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
