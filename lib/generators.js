'use strict';

// MODULES //

var abs = require( 'math-abs' );


// CONSTANTS //

var TOLERANCE = require( 'const-eps-float64' );
var MAX_TERMS = 1000000;


// SUM SERIES //

/**
* FUNCTION: sum_series( generator[, opts] )
*	Sums the element of the series given by the supplied function.
*
* @param {Function} generator - series function
* @param {Object} [opts] - function options
* @param {Number} [opts.max_terms=1000000] - maximum number of terms to be added
* @param {Number} [opts.tolerance=2.22e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {Number} [opts.init=0] - initial value of the resulting sum
* @returns {Number} sum of all series terms
*/
function sum_series( generator, options ) {
	var opts = {};
	var tolerance;
	var isgenerator;
	var counter;
	var result;
	var next_term;

	if ( arguments.length > 1 ) {
		opts = options;
	}
	tolerance = opts.tolerance || TOLERANCE;
	counter = opts.max_terms || MAX_TERMS;
	result = opts.init || 0;

	isgenerator = typeof generator.next === 'function';
	if ( isgenerator === true ) {
		// Case A: Iterate over generator object created by a generator function...
		for ( next_term of generator ) {
			result += next_term;
			if ( (abs(tolerance * result) >= abs(next_term) ) || --counter === 0 ) {
				break;
			}
		}
	} else {
		// Case B: Repeatedly call function...
		do {
			next_term = generator();
			result += next_term;
		}
		while( ( abs(tolerance * result) < abs(next_term) ) && --counter );
	}
	return result;
} // end FUNCTION sum_series()


// EXPORTS //

module.exports = sum_series;
