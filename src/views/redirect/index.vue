<template>
  <div></div>
</template>

<script>
import { onActivated } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    onActivated(() => {
      const { params, query } = route;
      const { path } = params;
      router.replace({ path: '/' + path, query });
    });
  },
};
</script>
