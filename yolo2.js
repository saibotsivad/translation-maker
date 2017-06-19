const EventEmitter = require('eventemitter3')

const emitter = new EventEmitter()

let counter = 0

emitter.on('yolo2', stuff => {
	counter++
	console.log('yolo2', counter)
	console.log(stuff)
})

module.exports = emitter
