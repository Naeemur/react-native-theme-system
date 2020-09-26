let React = require('react'), {
	Component,
	PureComponent,
} = require('react');

// import {
let RN = require('react-native'), {
	Platform,
	Animated,
	Dimensions,
	Easing,
	StyleSheet,
// } from 'react-native';
} = require('react-native');

const DT = {
	colors: {
		accent: "#00cccc",//"#03dac4",// - secondary color for your app which complements the primary color.
		backdrop: "rgba(0, 0, 0, 0.50)",// - color for backdrops of various components such as modals.
		background: "#f6f6f6",// - background color for pages, such as lists.
		disabled: "rgba(0, 0, 0, 0.26)",// - color for disabled elements.
		error: "#b00020",// - error.
		notification: "#f50057",// - notification.
		placeholder: "rgba(0, 0, 0, 0.54)",// - color for placeholder text, such as input placeholder.
		primary: "#00ffff",//"#6200ee",// - primary color for your app, usually your brand color.
		surface: "#ffffff",// - background color for elements containing content, such as cards.
		text: "#000000",// - text color for content.
		onBackground: '#000000',
		onSurface: '#000000',
	},
	dark: false,// (boolean): whether this is a dark theme or light theme.
	fonts: {
		light: "Roboto-Light, Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
		medium: "Roboto-Medium, Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
		regular: "Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
		thin: "Roboto-Thin, Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
	},
	roundness: 4,// (number): roundness of common elements, such as buttons.
}

const lightShades = ['#ffffff','#efefef','#e8e8e8','#dfdfdf','#d8d8d8','#cfcfcf','#c8c8c8','#bfbfbf','#b8b8b8','#afafaf']
const darkShades = ['#000000','#222222','#333333','#444444','#555555','#666666','#777777','#888888','#999999','#aaaaaa']
const lightColors = {
	...DT.colors,
	primary: '#00ffff',// - primary color for your app, usually your brand color.
	accent: '#00cccc',// - secondary color for your app which complements the primary color.
	background: '#ffffff',// - background color for pages, such as lists.
	surface: '#ffffff',// - background color for elements containing content, such as cards.
	text: '#000000',// - text color for content.
	error: '#b00020',// - error.
	notification: "#f50057",// - notification.
	backdrop: 'rgba(0, 0, 0, 0.50)',// - color for backdrops of various components such as modals.
	disabled: 'rgba(0, 0, 0, 0.26)',// - color for disabled elements.
	placeholder: 'rgba(0, 0, 0, 0.54)',// - color for placeholder text, such as input placeholder.
	onBackground: '#000000',
	onSurface: '#000000',
}
const darkColors = {
	...DT.colors,
	primary: '#00ffff',// - primary color for your app, usually your brand color.
	accent: '#00cccc',// - secondary color for your app which complements the primary color.
	background: '#000000',// - background color for pages, such as lists.
	surface: '#333333',// - background color for elements containing content, such as cards.
	text: '#ffffff',// - text color for content.
	error: '#b00020',// - error.
	notification: "#f50057",// - notification.
	backdrop: 'rgba(255, 255, 255, 0.50)',// - color for backdrops of various components such as modals.
	disabled: 'rgba(255, 255, 255, 0.26)',// - color for disabled elements.
	placeholder: 'rgba(255, 255, 255, 0.54)',// - color for placeholder text, such as input placeholder.
	onBackground: '#ffffff',
	onSurface: '#ffffff',
}

class Theme {
	constructor(opts={}, confCallback=args=>args) {
		let { colors, dark, fonts, roundness } = DT, variables = {}, darkCols = {}
		if(typeof opts == 'object') {
			fonts = {}
			colors = {}
			variables = typeof opts.variables == 'object' ? opts.variables : {}
			roundness = typeof opts.roundness == 'number' ? Math.floor(opts.roundness) : DT.roundness
			dark = typeof opts.dark == 'boolean' ? opts.dark : DT.dark
			if(typeof opts.fonts == 'object') {
				for(let f in DT.fonts) if(typeof opts.fonts[f] == 'string') fonts[f] = opts.fonts[f]
			}
			if(typeof opts.darkColors == 'object') {
				for(let c in DT.colors) if(typeof opts.darkColors[c] == 'string') darkCols[c] = opts.darkColors[c]
			}
			if(typeof opts.colors == 'object') {
				for(let c in DT.colors) if(typeof opts.colors[c] == 'string') colors[c] = opts.colors[c]
			}
			// if(typeof opts.animation == 'object') this.animation = opts.animation
		}
		// const DefaultTheme = DT
		const lights = {...(lightColors), ...(colors)}
		const darks = {...(darkColors), ...{primary:lights.primary,accent:lights.accent}, ...(darkCols)}
		const shades = [...(dark?darkShades:lightShades)]
		const tints = [...(dark?lightShades:darkShades)]
		const transition = new Animated.Value(dark?0:1)
		this.transition = transition
		this.roundness = roundness
		this.variables = variables
		this.shades = shades
		this.tints = tints
		this.fonts = {...DT.fonts, ...fonts}
		this.colors = {...(dark?darks:lights)}
		this.lights = lightShades
		this.darks = darkShades
		this.dark = dark
		// this.animation = {
		// 	scale: 1.0,
		// }
		this.animated = {
			colors: {...colors},
			shades: [...shades],
			tints: [...tints],
		},
		this.style = {
			font: {...this.fonts},
			rounded: {borderRadius:roundness},
			background: {...this.colors, tints: [...tints], shades: [...shades]},
			text: {...this.colors, tints: [...tints], shades: [...shades]},
		}
		// bgc: {...DefaultTheme.colors},
		// anc: {...DefaultTheme.colors},
		// vrv: [lightColors.background,lightColors.background,lightColors.background],
		// vrc: [
		// 	new Animated.Value(lightColors.background),
		// 	new Animated.Value(lightColors.background),
		// 	new Animated.Value(lightColors.background),
		// ],
		// conf(isDark) {
		// },
		this.x_confCallback = confCallback
		this.x_lights = lights
		this.x_darks = darks
		const bg = {}, tx = {}, ff = {}//, fg = isDark ? 255 : 0, rc = `rgba(${fg},${fg},${fg},${isDark?0.2:0.32})`
		for(let f in this.fonts) { ff[f] = {fontFamily:this.fonts[f]} }
		for(let c in this.colors) { bg[c] = {backgroundColor:this.colors[c]}; tx[c] = {color:this.colors[c]} }
		this.shades.forEach((v,i) => { bg['s'+i] = {backgroundColor:v}; tx['s'+i] = {color:v}; })
		this.tints.forEach((v,i) => { bg['t'+i] = {backgroundColor:v}; tx['t'+i] = {color:v}; })
		const bgc = StyleSheet.create(bg), txc = StyleSheet.create(tx), ffc = StyleSheet.create(ff)
		for(let c in this.colors) {
			this.animated.colors[c] = transition.interpolate({inputRange:[0,1],outputRange:[darks[c],lights[c]]})
			this.style.background[c] = bgc[c]
			this.style.text[c] = txc[c]
		}
		for(let i in this.shades) {
			this.animated.shades[i] = transition.interpolate({inputRange:[0,1],outputRange:[darkShades[i],lightShades[i]]})
			this.style.background.shades[i] = bgc['s'+i]
			this.style.text.shades[i] = txc['s'+i]
		}
		for(let i in this.tints) {
			this.animated.tints[i] = transition.interpolate({inputRange:[0,1],outputRange:[lightShades[i],darkShades[i]]})
			this.style.background.tints[i] = bgc['t'+i]
			this.style.text.tints[i] = txc['t'+i]
		}
		for(let f in this.fonts) this.style.font[f] = ffc[f]
		// let anc = {}
		// for(let c in theme.colors) anc[c] = {backgroundColor:themeTransition.interpolate({inputRange:[0,1],outputRange:[darkColors[c],lightColors[c]]})}
		// theme.shades.forEach((v,i) => { anc['s'+i] = {backgroundColor:themeTransition.interpolate({inputRange:[0,1],outputRange:[darkShades[i],lightShades[i]]})} })
		// theme.tints.forEach((v,i) => { anc['t'+i] = {backgroundColor:themeTransition.interpolate({inputRange:[0,1],outputRange:[lightShades[i],darkShades[i]]})} })
		// theme.anc = anc//StyleSheet.create(anc)
	}
	darkMode (yes=true) {
		// console.log('DARK >>',yes)
		if(!!yes === this.dark) return this
		this.dark = !!yes
		const sh = this.dark ? darkShades : lightShades
		const ti = this.dark ? lightShades : darkShades
		const co = this.dark ? this.x_darks : this.x_lights
		const bg = {}, tx = {}
		for(let c in this.colors) {
			this.colors[c] = co[c]
			bg[c] = {backgroundColor:this.colors[c]}; tx[c] = {color:this.colors[c]}
		}
		for(let i in this.shades) {
			this.shades[i] = sh[i]
			bg['s'+i] = {backgroundColor:this.shades[i]}; tx['s'+i] = {color:this.shades[i]};
		}
		for(let i in this.tints) {
			this.tints[i] = ti[i]
			bg['t'+i] = {backgroundColor:this.tints[i]}; tx['t'+i] = {color:this.tints[i]};
		}
		const bgc = StyleSheet.create(bg), txc = StyleSheet.create(tx)
		for(let c in this.colors) {
			this.style.background[c] = bgc[c]
			this.style.text[c] = txc[c]
		}
		for(let i in this.shades) {
			this.style.background.shades[i] = bgc['s'+i]
			this.style.text.shades[i] = txc['s'+i]
		}
		for(let i in this.tints) {
			this.style.background.tints[i] = bgc['t'+i]
			this.style.text.tints[i] = txc['t'+i]
		}
		Animated.timing(this.transition, {
			toValue: yes ? 0 : 1,
			duration: 1000,
		}).start(() => {})
		this.x_confCallback(this)
		return this
	}
	variable (name=0, color=theme.colors.background) {//}, duration=250) {
		this.variables[name] = color
	}
}


module.exports = Theme