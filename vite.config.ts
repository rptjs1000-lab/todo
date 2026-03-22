import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 빌드 결과물 출력 디렉토리
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  server: {
    // 개발 서버 포트
    port: 3000,
    strictPort: false,
  },
  preview: {
    port: 4173,
  },
})
