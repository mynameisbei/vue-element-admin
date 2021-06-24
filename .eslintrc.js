module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    'vue/no-mutating-props': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  globals: {
    globalThis: true,
    ELEMENT_VERSION: true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src/']],
      },
    },
  },
};
