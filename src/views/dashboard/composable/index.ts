import { debounce } from 'lodash';
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
  Ref,
} from 'vue';
import { noop } from 'lodash';

export function useResize(chart: Ref<Record<string, any>>): void {
  const $_sidebarElm = ref<Element>();
  const $_resizeHandler = ref<() => any>(noop);

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
    if ($_sidebarElm.value) {
      $_sidebarElm.value =
        document.querySelector('.sidebar-container') || undefined;
      $_sidebarElm.value &&
        $_sidebarElm.value.addEventListener(
          'transitionend',
          $_sidebarResizeHandler,
        );
    }
  };
  const $_destroySidebarResizeEvent = () => {
    $_sidebarElm.value &&
      $_sidebarElm.value.removeEventListener(
        'transitionend',
        $_sidebarResizeHandler,
      );
  };
}

export interface UserChartResult {
  chart: Record<string, any>;
}

export function useChart(
  options: Record<string, any>,
  el: Ref<HTMLElement>,
): UserChartResult {
  const chart = markRaw(ref<Record<string, any>>());

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
      chart.value = undefined;
    }
  });

  const initChart = () => {
    chart.value = markRaw(echarts.init(el.value, 'macarons'));
    setOptions(options);
  };

  const setOptions = (params: typeof options) => {
    chart.value?.setOption(unref(params));
  };

  return {
    chart,
  };
}
