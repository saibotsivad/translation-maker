const test = require('tape')
const render = require('mustache').render
const generate = require('../generate.js')

test('simplest use case with no template rendering', t => {
	const translation = {
		lang: 'en-US',
		value: {
			key1: 'Hello world!'
		}
	}
	function passThrough(input) {
		return input
	}
	const result = generate(passThrough)(translation)
	t.equal(result.key1, 'Hello world!')
	t.end()
})

test('normal use', t => {
	const translation = {
		lang: 'en-US',
		value: {
			key1: 'Use the {{ref.key3}} thing.',
			key2: 'Hello {{param.0}}!'
		},
		reference: {
			key3: 'map'
		}
	}
	const data = {
		key2: [ 'World' ]
	}
	const result = generate(render)(translation, data)
	t.equal(result.key1, 'Use the map thing.')
	t.equal(result.key2, 'Hello World!')
	t.end()
})

test('missing reference', t => {
	const translation = {
		lang: 'en-US',
		value: {
			key1: 'Use the {{ref.key2}} thing.'
		}
	}
	const result = generate(render)(translation)
	t.equal(result.key1, 'Use the  thing.', 'mustache does not give warnings :-(')
	t.end()
})
