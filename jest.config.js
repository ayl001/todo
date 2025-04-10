module.exports = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
	transform: {
		'^.+\\.jsx?$': 'bable-jest',
	},
	moduleNameMapper: {
		'\\.(css|scss)$': identity-obj-proxy',
	},
};
