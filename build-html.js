const fs = require('fs')
const marked = require('marked')

const fsOptions = { encoding: 'utf8' }

const markdown = fs.readFileSync('./README.md', fsOptions)
const template = fs.readFileSync('./template-index.html', fsOptions)

const bodyHtml = marked(markdown)

fs.writeFileSync('./index.html', template.replace('<!-- $BODY$ -->', bodyHtml), fsOptions)
