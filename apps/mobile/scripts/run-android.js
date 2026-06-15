const { mkdirSync } = require("fs");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");

const isWindows = process.platform === "win32";
const cacheRoot = isWindows ? "C:\\Temp" : os.tmpdir();
const gradleUserHome = path.join(cacheRoot, "amgu");
const projectCacheDir = path.join(cacheRoot, "amgp");
const reactNativeBin = path.join(
  process.cwd(),
  "node_modules",
  ".bin",
  isWindows ? "react-native.cmd" : "react-native",
);

mkdirSync(gradleUserHome, { recursive: true });
mkdirSync(projectCacheDir, { recursive: true });

const args = [
  "run-android",
  "--extra-params",
  `--project-cache-dir=${projectCacheDir}`,
  ...process.argv.slice(2),
];

const child = spawn(reactNativeBin, args, {
  cwd: process.cwd(),
  env: {
    ...process.env,
    GRADLE_USER_HOME: gradleUserHome,
  },
  shell: isWindows,
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
