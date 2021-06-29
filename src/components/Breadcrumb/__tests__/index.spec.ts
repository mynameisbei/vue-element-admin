import { mount } from '@cypress/vue';
import Breadcrumb from '../index.vue';
import router from '@/router';
import store from '@/store';
import elementComponents from '@/element-components';

describe('Breadcrumb', () => {
  it('get span', async () => {
    router.push('/');
    await router.isReady();
    mount(Breadcrumb, {
      global: {
        plugins: [router, store, ...elementComponents],
      },
    }).then(() => {
      expect((Cypress.vueWrapper.vm as any).levelList).to.not.empty;
    });
  });
});
