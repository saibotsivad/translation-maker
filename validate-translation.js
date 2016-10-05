module.exports = (definition = {}, translation = {}) => {
	const errorMap = {}

	if (!translation.language) {
		errorMap.missingLanguage = true
	}

	const missingTranslations = Object.keys(definition).reduce((list, key) => {
		if (!translation.value[key]) {
			list.push(key)
		}
		return list
	}, [])
	if (missingTranslations.length) {
		errorMap.missing = missingTranslations
	}

	const errors = Object.keys(errorMap).length > 0
	return errors ? errorMap : false
}
