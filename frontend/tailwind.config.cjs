const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
	content: ['./src/**/*.html', './src/**/*.svelte'],
	theme: {
		colors: {
			brand: '#2B9BD9', // or #47A8BD
			bright: '#FC6767',
			'brand-light': '#6BD1E7',
			'background-darker': '#E5E7EB',
			yellow: '#EAB308',
			red: '#BD4747',
			white: '#FFF',
			black: 'black',
			darken: '#0000001c',
			secondary: '#333333'
		},
		boxShadow: {
			DEFAULT:
				'0px 0px 33.4221px rgba(0, 0, 0, 0.0503198), 0px 0px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802)'
		},
		extend: {
			sans: ['Work Sans', ...defaultTheme.fontFamily.sans]
		}
	},
	plugins: []
}
