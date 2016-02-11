'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isNumber = require( 'validate.io-number-primitive' );
var isPositiveInteger = require( 'validate.io-positive-integer' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {Number} [options.max_terms] - maximum number of terms
* @param {Number} [options.tolerance] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {Number} [options.init] - whether to keep the leading b term
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'max_terms' ) ) {
		opts.max_terms = options.max_terms;
		if ( !isPositiveInteger( opts.max_terms ) ) {
			return new TypeError( 'invalid option. Maximum iterations option must be an integer. Option: `' + opts.max_terms + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'tolerance' ) ) {
		opts.tolerance = options.tolerance;
		if ( !isNumber( opts.tolerance ) ) {
			return new TypeError( 'invalid option. Tolerance option must be a number primitive. Option: `' + opts.tolerance + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'init' ) ) {
		opts.init = options.init;
		if ( !isNumber( opts.init ) ) {
			return new TypeError( 'invalid option. Initial value option must be a number primitive. Option: `' + opts.init + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
