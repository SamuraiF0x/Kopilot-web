import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import million from "million/compiler";
import { tamaguiPlugin } from "@tamagui/vite-plugin";

export default defineConfig({
	server: {
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
