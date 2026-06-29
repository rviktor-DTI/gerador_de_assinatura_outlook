import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Aqui você expõe para a rede (0.0.0.0)
    // port: 3000 // Opcional: Você também pode mudar a porta padrão se quiser
  },
  build: {
    chunkSizeWarningLimit: 1000, // Aumenta o limite para silenciar o aviso da logo embutida como fallback
  }
})
