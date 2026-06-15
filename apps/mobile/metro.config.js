const path = require("path");
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const workspaceRoot = path.resolve(__dirname, "../..");
const packagesRoot = path.resolve(workspaceRoot, "packages");

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  return mergeConfig(defaultConfig, {
    // Metro runs from apps/mobile, but shared workspace packages live outside it.
    // Watching the repo root lets React Native rebuild when packages/* changes.
    watchFolders: [workspaceRoot, packagesRoot],
    transformer: {
      // React Native assets must point at RN's asset registry. Plain metro-config
      // defaults to "missing-asset-registry-path", which crashes on PNG imports.
      assetRegistryPath: "react-native/Libraries/Image/AssetRegistry",
    },
    resolver: {
      // pnpm stores dependencies at the workspace root, so Metro needs both app
      // and root node_modules paths to resolve hoisted and symlinked packages.
      nodeModulesPaths: [
        path.resolve(__dirname, "node_modules"),
        path.resolve(workspaceRoot, "node_modules"),
      ],
      // Keep workspace package aliases explicit so Metro resolves a single copy
      // of shared packages and avoids duplicate React/React Native instances.
      extraNodeModules: {
        "@repo/api-client": path.resolve(packagesRoot, "api-client"),
        "@repo/logger": path.resolve(packagesRoot, "logger"),
        "@repo/ui": path.resolve(packagesRoot, "ui"),
      },
    },
  });
})();
