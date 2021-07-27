import Breadcrumb from '../index.vue';
import { shallowMount } from '@vue/test-utils';
import router from '@/router';
import ElComponents from '@/element-components';

describe('Breadcrumb', () => {
  it('get span', async () => {
    router.push('/');

    await router.isReady();
    const wrapper = shallowMount(Breadcrumb, {
      global: {
        plugins: [router, ...ElComponents],
      },
    });
    expect(wrapper.find('.app-breadcrumb')).not.toBe(null);
  });
});
