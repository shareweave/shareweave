/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  transform: {},
  preset: "ts-jest/presets/js-with-ts", // or other ESM presets  testEnvironment: "./test/custom-environment.mjs",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    }
  },
  testEnvironment: "./test/custom-environment.mjs",
}
