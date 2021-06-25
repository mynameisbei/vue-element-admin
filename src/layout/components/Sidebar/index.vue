<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permissionRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import Logo from './Logo.vue';
import SidebarItem from './SidebarItem.vue';
import variables from '@/styles/variables.module.scss';
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'SideBar',
  components: { SidebarItem, Logo },
  setup() {
    const store = useStore();
    const route = useRoute();

    const permissionRoutes = computed(() => store.getters.permission_routes);
    const sidebar = computed(() => store.getters.sidebar);
    const activeMenu = computed(() => {
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    });
    const showLogo = computed(() => {
      return store.state.settings.sidebarLogo;
    });
    const style = computed(() => {
      return variables;
    });
    const isCollapse = computed(() => {
      return !sidebar.value.opened;
    });

    return {
      permissionRoutes,
      activeMenu,
      showLogo,
      variables: style,
      isCollapse,
    };
  },
});
</script>
