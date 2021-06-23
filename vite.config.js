import vue from '@vitejs/plugin-vue';
import { viteMockServe } from 'vite-plugin-mock';

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
    ],
  };
};
