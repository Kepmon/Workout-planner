module.exports = {
  env: {
    'vitest-globals/env': true,
    browser: true,
    es2021: true
  },
  extends: [
    'plugin: vitest-globals/recommended',
    'vue/eslint-config-typescript',
    'plugin:vue/vue3-essential',
    'airbnb-base'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    semi: ['error', 'never'],
    'no-trailing-spaces': ['error', { skipBlankLines: true }],
    'comma-dangle': ['error', 'never'],
    'linebreak-style': ['error', 'windows']
  }
}
