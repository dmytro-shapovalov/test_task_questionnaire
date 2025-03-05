import { defineConfig } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';

import { zodToJsonSchemaPlugin } from './plugins/zodToJsonSchemaPlugin';

export default defineConfig({
  plugins: [react(), tailwindcss(), zodToJsonSchemaPlugin()],
});
