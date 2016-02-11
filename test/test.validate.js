'use strict';

// MODULES //

var tape = require( 'tape' );
var validate = require( './../lib/validate.js' );


// TESTS //

tape( 'file exports a validation function', function test( t ) {
	t.equal( typeof validate, 'function', 'file exports a function' );
	t.end();
});

tape( 'if an options argument is not an object, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, values[i] );
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided a `max_terms` option which is not a positive integer, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		2.3,
		-2,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'max_terms': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided a `tolerance` option which is not a number primitive, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'tolerance': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided a `init` option which is not a number primitive, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		false,
		NaN,
		null,
		undefined,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'init': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'the function returns `null` if all options are valid', function test( t ) {
	var err;

	err = validate( {}, {
		'max_terms': 300,
		'tolerance': 1e-9,
		'init': 2
	});
	t.equal( err, null, 'returns null' );

	t.end();
});

tape( 'the function will ignore unrecognized options', function test( t ) {
	var err;

	err = validate( {}, {
		'beep': 'boop',
		'a': 5,
		'b': null,
		'c': 'woot'
	});
	t.equal( err, null, 'returns null' );

	t.end();
});
