(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const ready = require('document-ready')
const App = require('./component/App.html')
const mustache = require('mustache')
const translationMaker = require('translation-maker')
const EventEmitter = require('eventemitter3')

const render = translationMaker(mustache.render)

const definitions = {
	quantity: {
		description: 'Describes the quantity in human-readable terms.',
		parameters: [{
			type: 'number',
			description: 'Integer of the quantity.'
		},{
			type: 'string',
			description: 'Category name of shopping cart.'
		}]
	},
	greeting: {
		description: 'Greet the user to the website.',
		parameters: [{
			type: 'string',
			description: 'Name of the user.'
		}]
	},
	signIn: {
		description: 'The welcome text for the website.'
	}
}

const translation = {
	lang: 'en-US',
	value: {
		quantity: "You have {{param.0}} item{{param.0 === 0 || param.0 > 2 ? 's' : ''}} in your cart “{{param.1}}”.",
		greeting: "Welcome to the site, {{param.0}}!",
		signIn: "Sign In?"
	}
}

const reference = {
	lang: 'es-MX',
	value: {
		quantity: "Tiene {{param.0}} artículo{{param.0 === 0 || param.0 > 2 ? 's' : ''}} en su carrito de compras.",
		greeting: "Bienvenido al sitio, {{param.0}}!",
		signIn: "Registrarse?"
	}
}

const exampleParameters = {
	quantity: [ 5, 'Stuff I Want' ],
	greeting: [ 'Tim' ]
}

ready(() => {
	const emitter = new EventEmitter()
	emitter.on('yolo', stuff => {
		console.log('YOLO!', stuff)
	})

	const app = new App({
		target: document.querySelector('#app'),
		data: {
			emitter,
			definitions,
			translation,
			reference,
			exampleParameters,
			renderedTranslation: render(translation, exampleParameters),
			renderedReference: render(reference, exampleParameters)
		}
	})
	// app.on('update')
})

},{"./component/App.html":2,"document-ready":9,"eventemitter3":10,"mustache":12,"translation-maker":13}],2:[function(require,module,exports){
'use strict';

var TabDefinitions = require( './tab-definitions.html' );

var TabTranslations = require( './tab-translations.html' );

TabDefinitions = ( TabDefinitions && TabDefinitions.__esModule ) ? TabDefinitions['default'] : TabDefinitions;
TabTranslations = ( TabTranslations && TabTranslations.__esModule ) ? TabTranslations['default'] : TabTranslations;

var template = (function () {
	return {
		components: {
			TabDefinitions,
			TabTranslations
		},
		methods: {
			updateDefinitions: function(definitions) {
				console.log('wheeeee!!!', definitions)
				this.set({ definitions })
			},
			updateTranslation: function({ translation, reference }) {
				console.log('updateTranslation translation', translation)
				console.log('updateTranslation reference', reference)
				if (translation) {
					this.set({ translation })
				}
				if (reference) {
					this.set({ reference })
				}
			}
		}
	}
}());

function renderMainFragment ( root, component ) {
	var h1 = createElement( 'h1' );
	
	appendNode( createText( "Create a Translation" ), h1 );
	var text1 = createText( "\n\n" );
	
	var h2 = createElement( 'h2' );
	
	appendNode( createText( "1: Create a Definition" ), h2 );
	var text3 = createText( "\n\n" );
	
	var tabDefinitions_initialData = {
		emitter: root.emitter,
		definitions: root.definitions
	};
	var tabDefinitions = new template.components.TabDefinitions({
		target: null,
		_root: component._root || component,
		data: tabDefinitions_initialData
	});
	
	tabDefinitions.on( 'update', function ( event ) {
		component.updateDefinitions(event);
	});
	
	var text4 = createText( "\n\n" );
	
	var h21 = createElement( 'h2' );
	
	appendNode( createText( "2: Create a Translation" ), h21 );
	var text6 = createText( "\n\n" );
	
	var tabTranslations_initialData = {
		definitions: root.definitions,
		translation: root.translation,
		reference: root.reference,
		exampleParameters: root.exampleParameters,
		renderedTranslation: root.renderedTranslation,
		renderedReference: root.renderedReference
	};
	var tabTranslations = new template.components.TabTranslations({
		target: null,
		_root: component._root || component,
		data: tabTranslations_initialData
	});
	
	tabTranslations.on( 'update', function ( event ) {
		component.updateTranslation(event);
	});

	return {
		mount: function ( target, anchor ) {
			insertNode( h1, target, anchor );
			insertNode( text1, target, anchor );
			insertNode( h2, target, anchor );
			insertNode( text3, target, anchor );
			tabDefinitions._fragment.mount( target, anchor );
			insertNode( text4, target, anchor );
			insertNode( h21, target, anchor );
			insertNode( text6, target, anchor );
			tabTranslations._fragment.mount( target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			var tabDefinitions_changes = {};
			
			if ( 'emitter' in changed ) tabDefinitions_changes.emitter = root.emitter;
			if ( 'definitions' in changed ) tabDefinitions_changes.definitions = root.definitions;
			
			if ( Object.keys( tabDefinitions_changes ).length ) tabDefinitions.set( tabDefinitions_changes );
			
			var tabTranslations_changes = {};
			
			if ( 'definitions' in changed ) tabTranslations_changes.definitions = root.definitions;
			if ( 'translation' in changed ) tabTranslations_changes.translation = root.translation;
			if ( 'reference' in changed ) tabTranslations_changes.reference = root.reference;
			if ( 'exampleParameters' in changed ) tabTranslations_changes.exampleParameters = root.exampleParameters;
			if ( 'renderedTranslation' in changed ) tabTranslations_changes.renderedTranslation = root.renderedTranslation;
			if ( 'renderedReference' in changed ) tabTranslations_changes.renderedReference = root.renderedReference;
			
			if ( Object.keys( tabTranslations_changes ).length ) tabTranslations.set( tabTranslations_changes );
		},
		
		teardown: function ( detach ) {
			tabDefinitions.destroy( detach );
			tabTranslations.destroy( detach );
			
			if ( detach ) {
				detachNode( h1 );
				detachNode( text1 );
				detachNode( h2 );
				detachNode( text3 );
				detachNode( text4 );
				detachNode( h21 );
				detachNode( text6 );
			}
		}
	};
}

function App ( options ) {
	options = options || {};
	this._state = options.data || {};
	
	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};
	
	this._handlers = Object.create( null );
	
	this._root = options._root;
	this._yield = options._yield;
	
	this._torndown = false;
	this._renderHooks = [];
	
	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
	
	this._flush();
}

App.prototype = template.methods;

App.prototype.get = function get( key ) {
 	return key ? this._state[ key ] : this._state;
 };

App.prototype.fire = function fire( eventName, data ) {
 	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
 	if ( !handlers ) return;
 
 	for ( var i = 0; i < handlers.length; i += 1 ) {
 		handlers[i].call( this, data );
 	}
 };

App.prototype.observe = function observe( key, callback, options ) {
 	var group = ( options && options.defer ) ? this._observers.pre : this._observers.post;
 
 	( group[ key ] || ( group[ key ] = [] ) ).push( callback );
 
 	if ( !options || options.init !== false ) {
 		callback.__calling = true;
 		callback.call( this, this._state[ key ] );
 		callback.__calling = false;
 	}
 
 	return {
 		cancel: function () {
 			var index = group[ key ].indexOf( callback );
 			if ( ~index ) group[ key ].splice( index, 1 );
 		}
 	};
 };

App.prototype.on = function on( eventName, handler ) {
 	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
 	handlers.push( handler );
 
 	return {
 		cancel: function () {
 			var index = handlers.indexOf( handler );
 			if ( ~index ) handlers.splice( index, 1 );
 		}
 	};
 };

App.prototype.set = function set( newState ) {
 	this._set( newState );
 	( this._root || this )._flush();
 };

App.prototype._flush = function _flush() {
 	if ( !this._renderHooks ) return;
 
 	while ( this._renderHooks.length ) {
 		var hook = this._renderHooks.pop();
 		hook.fn.call( hook.context );
 	}
 };

App.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
	
	this._flush();
};

App.prototype.teardown = App.prototype.destroy = function destroy ( detach ) {
	this.fire( 'teardown' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

function createElement( name ) {
	return document.createElement( name );
}

function detachNode( node ) {
	node.parentNode.removeChild( node );
}

function insertNode( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function createText( data ) {
	return document.createTextNode( data );
}

function appendNode( node, target ) {
	target.appendChild( node );
}

function dispatchObservers( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

		var callbacks = group[ key ];
		if ( !callbacks ) continue;

		for ( var i = 0; i < callbacks.length; i += 1 ) {
			var callback = callbacks[i];
			if ( callback.__calling ) continue;

			callback.__calling = true;
			callback.call( component, newValue, oldValue );
			callback.__calling = false;
		}
	}
}

module.exports = App;

},{"./tab-definitions.html":5,"./tab-translations.html":6}],3:[function(require,module,exports){
'use strict';

var yolo2 = require( '../yolo2' );

yolo2 = ( yolo2 && yolo2.__esModule ) ? yolo2['default'] : yolo2;

var template = (function () {
	return {
		methods: {
			updateDefinitionKey: function(oldKey, event) {
				this.fire('updateKey', { oldKey, newKey: event.target.value })
				yolo2.emit('yolo2', 'whassuuuuuuuppppp')
			},
			updateDefinitionDescription: function(description, event) {
				const definition = this.get('definition')
				definition.description = event.target.value
				this.fire('updateDefinition', { key: this.get('key'), definition })
			},
			updateParameterType: function(index, event) {
				const definition = this.get('definition')
				const value = event.target.value
				if (index < 0) {
					definition.parameters.push({ type: '', description: '' })
					index = definition.parameters.length - 1
					event.target.value = ''
					setTimeout(() => {
						this.refs.newParameterType.focus()
					}, 20)
				}
				definition.parameters[index].type = value
				this.fire('updateDefinition', { key: this.get('key'), definition })
			},
			updateParameterDescription: function(index, event) {
				const definition = this.get('definition')
				const value = event.target.value
				if (index < 0) {
					definition.parameters.push({ type: '', description: '' })
					index = definition.parameters.length - 1
					event.target.value = ''
				}
				definition.parameters[index].description = value
				this.fire('updateDefinition', { key: this.get('key'), definition })
			}
		}
	}
}());

let addedCss = false;
function addCss () {
	var style = createElement( 'style' );
	style.textContent = "\n\t[svelte-659815288].definition-key-description, [svelte-659815288] .definition-key-description {\n\t\tmargin-bottom: 15px;\n\t}\n\t[svelte-659815288].definition-parameters, [svelte-659815288] .definition-parameters {\n\t\tmargin-bottom: 20px;\n\t}\n";
	appendNode( style, document.head );

	addedCss = true;
}

function renderMainFragment ( root, component ) {
	var div = createElement( 'div' );
	setAttribute( div, 'svelte-659815288', '' );
	div.className = "row definition-key-description";
	
	var div1 = createElement( 'div' );
	setAttribute( div1, 'svelte-659815288', '' );
	div1.className = "form-group";
	
	appendNode( div1, div );
	
	var div2 = createElement( 'div' );
	setAttribute( div2, 'svelte-659815288', '' );
	div2.className = "col-xs-3";
	
	appendNode( div2, div1 );
	
	var label = createElement( 'label' );
	setAttribute( label, 'svelte-659815288', '' );
	label.htmlFor = "definition-" + ( root.key ) + "-key";
	
	appendNode( label, div2 );
	appendNode( createText( "Definition Key" ), label );
	appendNode( createText( "\n\t\t\t" ), div2 );
	
	var input = createElement( 'input' );
	setAttribute( input, 'svelte-659815288', '' );
	input.type = "text";
	input.className = "form-control";
	input.id = "definition-" + ( root.key ) + "-key";
	var last_input_value = root.key;
	input.value = last_input_value;
	
	function changeHandler ( event ) {
		var root = this.__svelte.root;
		
		component.updateDefinitionKey(root.key, event);
	}
	
	addEventListener( input, 'change', changeHandler );
	
	input.__svelte = {
		root: root
	};
	
	appendNode( input, div2 );
	appendNode( createText( "\n\t\t" ), div1 );
	
	var div3 = createElement( 'div' );
	setAttribute( div3, 'svelte-659815288', '' );
	div3.className = "col-xs-9";
	
	appendNode( div3, div1 );
	
	var label1 = createElement( 'label' );
	setAttribute( label1, 'svelte-659815288', '' );
	label1.htmlFor = "definition-" + ( root.key ) + "-description";
	
	appendNode( label1, div3 );
	appendNode( createText( "Definition Description" ), label1 );
	appendNode( createText( "\n\t\t\t" ), div3 );
	
	var input1 = createElement( 'input' );
	setAttribute( input1, 'svelte-659815288', '' );
	input1.type = "text";
	input1.className = "form-control";
	input1.id = "definition-" + ( root.key ) + "-description";
	var last_input1_value = root.definition.description;
	input1.value = last_input1_value;
	
	function changeHandler1 ( event ) {
		var root = this.__svelte.root;
		
		component.updateDefinitionDescription(root.description, event);
	}
	
	addEventListener( input1, 'change', changeHandler1 );
	
	input1.__svelte = {
		root: root
	};
	
	appendNode( input1, div3 );
	var text5 = createText( "\n\n" );
	
	var div4 = createElement( 'div' );
	setAttribute( div4, 'svelte-659815288', '' );
	div4.className = "row definition-parameters";
	
	var div5 = createElement( 'div' );
	setAttribute( div5, 'svelte-659815288', '' );
	div5.className = "col-xs-offset-1 col-xs-11";
	
	appendNode( div5, div4 );
	var ifBlock_anchor = createComment();
	appendNode( ifBlock_anchor, div5 );
	
	function getBlock ( root ) {
		if ( root.definition.parameters && root.definition.parameters.length ) return renderIfBlock_0;
		return null;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );
	
	if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
	appendNode( createText( "\n\t\t" ), div5 );
	
	var div6 = createElement( 'div' );
	setAttribute( div6, 'svelte-659815288', '' );
	div6.className = "row";
	
	appendNode( div6, div5 );
	
	var div7 = createElement( 'div' );
	setAttribute( div7, 'svelte-659815288', '' );
	div7.className = "form-group";
	
	appendNode( div7, div6 );
	
	var div8 = createElement( 'div' );
	setAttribute( div8, 'svelte-659815288', '' );
	div8.className = "col-xs-3";
	
	appendNode( div8, div7 );
	
	var label2 = createElement( 'label' );
	setAttribute( label2, 'svelte-659815288', '' );
	label2.htmlFor = "definition-" + ( root.key ) + "-parameter-new-type";
	
	appendNode( label2, div8 );
	appendNode( createText( "Parameter Type" ), label2 );
	appendNode( createText( "\n\t\t\t\t\t" ), div8 );
	
	var input2 = createElement( 'input' );
	setAttribute( input2, 'svelte-659815288', '' );
	input2.type = "text";
	input2.className = "form-control";
	component.refs.newParameterType = input2;
	input2.id = "definition-" + ( root.key ) + "-parameter-new-type";
	
	function changeHandler2 ( event ) {
		component.updateParameterType(-1, event);
	}
	
	addEventListener( input2, 'change', changeHandler2 );
	
	appendNode( input2, div8 );
	appendNode( createText( "\n\t\t\t\t" ), div7 );
	
	var div9 = createElement( 'div' );
	setAttribute( div9, 'svelte-659815288', '' );
	div9.className = "col-xs-9";
	
	appendNode( div9, div7 );
	
	var label3 = createElement( 'label' );
	setAttribute( label3, 'svelte-659815288', '' );
	label3.htmlFor = "definition-" + ( root.key ) + "-parameter-new-description";
	
	appendNode( label3, div9 );
	appendNode( createText( "Parameter Description" ), label3 );
	appendNode( createText( "\n\t\t\t\t\t" ), div9 );
	
	var input3 = createElement( 'input' );
	setAttribute( input3, 'svelte-659815288', '' );
	input3.type = "text";
	input3.className = "form-control";
	input3.id = "definition-" + ( root.key ) + "-parameter-new-description";
	
	function changeHandler3 ( event ) {
		component.updateParameterDescription(-1, event);
	}
	
	addEventListener( input3, 'change', changeHandler3 );
	
	appendNode( input3, div9 );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
			insertNode( text5, target, anchor );
			insertNode( div4, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			label.htmlFor = "definition-" + ( root.key ) + "-key";
			
			input.id = "definition-" + ( root.key ) + "-key";
			
			if ( ( __tmp = root.key ) !== last_input_value ) {
				last_input_value = __tmp;
				input.value = last_input_value;
			}
			
			input.__svelte.root = root;
			
			label1.htmlFor = "definition-" + ( root.key ) + "-description";
			
			input1.id = "definition-" + ( root.key ) + "-description";
			
			if ( ( __tmp = root.definition.description ) !== last_input1_value ) {
				last_input1_value = __tmp;
				input1.value = last_input1_value;
			}
			
			input1.__svelte.root = root;
			
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) ifBlock.teardown( true );
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
			}
			
			label2.htmlFor = "definition-" + ( root.key ) + "-parameter-new-type";
			
			input2.id = "definition-" + ( root.key ) + "-parameter-new-type";
			
			label3.htmlFor = "definition-" + ( root.key ) + "-parameter-new-description";
			
			input3.id = "definition-" + ( root.key ) + "-parameter-new-description";
		},
		
		teardown: function ( detach ) {
			removeEventListener( input, 'change', changeHandler );
			removeEventListener( input1, 'change', changeHandler1 );
			if ( ifBlock ) ifBlock.teardown( false );
			if ( component.refs.newParameterType === input2 ) component.refs.newParameterType = null;
			removeEventListener( input2, 'change', changeHandler2 );
			removeEventListener( input3, 'change', changeHandler3 );
			
			if ( detach ) {
				detachNode( div );
				detachNode( text5 );
				detachNode( div4 );
			}
		}
	};
}

function renderIfBlock_0 ( root, component ) {
	var eachBlock_anchor = createComment();
	var eachBlock_value = root.definition.parameters;
	var eachBlock_iterations = [];
	
	for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
		eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
	}

	return {
		mount: function ( target, anchor ) {
			insertNode( eachBlock_anchor, target, anchor );
			
			for ( var i = 0; i < eachBlock_iterations.length; i += 1 ) {
				eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
			}
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			var eachBlock_value = root.definition.parameters;
			
			for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
				if ( !eachBlock_iterations[i] ) {
					eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
					eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
				} else {
					eachBlock_iterations[i].update( changed, root, eachBlock_value, eachBlock_value[i], i );
				}
			}
			
			teardownEach( eachBlock_iterations, true, eachBlock_value.length );
			
			eachBlock_iterations.length = eachBlock_value.length;
		},
		
		teardown: function ( detach ) {
			teardownEach( eachBlock_iterations, detach );
			
			if ( detach ) {
				detachNode( eachBlock_anchor );
			}
		}
	};
}

function renderEachBlock ( root, eachBlock_value, parameter, index, component ) {
	var div = createElement( 'div' );
	setAttribute( div, 'svelte-659815288', '' );
	div.className = "row";
	
	var div1 = createElement( 'div' );
	setAttribute( div1, 'svelte-659815288', '' );
	div1.className = "form-group";
	
	appendNode( div1, div );
	
	var div2 = createElement( 'div' );
	setAttribute( div2, 'svelte-659815288', '' );
	div2.className = "col-xs-3";
	
	appendNode( div2, div1 );
	
	var label = createElement( 'label' );
	setAttribute( label, 'svelte-659815288', '' );
	label.htmlFor = "definition-" + ( root.key ) + "-parameter-" + ( index ) + "-type";
	
	appendNode( label, div2 );
	appendNode( createText( "Parameter Type" ), label );
	appendNode( createText( "\n\t\t\t\t\t" ), div2 );
	
	var input = createElement( 'input' );
	setAttribute( input, 'svelte-659815288', '' );
	input.type = "text";
	input.className = "form-control";
	input.id = "definition-" + ( root.key ) + "-parameter-" + ( index ) + "-type";
	var last_input_value = parameter.type;
	input.value = last_input_value;
	
	function changeHandler ( event ) {
		var eachBlock_value = this.__svelte.eachBlock_value, index = this.__svelte.index, parameter = eachBlock_value[index]
		
		component.updateParameterType(index, event);
	}
	
	addEventListener( input, 'change', changeHandler );
	
	input.__svelte = {
		eachBlock_value: eachBlock_value,
		index: index
	};
	
	appendNode( input, div2 );
	appendNode( createText( "\n\t\t\t\t" ), div1 );
	
	var div3 = createElement( 'div' );
	setAttribute( div3, 'svelte-659815288', '' );
	div3.className = "col-xs-9";
	
	appendNode( div3, div1 );
	
	var label1 = createElement( 'label' );
	setAttribute( label1, 'svelte-659815288', '' );
	label1.htmlFor = "definition-" + ( root.key ) + "-parameter-" + ( index ) + "-description";
	
	appendNode( label1, div3 );
	appendNode( createText( "Parameter Description" ), label1 );
	appendNode( createText( "\n\t\t\t\t\t" ), div3 );
	
	var input1 = createElement( 'input' );
	setAttribute( input1, 'svelte-659815288', '' );
	input1.type = "text";
	input1.className = "form-control";
	input1.id = "definition-" + ( root.key ) + "-parameter-" + ( index ) + "-description";
	var last_input1_value = parameter.description;
	input1.value = last_input1_value;
	
	function changeHandler1 ( event ) {
		var eachBlock_value = this.__svelte.eachBlock_value, index = this.__svelte.index, parameter = eachBlock_value[index]
		
		component.updateParameterDescription(index, event);
	}
	
	addEventListener( input1, 'change', changeHandler1 );
	
	input1.__svelte = {
		eachBlock_value: eachBlock_value,
		index: index
	};
	
	appendNode( input1, div3 );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},
		
		update: function ( changed, root, eachBlock_value, parameter, index ) {
			var __tmp;
		
			label.htmlFor = "definition-" + ( root.key ) + "-parameter-" + ( index ) + "-type";
			
			input.id = "definition-" + ( root.key ) + "-parameter-" + ( index ) + "-type";
			
			if ( ( __tmp = parameter.type ) !== last_input_value ) {
				last_input_value = __tmp;
				input.value = last_input_value;
			}
			
			input.__svelte.eachBlock_value = eachBlock_value;
			input.__svelte.index = index;
			
			label1.htmlFor = "definition-" + ( root.key ) + "-parameter-" + ( index ) + "-description";
			
			input1.id = "definition-" + ( root.key ) + "-parameter-" + ( index ) + "-description";
			
			if ( ( __tmp = parameter.description ) !== last_input1_value ) {
				last_input1_value = __tmp;
				input1.value = last_input1_value;
			}
			
			input1.__svelte.eachBlock_value = eachBlock_value;
			input1.__svelte.index = index;
		},
		
		teardown: function ( detach ) {
			removeEventListener( input, 'change', changeHandler );
			removeEventListener( input1, 'change', changeHandler1 );
			
			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function definition ( options ) {
	options = options || {};
	this.refs = {};
	this._state = options.data || {};
	
	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};
	
	this._handlers = Object.create( null );
	
	this._root = options._root;
	this._yield = options._yield;
	
	this._torndown = false;
	if ( !addedCss ) addCss();
	
	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
}

definition.prototype = template.methods;

definition.prototype.get = function get( key ) {
 	return key ? this._state[ key ] : this._state;
 };

definition.prototype.fire = function fire( eventName, data ) {
 	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
 	if ( !handlers ) return;
 
 	for ( var i = 0; i < handlers.length; i += 1 ) {
 		handlers[i].call( this, data );
 	}
 };

definition.prototype.observe = function observe( key, callback, options ) {
 	var group = ( options && options.defer ) ? this._observers.pre : this._observers.post;
 
 	( group[ key ] || ( group[ key ] = [] ) ).push( callback );
 
 	if ( !options || options.init !== false ) {
 		callback.__calling = true;
 		callback.call( this, this._state[ key ] );
 		callback.__calling = false;
 	}
 
 	return {
 		cancel: function () {
 			var index = group[ key ].indexOf( callback );
 			if ( ~index ) group[ key ].splice( index, 1 );
 		}
 	};
 };

definition.prototype.on = function on( eventName, handler ) {
 	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
 	handlers.push( handler );
 
 	return {
 		cancel: function () {
 			var index = handlers.indexOf( handler );
 			if ( ~index ) handlers.splice( index, 1 );
 		}
 	};
 };

definition.prototype.set = function set( newState ) {
 	this._set( newState );
 	( this._root || this )._flush();
 };

definition.prototype._flush = function _flush() {
 	if ( !this._renderHooks ) return;
 
 	while ( this._renderHooks.length ) {
 		var hook = this._renderHooks.pop();
 		hook.fn.call( hook.context );
 	}
 };

definition.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

definition.prototype.teardown = definition.prototype.destroy = function destroy ( detach ) {
	this.fire( 'teardown' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

function createElement( name ) {
	return document.createElement( name );
}

function setAttribute( node, attribute, value ) {
	node.setAttribute ( attribute, value );
}

function detachNode( node ) {
	node.parentNode.removeChild( node );
}

function insertNode( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function appendNode( node, target ) {
	target.appendChild( node );
}

function createText( data ) {
	return document.createTextNode( data );
}

function addEventListener( node, event, handler ) {
	node.addEventListener ( event, handler, false );
}

function removeEventListener( node, event, handler ) {
	node.removeEventListener ( event, handler, false );
}

function createComment() {
	return document.createComment( '' );
}

function teardownEach( iterations, detach, start ) {
	for ( var i = ( start || 0 ); i < iterations.length; i += 1 ) {
		iterations[i].teardown( detach );
	}
}

function dispatchObservers( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

		var callbacks = group[ key ];
		if ( !callbacks ) continue;

		for ( var i = 0; i < callbacks.length; i += 1 ) {
			var callback = callbacks[i];
			if ( callback.__calling ) continue;

			callback.__calling = true;
			callback.call( component, newValue, oldValue );
			callback.__calling = false;
		}
	}
}

module.exports = definition;

},{"../yolo2":14}],4:[function(require,module,exports){
'use strict';

var yolo2 = require( '../yolo2' );

yolo2 = ( yolo2 && yolo2.__esModule ) ? yolo2['default'] : yolo2;

function applyComputations ( state, newState, oldState, isInitial ) {
	if ( isInitial || ( 'json' in newState && typeof state.json === 'object' || state.json !== oldState.json ) ) {
		state.stringified = newState.stringified = template.computed.stringified( state.json );
	}
}

var template = (function () {
	return {
		computed: {
			stringified: json => JSON.stringify(json, undefined, 2)
		},
		methods: {
			saveChanges: function(json) {
				try {
					const obj = JSON.parse(json)
					this.fire('save', obj)
					this.set({ error: false, saved: true })
					yolo2.emit('yolo2', 'jsonnnnnn')
				} catch (e) {
					this.set({ error: 'Invalid JSON!' })
				}
			}
		}
	}
}());

function renderMainFragment ( root, component ) {
	var div = createElement( 'div' );
	div.className = "row";
	
	var div1 = createElement( 'div' );
	div1.className = "col-xs-12";
	
	appendNode( div1, div );
	
	var p = createElement( 'p' );
	
	appendNode( p, div1 );
	appendNode( createText( "View/edit the raw JSON here. Changes here will be reflected\n\t\t\tin the form, and vice versa." ), p );
	appendNode( createText( "\n\t\t" ), div1 );
	
	var code = createElement( 'code' );
	
	appendNode( code, div1 );
	
	var div2 = createElement( 'div' );
	div2.className = "" + ( root.error ? 'has-error' : '' ) + " " + ( root.saved ? 'has-success' : '' );
	
	appendNode( div2, code );
	
	var textarea = createElement( 'textarea' );
	textarea.className = "form-control";
	textarea.rows = "6";
	
	var textarea_updating = false;
	
	function textareaChangeHandler () {
		textarea_updating = true;
		component._set({ stringified: textarea.value });
		textarea_updating = false;
	}
	
	addEventListener( textarea, 'input', textareaChangeHandler );
	
	appendNode( textarea, div2 );
	
	textarea.value = root.stringified;
	
	appendNode( createText( "\n\t\t" ), div1 );
	var ifBlock_anchor = createComment();
	appendNode( ifBlock_anchor, div1 );
	
	function getBlock ( root ) {
		if ( root.error ) return renderIfBlock_0;
		return null;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );
	
	if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
	appendNode( createText( "\n\t\t" ), div1 );
	
	var p1 = createElement( 'p' );
	p1.className = "text-right";
	
	appendNode( p1, div1 );
	
	var button = createElement( 'button' );
	button.className = "btn btn-primary";
	
	function clickHandler ( event ) {
		var root = this.__svelte.root;
		
		component.saveChanges(root.stringified);
	}
	
	addEventListener( button, 'click', clickHandler );
	
	button.__svelte = {
		root: root
	};
	
	appendNode( button, p1 );
	appendNode( createText( "Save Changes" ), button );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			div2.className = "" + ( root.error ? 'has-error' : '' ) + " " + ( root.saved ? 'has-success' : '' );
			
			if ( !textarea_updating ) {
							textarea.value = root.stringified;
						}
			
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) ifBlock.teardown( true );
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
			}
			
			button.__svelte.root = root;
		},
		
		teardown: function ( detach ) {
			removeEventListener( textarea, 'input', textareaChangeHandler );
			if ( ifBlock ) ifBlock.teardown( false );
			removeEventListener( button, 'click', clickHandler );
			
			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function renderIfBlock_0 ( root, component ) {
	var div = createElement( 'div' );
	div.className = "alert alert-danger";
	setAttribute( div, 'role', "alert" );
	
	var last_text = root.error
	var text = createText( last_text );
	appendNode( text, div );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			if ( ( __tmp = root.error ) !== last_text ) {
				text.data = last_text = __tmp;
			}
		},
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function jsoninput ( options ) {
	options = options || {};
	this._state = options.data || {};
	applyComputations( this._state, this._state, {}, true );
	
	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};
	
	this._handlers = Object.create( null );
	
	this._root = options._root;
	this._yield = options._yield;
	
	this._torndown = false;
	
	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
}

jsoninput.prototype = template.methods;

jsoninput.prototype.get = function get( key ) {
 	return key ? this._state[ key ] : this._state;
 };

jsoninput.prototype.fire = function fire( eventName, data ) {
 	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
 	if ( !handlers ) return;
 
 	for ( var i = 0; i < handlers.length; i += 1 ) {
 		handlers[i].call( this, data );
 	}
 };

jsoninput.prototype.observe = function observe( key, callback, options ) {
 	var group = ( options && options.defer ) ? this._observers.pre : this._observers.post;
 
 	( group[ key ] || ( group[ key ] = [] ) ).push( callback );
 
 	if ( !options || options.init !== false ) {
 		callback.__calling = true;
 		callback.call( this, this._state[ key ] );
 		callback.__calling = false;
 	}
 
 	return {
 		cancel: function () {
 			var index = group[ key ].indexOf( callback );
 			if ( ~index ) group[ key ].splice( index, 1 );
 		}
 	};
 };

jsoninput.prototype.on = function on( eventName, handler ) {
 	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
 	handlers.push( handler );
 
 	return {
 		cancel: function () {
 			var index = handlers.indexOf( handler );
 			if ( ~index ) handlers.splice( index, 1 );
 		}
 	};
 };

jsoninput.prototype.set = function set( newState ) {
 	this._set( newState );
 	( this._root || this )._flush();
 };

jsoninput.prototype._flush = function _flush() {
 	if ( !this._renderHooks ) return;
 
 	while ( this._renderHooks.length ) {
 		var hook = this._renderHooks.pop();
 		hook.fn.call( hook.context );
 	}
 };

jsoninput.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	applyComputations( this._state, newState, oldState, false )
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

jsoninput.prototype.teardown = jsoninput.prototype.destroy = function destroy ( detach ) {
	this.fire( 'teardown' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

function createElement( name ) {
	return document.createElement( name );
}

function detachNode( node ) {
	node.parentNode.removeChild( node );
}

function insertNode( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function appendNode( node, target ) {
	target.appendChild( node );
}

function createText( data ) {
	return document.createTextNode( data );
}

function addEventListener( node, event, handler ) {
	node.addEventListener ( event, handler, false );
}

function removeEventListener( node, event, handler ) {
	node.removeEventListener ( event, handler, false );
}

function setAttribute( node, attribute, value ) {
	node.setAttribute ( attribute, value );
}

function createComment() {
	return document.createComment( '' );
}

function dispatchObservers( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

		var callbacks = group[ key ];
		if ( !callbacks ) continue;

		for ( var i = 0; i < callbacks.length; i += 1 ) {
			var callback = callbacks[i];
			if ( callback.__calling ) continue;

			callback.__calling = true;
			callback.call( component, newValue, oldValue );
			callback.__calling = false;
		}
	}
}

module.exports = jsoninput;

},{"../yolo2":14}],5:[function(require,module,exports){
'use strict';

var Definition = require( './definition.html' );

var JsonInput = require( './json-input.html' );

Definition = ( Definition && Definition.__esModule ) ? Definition['default'] : Definition;
JsonInput = ( JsonInput && JsonInput.__esModule ) ? JsonInput['default'] : JsonInput;

var template = (function () {
	return {
		data() {
			return {
				tab: 'form'
			}
		},
		helpers: {
			active: (actualTab, possibleTab) => {
				return actualTab === possibleTab ? 'active' : ''
			}
		},
		methods: {
			updateDefinitionKey: function({ oldKey, newKey, target }) {
				const definitions = this.get('definitions')
				definitions[newKey] = definitions[oldKey]
				delete definitions[oldKey]
				this.fire('update', definitions)
			},
			updateSingleDefinition: function({ key, definition }) {
				const definitions = this.get('definitions')
				definitions[key] = definition
				this.fire('update', definitions)
			},
			updateDefinitions: function(definitions) {
				this.fire('update', definitions)
			},
			createNewDefinitionKey: function() {
				const key = this.refs.newDefinitionKey.value
				const definitions = this.get('definitions')
				definitions[key] = {
					description: '',
					parameters: []
				}
				this.fire('update', definitions)
				this.refs.newDefinitionKey.value = ''
				this.refs.newDefinitionKey.focus()
			}
		},
		components: {
			Definition,
			JsonInput
		}
	}
}());

let addedCss = false;
function addCss () {
	var style = createElement( 'style' );
	style.textContent = "\n\t[svelte-3351980103].nav-tabs, [svelte-3351980103] .nav-tabs {\n\t\tmargin-bottom: 20px;\n\t}\n";
	appendNode( style, document.head );

	addedCss = true;
}

function renderMainFragment ( root, component ) {
	var ul = createElement( 'ul' );
	setAttribute( ul, 'svelte-3351980103', '' );
	ul.className = "nav nav-tabs";
	
	var li = createElement( 'li' );
	setAttribute( li, 'svelte-3351980103', '' );
	setAttribute( li, 'role', "presentation" );
	var last_li_class = template.helpers.active(root.tab, 'form');
	li.className = last_li_class;
	
	function clickHandler ( event ) {
		component.set({ tab: 'form' });
	}
	
	addEventListener( li, 'click', clickHandler );
	
	appendNode( li, ul );
	
	var a = createElement( 'a' );
	setAttribute( a, 'svelte-3351980103', '' );
	a.href = "#create-definition-form";
	
	appendNode( a, li );
	appendNode( createText( "Definition" ), a );
	appendNode( createText( "\n\t" ), ul );
	
	var li1 = createElement( 'li' );
	setAttribute( li1, 'svelte-3351980103', '' );
	setAttribute( li1, 'role', "presentation" );
	var last_li1_class = template.helpers.active(root.tab, 'json');
	li1.className = last_li1_class;
	
	function clickHandler1 ( event ) {
		component.set({ tab: 'json' });
	}
	
	addEventListener( li1, 'click', clickHandler1 );
	
	appendNode( li1, ul );
	
	var a1 = createElement( 'a' );
	setAttribute( a1, 'svelte-3351980103', '' );
	a1.href = "#create-definition-json";
	
	appendNode( a1, li1 );
	appendNode( createText( "View/Edit JSON" ), a1 );
	var text3 = createText( "\n\n" );
	var ifBlock_anchor = createComment();
	
	function getBlock ( root ) {
		if ( root.tab === 'form' ) return renderIfBlock_0;
		return renderIfBlock_1;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );

	return {
		mount: function ( target, anchor ) {
			insertNode( ul, target, anchor );
			insertNode( text3, target, anchor );
			insertNode( ifBlock_anchor, target, anchor );
			if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			if ( ( __tmp = template.helpers.active(root.tab, 'form') ) !== last_li_class ) {
				last_li_class = __tmp;
				li.className = last_li_class;
			}
			
			if ( ( __tmp = template.helpers.active(root.tab, 'json') ) !== last_li1_class ) {
				last_li1_class = __tmp;
				li1.className = last_li1_class;
			}
			
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) ifBlock.teardown( true );
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
			}
		},
		
		teardown: function ( detach ) {
			removeEventListener( li, 'click', clickHandler );
			removeEventListener( li1, 'click', clickHandler1 );
			if ( ifBlock ) ifBlock.teardown( detach );
			
			if ( detach ) {
				detachNode( ul );
				detachNode( text3 );
				detachNode( ifBlock_anchor );
			}
		}
	};
}

function renderIfBlock_1 ( root, component ) {
	var jsonInput_initialData = {
		json: root.definitions
	};
	var jsonInput = new template.components.JsonInput({
		target: null,
		_root: component._root || component,
		data: jsonInput_initialData
	});
	
	jsonInput.on( 'save', function ( event ) {
		component.updateDefinitions(event);
	});

	return {
		mount: function ( target, anchor ) {
			jsonInput._fragment.mount( target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			var jsonInput_changes = {};
			
			if ( 'definitions' in changed ) jsonInput_changes.json = root.definitions;
			
			if ( Object.keys( jsonInput_changes ).length ) jsonInput.set( jsonInput_changes );
		},
		
		teardown: function ( detach ) {
			jsonInput.destroy( detach );
		}
	};
}

function renderIfBlock_0 ( root, component ) {
	var eachBlock_anchor = createComment();
	var eachBlock_value = ( 'Object' in root ? root.Object : Object ).keys(root.definitions).sort();
	var eachBlock_iterations = [];
	
	for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
		eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
	}
	
	var text = createText( "\n\t" );
	
	var div = createElement( 'div' );
	setAttribute( div, 'svelte-3351980103', '' );
	div.className = "row";
	
	var div1 = createElement( 'div' );
	setAttribute( div1, 'svelte-3351980103', '' );
	div1.className = "form-group";
	
	appendNode( div1, div );
	
	var div2 = createElement( 'div' );
	setAttribute( div2, 'svelte-3351980103', '' );
	div2.className = "col-xs-3";
	
	appendNode( div2, div1 );
	
	var input = createElement( 'input' );
	setAttribute( input, 'svelte-3351980103', '' );
	input.type = "text";
	input.className = "form-control";
	input.id = "definition-new";
	input.placeholder = "New definition key...";
	component.refs.newDefinitionKey = input;
	
	appendNode( input, div2 );
	appendNode( createText( "\n\t\t\t" ), div1 );
	
	var div3 = createElement( 'div' );
	setAttribute( div3, 'svelte-3351980103', '' );
	div3.className = "col-xs-2";
	
	appendNode( div3, div1 );
	
	var button = createElement( 'button' );
	setAttribute( button, 'svelte-3351980103', '' );
	button.className = "btn btn-primary";
	
	function clickHandler ( event ) {
		component.createNewDefinitionKey();
	}
	
	addEventListener( button, 'click', clickHandler );
	
	appendNode( button, div3 );
	appendNode( createText( "Create New Key" ), button );

	return {
		mount: function ( target, anchor ) {
			insertNode( eachBlock_anchor, target, anchor );
			
			for ( var i = 0; i < eachBlock_iterations.length; i += 1 ) {
				eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
			}
			
			insertNode( text, target, anchor );
			insertNode( div, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			var eachBlock_value = ( 'Object' in root ? root.Object : Object ).keys(root.definitions).sort();
			
			for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
				if ( !eachBlock_iterations[i] ) {
					eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
					eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
				} else {
					eachBlock_iterations[i].update( changed, root, eachBlock_value, eachBlock_value[i], i );
				}
			}
			
			teardownEach( eachBlock_iterations, true, eachBlock_value.length );
			
			eachBlock_iterations.length = eachBlock_value.length;
		},
		
		teardown: function ( detach ) {
			teardownEach( eachBlock_iterations, detach );
			
			if ( component.refs.newDefinitionKey === input ) component.refs.newDefinitionKey = null;
			removeEventListener( button, 'click', clickHandler );
			
			if ( detach ) {
				detachNode( eachBlock_anchor );
				detachNode( text );
				detachNode( div );
			}
		}
	};
}

function renderEachBlock ( root, eachBlock_value, key, key__index, component ) {
	var definition_initialData = {
		key: key,
		definition: root.definitions[key],
		emitter: root.emitter
	};
	var definition = new template.components.Definition({
		target: null,
		_root: component._root || component,
		data: definition_initialData
	});
	
	definition.on( 'updateKey', function ( event ) {
		component.updateDefinitionKey(event);
	});
	
	definition.on( 'updateDefinition', function ( event ) {
		component.updateSingleDefinition(event);
	});

	return {
		mount: function ( target, anchor ) {
			definition._fragment.mount( target, anchor );
		},
		
		update: function ( changed, root, eachBlock_value, key, key__index ) {
			var __tmp;
		
			var definition_changes = {};
			
			if ( 'Object' in changed||'definitions' in changed ) definition_changes.key = key;
			if ( 'definitions' in changed||'Object' in changed||'definitions' in changed ) definition_changes.definition = root.definitions[key];
			if ( 'emitter' in changed ) definition_changes.emitter = root.emitter;
			
			if ( Object.keys( definition_changes ).length ) definition.set( definition_changes );
		},
		
		teardown: function ( detach ) {
			definition.destroy( detach );
		}
	};
}

function tabdefinitions ( options ) {
	options = options || {};
	this.refs = {};
	this._state = Object.assign( template.data(), options.data );
	
	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};
	
	this._handlers = Object.create( null );
	
	this._root = options._root;
	this._yield = options._yield;
	
	this._torndown = false;
	if ( !addedCss ) addCss();
	this._renderHooks = [];
	
	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
	
	this._flush();
}

tabdefinitions.prototype = template.methods;

tabdefinitions.prototype.get = function get( key ) {
 	return key ? this._state[ key ] : this._state;
 };

tabdefinitions.prototype.fire = function fire( eventName, data ) {
 	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
 	if ( !handlers ) return;
 
 	for ( var i = 0; i < handlers.length; i += 1 ) {
 		handlers[i].call( this, data );
 	}
 };

tabdefinitions.prototype.observe = function observe( key, callback, options ) {
 	var group = ( options && options.defer ) ? this._observers.pre : this._observers.post;
 
 	( group[ key ] || ( group[ key ] = [] ) ).push( callback );
 
 	if ( !options || options.init !== false ) {
 		callback.__calling = true;
 		callback.call( this, this._state[ key ] );
 		callback.__calling = false;
 	}
 
 	return {
 		cancel: function () {
 			var index = group[ key ].indexOf( callback );
 			if ( ~index ) group[ key ].splice( index, 1 );
 		}
 	};
 };

tabdefinitions.prototype.on = function on( eventName, handler ) {
 	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
 	handlers.push( handler );
 
 	return {
 		cancel: function () {
 			var index = handlers.indexOf( handler );
 			if ( ~index ) handlers.splice( index, 1 );
 		}
 	};
 };

tabdefinitions.prototype.set = function set( newState ) {
 	this._set( newState );
 	( this._root || this )._flush();
 };

tabdefinitions.prototype._flush = function _flush() {
 	if ( !this._renderHooks ) return;
 
 	while ( this._renderHooks.length ) {
 		var hook = this._renderHooks.pop();
 		hook.fn.call( hook.context );
 	}
 };

tabdefinitions.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
	
	this._flush();
};

tabdefinitions.prototype.teardown = tabdefinitions.prototype.destroy = function destroy ( detach ) {
	this.fire( 'teardown' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

function createElement( name ) {
	return document.createElement( name );
}

function setAttribute( node, attribute, value ) {
	node.setAttribute ( attribute, value );
}

function detachNode( node ) {
	node.parentNode.removeChild( node );
}

function insertNode( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function addEventListener( node, event, handler ) {
	node.addEventListener ( event, handler, false );
}

function removeEventListener( node, event, handler ) {
	node.removeEventListener ( event, handler, false );
}

function appendNode( node, target ) {
	target.appendChild( node );
}

function createText( data ) {
	return document.createTextNode( data );
}

function createComment() {
	return document.createComment( '' );
}

function teardownEach( iterations, detach, start ) {
	for ( var i = ( start || 0 ); i < iterations.length; i += 1 ) {
		iterations[i].teardown( detach );
	}
}

function dispatchObservers( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

		var callbacks = group[ key ];
		if ( !callbacks ) continue;

		for ( var i = 0; i < callbacks.length; i += 1 ) {
			var callback = callbacks[i];
			if ( callback.__calling ) continue;

			callback.__calling = true;
			callback.call( component, newValue, oldValue );
			callback.__calling = false;
		}
	}
}

module.exports = tabdefinitions;

},{"./definition.html":3,"./json-input.html":4}],6:[function(require,module,exports){
'use strict';

var JsonInput = require( './json-input.html' );

var Translation = require( './translation.html' );

JsonInput = ( JsonInput && JsonInput.__esModule ) ? JsonInput['default'] : JsonInput;
Translation = ( Translation && Translation.__esModule ) ? Translation['default'] : Translation;

var template = (function () {
	return {
		data() {
			return {
				tab: 'form'
			}
		},
		helpers: {
			active: (actualTab, possibleTab) => {
				return actualTab === possibleTab ? 'active' : ''
			}
		},
		methods: {
			updateTranslationLanguage: (language) => {
				console.log('translation language', language)
			},
			updateReferenceLanguage: (language) => {
				console.log('reference language', language)
			},
			updateTranslation: function(translation) {
				console.log('translation', translation)
				this.fire('update', { translation })
			},
			updateReference: function(reference) {
				console.log('reference', reference)
				this.fire('update', { reference })
			}
		},
		components: {
			JsonInput,
			Translation
		}
	}
}());

let addedCss = false;
function addCss () {
	var style = createElement( 'style' );
	style.textContent = "\n\t[svelte-597580552].nav-tabs, [svelte-597580552] .nav-tabs {\n\t\tmargin-bottom: 20px;\n\t}\n";
	appendNode( style, document.head );

	addedCss = true;
}

function renderMainFragment ( root, component ) {
	var ul = createElement( 'ul' );
	setAttribute( ul, 'svelte-597580552', '' );
	ul.className = "nav nav-tabs";
	
	var li = createElement( 'li' );
	setAttribute( li, 'svelte-597580552', '' );
	setAttribute( li, 'role', "presentation" );
	var last_li_class = template.helpers.active(root.tab, 'form');
	li.className = last_li_class;
	
	function clickHandler ( event ) {
		component.set({ tab: 'form' });
	}
	
	addEventListener( li, 'click', clickHandler );
	
	appendNode( li, ul );
	
	var a = createElement( 'a' );
	setAttribute( a, 'svelte-597580552', '' );
	a.href = "#create-translation-form";
	
	appendNode( a, li );
	appendNode( createText( "Translation" ), a );
	appendNode( createText( "\n\t" ), ul );
	
	var li1 = createElement( 'li' );
	setAttribute( li1, 'svelte-597580552', '' );
	setAttribute( li1, 'role', "presentation" );
	var last_li1_class = template.helpers.active(root.tab, 'json');
	li1.className = last_li1_class;
	
	function clickHandler1 ( event ) {
		component.set({ tab: 'json' });
	}
	
	addEventListener( li1, 'click', clickHandler1 );
	
	appendNode( li1, ul );
	
	var a1 = createElement( 'a' );
	setAttribute( a1, 'svelte-597580552', '' );
	a1.href = "#create-translation-json";
	
	appendNode( a1, li1 );
	appendNode( createText( "View/Edit Translation JSON" ), a1 );
	appendNode( createText( "\n\t" ), ul );
	
	var li2 = createElement( 'li' );
	setAttribute( li2, 'svelte-597580552', '' );
	setAttribute( li2, 'role', "presentation" );
	var last_li2_class = template.helpers.active(root.tab, 'reference');
	li2.className = last_li2_class;
	
	function clickHandler2 ( event ) {
		component.set({ tab: 'reference' });
	}
	
	addEventListener( li2, 'click', clickHandler2 );
	
	appendNode( li2, ul );
	
	var a2 = createElement( 'a' );
	setAttribute( a2, 'svelte-597580552', '' );
	a2.href = "#create-translation-reference";
	
	appendNode( a2, li2 );
	appendNode( createText( "View/Edit Reference JSON" ), a2 );
	var text5 = createText( "\n\n" );
	var ifBlock_anchor = createComment();
	
	function getBlock ( root ) {
		if ( root.tab === 'form' ) return renderIfBlock_0;
		if ( root.tab === 'json' ) return renderIfBlock_1;
		if ( root.tab === 'reference' ) return renderIfBlock_2;
		return null;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );

	return {
		mount: function ( target, anchor ) {
			insertNode( ul, target, anchor );
			insertNode( text5, target, anchor );
			insertNode( ifBlock_anchor, target, anchor );
			if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			if ( ( __tmp = template.helpers.active(root.tab, 'form') ) !== last_li_class ) {
				last_li_class = __tmp;
				li.className = last_li_class;
			}
			
			if ( ( __tmp = template.helpers.active(root.tab, 'json') ) !== last_li1_class ) {
				last_li1_class = __tmp;
				li1.className = last_li1_class;
			}
			
			if ( ( __tmp = template.helpers.active(root.tab, 'reference') ) !== last_li2_class ) {
				last_li2_class = __tmp;
				li2.className = last_li2_class;
			}
			
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) ifBlock.teardown( true );
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
			}
		},
		
		teardown: function ( detach ) {
			removeEventListener( li, 'click', clickHandler );
			removeEventListener( li1, 'click', clickHandler1 );
			removeEventListener( li2, 'click', clickHandler2 );
			if ( ifBlock ) ifBlock.teardown( detach );
			
			if ( detach ) {
				detachNode( ul );
				detachNode( text5 );
				detachNode( ifBlock_anchor );
			}
		}
	};
}

function renderIfBlock_2 ( root, component ) {
	var jsonInput_initialData = {
		json: root.reference
	};
	var jsonInput = new template.components.JsonInput({
		target: null,
		_root: component._root || component,
		data: jsonInput_initialData
	});
	
	jsonInput.on( 'save', function ( event ) {
		component.updateReference(event);
	});

	return {
		mount: function ( target, anchor ) {
			jsonInput._fragment.mount( target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			var jsonInput_changes = {};
			
			if ( 'reference' in changed ) jsonInput_changes.json = root.reference;
			
			if ( Object.keys( jsonInput_changes ).length ) jsonInput.set( jsonInput_changes );
		},
		
		teardown: function ( detach ) {
			jsonInput.destroy( detach );
		}
	};
}

function renderIfBlock_1 ( root, component ) {
	var jsonInput_initialData = {
		json: root.translation
	};
	var jsonInput = new template.components.JsonInput({
		target: null,
		_root: component._root || component,
		data: jsonInput_initialData
	});
	
	jsonInput.on( 'save', function ( event ) {
		component.updateTranslation(event);
	});

	return {
		mount: function ( target, anchor ) {
			jsonInput._fragment.mount( target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			var jsonInput_changes = {};
			
			if ( 'translation' in changed ) jsonInput_changes.json = root.translation;
			
			if ( Object.keys( jsonInput_changes ).length ) jsonInput.set( jsonInput_changes );
		},
		
		teardown: function ( detach ) {
			jsonInput.destroy( detach );
		}
	};
}

function renderIfBlock_0 ( root, component ) {
	var div = createElement( 'div' );
	setAttribute( div, 'svelte-597580552', '' );
	div.className = "row";
	
	var div1 = createElement( 'div' );
	setAttribute( div1, 'svelte-597580552', '' );
	div1.className = "form-group";
	
	appendNode( div1, div );
	
	var div2 = createElement( 'div' );
	setAttribute( div2, 'svelte-597580552', '' );
	div2.className = "col-xs-3";
	
	appendNode( div2, div1 );
	
	var label = createElement( 'label' );
	setAttribute( label, 'svelte-597580552', '' );
	label.htmlFor = "translation-lang";
	
	appendNode( label, div2 );
	appendNode( createText( "Translation Language" ), label );
	appendNode( createText( "\n\t\t\t" ), div1 );
	
	var div3 = createElement( 'div' );
	setAttribute( div3, 'svelte-597580552', '' );
	div3.className = "col-xs-3";
	
	appendNode( div3, div1 );
	
	var input = createElement( 'input' );
	setAttribute( input, 'svelte-597580552', '' );
	input.type = "text";
	input.className = "form-control";
	input.id = "translation-key";
	var last_input_value = root.translation.lang;
	input.value = last_input_value;
	
	function changeHandler ( event ) {
		component.updateTranslationLanguage(event);
	}
	
	addEventListener( input, 'change', changeHandler );
	
	appendNode( input, div3 );
	var text2 = createText( "\n\t" );
	
	var div4 = createElement( 'div' );
	setAttribute( div4, 'svelte-597580552', '' );
	div4.className = "row";
	
	var div5 = createElement( 'div' );
	setAttribute( div5, 'svelte-597580552', '' );
	div5.className = "form-group";
	
	appendNode( div5, div4 );
	
	var div6 = createElement( 'div' );
	setAttribute( div6, 'svelte-597580552', '' );
	div6.className = "col-xs-3";
	
	appendNode( div6, div5 );
	
	var label1 = createElement( 'label' );
	setAttribute( label1, 'svelte-597580552', '' );
	label1.htmlFor = "reference-lang";
	
	appendNode( label1, div6 );
	appendNode( createText( "Reference Language" ), label1 );
	appendNode( createText( "\n\t\t\t" ), div5 );
	
	var div7 = createElement( 'div' );
	setAttribute( div7, 'svelte-597580552', '' );
	div7.className = "col-xs-3";
	
	appendNode( div7, div5 );
	
	var input1 = createElement( 'input' );
	setAttribute( input1, 'svelte-597580552', '' );
	input1.type = "text";
	input1.className = "form-control";
	input1.id = "translation-key";
	var last_input1_value = root.reference.lang;
	input1.value = last_input1_value;
	
	function changeHandler1 ( event ) {
		component.updateReferenceLanguage(event);
	}
	
	addEventListener( input1, 'change', changeHandler1 );
	
	appendNode( input1, div7 );
	var text5 = createText( "\n\n\t" );
	var eachBlock_anchor = createComment();
	var eachBlock_value = ( 'Object' in root ? root.Object : Object ).keys(root.definitions).sort();
	var eachBlock_iterations = [];
	
	for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
		eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
	}

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
			insertNode( text2, target, anchor );
			insertNode( div4, target, anchor );
			insertNode( text5, target, anchor );
			insertNode( eachBlock_anchor, target, anchor );
			
			for ( var i = 0; i < eachBlock_iterations.length; i += 1 ) {
				eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
			}
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			if ( ( __tmp = root.translation.lang ) !== last_input_value ) {
				last_input_value = __tmp;
				input.value = last_input_value;
			}
			
			if ( ( __tmp = root.reference.lang ) !== last_input1_value ) {
				last_input1_value = __tmp;
				input1.value = last_input1_value;
			}
			
			var eachBlock_value = ( 'Object' in root ? root.Object : Object ).keys(root.definitions).sort();
			
			for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
				if ( !eachBlock_iterations[i] ) {
					eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
					eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
				} else {
					eachBlock_iterations[i].update( changed, root, eachBlock_value, eachBlock_value[i], i );
				}
			}
			
			teardownEach( eachBlock_iterations, true, eachBlock_value.length );
			
			eachBlock_iterations.length = eachBlock_value.length;
		},
		
		teardown: function ( detach ) {
			removeEventListener( input, 'change', changeHandler );
			removeEventListener( input1, 'change', changeHandler1 );
			
			teardownEach( eachBlock_iterations, detach );
			
			if ( detach ) {
				detachNode( div );
				detachNode( text2 );
				detachNode( div4 );
				detachNode( text5 );
				detachNode( eachBlock_anchor );
			}
		}
	};
}

function renderEachBlock ( root, eachBlock_value, key, key__index, component ) {
	var translation_initialData = {
		key: key,
		definition: root.definitions[key],
		translationLanguage: root.translation.lang,
		referenceLanguage: root.reference.lang,
		translation: root.translation.value[key],
		reference: root.reference.value[key],
		exampleParameter: root.exampleParameters[key],
		renderedTranslation: root.renderedTranslation[key],
		renderedReference: root.renderedReference[key]
	};
	var translation = new template.components.Translation({
		target: null,
		_root: component._root || component,
		data: translation_initialData
	});

	return {
		mount: function ( target, anchor ) {
			translation._fragment.mount( target, anchor );
		},
		
		update: function ( changed, root, eachBlock_value, key, key__index ) {
			var __tmp;
		
			var translation_changes = {};
			
			if ( 'Object' in changed||'definitions' in changed ) translation_changes.key = key;
			if ( 'definitions' in changed||'Object' in changed||'definitions' in changed ) translation_changes.definition = root.definitions[key];
			if ( 'translation' in changed ) translation_changes.translationLanguage = root.translation.lang;
			if ( 'reference' in changed ) translation_changes.referenceLanguage = root.reference.lang;
			if ( 'translation' in changed||'Object' in changed||'definitions' in changed ) translation_changes.translation = root.translation.value[key];
			if ( 'reference' in changed||'Object' in changed||'definitions' in changed ) translation_changes.reference = root.reference.value[key];
			if ( 'exampleParameters' in changed||'Object' in changed||'definitions' in changed ) translation_changes.exampleParameter = root.exampleParameters[key];
			if ( 'renderedTranslation' in changed||'Object' in changed||'definitions' in changed ) translation_changes.renderedTranslation = root.renderedTranslation[key];
			if ( 'renderedReference' in changed||'Object' in changed||'definitions' in changed ) translation_changes.renderedReference = root.renderedReference[key];
			
			if ( Object.keys( translation_changes ).length ) translation.set( translation_changes );
		},
		
		teardown: function ( detach ) {
			translation.destroy( detach );
		}
	};
}

function tabtranslations ( options ) {
	options = options || {};
	this._state = Object.assign( template.data(), options.data );
	
	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};
	
	this._handlers = Object.create( null );
	
	this._root = options._root;
	this._yield = options._yield;
	
	this._torndown = false;
	if ( !addedCss ) addCss();
	this._renderHooks = [];
	
	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
	
	this._flush();
}

tabtranslations.prototype = template.methods;

tabtranslations.prototype.get = function get( key ) {
 	return key ? this._state[ key ] : this._state;
 };

tabtranslations.prototype.fire = function fire( eventName, data ) {
 	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
 	if ( !handlers ) return;
 
 	for ( var i = 0; i < handlers.length; i += 1 ) {
 		handlers[i].call( this, data );
 	}
 };

tabtranslations.prototype.observe = function observe( key, callback, options ) {
 	var group = ( options && options.defer ) ? this._observers.pre : this._observers.post;
 
 	( group[ key ] || ( group[ key ] = [] ) ).push( callback );
 
 	if ( !options || options.init !== false ) {
 		callback.__calling = true;
 		callback.call( this, this._state[ key ] );
 		callback.__calling = false;
 	}
 
 	return {
 		cancel: function () {
 			var index = group[ key ].indexOf( callback );
 			if ( ~index ) group[ key ].splice( index, 1 );
 		}
 	};
 };

tabtranslations.prototype.on = function on( eventName, handler ) {
 	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
 	handlers.push( handler );
 
 	return {
 		cancel: function () {
 			var index = handlers.indexOf( handler );
 			if ( ~index ) handlers.splice( index, 1 );
 		}
 	};
 };

tabtranslations.prototype.set = function set( newState ) {
 	this._set( newState );
 	( this._root || this )._flush();
 };

tabtranslations.prototype._flush = function _flush() {
 	if ( !this._renderHooks ) return;
 
 	while ( this._renderHooks.length ) {
 		var hook = this._renderHooks.pop();
 		hook.fn.call( hook.context );
 	}
 };

tabtranslations.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
	
	this._flush();
};

tabtranslations.prototype.teardown = tabtranslations.prototype.destroy = function destroy ( detach ) {
	this.fire( 'teardown' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

function createElement( name ) {
	return document.createElement( name );
}

function setAttribute( node, attribute, value ) {
	node.setAttribute ( attribute, value );
}

function detachNode( node ) {
	node.parentNode.removeChild( node );
}

function insertNode( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function addEventListener( node, event, handler ) {
	node.addEventListener ( event, handler, false );
}

function removeEventListener( node, event, handler ) {
	node.removeEventListener ( event, handler, false );
}

function appendNode( node, target ) {
	target.appendChild( node );
}

function createText( data ) {
	return document.createTextNode( data );
}

function createComment() {
	return document.createComment( '' );
}

function teardownEach( iterations, detach, start ) {
	for ( var i = ( start || 0 ); i < iterations.length; i += 1 ) {
		iterations[i].teardown( detach );
	}
}

function dispatchObservers( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

		var callbacks = group[ key ];
		if ( !callbacks ) continue;

		for ( var i = 0; i < callbacks.length; i += 1 ) {
			var callback = callbacks[i];
			if ( callback.__calling ) continue;

			callback.__calling = true;
			callback.call( component, newValue, oldValue );
			callback.__calling = false;
		}
	}
}

module.exports = tabtranslations;

},{"./json-input.html":4,"./translation.html":7}],7:[function(require,module,exports){
'use strict';

var template = (function () {
	return {
		methods: {
			updateTranslation: function(key, event) {
				console.log('translation key', key)
				console.log('translation event', event)
			},
			updateReference: function(key, event) {
				console.log('reference key', key)
				console.log('reference event', event)
			}
		}
	}
}());

let addedCss = false;
function addCss () {
	var style = createElement( 'style' );
	style.textContent = "\n[svelte-3315280206].help-block, [svelte-3315280206] .help-block {\n\tmargin-bottom: 0;\n\tmargin-left: 12px;\n}\n";
	appendNode( style, document.head );

	addedCss = true;
}

function renderMainFragment ( root, component ) {
	var div = createElement( 'div' );
	setAttribute( div, 'svelte-3315280206', '' );
	div.className = "row translation-" + ( root.key ) + "-description";
	
	var div1 = createElement( 'div' );
	setAttribute( div1, 'svelte-3315280206', '' );
	div1.className = "col-xs-12";
	
	appendNode( div1, div );
	
	var p = createElement( 'p' );
	setAttribute( p, 'svelte-3315280206', '' );
	p.className = "lead";
	
	appendNode( p, div1 );
	
	var code = createElement( 'code' );
	setAttribute( code, 'svelte-3315280206', '' );
	
	appendNode( code, p );
	var last_text = root.key
	var text = createText( last_text );
	appendNode( text, code );
	appendNode( createText( ":\n\t\t\t" ), p );
	var last_text2 = root.definition.description
	var text2 = createText( last_text2 );
	appendNode( text2, p );
	var text3 = createText( "\n\n" );
	
	var div2 = createElement( 'div' );
	setAttribute( div2, 'svelte-3315280206', '' );
	div2.className = "row";
	
	var div3 = createElement( 'div' );
	setAttribute( div3, 'svelte-3315280206', '' );
	div3.className = "col-xs-12";
	
	appendNode( div3, div2 );
	
	var form = createElement( 'form' );
	setAttribute( form, 'svelte-3315280206', '' );
	form.className = "form-horizontal";
	
	appendNode( form, div3 );
	
	var div4 = createElement( 'div' );
	setAttribute( div4, 'svelte-3315280206', '' );
	div4.className = "form-group";
	
	appendNode( div4, form );
	
	var label = createElement( 'label' );
	setAttribute( label, 'svelte-3315280206', '' );
	label.htmlFor = "translation-" + ( root.key ) + "-translation-text";
	label.className = "col-xs-2 control-label";
	
	appendNode( label, div4 );
	
	var code1 = createElement( 'code' );
	setAttribute( code1, 'svelte-3315280206', '' );
	
	appendNode( code1, label );
	var last_text4 = root.translationLanguage
	var text4 = createText( last_text4 );
	appendNode( text4, code1 );
	appendNode( createText( "\n\t\t\t\t" ), div4 );
	
	var div5 = createElement( 'div' );
	setAttribute( div5, 'svelte-3315280206', '' );
	div5.className = "col-xs-10";
	
	appendNode( div5, div4 );
	
	var input = createElement( 'input' );
	setAttribute( input, 'svelte-3315280206', '' );
	input.type = "text";
	input.className = "form-control";
	input.id = "translation-" + ( root.key ) + "-translation-text";
	var last_input_value = root.translation || '';
	input.value = last_input_value;
	
	function changeHandler ( event ) {
		var root = this.__svelte.root;
		
		component.updateTranslation(root.key, event);
	}
	
	addEventListener( input, 'change', changeHandler );
	
	input.__svelte = {
		root: root
	};
	
	appendNode( input, div5 );
	appendNode( createText( "\n\t\t\t\t\t" ), div5 );
	
	var span = createElement( 'span' );
	setAttribute( span, 'svelte-3315280206', '' );
	span.className = "help-block";
	
	appendNode( span, div5 );
	var last_text7 = root.renderedTranslation
	var text7 = createText( last_text7 );
	appendNode( text7, span );
	appendNode( createText( "\n\t\t\t" ), form );
	
	var div6 = createElement( 'div' );
	setAttribute( div6, 'svelte-3315280206', '' );
	div6.className = "form-group";
	
	appendNode( div6, form );
	
	var label1 = createElement( 'label' );
	setAttribute( label1, 'svelte-3315280206', '' );
	label1.htmlFor = "translation-" + ( root.key ) + "-reference-text";
	label1.className = "col-xs-2 control-label";
	
	appendNode( label1, div6 );
	
	var code2 = createElement( 'code' );
	setAttribute( code2, 'svelte-3315280206', '' );
	
	appendNode( code2, label1 );
	var last_text9 = root.referenceLanguage
	var text9 = createText( last_text9 );
	appendNode( text9, code2 );
	appendNode( createText( "\n\t\t\t\t" ), div6 );
	
	var div7 = createElement( 'div' );
	setAttribute( div7, 'svelte-3315280206', '' );
	div7.className = "col-xs-10";
	
	appendNode( div7, div6 );
	
	var input1 = createElement( 'input' );
	setAttribute( input1, 'svelte-3315280206', '' );
	input1.type = "text";
	input1.className = "form-control";
	input1.id = "translation-" + ( root.key ) + "-reference-text";
	var last_input1_value = root.reference || '';
	input1.value = last_input1_value;
	
	function changeHandler1 ( event ) {
		var root = this.__svelte.root;
		
		component.updateReference(root.key, event);
	}
	
	addEventListener( input1, 'change', changeHandler1 );
	
	input1.__svelte = {
		root: root
	};
	
	appendNode( input1, div7 );
	appendNode( createText( "\n\t\t\t\t\t" ), div7 );
	
	var span1 = createElement( 'span' );
	setAttribute( span1, 'svelte-3315280206', '' );
	span1.className = "help-block";
	
	appendNode( span1, div7 );
	var last_text12 = root.renderedReference
	var text12 = createText( last_text12 );
	appendNode( text12, span1 );
	var text13 = createText( "\n\n" );
	var ifBlock_anchor = createComment();
	
	function getBlock ( root ) {
		if ( root.definition.parameters && root.definition.parameters.length > 0 ) return renderIfBlock_0;
		return null;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
			insertNode( text3, target, anchor );
			insertNode( div2, target, anchor );
			insertNode( text13, target, anchor );
			insertNode( ifBlock_anchor, target, anchor );
			if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			div.className = "row translation-" + ( root.key ) + "-description";
			
			if ( ( __tmp = root.key ) !== last_text ) {
				text.data = last_text = __tmp;
			}
			
			if ( ( __tmp = root.definition.description ) !== last_text2 ) {
				text2.data = last_text2 = __tmp;
			}
			
			label.htmlFor = "translation-" + ( root.key ) + "-translation-text";
			
			if ( ( __tmp = root.translationLanguage ) !== last_text4 ) {
				text4.data = last_text4 = __tmp;
			}
			
			input.id = "translation-" + ( root.key ) + "-translation-text";
			
			if ( ( __tmp = root.translation || '' ) !== last_input_value ) {
				last_input_value = __tmp;
				input.value = last_input_value;
			}
			
			input.__svelte.root = root;
			
			if ( ( __tmp = root.renderedTranslation ) !== last_text7 ) {
				text7.data = last_text7 = __tmp;
			}
			
			label1.htmlFor = "translation-" + ( root.key ) + "-reference-text";
			
			if ( ( __tmp = root.referenceLanguage ) !== last_text9 ) {
				text9.data = last_text9 = __tmp;
			}
			
			input1.id = "translation-" + ( root.key ) + "-reference-text";
			
			if ( ( __tmp = root.reference || '' ) !== last_input1_value ) {
				last_input1_value = __tmp;
				input1.value = last_input1_value;
			}
			
			input1.__svelte.root = root;
			
			if ( ( __tmp = root.renderedReference ) !== last_text12 ) {
				text12.data = last_text12 = __tmp;
			}
			
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) ifBlock.teardown( true );
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
			}
		},
		
		teardown: function ( detach ) {
			removeEventListener( input, 'change', changeHandler );
			removeEventListener( input1, 'change', changeHandler1 );
			if ( ifBlock ) ifBlock.teardown( detach );
			
			if ( detach ) {
				detachNode( div );
				detachNode( text3 );
				detachNode( div2 );
				detachNode( text13 );
				detachNode( ifBlock_anchor );
			}
		}
	};
}

function renderIfBlock_0 ( root, component ) {
	var div = createElement( 'div' );
	setAttribute( div, 'svelte-3315280206', '' );
	div.className = "row";
	
	var div1 = createElement( 'div' );
	setAttribute( div1, 'svelte-3315280206', '' );
	div1.className = "col-xs-offset-1 col-xs-11";
	
	appendNode( div1, div );
	
	var p = createElement( 'p' );
	setAttribute( p, 'svelte-3315280206', '' );
	
	appendNode( p, div1 );
	
	var strong = createElement( 'strong' );
	setAttribute( strong, 'svelte-3315280206', '' );
	
	appendNode( strong, p );
	appendNode( createText( "Change parameters to change the example translation output:" ), strong );
	appendNode( createText( "\n\t\t" ), div1 );
	
	var form = createElement( 'form' );
	setAttribute( form, 'svelte-3315280206', '' );
	form.className = "form-horizontal";
	
	appendNode( form, div1 );
	var eachBlock_anchor = createComment();
	appendNode( eachBlock_anchor, form );
	var eachBlock_value = root.definition.parameters;
	var eachBlock_iterations = [];
	
	for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
		eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
		eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
	}

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			var eachBlock_value = root.definition.parameters;
			
			for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
				if ( !eachBlock_iterations[i] ) {
					eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
					eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
				} else {
					eachBlock_iterations[i].update( changed, root, eachBlock_value, eachBlock_value[i], i );
				}
			}
			
			teardownEach( eachBlock_iterations, true, eachBlock_value.length );
			
			eachBlock_iterations.length = eachBlock_value.length;
		},
		
		teardown: function ( detach ) {
			teardownEach( eachBlock_iterations, false );
			
			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function renderEachBlock ( root, eachBlock_value, parameter, index, component ) {
	var div = createElement( 'div' );
	setAttribute( div, 'svelte-3315280206', '' );
	div.className = "form-group";
	
	var label = createElement( 'label' );
	setAttribute( label, 'svelte-3315280206', '' );
	label.htmlFor = "translation-" + ( root.key ) + "-parameter-" + ( index );
	label.className = "col-xs-2 control-label";
	
	appendNode( label, div );
	
	var code = createElement( 'code' );
	setAttribute( code, 'svelte-3315280206', '' );
	
	appendNode( code, label );
	var last_text = parameter.type
	var text = createText( last_text );
	appendNode( text, code );
	appendNode( createText( "\n\t\t\t\t" ), div );
	
	var div1 = createElement( 'div' );
	setAttribute( div1, 'svelte-3315280206', '' );
	div1.className = "col-xs-10";
	
	appendNode( div1, div );
	
	var input = createElement( 'input' );
	setAttribute( input, 'svelte-3315280206', '' );
	input.type = "text";
	input.className = "form-control";
	input.id = "translation-" + ( root.key ) + "-parameter-" + ( index );
	var last_input_value = root.exampleParameter && root.exampleParameter[index] || '';
	input.value = last_input_value;
	
	appendNode( input, div1 );
	appendNode( createText( "\n\t\t\t\t\t" ), div1 );
	
	var span = createElement( 'span' );
	setAttribute( span, 'svelte-3315280206', '' );
	span.className = "help-block";
	
	appendNode( span, div1 );
	var last_text3 = parameter.description || ''
	var text3 = createText( last_text3 );
	appendNode( text3, span );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},
		
		update: function ( changed, root, eachBlock_value, parameter, index ) {
			var __tmp;
		
			label.htmlFor = "translation-" + ( root.key ) + "-parameter-" + ( index );
			
			if ( ( __tmp = parameter.type ) !== last_text ) {
				text.data = last_text = __tmp;
			}
			
			input.id = "translation-" + ( root.key ) + "-parameter-" + ( index );
			
			if ( ( __tmp = root.exampleParameter && root.exampleParameter[index] || '' ) !== last_input_value ) {
				last_input_value = __tmp;
				input.value = last_input_value;
			}
			
			if ( ( __tmp = parameter.description || '' ) !== last_text3 ) {
				text3.data = last_text3 = __tmp;
			}
		},
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function translation ( options ) {
	options = options || {};
	this._state = options.data || {};
	
	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};
	
	this._handlers = Object.create( null );
	
	this._root = options._root;
	this._yield = options._yield;
	
	this._torndown = false;
	if ( !addedCss ) addCss();
	
	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
}

translation.prototype = template.methods;

translation.prototype.get = function get( key ) {
 	return key ? this._state[ key ] : this._state;
 };

translation.prototype.fire = function fire( eventName, data ) {
 	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
 	if ( !handlers ) return;
 
 	for ( var i = 0; i < handlers.length; i += 1 ) {
 		handlers[i].call( this, data );
 	}
 };

translation.prototype.observe = function observe( key, callback, options ) {
 	var group = ( options && options.defer ) ? this._observers.pre : this._observers.post;
 
 	( group[ key ] || ( group[ key ] = [] ) ).push( callback );
 
 	if ( !options || options.init !== false ) {
 		callback.__calling = true;
 		callback.call( this, this._state[ key ] );
 		callback.__calling = false;
 	}
 
 	return {
 		cancel: function () {
 			var index = group[ key ].indexOf( callback );
 			if ( ~index ) group[ key ].splice( index, 1 );
 		}
 	};
 };

translation.prototype.on = function on( eventName, handler ) {
 	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
 	handlers.push( handler );
 
 	return {
 		cancel: function () {
 			var index = handlers.indexOf( handler );
 			if ( ~index ) handlers.splice( index, 1 );
 		}
 	};
 };

translation.prototype.set = function set( newState ) {
 	this._set( newState );
 	( this._root || this )._flush();
 };

translation.prototype._flush = function _flush() {
 	if ( !this._renderHooks ) return;
 
 	while ( this._renderHooks.length ) {
 		var hook = this._renderHooks.pop();
 		hook.fn.call( hook.context );
 	}
 };

translation.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

translation.prototype.teardown = translation.prototype.destroy = function destroy ( detach ) {
	this.fire( 'teardown' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

function createElement( name ) {
	return document.createElement( name );
}

function setAttribute( node, attribute, value ) {
	node.setAttribute ( attribute, value );
}

function detachNode( node ) {
	node.parentNode.removeChild( node );
}

function insertNode( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function appendNode( node, target ) {
	target.appendChild( node );
}

function createText( data ) {
	return document.createTextNode( data );
}

function addEventListener( node, event, handler ) {
	node.addEventListener ( event, handler, false );
}

function removeEventListener( node, event, handler ) {
	node.removeEventListener ( event, handler, false );
}

function createComment() {
	return document.createComment( '' );
}

function teardownEach( iterations, detach, start ) {
	for ( var i = ( start || 0 ); i < iterations.length; i += 1 ) {
		iterations[i].teardown( detach );
	}
}

function dispatchObservers( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

		var callbacks = group[ key ];
		if ( !callbacks ) continue;

		for ( var i = 0; i < callbacks.length; i += 1 ) {
			var callback = callbacks[i];
			if ( callback.__calling ) continue;

			callback.__calling = true;
			callback.call( component, newValue, oldValue );
			callback.__calling = false;
		}
	}
}

module.exports = translation;

},{}],8:[function(require,module,exports){

},{}],9:[function(require,module,exports){
'use strict'

var document = require('global/document')

module.exports = document.addEventListener ? ready : noop

function ready (callback) {
  var state = document.readyState
  if (state === 'complete' || state === 'interactive') {
    return setTimeout(callback, 0)
  }

  document.addEventListener('DOMContentLoaded', function onLoad () {
    callback()
  })
}

function noop () {}

},{"global/document":11}],10:[function(require,module,exports){
'use strict';

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @api private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {Mixed} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Boolean} exists Only check if there are listeners.
 * @returns {Array|Boolean}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event, exists) {
  var evt = prefix ? prefix + event : event
    , available = this._events[evt];

  if (exists) return !!available;
  if (!available) return [];
  if (available.fn) return [available.fn];

  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
    ee[i] = available[i].fn;
  }

  return ee;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Remove the listeners of a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {Mixed} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
         listeners.fn === fn
      && (!once || listeners.once)
      && (!context || listeners.context === context)
    ) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
           listeners[i].fn !== fn
        || (once && !listeners[i].once)
        || (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {String|Symbol} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if ('undefined' !== typeof module) {
  module.exports = EventEmitter;
}

},{}],11:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":8}],12:[function(require,module,exports){
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false Mustache: true*/

(function defineMustache (global, factory) {
  if (typeof exports === 'object' && exports && typeof exports.nodeName !== 'string') {
    factory(exports); // CommonJS
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], factory); // AMD
  } else {
    global.Mustache = {};
    factory(global.Mustache); // script, wsh, asp
  }
}(this, function mustacheFactory (mustache) {

  var objectToString = Object.prototype.toString;
  var isArray = Array.isArray || function isArrayPolyfill (object) {
    return objectToString.call(object) === '[object Array]';
  };

  function isFunction (object) {
    return typeof object === 'function';
  }

  /**
   * More correct typeof string handling array
   * which normally returns typeof 'object'
   */
  function typeStr (obj) {
    return isArray(obj) ? 'array' : typeof obj;
  }

  function escapeRegExp (string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
  }

  /**
   * Null safe way of checking whether or not an object,
   * including its prototype, has a given property
   */
  function hasProperty (obj, propName) {
    return obj != null && typeof obj === 'object' && (propName in obj);
  }

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var regExpTest = RegExp.prototype.test;
  function testRegExp (re, string) {
    return regExpTest.call(re, string);
  }

  var nonSpaceRe = /\S/;
  function isWhitespace (string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  function escapeHtml (string) {
    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
      return entityMap[s];
    });
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
  function parseTemplate (template, tags) {
    if (!template)
      return [];

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace () {
      if (hasTag && !nonSpace) {
        while (spaces.length)
          delete tokens[spaces.pop()];
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var openingTagRe, closingTagRe, closingCurlyRe;
    function compileTags (tagsToCompile) {
      if (typeof tagsToCompile === 'string')
        tagsToCompile = tagsToCompile.split(spaceRe, 2);

      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
        throw new Error('Invalid tags: ' + tagsToCompile);

      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
    }

    compileTags(tags || mustache.tags);

    var scanner = new Scanner(template);

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(openingTagRe);

      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push([ 'text', chr, start, start + 1 ]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n')
            stripSpace();
        }
      }

      // Match the opening tag.
      if (!scanner.scan(openingTagRe))
        break;

      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === '{') {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = '&';
      } else {
        value = scanner.scanUntil(closingTagRe);
      }

      // Match the closing tag.
      if (!scanner.scan(closingTagRe))
        throw new Error('Unclosed tag at ' + scanner.pos);

      token = [ type, value, start, scanner.pos ];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection)
          throw new Error('Unopened section "' + value + '" at ' + start);

        if (openSection[1] !== value)
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        compileTags(value);
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();

    if (openSection)
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens (tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens (tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      switch (token[0]) {
        case '#':
        case '^':
          collector.push(token);
          sections.push(token);
          collector = token[4] = [];
          break;
        case '/':
          section = sections.pop();
          section[5] = token[2];
          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
          break;
        default:
          collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner (string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function eos () {
    return this.tail === '';
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function scan (re) {
    var match = this.tail.match(re);

    if (!match || match.index !== 0)
      return '';

    var string = match[0];

    this.tail = this.tail.substring(string.length);
    this.pos += string.length;

    return string;
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function scanUntil (re) {
    var index = this.tail.search(re), match;

    switch (index) {
      case -1:
        match = this.tail;
        this.tail = '';
        break;
      case 0:
        match = '';
        break;
      default:
        match = this.tail.substring(0, index);
        this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context (view, parentContext) {
    this.view = view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function push (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function lookup (name) {
    var cache = this.cache;

    var value;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var context = this, names, index, lookupHit = false;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;
          names = name.split('.');
          index = 0;

          /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           **/
          while (value != null && index < names.length) {
            if (index === names.length - 1)
              lookupHit = hasProperty(value, names[index]);

            value = value[names[index++]];
          }
        } else {
          value = context.view[name];
          lookupHit = hasProperty(context.view, name);
        }

        if (lookupHit)
          break;

        context = context.parent;
      }

      cache[name] = value;
    }

    if (isFunction(value))
      value = value.call(this.view);

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer () {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function clearCache () {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function parse (template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null)
      tokens = cache[template] = parseTemplate(template, tags);

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function render (template, view, partials) {
    var tokens = this.parse(template);
    var context = (view instanceof Context) ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate) {
    var buffer = '';

    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = undefined;
      token = tokens[i];
      symbol = token[0];

      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
      else if (symbol === '>') value = this.renderPartial(token, context, partials, originalTemplate);
      else if (symbol === '&') value = this.unescapedValue(token, context);
      else if (symbol === 'name') value = this.escapedValue(token, context);
      else if (symbol === 'text') value = this.rawValue(token);

      if (value !== undefined)
        buffer += value;
    }

    return buffer;
  };

  Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate) {
    var self = this;
    var buffer = '';
    var value = context.lookup(token[1]);

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    function subRender (template) {
      return self.render(template, context, partials);
    }

    if (!value) return;

    if (isArray(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
      }
    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== 'string')
        throw new Error('Cannot use higher-order sections without the original template');

      // Extract the portion of the original template that the section contains.
      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

      if (value != null)
        buffer += value;
    } else {
      buffer += this.renderTokens(token[4], context, partials, originalTemplate);
    }
    return buffer;
  };

  Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate) {
    var value = context.lookup(token[1]);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || (isArray(value) && value.length === 0))
      return this.renderTokens(token[4], context, partials, originalTemplate);
  };

  Writer.prototype.renderPartial = function renderPartial (token, context, partials) {
    if (!partials) return;

    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null)
      return this.renderTokens(this.parse(value), context, partials, value);
  };

  Writer.prototype.unescapedValue = function unescapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return value;
  };

  Writer.prototype.escapedValue = function escapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return mustache.escape(value);
  };

  Writer.prototype.rawValue = function rawValue (token) {
    return token[1];
  };

  mustache.name = 'mustache.js';
  mustache.version = '2.3.0';
  mustache.tags = [ '{{', '}}' ];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function clearCache () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function parse (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function render (template, view, partials) {
    if (typeof template !== 'string') {
      throw new TypeError('Invalid template! Template should be a "string" ' +
                          'but "' + typeStr(template) + '" was given as the first ' +
                          'argument for mustache#render(template, view, partials)');
    }

    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.,
  /*eslint-disable */ // eslint wants camel cased function name
  mustache.to_html = function to_html (template, view, partials, send) {
    /*eslint-enable*/

    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

  return mustache;
}));

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
const EventEmitter = require('eventemitter3')

const emitter = new EventEmitter()

let counter = 0

emitter.on('yolo2', stuff => {
	counter++
	console.log('yolo2', counter)
	console.log(stuff)
})

module.exports = emitter

},{"eventemitter3":10}]},{},[1]);
