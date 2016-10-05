"use strict";

module.exports = function () {
	var definition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var translation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	var errorMap = {};

	if (!translation.language) {
		errorMap.missingLanguage = true;
	}

	var missingTranslations = Object.keys(definition).reduce(function (list, key) {
		if (!translation.value[key]) {
			list.push(key);
		}
		return list;
	}, []);
	if (missingTranslations.length) {
		errorMap.missing = missingTranslations;
	}

	var errors = Object.keys(errorMap).length > 0;
	return errors ? errorMap : false;
};
