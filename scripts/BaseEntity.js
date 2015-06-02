/**
 * @fileoverview phoria - 3D Entity objects. Base class for chained matrix operations. Concrete Entity implementations.
 * @author Kevin Roast
 * @date 13th April 2013
 */

/* globals define */
define(function(require, exports, module) {
  'use strict';
   
  var GlMatrix = require('./GlMatrix');

   /**
    * BaseEntity is the base that other Entity prototypes extend from. Provides functions to perform chained matrix
    * operations and maintains the child entity list. It also provides the onScene event handler functions.
    */
   var BaseEntity = function()
   {
      // the model matrix for this object - live manipulation functions below
      this.matrix = GlMatrix.mat4.create();
      this.children = [];
      
      return this;
   };
   
   /**
    * Factory create method - object literal Entity descripton:
    * {
    *    id: string,
    *    matrix: mat4,
    *    children: [...],
    *    onBeforeScene: function() {...},
    *    onScene: function() {...},
    *    disabled: boolean
    * }
    */
   BaseEntity.create = function create(desc, e)
   {
      // merge structures to generate entity
      if (!e) e = new BaseEntity();
      if (desc.id) e.id = desc.id;
      if (desc.matrix) e.matrix = desc.matrix;
      if (desc.children) e.children = desc.children;
      if (desc.onBeforeScene) e.onBeforeScene(desc.onBeforeScene);
      if (desc.onScene) e.onScene(desc.onScene);
      if (desc.disabled !== undefined) e.disabled = desc.disabled;
      
      return e;
   };
   
   BaseEntity.prototype =
   {
      // {string} optional unique ID for direct look-up of entity during event handlers etc.
      id: null,

      // {Array} child objects for the purposes of affine transformations - parent matrix applied first
      // the child objects themselves can of course have further child objects
      children: null,
      
      // {mat4} matrix to be applied to the entity during scene processing
      matrix: null,

      // {boolean} set to true to disable processing of the Entity and all child entities during the modelView pipeline
      disabled: false,
      
      onBeforeSceneHandlers: null,
      onSceneHandlers: null,
      
      /**
       * Add an onBeforeSceneHandlers event handler function to the entity. Called at the start of each scene
       * processing cycle before the local matrix has been multipled by the parent matrix.
       * 
       * @param fn {function}    onBeforeSceneHandlers handler signature: function(Phoria.Scene, time) this = Phoria.Entity,
       *                         accepts [] of functions also
       */
      onBeforeScene: function onBeforeScene(fn)
      {
         if (this.onBeforeSceneHandlers === null) this.onBeforeSceneHandlers = [];
         this.onBeforeSceneHandlers = this.onBeforeSceneHandlers.concat(fn);
      },

      /**
       * Add an onScene event handler function to the entity. Called at the start of each scene processing cycle after the
       * local matrix has been multiplied by the parent matrix. 
       * 
       * @param fn {function}    onScene handler signature: function(Phoria.Scene, matLocal, time) this = Phoria.Entity,
       *                         accepts [] of functions also
       */
      onScene: function onScene(fn)
      {
         if (this.onSceneHandlers === null) this.onSceneHandlers = [];
         this.onSceneHandlers = this.onSceneHandlers.concat(fn);
      },

      identity: function identity()
      {
         GlMatrix.mat4.identity(this.matrix);
         return this;
      },

      invert: function invert()
      {
         GlMatrix.mat4.invert(this.matrix, this.matrix);
         return this;
      },

      multiply: function multiply(m)
      {
         GlMatrix.mat4.multiply(this.matrix, this.matrix, m);
         return this;
      },

      scale: function scale(vec)
      {
         GlMatrix.mat4.scale(this.matrix, this.matrix, vec);
         return this;
      },

      scaleN: function scale(n)
      {
         GlMatrix.mat4.scale(this.matrix, this.matrix, GlMatrix.vec3.fromValues(n,n,n));
         return this;
      },

      rotate: function rotate(rad, axis)
      {
         GlMatrix.mat4.rotate(this.matrix, this.matrix, rad, axis);
         return this;
      },

      rotateX: function rotateX(rad)
      {
         GlMatrix.mat4.rotateX(this.matrix, this.matrix, rad);
         return this;
      },

      rotateY: function rotateY(rad)
      {
         GlMatrix.mat4.rotateY(this.matrix, this.matrix, rad);
         return this;
      },

      rotateZ: function rotateZ(rad)
      {
         GlMatrix.mat4.rotateZ(this.matrix, this.matrix, rad);
         return this;
      },
      
      /**
       * Rotate entity matrix by the given yaw (heading), pitch (elevation) and roll (bank) Euler angles.
       * @param {Number} yaw the yaw/heading angle in radians
       * @param {Number} pitch the pitch/elevation angle in radians
       * @param {Number} roll the roll/bank angle in radians
       */
      rotateYPR: function rotateYPR(yaw, pitch, roll)
      {
         var m = GlMatrix.mat4.fromYPR(yaw, pitch, roll);
         GlMatrix.mat4.multiply(this.matrix, this.matrix, m);
      },

      translate: function translate(vec)
      {
         GlMatrix.mat4.translate(this.matrix, this.matrix, vec);
         return this;
      },

      translateX: function translateX(n)
      {
         GlMatrix.mat4.translate(this.matrix, this.matrix, GlMatrix.vec3.fromValues(n,0,0));
         return this;
      },

      translateY: function translateY(n)
      {
         GlMatrix.mat4.translate(this.matrix, this.matrix, GlMatrix.vec3.fromValues(0,n,0));
         return this;
      },

      translateZ: function translateZ(n)
      {
         GlMatrix.mat4.translate(this.matrix, this.matrix, GlMatrix.vec3.fromValues(0,0,n));
         return this;
      },
      
      determinant: function determinant()
      {
         return GlMatrix.mat4.determinant(this.matrix);
      },
      
      transpose: function transpose()
      {
         GlMatrix.mat4.transpose(this.matrix, this.matrix);
         return this;
      }
   };

   module.exports = BaseEntity
});