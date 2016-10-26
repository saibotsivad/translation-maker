# translation-maker

Using a JSON definition file, easily create new translations.

The definition file describes all properties which need to
have a translation created for them. When you make a website,
you would have one definition file which other people could
use to make a new translation in their language, and then you
would have one JSON file per translation.

## Using

Install it like normal:

```bash
npm install translation-maker
```

Using it would be something like this:

```js
const renderer = require('mustache').render
const translate = require('translation-maker')(renderer)

const translation = require('./translation.en-US.json')

const output = translate(translation)
// output.someKey => 'a translated string'
```

## Overview

There are three objects that you'll want: data, translation, and
a definition.

* `definition`: The thing that other people will use to create translations.
* `translation`: One of these per language.
* `data`: An *optional* object passed in to the translate function, which
	may be used by the translated strings.

An example definition might look like this:

```json
{
	"quantity": {
		"description": "Describes the quantity in human-readable terms",
		"parameters": [{
			"type": "number",
			"description": "Integer of the quantity"
		}]
	},
	"greeting": {
		"description": "Greet the user to the website",
		"parameters": [{
			"type": "string",
			"description": "Name of the user"
		}]
	}
}
```

An example translation for this definition might look like:

```json
{
	"lang": "en-US",
	"value": {
		"quantity": "You have {{param.0}} item{{param.0 === 0 || param.0 > 2 ? 's' : ''}} in your cart",
		"greeting": "Welcome to the site, {{param.0}}!"
	}
}
```

An example data object for those might be:

```json
{
	"quantity": [ 42 ],
	"greeting": "John Smith"
}
```

And for this example, the output translation would look like:

```json
{
	"quantity": "You have 42 items in your cart",
	"greeting": "Welcome to the site, John Smith"
}
```

## Renderer

You'll notice that the key values of the translation example above
have template-like symbols, e.g. `{{param.0}}`.

When you create an instance of `translation-maker` you need to pass
it a rendering function which takes as inputs the translation string
and the parameters object, and returns the rendered string.

The template rendering mechanism is not specified in this tool, so
you can use whichever approach works best for your system, even
skipping template rendering entirely if you want:

```js
function renderer(view, parameters) {
	return view
}
```

### API of Renderer Function

The renderer function has an API like:

```txt
function(view typeof string, data typeof object) => result typeof string
```

##### `view` (*string*)

The translation text. This text may need to be rendered.

#### `data` (*object*)

An object with the possible properties:

* `param` (*object*, optional): If the translator is called with
	properties as part of the renderable template, this
	object will contain those properties.
* `ref` (*object*, optional): If the translation object contains
	a `reference` object, it will be passed in here exactly as-is.

#### `result` (*string*)

The rendered translation string.

## How it Works

You need to create a definition file, so that users can know
what properties need to be translated. This definition file
is an object map, where the key is the reference name, and
the value is the property definition.

For each language, you need a translation file. This file
is another object which has these *required* properties:

* `lang` (string): The language identifier, e.g. `en-US` or `zh-Hans`.
* `value` (object): Map of definition key to translation string.

Additionally, the property `reference` is a key to translation string
which can be referenced in the `value` map translations.

The translation string may use [mustache](http://mustache.github.io/)
templates. For each string, the parameters are available as the
array property `param`, and the references are available as the
map property `ref`.

An example translation with a reference might look like:

```json
{
	"lang": "en-US",
	"value": {
		"key1": "Use the {{ref.key2}} thing."
	},
	"reference": {
		"key2": "map"
	}
}
```

For the translation property `key1`, the output would be
`Use the map thing.`

## License

Published and released under the [Very Open License](http://veryopenlicense.com/).
