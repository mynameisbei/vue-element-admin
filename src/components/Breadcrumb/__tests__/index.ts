import { mount } from '@vue/test-utils';
import store from '@/store';
import router from '@/router';
import elementComponents from '@/element-components';
import Breadcrumb from '../index.vue';

async function normalMount(components) {
  router.push('/');
  await router.isReady();
  return mount(components, {
    global: {
      plugins: [store, router, ...elementComponents],
    },
  });
}

test('renders a todo', async () => {
  const wrapper = await normalMount(Breadcrumb);

  expect(wrapper.findAll('app-breadcrumb')).toHaveLength(1);
});
