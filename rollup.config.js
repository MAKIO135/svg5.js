import pkg from './package.json'
import terser from '@rollup/plugin-terser'
 
export default [
	{
		input: 'src/main.js',
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' },
			{ name: 'svg5', file: pkg.browser, format: 'umd' },
		]
	},

	{
		input: 'src/main.js',
		output: [
			{ file: pkg.main.replace('.js', '.min.js'), format: 'cjs' },
			{ file: pkg.module.replace('.js', '.min.js'), format: 'es' },
			{ name: 'svg5', file: pkg.browser.replace('.js', '.min.js'), format: 'umd' },
		],
		plugins: [
			terser()
		]
	}
]