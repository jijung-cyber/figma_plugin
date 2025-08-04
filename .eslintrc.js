module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  globals: {
    // Figma Plugin API globals
    figma: 'readonly',
    __html__: 'readonly',
    __uiFiles__: 'readonly',
    // Figma types
    TextNode: 'readonly',
    SceneNode: 'readonly',
    FontName: 'readonly',
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'prefer-const': 'error',
  },
  ignorePatterns: [
    'node_modules/',
    '*.js',
    'dist/',
  ],
};