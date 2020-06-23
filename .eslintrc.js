module.exports = {
  extends: [
      'alloy',
      'alloy/react',
      'alloy/typescript',
  ],
  env: {
      // Your environments (which contains several predefined global variables)
      //
      browser: true,
      // node: true,
      // mocha: true,
      // jest: true,
      // jquery: true
  },
  globals: {
      // Your global variables (setting to false means it's not allowed to be reassigned)
      //
      // myGlobal: false
  },
  rules: {
    // Customize your rules
    '@typescript-eslint/explicit-member-accessibility': 0,
    'default-case-last': 0,
    'no-loss-of-precision': 0,
    'no-useless-backreference': 0,
  }
};