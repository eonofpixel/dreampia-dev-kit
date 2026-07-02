const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { packageRoot } = require("./paths");

function runScript(relativeScriptPath, args) {
  const result = spawnSync(process.execPath, [path.join(packageRoot, relativeScriptPath), ...args], {
    cwd: process.cwd(),
    stdio: "inherit",
  });

  if (result.error) {
    console.error(result.error.message);
    return 1;
  }

  return typeof result.status === "number" ? result.status : 1;
}

module.exports = {
  runScript,
};
