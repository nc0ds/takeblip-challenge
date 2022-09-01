import { Config } from '@jest/types';

const config: Config.InitialOptions = {
	testPathIgnorePatterns: ['/node_modules', '/.next'],
	setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': '@swc/jest',
		'.+\\.(css|scss)$': 'jest-css-modules-transform',
		'^.+\\.svg$': '<rootDir>/src/tests/transformers/svgTransformer.cjs',
	},
	testEnvironment: 'jsdom',
	// collectCoverage: true,
	collectCoverageFrom: [
		'src/**/*.tsx',
		'!src/**/*.test.tsx',
		'!src/**/_app.tsx',
		'!src/**/_document.tsx',
	],
	coverageReporters: ['lcov', 'json'],
};

export default config;
