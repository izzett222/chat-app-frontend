const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    clearMocks: true,
    moduleFileExtensions: ['js', 'json', 'jsx', 'scss'],
    collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],

    coverageDirectory: 'coverage',
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
      '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    },
    globals: {
      'process.env.BACKEND_LINK': process.env.BACKEND_LINK
    },
    verbose: true,
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
}
