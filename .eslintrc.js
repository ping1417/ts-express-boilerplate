module.exports = {
    "env": {
        "es2022": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        'prettier',
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "2022",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
        "max-len": ["error", {
            "code": 190,
            "ignoreTrailingComments": true,
            "ignoreStrings": true,
        }],
        'prettier/prettier': [
            'error',
            {
              "singleQuote": true
            }
        ],
        "quotes": ["error", "single"],
        "@typescript-eslint/no-explicit-any": "warn"
    },
    "ignorePatterns": ['node_modules', 'dist'],
}
