import { debounce } from '@/utils';
import echarts from 'echarts';
import('echarts/theme/macarons'); // echarts theme

import {
  ref,
  onMounted,
  onBeforeUnmount,
  onDeactivated,
  onActivated,
  markRaw,
  nextTick,
  watch,
  unref,
} from 'vue';

export function useResize(chart) {
  const $_sidebarElm = ref(null);
  const $_resizeHandler = ref(null);

  onMounted(() => {
    $_resizeHandler.value = debounce(() => {
      if (chart.value) {
        chart.value.resize();
      }
    }, 100);
    $_initResizeEvent();
    $_initSidebarResizeEvent();
  });

  onBeforeUnmount(() => {
    $_destroyResizeEvent();
    $_destroySidebarResizeEvent();
  });

  // to fixed bug when cached by keep-alive
  // https://github.com/PanJiaChen/vue-element-admin/issues/2116
  onActivated(() => {
    $_initResizeEvent();
    $_initSidebarResizeEvent();
  });

  onDeactivated(() => {
    $_destroyResizeEvent();
    $_destroySidebarResizeEvent();
  });

  // use $_ for mixins properties
  // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
  const $_initResizeEvent = () => {
    window.addEventListener('resize', $_resizeHandler.value);
  };
  const $_destroyResizeEvent = () => {
    window.removeEventListener('resize', $_resizeHandler.value);
  };
  const $_sidebarResizeHandler = (e) => {
    if (e.propertyName === 'width') {
      $_resizeHandler.value();
    }
  };
  const $_initSidebarResizeEvent = () => {
    $_sidebarElm.value =
      document.getElementsByClassName('sidebar-container')[0];
    $_sidebarElm.value &&
      $_sidebarElm.value.addEventListener(
        'transitionend',
        $_sidebarResizeHandler,
      );
  };
  const $_destroySidebarResizeEvent = () => {
    $_sidebarElm.value &&
      $_sidebarElm.value.removeEventListener(
        'transitionend',
        $_sidebarResizeHandler,
      );
  };
}

export function useChart(options, el) {
  const chart = markRaw(ref(null));

  watch(
    () => options,
    (val) => {
      setOptions(val);
    },
    { deep: true },
  );

  onMounted(() => {
    nextTick(() => {
      initChart();
    });
  });

  onBeforeUnmount(() => {
    if (chart.value) {
      chart.value.dispose();
      chart.value = null;
    }
  });

  const initChart = () => {
    chart.value = markRaw(echarts.init(el.value, 'macarons'));
    setOptions(options);
  };

  const setOptions = (params) => {
    chart.value.setOption(unref(params));
  };

  return {
    chart,
  };
}
