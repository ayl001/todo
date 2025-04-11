module.exports = {
	testEnvironment: 'jsdom', // Environnement pour tester les composants React
	setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // Fichier de configuration supplémentaire
	transform: {
	  '^.+\\.jsx?$': 'babel-jest', // Utilise Babel pour transformer les fichiers JS/JSX
	},
	moduleNameMapper: {
	  '\\.(css|scss)$': 'identity-obj-proxy', // Mapper pour les fichiers CSS/SCSS
	},
  };