'use strict';

// MODULES //

var abs = require( 'math-abs' );
var log1p = require( 'math-float64-log1p' );
var tape = require( 'tape' );
var sumSeries = require( './../../lib/' );


// TESTS //

tape( 'the function calculates the sum of an infinite series provided by a generator', function test( t ) {
	// log1p( 0.5 ):
	var actual = sumSeries( generator( 0.5 ) );
	var expected = log1p( 0.5 );

	t.ok( abs( actual - expected ) < 1e-14, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + expected + '.' );
	t.end();

	function* generator( x ) {
		var k = 0;
		var m_mult = -x;
		var m_prod = -1;
		while ( true ) {
			m_prod *= m_mult;
			yield ( m_prod / ++k );
		}
	}
});
