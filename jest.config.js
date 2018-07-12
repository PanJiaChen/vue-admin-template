module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
  ],
  // collectCoverageFrom: ['src/utils/**/*.{js,vue}'],
  'coverageDirectory': './tests/coverage',
  // 'collectCoverage': true,
  'coverageReporters': [
    'lcov',
    'text-summary'
  ]
}
