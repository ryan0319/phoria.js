/**
 * @fileoverview phoria - 3D Entity objects. Base class for chained matrix operations. Concrete Entity implementations.
 * @author Kevin Roast
 * @date 13th April 2013
 */

/* globals define */
define(function(require, exports, module) {
  'use strict';

  var GlMatrix = require('./GlMatrix');
  var Util = require('./Util');
  var BaseLight = require('./BaseLight');

   /**
    * DistantLight models an infinitely distant light that has no position only a normalised direction from which light eminates.
    */
   var DistantLight = function()
   {
      DistantLight.superclass.constructor.call(this);
      
      // direction should be a normalised vector
      this.direction = {x:0, y:0, z:1};
      
      // add scene handler to transform the light direction into world direction
      this.onScene(this.transformToScene);
      
      return this;
   };
   
   /**
    * Factory create method - object literal Light descripton
    */
   DistantLight.create = function create(desc)
   {
      // merge structures to generate entity
      var e = new DistantLight();
      BaseEntity.create(desc, e);
      if (desc.color) e.color = desc.color;
      if (desc.intensity) e.intensity = desc.intensity;
      if (desc.direction) e.direction = GlMatrix.vec3.toXYZ(GlMatrix.vec3.normalize(e.direction, GlMatrix.vec3.fromXYZ(desc.direction)));
      
      return e;
   };
   
   Util.extend(DistantLight, BaseLight, {
      // light direction
      direction: null,
      worlddirection: null,
      
      transformToScene: function transformToScene()
      {
         this.worlddirection = GlMatrix.vec3.fromValues(
            -this.direction.x,
            -this.direction.y,
            -this.direction.z);
      }
   });

   module.exports = DistantLight;
});