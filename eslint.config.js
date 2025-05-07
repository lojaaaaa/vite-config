import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import prettierPlugin from "eslint-plugin-prettier";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        plugins: {
            js,
            "simple-import-sort": simpleImportSort,
            "react-hooks": pluginReactHooks,
            prettier: prettierPlugin,
        },
        extends: ["js/recommended"],
    },
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        languageOptions: { globals: globals.browser },
    },
    tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    {
        rules: {
            // Base rules
            "react/react-in-jsx-scope": "off", // Не требовать import React from 'react'
            "no-undef": "warn", // Предупреждать об использовании необъявленных переменных
            "no-unused-expressions": "warn", // Предупреждать о выражениях без эффекта
            semi: ["error", "always"], // Всегда ставить ;
            eqeqeq: ["error", "always"], // Всегда использовать === вместо ==
            curly: ["error", "all"], // Всегда использовать фигурные скобки для блоков
            "no-console": ["warn", { allow: ["warn", "error"] }], // Предупреждать о console.log
            "prefer-const": "warn", // Предпочитать const, если переменная не переназначается

            // Import sorting
            "simple-import-sort/imports": [
                "warn",
                {
                    groups: [
                        // react
                        ["^react", "^@?\\w"],
                        // alias @/
                        ["^@/"],
                        // absolute paths.
                        [
                            "^(app|pages|widgets|features|entities|shared)(/.*|$)",
                        ],
                        // relative imports
                        [
                            "^\\./(?=.*/)(?!/?$)",
                            "^\\.(?!/?$)",
                            "^\\./?$",
                            "^\\.\\.(?!/?$)",
                            "^\\.\\./?$",
                        ],
                        // not matched
                        ["^"],
                        // types
                        ["^.+\\.?(types)$"],
                        // Style imports.
                        [".module.scss", ".styled", "^.+\\.?(css)$"],
                    ],
                },
            ],
            "import/order": "off", // Отключение стандартной сортировки импортов

            // TypeScript rules
            "@typescript-eslint/indent": "off", // Отключить проверку отступов TypeScript
            "@typescript-eslint/no-explicit-any": "warn", // Предупреждать об использовании any
            "@typescript-eslint/no-unused-vars": "warn", // Предупреждать о неиспользуемых переменных и аргументах
            "@typescript-eslint/consistent-type-imports": "error", // Всегда import type { Foo } from './types'

            // React rules
            "react/jsx-indent": ["error", 4], // Требовать отступ в 4 пробела в JSX
            "react/jsx-indent-props": ["error", 4], // Требовать отступ в 4 пробела для props в JSX
            "react-hooks/rules-of-hooks": "error", // Ошибка, если нарушены правила хуков
            "react-hooks/exhaustive-deps": "warn", // Предупреждать о неполных зависимостях в useEffect/useCallback/useMemo

            // Prettier
            "prettier/prettier": [
                "error",
                {
                    tabWidth: 4, // Использовать 4 пробела для табуляции
                    endOfLine: "auto", // Автоматически подстраивать перенос строк
                },
            ],
        },
    },
]);
