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
	var counter;
	var result;
	var next_term;

	init_value = init !== undefined ? init : 0;

	counter = MAX_TERMS;
	result = init_value;
	// Repeatedly call function...
	do {
		next_term = generator();
		result += next_term;
	}
	while( ( abs(TOLERANCE * result) < abs(next_term) ) && --counter );

	return result;
} // end FUNCTION sum_series()


// EXPORTS //

module.exports = sum_series;
