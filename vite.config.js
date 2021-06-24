import vue from '@vitejs/plugin-vue';
import viteSvgIcons from 'vite-plugin-svg-icons';
import { viteMockServe } from 'vite-plugin-mock';
import path from 'path';

// https://vitejs.dev/config/
export default ({ command }) => {
  return {
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
      }),
      viteSvgIcons({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        // Specify symbolId format
        symbolId: 'icon-[name]',
      }),
    ],
  };
};
