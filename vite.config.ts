import { defineConfig } from 'vite';
import handlebars from './vite-plugin-handlebars-precompile';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        login: resolve(__dirname, 'src/pages/login/login.html'),
        registration: resolve(
          __dirname,
          'src/pages/registration/registration.html',
        ),
        change_profile_data: resolve(
          __dirname,
          'src/pages/profile/modules/change_profile_data/change_profile_data.html',
        ),
        change_password: resolve(
          __dirname,
          'src/pages/profile/modules/change_password/change_profile_password.html',
        ),
        profile: resolve(__dirname, 'src/pages/profile/profile.html'),
        chat: resolve(__dirname, 'src/pages/chat/chat.html'),
        error400: resolve(__dirname, 'src/pages/error/error400.html'),
        error500: resolve(__dirname, 'src/pages/error/error500.html'),
        modals: resolve(__dirname, 'src/pages/modals/modals.html'),
      },
    },
  },
  plugins: [
    // handlebars({
    //   partialDirectory: resolve(__dirname, 'src/partials'),
    //   context: {
    //     errorNumber: 500,
    //     errorText: "Oops...we're fixing it",
    //   },
    // }) as unknown as Plugin,
    handlebars(),
  ],
  server: {
    port: 3000,
    open: true,
  },
});
