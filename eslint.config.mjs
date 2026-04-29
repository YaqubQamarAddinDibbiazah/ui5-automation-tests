import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
    { ignores: ['node_modules/', 'allure-results/', 'allure-report/'] },

    eslint.configs.recommended,
    ...tseslint.configs.recommended,

    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',

            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        },
    },
    eslintConfigPrettier
);
