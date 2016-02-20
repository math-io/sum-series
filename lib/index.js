'use strict';

// VARIABLES //

var hasGeneratorsSupport = require( 'detect-generator-support' )();


// EXPORTS //

module.exports = hasGeneratorsSupport ? require( './generators.js' ) : require( './basic.js' );
