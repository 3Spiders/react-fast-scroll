const { addLessLoader, override, fixBabelImports } = require("customize-cra");

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      style: 'css',
    }),
    addLessLoader()
  ),
};
