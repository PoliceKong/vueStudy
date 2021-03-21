module.exports = {
	root: true,
	// 对Babel解析器的包装使其与 ESLint 兼容。
	extends: ['plugin:vue/essential', 'eslint:recommended'],

	parserOptions: {
		// 设置解析器选项能帮助 ESLint 确定什么是解析错误，所有语言选项默认都是 false
		ecmaVersion: 6, // 支持es6语法，但并不意味着同时支持新的 ES6 全局变量或类型（比如 Set 等新类型）
		sourceType: 'module',
		parser: 'babel-eslint',
		ecmaFeatures: {
			jsx: true, // 启用 JSX
			globalReturn: true, // 允许在全局作用域下使用 return 语句
			impliedStrict: true, // 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
			experimentalObjectRestSpread: true, // 启用实验性的 object rest/spread properties 支持。(重要：这是一个实验性的功能,在未来可能会有明显改变。 建议你写的规则 不要 依赖该功能，除非当它发生改变时你愿意承担维护成本。)
		},
	},
	env: {
		browser: true, // 预定义的全局变量
		es6: true, // 启用 ES6 语法支持以及新的 ES6 全局变量或类型
		node: true,
	},
	// required to lint *.vue files
	plugins: ['prettier', 'import', 'vue'],
	// add your custom rules here
	rules: {
		// allow debugger during development
		'prettier/prettier': 'error',
		'no-var': 0, //使用let和const代替var
		quotes: [1, 'single', 'avoid-escape'], //引号风格
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'max-len': [1, { code: 140 }],
	},
}
