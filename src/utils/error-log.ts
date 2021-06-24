import { nextTick, App } from 'vue';
import store from '@/store';
import { isString } from 'lodash';
import settings from '@/settings';

export default function (app: App<Element>): void {
  // you can set in settings.js
  // errorLog:'production' | ['production', 'development']
  const { errorLog: needErrorLog } = settings;

  function checkNeed() {
    const env = (import.meta.env.NODE_ENV as string) ?? '';
    if (isString(needErrorLog)) {
      return env === needErrorLog;
    }
    if (Array.isArray(needErrorLog)) {
      return needErrorLog.includes(env);
    }
    return false;
  }

  if (checkNeed()) {
    app.config.errorHandler = function (err, vm, info) {
      // Don't ask me why I use Vue.nextTick, it just a hack.
      // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
      nextTick(() => {
        store.dispatch('errorLog/addErrorLog', {
          err,
          vm,
          info,
          url: window.location.href,
        });
        console.error(err, info);
      });
    };
  }
}
