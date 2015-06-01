/**
 * @fileoverview phoria - 3D Entity objects. Base class for chained matrix operations. Concrete Entity implementations.
 * @author Kevin Roast
 * @date 13th April 2013
 */

/* globals define */
define(function(require, exports, module) {
  'use strict';

  var Util = require('./Util');
  var BaseEntity = require('./BaseEntity');

   /**
    * BaseLight is the base that the Light classes extend from. Provides RGB color and light intensity properties.
    */
   var BaseLight = function()
   {
      BaseLight.superclass.constructor.call(this);
      
      this.color = [1.0, 1.0, 1.0];
      this.intensity = 1.0;
      
      return this;
   };
   
   Util.extend(BaseLight, BaseEntity, {
      // [r,g,b] - note! light colour component levels are specified from 0.0 - 1.0
      color: null,
      
      // {Number} light intensity typically between 0-1
      intensity: 0.0
   });

   module.exports = BaseLight;
});