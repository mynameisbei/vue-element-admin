import variables from '@/styles/element-variables.module.scss';
import defaultSettings from '@/settings';
import { Module } from 'vuex';

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings;

export interface SettingsState {
  theme: string;
  showSettings: boolean;
  tagsView: boolean;
  fixedHeader: boolean;
  sidebarLogo: boolean;
}

const settings: Module<SettingsState, any> = {
  namespaced: true,
  state: {
    theme: variables.theme,
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
  },
  mutations: {
    CHANGE_SETTING: (state, { key, value }) => {
      // eslint-disable-next-line no-prototype-builtins
      if (state.hasOwnProperty(key)) {
        state[key] = value;
      }
    },
  },
  actions: {
    changeSetting({ commit }, data) {
      commit('CHANGE_SETTING', data);
    },
  },
};

export default settings;
