module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    process.env.IS_JEST !== 'Y'
      ? [
          'import',
          {
            libraryName: 'element-plus',
            customStyleName: (name) => {
              name = name.slice(3);
              return `element-plus/packages/theme-chalk/src/${name}.scss`;
            },
          },
        ]
      : {},
  ],
};
