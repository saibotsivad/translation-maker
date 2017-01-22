const renderer = require('mustache').render
const translate = require('translation-maker')(renderer)

const translation = require('./translation.en-US.json')

const output = translate(translation)
