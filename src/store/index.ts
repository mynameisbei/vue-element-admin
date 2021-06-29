import { createStore } from 'vuex';
import * as modules from './modules';

// https://webpack.js.org/guides/dependency-management/#requirecontext
// const modulesFiles = require.context('./modules', true, /\.js$/);

// // you do not need `import app from './modules/app'`
// // it will auto require all vuex module from modules file
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   // set './app.js' => 'app'
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
//   const value = modulesFiles(modulePath);
//   modules[moduleName] = value.default;
//   return modules;
// }, {});

const store = createStore({
  modules,
  getters: {
    sidebar: (state) => state.app.sidebar,
    size: (state) => state.app.size,
    device: (state) => state.app.device,
    visitedViews: (state) => state.tagsView.visitedViews,
    cachedViews: (state) => state.tagsView.cachedViews,
    token: (state) => state.user.token,
    avatar: (state) => state.user.avatar,
    name: (state) => state.user.name,
    introduction: (state) => state.user.introduction,
    roles: (state) => state.user.roles,
    permission_routes: (state) => state.permission.routes,
    errorLogs: (state) => state.errorLog.logs,
  },
});

export default store;
