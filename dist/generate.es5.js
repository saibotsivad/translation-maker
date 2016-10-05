"use strict";

module.exports = function (render) {
	return function () {
		var translation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		translation.value = translation.value || {};
		translation.references = translation.references || {};

		return Object.keys(translation.value).reduce(function (output, key) {
			var view = {
				param: parameters[key] || [],
				ref: translation.reference
			};
			output[key] = render(translation.value[key], view);
			return output;
		}, {});
	};
};
