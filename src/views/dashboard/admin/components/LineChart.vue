<template>
  <div ref="el" :class="className" :style="{ height: height, width: width }" />
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs } from 'vue';
import { useChart, useResize } from '@/views/dashboard/composable';

export default defineComponent({
  props: {
    className: {
      type: String,
      default: 'chart',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '350px',
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const el = ref<HTMLElement | undefined>();
    const { chartData } = toRefs(props);
    const options = computed(() => ({
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        boundaryGap: false,
        axisTick: {
          show: false,
        },
      },
      grid: {
        left: 10,
        right: 10,
        bottom: 20,
        top: 30,
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
        padding: [5, 10],
      },
      yAxis: {
        axisTick: {
          show: false,
        },
      },
      legend: {
        data: ['expected', 'actual'],
      },
      series: [
        {
          name: 'expected',
          itemStyle: {
            color: '#FF005A',
          },
          lineStyle: {
            color: '#FF005A',
            width: 2,
          },
          smooth: true,
          type: 'line',
          data: chartData.value.expectedData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut',
        },
        {
          name: 'actual',
          smooth: true,
          type: 'line',
          itemStyle: {
            color: '#3888fa',
          },
          areaStyle: {
            color: '#f3f8ff',
          },
          lineStyle: {
            color: '#3888fa',
            width: 2,
          },
          data: chartData.value.actualData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut',
        },
      ],
    }));

    const { chart } = useChart(options, el);
    useResize(chart);

    return {
      chart,
      el,
    };
  },
});
</script>
