const ready = require('document-ready')
const App = require('./component/App.html')
const mustache = require('mustache')
const translationMaker = require('translation-maker')

const render = translationMaker(mustache.render)

const definitions = {
	quantity: {
		description: 'Describes the quantity in human-readable terms.',
		parameters: [{
			type: 'number',
			description: 'Integer of the quantity.'
		},{
			type: 'string',
			description: 'Category name of shopping cart.'
		}]
	},
	greeting: {
		description: 'Greet the user to the website.',
		parameters: [{
			type: 'string',
			description: 'Name of the user.'
		}]
	},
	signIn: {
		description: 'The welcome text for the website.'
	}
}

const translation = {
	lang: 'en-US',
	value: {
		quantity: "You have {{param.0}} item{{param.0 === 0 || param.0 > 2 ? 's' : ''}} in your cart “{{param.1}}”.",
		greeting: "Welcome to the site, {{param.0}}!",
		signIn: "Sign In?"
	}
}

const reference = {
	lang: 'es-MX',
	value: {
		quantity: "Tiene {{param.0}} artículo{{param.0 === 0 || param.0 > 2 ? 's' : ''}} en su carrito de compras.",
		greeting: "Bienvenido al sitio, {{param.0}}!",
		signIn: "Registrarse?"
	}
}

const exampleParameters = {
	quantity: [ 5, 'Stuff I Want' ],
	greeting: [ 'Tim' ]
}

ready(() => {
	
	emitter.on('yolo', stuff => {
		console.log('YOLO!', stuff)
	})

	const app = new App({
		target: document.querySelector('#app'),
		data: {
			emitter,
			definitions,
			translation,
			reference,
			exampleParameters,
			renderedTranslation: render(translation, exampleParameters),
			renderedReference: render(reference, exampleParameters)
		}
	})
	// app.on('update')
})
