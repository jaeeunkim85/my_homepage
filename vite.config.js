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
    // ���Ͻ� ����
    proxy: {
      // ���Ͻ� ��û�� ���� api�� ���� �κ�
      "^/v1": {
        // ���Ͻ� ��û�� ���� ������ �ּ�
        target: "http://localhost:8090",
        changeOrigin: false,
        xfwd: true,
      },
    },
  },

  plugins: [vue()],
});
