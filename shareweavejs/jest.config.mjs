/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
/** export default {
  transform: {},
  preset: "ts-jest/presets/default-esm",
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testEnvironment: "./test/custom-environment.mjs",
}
*/
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  transform: {},
  preset: 'ts-jest/presets/default-esm', // or other ESM presets  testEnvironment: "./test/custom-environment.mjs",
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      "useESM": true
    }
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testEnvironment: "./test/custom-environment.mjs",
}