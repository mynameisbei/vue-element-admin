import { createApp } from 'vue';

import 'normalize.css/normalize.css'; // a modern alternative to CSS resets
import 'element-plus/packages/theme-chalk/src/base.scss';
import lang from 'element-plus/lib/locale/lang/zh-cn';
import 'dayjs/locale/zh-cn';
import locale from 'element-plus/lib/locale';
import ElComponents from './element-components';

import '@/styles/index.scss'; // global css

import App from './App.vue';
import store from './store';
import router from './router';
import './icons'; // icon

import SvgIcon from '@/components/SvgIcon/index.vue'; // svg component
import errorHandle from '@/utils/error-log';

import './permission'; // permission control
import { getEnv, PROJECT_ENV } from './utils';

// import * as filters from './filters' // global filters

function setup() {
  const app = createApp(App);
  errorHandle(app);

  locale.use(lang);

  ElComponents.forEach((i: any) => {
    app.use(i);
  });

  app.component('SvgIcon', SvgIcon);
  app.use(store).use(router).mount('#app');
}

if (getEnv(PROJECT_ENV.nodeEnv) === 'production') {
  import('../mock').then(({ mockXHR }) => {
    mockXHR();
    setup();
  });
} else {
  setup();
}

// // register global utility filters
// Object.keys(filters).forEach(key => {
//   app.filter(key, filters[key])
// })
