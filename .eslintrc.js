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
  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
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
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
    {
      files: ['./mock/**/*.js', './*.js'],
      extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        '@vue/prettier',
      ],
    },
    {
      files: ['src/**/*.{ts,vue}'],
      extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        '@vue/typescript/recommended',
        '@vue/prettier',
        '@vue/prettier/@typescript-eslint',
      ],
      rules: {
        'vue/no-mutating-props': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
};
