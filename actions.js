export const UPDATE_LANGUAGE = 'UPDATE_LANGUAGE'
export const UPDATE_KEY = 'UPDATE_KEY'
export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION'
export const UPDATE_TRANSLATION = 'UPDATE_TRANSLATION'
export const UPDATE_PARAMETER_TYPE = 'UPDATE_PARAMETER_TYPE'
export const UPDATE_PARAMETER_DESCRIPTION = 'UPDATE_PARAMETER_DESCRIPTION'
export const UPDATE_PARAMETER_EXAMPLE = 'UPDATE_PARAMETER_EXAMPLE'
export const ADD_PROPERTY = 'ADD_PROPERTY'
export const ADD_PARAMETER = 'ADD_PARAMETER'
export const UPDATE_JSON_TRANSLATION = 'UPDATE_JSON_TRANSLATION'
export const UPDATE_JSON_DEFINITION = 'UPDATE_JSON_DEFINITION'
export const UPDATE_JSON_BASE_TRANSLATION = 'UPDATE_JSON_BASE_TRANSLATION'
export const UPDATE_JSON_PARAMETERS = 'UPDATE_JSON_PARAMETERS'

export function updateLanguage(text) {
	return { type: UPDATE_LANGUAGE, text }
}

export function updateKey(new, old) {
	return { type: UPDATE_KEY, new, old }
}

export function updateDescription(text) {
	return { type: UPDATE_DESCRIPTION, text }
}

export function updateTranslation(text) {
	return { type: UPDATE_TRANSLATION, text }
}

export function updateParameterType(key, index, text) {
	return { type: UPDATE_PARAMETER_TYPE, key, index, text }
}

export function updateParameterDescription(key, index, text) {
	return { type: UPDATE_PARAMETER_DESCRIPTION, key, index, text }
}

export function updateParameterExample(key, index, text) {
	return { type: UPDATE_PARAMETER_EXAMPLE, key, index, text }
}

export function addProperty(key, description, parameters) {
	return { type: ADD_PROPERTY, key, description, parameters }
}

export function addParameter(key, parameter) {
	return { type: ADD_PARAMETER, parameter }
}

export function updateJsonTranslation(json) {
	return { type: UPDATE_JSON_TRANSLATION, json }
}

export function updateJsonDefinition(json) {
	return { type: UPDATE_JSON_DEFINITION, json }
}

export function updateJsonBaseTranslation(json) {
	return { type: UPDATE_JSON_BASE_TRANSLATION, json }
}

export function updateJsonParameters(json) {
	return { type: UPDATE_JSON_PARAMETERS, json }
}

export function reducers(state = {}, action) {
	switch (action.type) {
		case UPDATE_LANGUAGE:
			return update(state, {
				translation: {
					lang: { $set: action.text }
				}
			})
			// or possibly
			return Object.assign({}, state, { translation: { lang: action.text } })
			// or possibly
			return { ...state, translation: { lang: action.text } }
		case UPDATE_KEY:
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
		case UPDATE_DESCRIPTION:
			state.definition = state.definition || {}
			state.definition[action.key] = state.definition[action.key] || {}
			state.definition[action.key].description = action.text
			return state
		case UPDATE_TRANSLATION:
			state.definition = state.definition || {}
			state.definition[action.key] = state.definition[action.key] || {}
			state.definition[action.key].translation = action.text
			state.output[action.key] = translate(state.translation, state.parameters)[action.key]
			return state
		case UPDATE_PARAMETER_TYPE:
			state.definition = state.definition || {}
			state.definition[action.key] = state.definition[action.key] || {}
			state.definition[action.key].parameters = state.definition[action.key].parameters || []
			state.definition[action.key].parameters[action.index] = state.definition[action.key].parameters[action.index] || {}
			state.definition[action.key].parameters[action.index].type = action.text
			return state
		case UPDATE_PARAMETER_DESCRIPTION:
			state.definition = state.definition || {}
			state.definition[action.key] = state.definition[action.key] || {}
			state.definition[action.key].parameters = state.definition[action.key].parameters || []
			state.definition[action.key].parameters[action.index] = state.definition[action.key].parameters[action.index] || {}
			state.definition[action.key].parameters[action.index].description = action.text
			return state
		case UPDATE_PARAMETER_EXAMPLE:
			state.parameters = state.parameters || {}
			state.parameters[action.key] = state.parameters[action.key] || []
			state.parameters[action.key][action.index] = action.text
			return state
		case ADD_PROPERTY:
			state.definition = state.definition || {}
			state.definition[action.key] = { description: action.description }
			state.definition[action.key].parameters = action.parameters
			return state
		case ADD_PARAMETER:
			state.definition = state.definition || {}
			state.definition[action.key] = state.definition[action.key] || {}
			state.definition[action.key].parameters = state.definition[action.key].parameters || []
			state.definition[action.key].parameters.push(action.parameter)
			return state
		case UPDATE_JSON_TRANSLATION:
			state.translation = action.translation
			return state
		case UPDATE_JSON_DEFINITION:
			state.definition = action.definition
			return state
		case UPDATE_JSON_BASE_TRANSLATION:
			state.baseTranslation = action.baseTranslation
			return state
		case UPDATE_JSON_PARAMETERS:
			state.parameters = action.parameters
			return state
		default:
			return state
	}
}
