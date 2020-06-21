const { addLessLoader, override } = require("customize-cra");

module.exports = {
  webpack: override(
    addLessLoader()
  ),
};
