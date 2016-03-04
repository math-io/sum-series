'use strict';

// MODULES //

var abs = require( 'math-abs' );


// CONSTANTS //

var TOLERANCE = require( 'const-eps-float64' );
var MAX_TERMS = 1000000;


// SUM SERIES //

/**
* FUNCTION: sum_series( generator[, init] )
*	Sums the element of the series given by the supplied function.
*
* @param {Function} generator - series function
* @param {Number} [init=0] - initial value of the resulting sum
* @returns {Number} sum of all series terms
*/
function sum_series( generator, init ) {
	var init_value;
	var isgenerator;
	var counter;
	var result;
	var next_term;
	init_value = init !== undefined ? init : 0;

	counter = MAX_TERMS;
	result = init_value;

	isgenerator = typeof generator.next === 'function';
	if ( isgenerator === true ) {
		// Case A: Iterate over generator object created by a generator function...
		for ( next_term of generator ) {
			result += next_term;
			if ( (abs(TOLERANCE * result) >= abs(next_term) ) || --counter === 0 ) {
				break;
			}
		}
	} else {
		// Case B: Repeatedly call function...
		do {
			next_term = generator();
			result += next_term;
		}
		while( ( abs(TOLERANCE * result) < abs(next_term) ) && --counter );
	}
	return result;
} // end FUNCTION sum_series()


// EXPORTS //

module.exports = sum_series;
