/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Utilisation du preset ESM spécifique
  preset: 'ts-jest/presets/default-esm', 
  testEnvironment: 'node',
  // On indique à Jest de traiter le .ts comme de l'ESM
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    // Aide Jest à trouver les fichiers sans extensions
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    // Configuration spécifique de ts-jest pour l'ESM
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};