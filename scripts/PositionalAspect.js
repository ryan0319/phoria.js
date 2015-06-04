/**
 * @fileoverview phoria - PositionalAspect.
 * @author Kevin Roast
 * @date 13th April 2013
 */

/* globals define */
define(function(require, exports, module) {
  'use strict';

  var GlMatrix = require('./GlMatrix');
   
   var PositionalAspect = {};
   
   /**
    * The PositionalAspect has defines a prototype for objects that may not be rendered directly (i.e. do not need
    * to have a visible entity) but do represent a position in the scene.
    * 
    * Augment a prototype with this aspect to provide an easy way to keep track of a it's position in the scene after
    * matrix transformations have occured. Examine worldposition at runtime (ensure not null) to get current position.
    * 
    * Set the initial position on object construction if the entity is not positioned at the origin by default.
    */
   PositionalAspect.prototype =
   {
      // {xyz} the position of the entity
      position: null,
      // {vec4} the transformed world position of the entity
      worldposition: null,
      
      updatePosition: function updatePosition(matLocal)
      {
         // update worldposition position of emitter by local transformation -> world
         var vec = GlMatrix.vec4.fromXYZ(this.position, 1);
         GlMatrix.vec4.transformMat4(vec, vec, matLocal);
         this.worldposition = vec;
      }
   };

   module.exports = PositionalAspect;
});