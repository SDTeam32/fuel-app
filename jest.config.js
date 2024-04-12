module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    // setupFiles: ['./jest.setup.ts'],
    // setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    moduleNameMapper: {
      // Handle module aliases (if you have them configured in your tsconfig.json)
      "^@/components/(.*)$": "<rootDir>/components/$1",
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    transform: {
      // Use ts-jest for ts and tsx files
      '^.+\\.(ts|tsx)$': ['ts-jest',  { tsconfig: 'tsconfig.jest.json' }],
    },
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    collectCoverage: true,
    collectCoverageFrom: [
      '**/*.{js,jsx,ts,tsx}',
      '!**/node_modules/**',
      '!**/.next/**', 
      '!**/vendor/**',
      '!**/*.d.ts',
      '!**/coverage/**', // Exclude coverage directory
      '!**/jest.config.js', // Exclude Jest config
      '!**/next.config.js', // Exclude Next.js config
      '!**/postcss.config.js',
      '!**/tailwind.config.ts',
      '!**/_app.tsx', // Exclude _app file from Next.js (if you want)
      '!**/_document.tsx', // Exclude _document file from Next.js (if you want)
      // Add other exclusions as needed
    ],
    coverageDirectory: 'coverage', // Output directory for coverage reports
    coverageReporters: ['json', 'lcov', 'text', 'clover'], // Reporters you want to use
  };
  