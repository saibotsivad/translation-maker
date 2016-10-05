module.exports = render => (translation = {}, parameters = {}) => {
	translation.value = translation.value || {}
	translation.references = translation.references || {}

	return Object.keys(translation.value).reduce((output, key) => {
		const view = {
			param: parameters[key] || [],
			ref: translation.reference
		}
		output[key] = render(translation.value[key], view)
		return output
	}, {})
}
