/*!
 * @overview RSVP - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/tildeio/rsvp.js/master/LICENSE
 * @version   3.0.14
 */

(function(){function O(a,b){if(a&&"object"===typeof a&&a.constructor===this)return a;var c=new this(s,b);q(c,a);return c}function z(a,b,c){1===F.push({name:a,t:{key:b.v,id:b.n,G:a,detail:b.b,B:c&&c.n,label:b.q,timeStamp:P(),error:h["instrument-with-stack"]?Error(b.q):null}})&&da()}function Q(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1}function I(a){var b=a.r;b||(b=a.r={});return b}function R(a,b){if("onerror"===a)h.on("error",b);else if(2===arguments.length)h[a]=b;else return h[a]}
function A(a){return"function"===typeof a}function S(){}function da(){setTimeout(function(){for(var a,b=0;b<F.length;b++){a=F[b];var c=a.t;c.H=c.key+c.id;c.F=c.key+c.B;c.error&&(c.stack=c.error.stack);h.trigger(a.name,a.t)}F.length=0},50)}function s(){}function ea(a,b,c,d){try{a.call(b,c,d)}catch(e){return e}}function fa(a,b,c){h.async(function(a){var e=!1,f=ea(c,b,function(c){e||(e=!0,b!==c?q(a,c):n(a,c))},function(b){e||(e=!0,m(a,b))});!e&&f&&(e=!0,m(a,f))},a)}function ga(a,b){1===b.a?n(a,b.b):
2===a.a?m(a,b.b):G(b,void 0,function(c){b!==c?q(a,c):n(a,c)},function(b){m(a,b)})}function q(a,b){if(a===b)n(a,b);else if("function"===typeof b||"object"===typeof b&&null!==b)if(b.constructor===a.constructor)ga(a,b);else{var c;try{c=b.then}catch(d){H.error=d,c=H}c===H?m(a,H.error):void 0===c?n(a,b):A(c)?fa(a,b,c):n(a,b)}else n(a,b)}function ha(a){a.d&&a.d(a.b);J(a)}function n(a,b){void 0===a.a&&(a.b=b,a.a=1,0===a.i.length?h.g&&z("fulfilled",a):h.async(J,a))}function m(a,b){void 0===a.a&&(a.a=2,a.b=
b,h.async(ha,a))}function G(a,b,c,d){var e=a.i,f=e.length;a.d=null;e[f]=b;e[f+1]=c;e[f+2]=d;0===f&&a.a&&h.async(J,a)}function J(a){var b=a.i,c=a.a;h.g&&z(1===c?"fulfilled":"rejected",a);if(0!==b.length){for(var d,e,f=a.b,g=0;g<b.length;g+=3)d=b[g],e=b[g+c],d?T(c,d,e,f):e(f);a.i.length=0}}function U(){this.error=null}function T(a,b,c,d){var e=A(c),f,g,h,l;if(e){try{f=c(d)}catch(k){K.error=k,f=K}f===K?(l=!0,g=f.error,f=null):h=!0;if(b===f){m(b,new TypeError("A promises callback cannot return that same promise."));
return}}else f=d,h=!0;void 0===b.a&&(e&&h?q(b,f):l?m(b,g):1===a?n(b,f):2===a&&m(b,f))}function ia(a,b){try{b(function(b){q(a,b)},function(b){m(a,b)})}catch(c){m(a,c)}}function V(a,b,c){return 1===a?{state:"fulfilled",value:c}:{state:"rejected",reason:c}}function k(a,b,c,d){this.w=a;this.c=new a(s,d);this.u=c;this.s(b)?(this.p=b,this.e=this.length=b.length,this.o(),0===this.length?n(this.c,this.b):(this.length=this.length||0,this.m(),0===this.e&&n(this.c,this.b))):m(this.c,this.j())}function r(a,b){this.n=
ja++;this.q=b;this.b=this.a=void 0;this.i=[];h.g&&z("created",this);if(s!==a){if(!A(a))throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");if(!(this instanceof r))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");ia(this,a)}}function W(){this.value=void 0}function X(a,b,c){try{a.apply(b,c)}catch(d){return (w.value = d, w)}}function ka(a,b){return{then:function(c,
d){return a.call(b,c,d)}}}function la(a,b,c,d){b=X(c,d,b);b===w&&m(a,b.value);return a}function ma(a,b,c,d){return l.all(b).then(function(b){b=X(c,d,b);b===w&&m(a,b.value);return a})}function B(a,b,c){this.f(a,b,!1,c)}function t(a,b,c){this.f(a,b,!0,c)}function C(a,b,c){this.f(a,b,!1,c)}function na(){return function(){process.nextTick(D)}}function oa(){return function(){vertxNext(D)}}function pa(){var a=0,b=new Y(D),c=document.createTextNode("");b.observe(c,{characterData:!0});return function(){c.data=
a=++a%2}}function qa(){var a=new MessageChannel;a.port1.onmessage=D;return function(){a.port2.postMessage(0)}}function Z(){return function(){setTimeout(D,1)}}function D(){for(var a=0;a<u;a+=2)(0,x[a])(x[a+1]),x[a]=void 0,x[a+1]=void 0;u=0}function $(){h.on.apply(h,arguments)}var aa={mixin:function(a){a.on=this.on;a.off=this.off;a.trigger=this.trigger;a.r=void 0;return a},on:function(a,b){var c=I(this),d;(d=c[a])||(d=c[a]=[]);-1===Q(d,b)&&d.push(b)},off:function(a,b){var c=I(this),d;b?(c=c[a],d=Q(c,
b),-1!==d&&c.splice(d,1)):c[a]=[]},trigger:function(a,b){var c,d;if(c=I(this)[a])for(var e=0;e<c.length;e++)d=c[e],d(b)}},h={g:!1};aa.mixin(h);var L=Array.isArray?Array.isArray:function(a){return"[object Array]"===Object.prototype.toString.call(a)},P=Date.now||function(){return(new Date).getTime()},E=Object.create||function(a){if(1<arguments.length)throw Error("Second argument not supported");if("object"!==typeof a)throw new TypeError("Argument must be an object");S.prototype=a;return new S},F=[],
H=new U,K=new U;k.prototype.s=function(a){return L(a)};k.prototype.j=function(){return Error("Array Methods must be provided an Array")};k.prototype.o=function(){this.b=Array(this.length)};k.prototype.m=function(){for(var a=this.length,b=this.c,c=this.p,d=0;void 0===b.a&&d<a;d++)this.l(c[d],d)};k.prototype.l=function(a,b){var c=this.w;"object"===typeof a&&null!==a?a.constructor===c&&void 0!==a.a?(a.d=null,this.k(a.a,b,a.b)):this.A(c.resolve(a),b):(this.e--,this.b[b]=this.h(1,b,a))};k.prototype.k=
function(a,b,c){var d=this.c;void 0===d.a&&(this.e--,this.u&&2===a?m(d,c):this.b[b]=this.h(a,b,c));0===this.e&&n(d,this.b)};k.prototype.h=function(a,b,c){return c};k.prototype.A=function(a,b){var c=this;G(a,void 0,function(a){c.k(1,b,a)},function(a){c.k(2,b,a)})};var y="rsvp_"+P()+"-",ja=0,l=r;r.D=O;r.all=function(a,b){return(new k(this,a,!0,b)).c};r.race=function(a,b){function c(a){q(e,a)}function d(a){m(e,a)}var e=new this(s,b);if(!L(a))return (m(e,new TypeError("You must pass an array to race.")), e);for(var f=a.length,g=0;void 0===e.a&&g<f;g++)G(this.resolve(a[g]),void 0,c,d);return e};r.resolve=O;r.reject=function(a,b){var c=new this(s,b);m(c,a);return c};r.prototype={constructor:r,v:y,d:function(a){h.trigger("error",a)},then:function(a,b,c){var d=this.a;if(1===d&&!a||2===d&&!b)return (h.g&&z("chained",this,this), this);this.d=null;var e=new this.constructor(s,c),f=this.b;h.g&&z("chained",this,e);if(d){var g=arguments[d-1];h.async(function(){T(d,e,g,f)})}else G(this,e,a,b);return e},"catch":function(a,
b){return this.then(null,a,b)}};var w=new W,ba=new W;B.prototype=E(k.prototype);B.prototype.f=k;B.prototype.h=V;B.prototype.j=function(){return Error("allSettled must be called with an array")};t.prototype=E(k.prototype);t.prototype.f=k;t.prototype.o=function(){this.b={}};t.prototype.s=function(a){return a&&"object"===typeof a};t.prototype.j=function(){return Error("Promise.hash must be called with an object")};t.prototype.m=function(){var a=this.c,b=this.p,c=[],d;for(d in b)void 0===a.a&&b.hasOwnProperty(d)&&
c.push({position:d,C:b[d]});this.e=b=c.length;for(var e=0;void 0===a.a&&e<b;e++)d=c[e],this.l(d.C,d.position)};C.prototype=E(t.prototype);C.prototype.f=k;C.prototype.h=V;C.prototype.j=function(){return Error("hashSettled must be called with an object")};var u=0,y=(E="undefined"!==typeof window?window:void 0)||{},Y=y.MutationObserver||y.WebKitMutationObserver,y="undefined"!==typeof Uint8ClampedArray&&"undefined"!==typeof importScripts&&"undefined"!==typeof MessageChannel,x=Array(1E3),ca,p;if("undefined"!==
typeof process&&"[object process]"==={}.toString.call(process))p=na();else if(Y)p=pa();else if(y)p=qa();else if(void 0===E&&"function"===typeof require)try{require("vertx"),p=oa()}catch(ra){p=Z()}else p=Z();ca=p;h.async=function(a,b){x[u]=a;x[u+1]=b;u+=2;2===u&&ca()};if("undefined"!==typeof window&&"object"===typeof window.__PROMISE_INSTRUMENTATION__){p=window.__PROMISE_INSTRUMENTATION__;R("instrument",!0);for(var M in p)p.hasOwnProperty(M)&&$(M,p[M])}var N={race:function(a,b){return l.race(a,b)},
Promise:l,allSettled:function(a,b){return(new B(l,a,b)).c},hash:function(a,b){return(new t(l,a,b)).c},hashSettled:function(a,b){return(new C(l,a,b)).c},denodeify:function(a,b){function c(){for(var c=arguments.length,e=Array(c+1),f,g=!1,h=0;h<c;++h){f=arguments[h];if(!g){if(f&&"object"===typeof f){var k;if(f.constructor===l)k=!0;else try{k=f.then}catch(n){w.value=n,k=w}g=k}else g=!1;if(g===ba)return (c=new l(s), m(c,ba.value), c);g&&!0!==g&&(f=ka(g,f))}e[h]=f}var v=new l(s);e[c]=function(a,c){if(a)m(v,
a);else if(void 0===b)q(v,c);else if(!0===b){for(var d=arguments,e=d.length,f=Array(e-1),g=1;g<e;g++)f[g-1]=d[g];q(v,f)}else if(L(b)){for(var f=arguments,d={},g=f.length,e=Array(g),h=0;h<g;h++)e[h]=f[h];for(g=0;g<b.length;g++)f=b[g],d[f]=e[g+1];q(v,d)}else q(v,c)};return g?ma(v,e,a,this):la(v,e,a,this)}c.__proto__=a;return c},on:$,off:function(){h.off.apply(h,arguments)},map:function(a,b,c){return l.all(a,c).then(function(a){if(!A(b))throw new TypeError("You must pass a function as map's second argument.");
for(var e=a.length,f=Array(e),g=0;g<e;g++)f[g]=b(a[g]);return l.all(f,c)})},filter:function(a,b,c){return l.all(a,c).then(function(a){if(!A(b))throw new TypeError("You must pass a function as filter's second argument.");for(var e=a.length,f=Array(e),g=0;g<e;g++)f[g]=b(a[g]);return l.all(f,c).then(function(b){for(var c=Array(e),f=0,g=0;g<e;g++)b[g]&&(c[f]=a[g],f++);c.length=f;return c})})},resolve:function(a,b){return l.resolve(a,b)},reject:function(a,b){return l.reject(a,b)},all:function(a,b){return l.all(a,
b)},rethrow:function(a){setTimeout(function(){throw a;});throw a;},defer:function(a){var b={};b.promise=new l(function(a,d){b.resolve=a;b.reject=d},a);return b},EventTarget:aa,configure:R,async:function(a,b){h.async(a,b)}};"function"===typeof define&&define.amd?define(function(){return N}):"undefined"!==typeof module&&module.exports?module.exports=N:"undefined"!==typeof this&&(this.RSVP=N)}).call(this);



/*!
* basket.js
* v0.5.1 - 2014-08-16
* http://addyosmani.github.com/basket.js
* (c) Addy Osmani;  License
* Created by: Addy Osmani, Sindre Sorhus, Andrée Hansson, Mat Scales
* Contributors: Ironsjp, Mathias Bynens, Rick Waldron, Felipe Morais
* Uses rsvp.js, https://github.com/tildeio/rsvp.js
*/(function( window, document ) {
	'use strict';

	var head = document.head || document.getElementsByTagName('head')[0];
	var storagePrefix = 'basket-';
	var defaultExpiration = 5000;

	var addLocalStorage = function( key, storeObj ) {
		try {
			localStorage.setItem( storagePrefix + key, JSON.stringify( storeObj ) );
			return true;
		} catch( e ) {
			if ( e.name.toUpperCase().indexOf('QUOTA') >= 0 ) {
				var item;
				var tempScripts = [];

				for ( item in localStorage ) {
					if ( item.indexOf( storagePrefix ) === 0 ) {
						tempScripts.push( JSON.parse( localStorage[ item ] ) );
					}
				}

				if ( tempScripts.length ) {
					tempScripts.sort(function( a, b ) {
						return a.stamp - b.stamp;
					});

					basket.remove( tempScripts[ 0 ].key );

					return addLocalStorage( key, storeObj );

				} else {
					// no files to remove. Larger than available quota
					return;
				}

			} else {
				// some other error
				return;
			}
		}

	};

	var getUrl = function( url ) {
		var promise = new RSVP.Promise( function( resolve, reject ){

			var xhr = new XMLHttpRequest();
			xhr.open( 'GET', url );

			xhr.onreadystatechange = function() {
				if ( xhr.readyState === 4 ) {
					if( xhr.status === 200 ) {
						resolve( {
							content: xhr.responseText,
							type: xhr.getResponseHeader('content-type')
						} );
					} else {
						reject( new Error( xhr.statusText ) );
					}
				}
			};

			// By default XHRs never timeout, and even Chrome doesn't implement the
			// spec for xhr.timeout. So we do it ourselves.
			setTimeout( function () {
				if( xhr.readyState < 4 ) {
					xhr.abort();
				}
			}, basket.timeout );

			xhr.send();
		});

		return promise;
	};

	var saveUrl = function( obj ) {
		return getUrl( obj.url ).then( function( result ) {
			var storeObj = wrapStoreData( obj, result );

			if (!obj.skipCache) {
				addLocalStorage( obj.key , storeObj );
			}

			return storeObj;
		});
	};

	var wrapStoreData = function( obj, data ) {
		var now = +new Date();
		obj.data = data.content;
		obj.originalType = data.type;
		obj.type = obj.type || data.type;
		obj.skipCache = obj.skipCache || false;
		obj.stamp = now;
		obj.expire = now + ( ( obj.expire || defaultExpiration ) * 60 * 60 * 1000 );

		return obj;
	};

	var isCacheValid = function(source, obj) {
		return !source ||
			source.expire - +new Date() < 0  ||
			obj.unique !== source.unique ||
			(basket.isValidItem && !basket.isValidItem(source, obj));
	};

	var handleStackObject = function( obj ) {
		var source, promise, shouldFetch;

		if ( !obj.url ) {
			return;
		}

		obj.key =  ( obj.key || obj.url );
		source = basket.get( obj.key );

		obj.execute = obj.execute !== false;

		shouldFetch = isCacheValid(source, obj);

		if( obj.live || shouldFetch ) {
			if ( obj.unique ) {
				// set parameter to prevent browser cache
				obj.url += ( ( obj.url.indexOf('?') > 0 ) ? '&' : '?' ) + 'basket-unique=' + obj.unique;
			}
			promise = saveUrl( obj );

			if( obj.live && !shouldFetch ) {
				promise = promise
					.then( function( result ) {
						// If we succeed, just return the value
						// RSVP doesn't have a .fail convenience method
						return result;
					}, function() {
						return source;
					});
			}
		} else {
			source.type = obj.type || source.originalType;
			promise = new RSVP.Promise( function( resolve ){
				resolve( source );
			});
		}

		return promise;
	};

	var injectScript = function( obj ) {
		var script = document.createElement('script');
		script.defer = true;
		// Have to use .text, since we support IE8,
		// which won't allow appending to a script
		script.text = obj.data;
		head.appendChild( script );
	};

	var handlers = {
		'default': injectScript
	};

	var execute = function( obj ) {
		if( obj.type && handlers[ obj.type ] ) {
			return handlers[ obj.type ]( obj );
		}

		return handlers['default']( obj ); // 'default' is a reserved word
	};

	var performActions = function( resources ) {
		resources.map( function( obj ) {
			if( obj.execute ) {
				execute( obj );
			}

			return obj;
		} );
	};

	var fetch = function() {
		var i, l, promises = [];

		for ( i = 0, l = arguments.length; i < l; i++ ) {
			promises.push( handleStackObject( arguments[ i ] ) );
		}

		return RSVP.all( promises );
	};

	var thenRequire = function() {
		var resources = fetch.apply( null, arguments );
		var promise = this.then( function() {
			return resources;
		}).then( performActions );
		promise.thenRequire = thenRequire;
		return promise;
	};

	window.basket = {
		require: function() {
			var promise = fetch.apply( null, arguments ).then( performActions );

			promise.thenRequire = thenRequire;
			return promise;
		},

		remove: function( key ) {
			localStorage.removeItem( storagePrefix + key );
			return this;
		},

		get: function( key ) {
			var item = localStorage.getItem( storagePrefix + key );
			try	{
				return JSON.parse( item || 'false' );
			} catch( e ) {
				return false;
			}
		},

		clear: function( expired ) {
			var item, key;
			var now = +new Date();

			for ( item in localStorage ) {
				key = item.split( storagePrefix )[ 1 ];
				if ( key && ( !expired || this.get( key ).expire <= now ) ) {
					this.remove( key );
				}
			}

			return this;
		},

		isValidItem: null,

		timeout: 5000,

		addHandler: function( types, handler ) {
			if( !Array.isArray( types ) ) {
				types = [ types ];
			}
			types.forEach( function( type ) {
				handlers[ type ] = handler;
			});
		},

		removeHandler: function( types ) {
			basket.addHandler( types, undefined );
		}
	};

	// delete expired keys
	basket.clear( true );

})( this, document );
