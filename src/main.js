import { createApp } from 'vue';

import 'normalize.css/normalize.css'; // a modern alternative to CSS resets
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import 'dayjs/locale/zh-cn';
import locale from 'element-plus/lib/locale/lang/zh-cn';

import '@/styles/index.scss'; // global css

import App from './App.vue';
import store from './store';
import router from './router';
import 'virtual:svg-icons-register';

import SvgIcon from '@/components/SvgIcon/index.vue'; // svg component
import errorHandle from '@/utils/error-log';

import './permission'; // permission control

// import * as filters from './filters' // global filters

const app = createApp(App);
errorHandle(app);

app.component('SvgIcon', SvgIcon);
app.use(store).use(router).use(ElementPlus, { locale }).mount('#app');

// // register global utility filters
// Object.keys(filters).forEach(key => {
//   app.filter(key, filters[key])
// })
