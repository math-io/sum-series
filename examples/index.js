'use strict';

var log1p = require( 'math-float64-log1p' );
var sumSeries = require( './../lib' );

function* log1p_series( x ) {
	var k = 0;
	var m_mult = -x;
	var m_prod = -1;
	while ( true ) {
		m_prod *= m_mult;
		yield ( m_prod / ++k );
	}
}

console.log( 'log1p(0.5) evaluated via math-log1p module: %d', log1p( 0.5 ) );
console.log( 'log1p(0.5) evaluated via infinite series expansion: %d', sumSeries( log1p_series( 0.5 ) ) );
