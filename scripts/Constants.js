/* globals define */
define(function(require, exports, module) {
  'use strict';
   
   var Constants = {};
   
   // Global static Constants constants
   Constants.RADIANS = Math.PI/180.0;
   Constants.TWOPI = Math.PI*2;
   Constants.ONEOPI = 1.0/Math.PI;
   Constants.PIO2 = Math.PI/2;
   Constants.PIO4 = Math.PI/4;
   Constants.EPSILON = 0.000001;

   module.exports = Constants;
});