import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import million from "million/compiler";
import { defineConfig } from "vite";
import { tamaguiPlugin } from "@tamagui/vite-plugin";

export default defineConfig({
	server: {
		open: true,
		host: true,
	},
	plugins: [
		million.vite({ auto: true }),
		react(),
		tamaguiPlugin({
			config: "tamagui.config.ts",
			components: ["tamagui"],
		}),
		basicSsl(),
	],
	optimizeDeps: {
		esbuildOptions: {
			// Node.js global to browser globalThis
			define: {
				global: "globalThis",
			},
		},
	},
});
