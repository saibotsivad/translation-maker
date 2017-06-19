const ready = require('document-ready')
const renderer = require('mustache').render
const translationMaker = require('translation-maker')
const update = require('immutability-helper')

const App = require('./component/App.html')

const translate = translationMaker(renderer)



import { combineReducers, createStore } from 'redux'
let reducer = combineReducers({ visibilityFilter, todos })
let store = createStore(reducer)


const initialState = {
	definition: require('./example-definition.json'),
	translation: require('./example-translation-english.json'),
	baseTranslation: require('./example-translation-spanish.json'),
	parameters: {
		quantity: [ 42 ],
		greeting: [ 'John Smith' ]
	}
}

ready(() => {

	const app = new App({
		target: document.querySelector('#app'),
		data: generateData({
			translation: initialTranslation,
			definition: initialDefinition,
			baseTranslation: initialBaseTranslation,
			parameters: initialParameters
		})
	})

	// if any of the fields are changed, we will need to reset all the
	// other properties, which re-translates text if needed
	app.observe('fields', fields => {
		const updated = translateFields(fields)
		updated.baseTranslation = app.get('baseTranslation')
		updated.translation.lang = app.get('translation').lang

		app.set(generateData(updated))
	}, { init: false })

	// app.observe('translation', json => {
	// 	console.log('translation updated', json)
	// })
	// app.observe('definition', json => {
	// 	console.log('definition updated', json)
	// })
	// app.observe('baseTranslation', json => {
	// 	console.log('baseTranslation updated', json)
	// })
	// app.observe('parameters', json => {
	// 	console.log('parameters updated', json)
	// })
})

function reducers(state = {}, action) {
	switch (action.type) {
		case 'UPDATE_LANGUAGE':
			return update(state, {
				translation: {
					lang: { $set: action.text }
				}
			})
			// or possibly
			return Object.assign({}, state, { translation: { lang: action.text } })
			// or possibly
			return { ...state, translation: { lang: action.text } }
		case 'UPDATE_KEY':
			// TODO make immutable?
			// alternate idea: turn to array, use transform to make into JSON
			// on the raw view, then for each element use a UUID for the actual
			// associative key, so that updating the key is just updating another
			// property (the UUID then can't be updated)
			state.definition = state.definition || {}
			state.definition[action.new] = state.definition[action.old]
			delete state.definition[action.old]
			state.translation = state.translation || {}
			state.translation[action.new] = state.translation[action.old]
			delete state.translation[action.old]
			state.parameters = state.parameters || {}
			state.parameters[action.new] = state.parameters[action.old]
			delete state.parameters[action.old]
			return state
		case 'UPDATE_DESCRIPTION':
			state.definition = state.definition || {}
			state.definition[action.key] = state.definition[action.key] || {}
			state.definition[action.key].description = action.text
			return state
		case 'UPDATE_TRANSLATION':
			state.definition = state.definition || {}
			state.definition[action.key] = state.definition[action.key] || {}
			state.definition[action.key].translation = action.text
			state.output[action.key] = translate(state.translation, state.parameters)[action.key]
			return state
		case 'UPDATE_PARAMETER_TYPE':
			state.definition = state.definition || {}
			state.definition[action.key] = state.definition[action.key] || {}
			state.definition[action.key].parameters = state.definition[action.key].parameters || []
			state.definition[action.key].parameters[action.index] = state.definition[action.key].parameters[action.index] || {}
			state.definition[action.key].parameters[action.index].type = action.text
			return state
		case 'UPDATE_PARAMETER_DESCRIPTION':
			state.definition = state.definition || {}
			state.definition[action.key] = state.definition[action.key] || {}
			state.definition[action.key].parameters = state.definition[action.key].parameters || []
			state.definition[action.key].parameters[action.index] = state.definition[action.key].parameters[action.index] || {}
			state.definition[action.key].parameters[action.index].description = action.text
			return state
		case 'UPDATE_PARAMETER_EXAMPLE':
			state.parameters = state.parameters || {}
			state.parameters[action.key] = state.parameters[action.key] || []
			state.parameters[action.key][action.index] = action.text
			return state
		case 'ADD_PROPERTY':
			state.definition = state.definition || {}
			state.definition[action.key] = { description: action.description }
			state.definition[action.key].parameters = action.parameters
			return state
		case 'ADD_PARAMETER':
			state.definition = state.definition || {}
			state.definition[action.key] = state.definition[action.key] || {}
			state.definition[action.key].parameters = state.definition[action.key].parameters || []
			state.definition[action.key].parameters.push(action.parameter)
			return state
		case 'UPDATE_JSON_TRANSLATION':
			state.translation = action.translation
			return state
		case 'UPDATE_JSON_DEFINITION':
			state.definition = action.definition
			return state
		case 'UPDATE_JSON_BASE_TRANSLATION':
			state.baseTranslation = action.baseTranslation
			return state
		case 'UPDATE_JSON_PARAMETERS':
			state.parameters = action.parameters
			return state
		default:
			return state
	}
}

function generateData({ translation, definition, baseTranslation, parameters }) {
	return {
		// for this demo, we want the different fields to be associated
		// with each other based on key name, so that two-way binding
		// will correctly fire
		fields: generateFields({ translation, definition, baseTranslation, parameters }),
		// but we will keep the originals on the template scope so that
		// they are accessible in the raw JSON view
		definition,
		baseTranslation,
		translation,
		parameters
	}
}

function generateFields({ translation, definition, baseTranslation, parameters }) {
	const output = translate(translation, parameters)
	return Object.keys(definition).map(key => {
		return {
			key,
			definition: generateDefinitionWithParameters({ key, definition, parameters }),
			baseTranslation: baseTranslation.value[key],
			translation: translation.value[key],
			parameters: parameters[key],
			output: output[key]
		}
	})
}

function generateDefinitionWithParameters({ key, definition, parameters }) {
	const definitionWithParams = definition[key]
	if (definitionWithParams.parameters) {
		definitionWithParams.parameters = definitionWithParams.parameters.map((definitionParameter, index) => {
			definitionParameter.example = parameters[key] && parameters[key][index] || ''
			return definitionParameter
		})
	}
	return definitionWithParams
}

function translateFields(fields) {
	// const { translation, definition, parameters } =
	// console.log(fields)
	return fields.reduce((map, field) => {
		console.log(field)
		// what if the key changes?!?!?!?
		map.translation.value[field.key] = field.translation
		map.definition[field.key] = field.definition
		if (field.parameters) {
			map.parameters[field.key] = map.parameters[field.key] || []
			map.parameters[field.key].push(field.parameters)
		}
		return map
	}, {
		translation: { value: {} },
		definition: {},
		parameters: {}
	})
}
