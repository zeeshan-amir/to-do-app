// module.exports = {
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['@testing-library/jest-dom'],
//   globals: {
//     VITE_APP_BASE_URL : process.env.VITE_APP_BASE_URL,
//   },
//   testMatch: ['<rootDir>/tests/**/?(*.)+(spec|test).[jt]s?(x)'],
// };


module.exports = {
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  globals: {
    VITE_APP_BASE_URL : process.env.VITE_APP_BASE_URL,
  },
  testMatch: ['<rootDir>/tests/**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
};
