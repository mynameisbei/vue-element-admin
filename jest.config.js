module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  transformIgnorePatterns: ['node_modules/(?!(.*echarts.*|.*zrender.*)/)'],
  collectCoverageFrom: ['src/components/**/*.{js,vue}'],
  coverageDirectory: '<rootDir>/tests/coverage',
  collectCoverage: true,
  coverageReporters: ['lcov', 'text-summary'],
};
