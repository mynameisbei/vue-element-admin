<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import adminDashboard from './admin';
import editorDashboard from './editor';
import { computed, ref } from 'vue';

export default {
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
};
</script>
