module.exports = {
  extends: ['eslint:recommended'],
  parser: '@typescript-eslint/parser',
  //plugins: ['@typescript-eslint'],
  root: true,


  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    }
  }

};