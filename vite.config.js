import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    open: true,
    strictPort: true,
    cors: false,
    // 프록시 설정
    proxy: {
      // 프록시 요청을 보낼 api의 시작 부분
      "^/v1": {
        // 프록시 요청을 보낼 서버의 주소
        target: "http://localhost:8090",
        changeOrigin: false,
        xfwd: true,
      },
    },
  },

  plugins: [vue()],
});
