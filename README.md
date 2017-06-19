# Translation Maker Demo

This is an [npm module](https://www.npmjs.com/package/translation-maker)
that will make it super easy to develop your website for multiple languages.

Check out the code [on Github](https://github.com/saibotsivad/translation-maker).

## Why?

There are lots of language solutions, but all of them seemed complicated and
hard to use. This is a really simple solution, and without opinions about
how to render the text.

## Try it out!

There are three objects that you'll want:

* `definition`: The thing that other people will use to create translations.
* `translation`: One of these per language.
* `data`: An optional object passed in to the translate function, which
	may be used by the translated strings.

Have a look at the examples here, and try editing the definition,
translation, or data objects to see the difference.

(This demo is using [mustache](http://mustache.github.io/), but
this module allows you to specify a different renderer if desired.)

---

<div id="app"></div>

---

## License

Published and released under the [Very Open License](http://veryopenlicense.com/).
