'use strict';

// MODULES //

var abs = require( 'math-abs' );
var log1p = require( 'math-float64-log1p' );
var proxyquire = require( 'proxyquire' );
var tape = require( 'tape' );
var sumSeries = require( './../lib/' );
var sumSeriesBasic = proxyquire( './../lib/', {
	'detect-generator-support': function(){ return false; }
});

// VARIABLES //

var hasGeneratorsSupport = require( 'detect-generator-support' )();


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof sumSeries, 'function', 'main export is a function' );
	t.end();
});

// Run generator function tests if environment supports `function*()`...

if ( hasGeneratorsSupport ) {
	require( './es2015/test.generator.js' );
}

tape( 'the function calculates the sum of an infinite series provided by a closure', function test( t ) {
	// log1p( 0.5 ):
	var actual = sumSeries( closure( 0.5 ) );
	var expected = log1p( 0.5 );

	t.ok( abs( actual - expected ) < 1e-14, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + expected + '.' );
	t.end();

	function closure( x ) {
		var k = 0;
		var m_mult = -x;
		var m_prod = -1;
		return function() {
			m_prod *= m_mult;
			return ( m_prod / ++k );
		};
	}
});

tape( 'the function calculates the sum of an infinite series provided by a closure (when generators are not supported)', function test( t ) {
	// log1p( 0.5 ):
	var actual = sumSeriesBasic( closure( 0.5 ) );
	var expected = log1p( 0.5 );

	t.ok( abs( actual - expected ) < 1e-14, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + expected + '.' );
	t.end();

	function closure( x ) {
		var k = 0;
		var m_mult = -x;
		var m_prod = -1;
		return function() {
			m_prod *= m_mult;
			return ( m_prod / ++k );
		};
	}
});

tape( 'the function calculates the sum of an infinite series with a specified initial value', function test( t ) {
	// log1p( 0.5 ) + 2:
	var actual = sumSeries( closure( 0.5 ), 2 );
	var expected = log1p( 0.5 ) + 2;

	t.ok( abs( actual - expected ) < 1e-14, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + expected + '.' );
	t.end();

	function closure( x ) {
		var k = 0;
		var m_mult = -x;
		var m_prod = -1;
		return function() {
			m_prod *= m_mult;
			return ( m_prod / ++k );
		};
	}
});

tape( 'the function calculates the sum of an infinite series with a specified initial value (when generators are not supported)', function test( t ) {
	// log1p( 0.5 ) + 2:
	var actual = sumSeriesBasic( closure( 0.5 ), 2 );
	var expected = log1p( 0.5 ) + 2;

	t.ok( abs( actual - expected ) < 1e-14, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + expected + '.' );
	t.end();

	function closure( x ) {
		var k = 0;
		var m_mult = -x;
		var m_prod = -1;
		return function() {
			m_prod *= m_mult;
			return ( m_prod / ++k );
		};
	}
});
