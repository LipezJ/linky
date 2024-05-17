process.env.ESLINT_TSCONFIG = "tsconfig.json"

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	globals: {
		NodeJS: true,
		NodeListOf: true,
	},
	env: {
		es2022: true,
		node: true,
		browser: true,
	},
	extends: ["@antfu", "eslint-config-prettier"],
	plugins: [
		"@typescript-eslint",
		"eslint-plugin-astro",
		"eslint-plugin-import",
		"eslint-plugin-jsx-a11y",
		"eslint-plugin-prettier",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {
		"eol-last": "off",
		"jsx-quotes": ["warn", "prefer-double"],
		"quotes": ["warn", "double"],
		"semi": ["warn", "never"],
		"@stylistic/js/no-tabs": "off",
		"@stylistic/ts/indent": "off",
		"no-constant-binary-expression": "warn",
		"no-debugger": "warn",
		"no-extend-native": "off",
		"no-trailing-spaces": "warn",
		"space-before-function-paren": "off",
		"antfu/if-newline": "off",
		"antfu/top-level-function": "off",
		"@stylistic/js/operator-linebreak": "off",
		"@stylistic/ts/brace-style": "off",
		"@stylistic/js/multiline-ternary": "off",
		"n/prefer-global/process": "off",
		"@stylistic/js/no-mixed-spaces-and-tabs": "off",
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"unused-imports/no-unused-imports": "warn",
		"unicorn/error-message": "off",
		"object-curly-newline": [
			"warn",
			{
				consistent: true,
				multiline: true,
			},
		],
		"object-curly-spacing": ["warn", "always"],
		"array-element-newline": ["warn", "consistent"],
		"array-bracket-newline": ["warn", "consistent"],
		"import/order": [
			"error",
			{
				"groups": [["builtin", "external"], ["internal"], ["parent", "sibling", "index"], ["type"]],
				"pathGroups": [
					{
						pattern: "{preact,nanostores}",
						group: "external",
						position: "before",
					},
					{
						pattern: "@/**",
						group: "internal",
					},
				],
				"pathGroupsExcludedImportTypes": ["builtin"],
				"newlines-between": "always",
				"alphabetize": {
					order: "asc",
					caseInsensitive: true,
				},
			},
		],
	},
	overrides: [
		{
			files: ["*.astro", "src/utils/serviceWorker.ts"],
			parser: "astro-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
				extraFileExtensions: [".astro"],
			},
			extends: ["plugin:astro/recommended", "plugin:astro/jsx-a11y-recommended"],
			rules: {
				"astro/no-conflict-set-directives": "warn",
				"astro/no-unused-define-vars-in-style": "warn",
				"astro/no-unused-css-selector": "off",
				"astro/prefer-class-list-directive": "warn",
				"astro/semi": ["warn", "never"],
				"astro/jsx-a11y/anchor-is-valid": "warn",
				"@stylistic/ts/indent": "off",
			},
		},
		{
			// Define the configuration for `<script>` tag.
			// Script in `<script>` is assigned a virtual file name with the `.js` extension.
			files: ["**/*.astro/*.js", "*.astro/*.js"],
			parser: "@typescript-eslint/parser",
		},
	],
	settings: {
		"import/resolver": {
			alias: {
				map: [["@", "./src"]],
				extensions: [".js", ".jsx", ".ts", ".tsx", ".astro"],
			},
		},
	},
}
