const test = require('tape')
const validate = require('../validate-translation.js')

test('verify translation with no errors', t => {
	const definition = {
		quantity: {
			description: 'Text for button logging user in'
		}
	}
	const translation = {
		language: 'en-US',
		value: {
			quantity: 'Click to Sign In'
		}
	}
	const errors = validate(definition, translation)
	t.notOk(errors)
	t.end()
})

test('missing language identifier', t => {
	const definition = {
		quantity: {
			description: 'some text'
		}
	}
	const translation = {
		value: {
			quantity: 'word'
		}
	}
	const errors = validate(definition, translation)
	t.ok(errors.missingLanguage)
	t.end()
})

test('see which properties are not translated', t => {
	const definition = {
		quantity: {
			description: 'Text for button logging user in'
		},
		greeting: {
			description: 'Greet the user to the website'
		}
	}
	const translation = {
		language: 'en-US',
		value: {
			quantity: 'Click to Sign In'
			// missing translation for 'greeting'
		}
	}
	const errors = validate(definition, translation)
	t.equal(errors.missing[0], 'greeting')
	t.end()
})
