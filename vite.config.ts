import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteSvgIcons from 'vite-plugin-svg-icons';
import { viteMockServe } from 'vite-plugin-mock';
import path from 'path';
import styleImport from 'vite-plugin-style-import';
import fs from 'fs';

const getElementVersion = () => {
  const content = fs
    .readFileSync('node_modules/element-plus/package.json')
    .toString();
  const version = JSON.parse(content).version;
  return JSON.stringify(version);
};

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    define: {
      ELEMENT_VERSION: getElementVersion(),
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    build: {
      target: 'esnext',
    },
    plugins: [
      vue(),
      viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve',
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
      }),
      viteSvgIcons({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        // Specify symbolId format
        symbolId: 'icon-[name]',
      }),
      styleImport({
        libs: [
          {
            libraryName: 'element-plus',
            esModule: true,
            ensureStyleFile: true,
            resolveStyle: (name) => {
              name = name.slice(3);
              return `element-plus/packages/theme-chalk/src/${name}.scss`;
            },
            resolveComponent: (name) => {
              return `element-plus/lib/${name}`;
            },
          },
        ],
      }),
    ],
  };
});
