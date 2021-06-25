<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script lang="ts">
import { isExternal as judgeIsExternal } from '@/utils/validate';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const isExternal = computed(() => judgeIsExternal(props.to));
    const type = computed(() => {
      if (isExternal.value) {
        return 'a';
      } else {
        return 'router-link';
      }
    });

    const linkProps = (to) => {
      if (isExternal.value) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener',
        };
      }
      return {
        to: to,
      };
    };

    return {
      isExternal,
      type,
      linkProps,
    };
  },
});
</script>
