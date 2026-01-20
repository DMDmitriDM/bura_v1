import { defineConfig } from 'eslint/config';
import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  {
    ignores: ['node_modules/'],
  },
  {
    files: ['src/**/*.js'],
    languageOptions: {
      globals: globals.browser,
      sourceType: "module",
    },
    plugins: {
        pluginJs,
        pluginPrettier,
    },
    extends: ['pluginJs/recommended', prettierConfig],
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'no-var': 'error',
      'pluginPrettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
]);
