<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import adminDashboard from './admin/index.vue';
import editorDashboard from './editor/index.vue';
import { computed, defineComponent, ref } from 'vue';
import('echarts/theme/macarons'); // echarts theme

export default defineComponent({
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  setup() {
    const store = useStore();
    const currentRole = ref('adminDashboard');

    const roles = computed(() => store.getters.roles);

    if (!roles.value.includes('admin')) {
      currentRole.value = 'editorDashboard';
    }

    return {
      currentRole,
      roles,
    };
  },
});
</script>
