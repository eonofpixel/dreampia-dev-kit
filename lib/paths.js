const path = require("node:path");

const packageRoot = path.resolve(__dirname, "..");
const packageJson = require(path.join(packageRoot, "package.json"));

module.exports = {
  packageJson,
  packageRoot,
};
