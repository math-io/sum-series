sum-series
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the sum of an [infinite series][infinite-series].


## Installation

``` bash
$ npm install math-sum-series
```


## Usage

``` javascript
var sumSeries = require( 'math-sum-series' );
```

#### sumSeries( generator[, opts ] )

Computes the sum of the series given by the supplied `generator` argument. `generator` can be either an ES6 [Generator object][es6-generator] or a function which
returns successive elements of the series at each invocation.

Using an ES6 [Generator object][es6-generator]:

```javascript
var gen = geometricSeriesGenerator( 0.9 );
var out = sumSeries( gen );
// returns 10

function* geometricSeriesGenerator( x ) {
	var exponent = 0;
	while ( true ) {
		yield Math.pow( x, exponent );
		exponent += 1;
	}
}
```

Alternatively, one can use a closure to achieve the same goal:

```javascript
var gen = geometricSeriesClosure( 0.9 )
var out = sumSeries( gen );
// returns 10

function geometricSeriesClosure( x ) {
	var exponent = -1;
	return function() {
		exponent += 1;
		return Math.pow( x, exponent );
	};
}
```

The `function` accepts the following `options`:
*	__max_terms__: integer denoting the maximum number of terms to be summed. Default: `1000`.
*	__tolerance__: number primitive specifying the tolerance used to assess convergence. Default: `1e-16`.
*	__init__: number primitive specifying the initial value of the returned sum. Default: `0`.

By default, the initial value of the sum is `0`. To choose a different one, use the `init` option.

```javascript
var out = continued_fraction( geometricSeriesGenerator( 0.5 ), {
	'init': 1
});
// returns 3
```

To change the maximum number of terms to be summed, set the `max_terms` option.

```javascript
var out = continued_fraction( geometricSeriesGenerator( 0.5 ), {
	'max_terms': 10
});
// returns ~1.998 (infinite sum is 2)
```

The default tolerance of `1e-16` used to assess convergence can be changed via the `tolerance` option.

```javascript
var out = continued_fraction( geometricSeriesGenerator( 0.5 ), {
	'tolerance': 1e-3
});
// returns ~1.998
```

## Examples

``` javascript
var log1p = require( 'math-float64-log1p' );
var sumSeries = require( 'math-sum-series' );

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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. The [Compute.io][compute-io] Authors.


[npm-image]: http://img.shields.io/npm/v/math-evalrational.svg
[npm-url]: https://npmjs.org/package/math-sum-series

[build-image]: http://img.shields.io/travis/math-io/sum-series/master.svg
[build-url]: https://travis-ci.org/math-io/sum-series

[coverage-image]: https://img.shields.io/codecov/c/github/math-io/sum-series/master.svg
[coverage-url]: https://codecov.io/github/math-io/sum-series?branch=master

[dependencies-image]: http://img.shields.io/david/math-io/sum-series.svg
[dependencies-url]: https://david-dm.org/math-io/sum-series

[dev-dependencies-image]: http://img.shields.io/david/dev/math-io/sum-series.svg
[dev-dependencies-url]: https://david-dm.org/dev/math-io/sum-series

[github-issues-image]: http://img.shields.io/github/issues/math-io/sum-series.svg
[github-issues-url]: https://github.com/math-io/sum-series/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[infinite-series]: https://en.wikipedia.org/wiki/Series_%28mathematics%29
[es6-generator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
[compute-io]: https://github.com/compute-io
