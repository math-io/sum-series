'use strict';

// MODULES //

var abs = require( 'math-abs' );
var validate = require( './validate.js' );


// SUM SERIES //

/**
* FUNCTION: sum_series( generator[, opts] )
*	Sums the element of the series given by the supplied function.
*
* @param {Function} generator - series function
* @param {Object} [opts] - function options
* @param {Number} [opts.max_terms=1000] - maximum number of terms to be added
* @param {Number} [opts.tolerance=1e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {Number} [opts.init=0] - initial value of the resulting sum
* @returns {Number} sum of all series terms
*/
function sum_series( generator, options ) {
	var opts = {};
	var err;
	var tolerance;
	var max_terms;
	var init_value;
	var counter;
	var result;
	var next_term;

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	tolerance = opts.tolerance || 1e-16;
	max_terms = opts.max_terms || 1000;
	init_value = opts.init !== undefined ? opts.init : 0;

	counter = max_terms;
	result = init_value;

	// Repeatedly call function...
	do {
		next_term = generator();
		result += next_term;
	}
	while( ( abs(tolerance * result) < abs(next_term) ) && --counter );
	
	return result;
} // end FUNCTION sum_series()


// EXPORTS //

module.exports = sum_series;
