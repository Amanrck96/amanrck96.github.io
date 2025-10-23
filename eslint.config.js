// ESLint v9 flat config for Next.js
// Uses eslint-config-next and ignores build directories
module.exports = [
  { ignores: ['node_modules', '.next', 'out'] },
  ...require('eslint-config-next'),
];