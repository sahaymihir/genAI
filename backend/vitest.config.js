import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		setupFiles: ['./vitest.setup.js'],
		env: { NODE_ENV: 'development' },
	},
});