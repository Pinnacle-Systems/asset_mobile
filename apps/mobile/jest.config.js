module.exports = {
  preset: "react-native",
  testEnvironment: "node",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [],
  moduleFileExtensions: ["js", "jsx", "json"],
};
