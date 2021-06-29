<template>
  <div :class="{ show: show }" class="header-search">
    <svg-icon
      class-name="search-icon"
      icon-class="search"
      @click.stop="click"
    />
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="change"
    >
      <el-option
        v-for="{ item } in options"
        :key="item.path"
        :value="item"
        :label="item.title.join(' > ')"
      />
    </el-select>
  </div>
</template>

<script lang="ts">
// fuse is a lightweight fuzzy-search module
// make search results more in line with expectations
import Fuse from 'fuse.js';
import path from 'path';
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HeaderSearch',
  setup() {
    const store = useStore();
    const router = useRouter();

    const search = ref('');
    const options = ref([]);
    const searchPool = ref([]);
    const show = ref(false);
    let fuse: any = null;
    const headerSearchSelect = ref<any>();

    const routes = computed(() => store.getters.permission_routes);

    watch(routes, (val) => {
      generateRoutes(val);
    });
    watch(searchPool, (val) => initFuse(val));
    watch(show, (val) => {
      if (val) {
        document.body.addEventListener('click', close);
      } else {
        document.body.removeEventListener('click', close);
      }
    });

    onMounted(() => {
      searchPool.value = generateRoutes(routes.value);
    });

    const click = () => {
      show.value = !show.value;
      if (show.value) {
        headerSearchSelect.value && headerSearchSelect.value.focus();
      }
    };
    const close = () => {
      headerSearchSelect.value && headerSearchSelect.value.blur();
      options.value = [];
      show.value = false;
    };
    const change = (val) => {
      router.push(val.path);
      search.value = '';
      options.value = [];
      nextTick(() => {
        show.value = false;
      });
    };
    const initFuse = (list) => {
      fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        minMatchCharLength: 1,
        keys: [
          {
            name: 'title',
            weight: 0.7,
          },
          {
            name: 'path',
            weight: 0.3,
          },
        ],
      });
    };
    // Filter out the routes that can be displayed in the sidebar
    // And generate the internationalized title
    const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
      let res = [] as any;

      for (const router of routes) {
        // skip hidden router
        if (router.hidden) {
          continue;
        }

        const data = {
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle] as any,
        };

        if (router.meta && router.meta.title) {
          data.title = [...data.title, router.meta.title];

          if (router.redirect !== 'noRedirect') {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            res.push(data);
          }
        }

        // recursive child routes
        if (router.children) {
          const tempRoutes = generateRoutes(
            router.children,
            data.path,
            data.title,
          );
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes];
          }
        }
      }
      return res;
    };
    const querySearch = (query) => {
      if (query !== '') {
        options.value = fuse.search(query);
      } else {
        options.value = [];
      }
    };

    return {
      search,
      options,
      searchPool,
      show,
      routes,
      headerSearchSelect,
      click,
      change,
      querySearch,
    };
  },
});
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
