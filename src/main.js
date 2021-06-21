import { createApp } from 'vue';

import 'normalize.css/normalize.css'; // a modern alternative to CSS resets
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import 'dayjs/locale/zh-cn';
import locale from 'element-plus/lib/locale/lang/zh-cn';

import '@/styles/index.scss'; // global css

import App from './App';
import store from './store';
import router from './router';
import './icons'; // icon

import SvgIcon from '@/components/SvgIcon'; // svg component
import errorHandle from '@/utils/error-log';

import './permission'; // permission control
import './utils/error-log'; // error log

// import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock');
  mockXHR();
}

const app = createApp(App);
errorHandle(app);

app.component('SvgIcon', SvgIcon);
app.use(store).use(router).use(ElementPlus, { locale }).mount('#app');

// // register global utility filters
// Object.keys(filters).forEach(key => {
//   app.filter(key, filters[key])
// })
