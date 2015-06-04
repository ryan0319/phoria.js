/**
 * @fileoverview phoria - 3D Entity objects. Base class for chained matrix operations. Concrete Entity implementations.
 * @author Kevin Roast
 * @date 13th April 2013
 */

/* globals define */
define(function(require, exports, module) {
  'use strict';

  var Util = require('./Util');
  var BaseLight = require('./BaseLight');
  var PositionalAspect = require('./PositionalAspect');
  var BaseEntity = require('./BaseEntity');

  /**
  * PointLight models a light that has a position within the scene and from which light eminates in all directions
  * equally. These lights also have an attenuation which describes how the light falls off over distance. A number of
  * attentuation types are provided such as none (no fall-off over distance), linear (fall-off directly related to the
  * distance from the light) and squared (fall-off related to distance squared).
  */
  var PointLight = function()
  {
    PointLight.superclass.constructor.call(this);

    this.position = {x: 0, y:0, z:-1};
    this.attenuation = 0.1;
    this.attenuationFactor = "linear";

    // add scene handler to transform the light position into world position
    this.onScene(this.transformToScene);

    return this;
  };

  /**
  * Factory create method - object literal Light descripton
  * {
  *    position: {x:0,y:0,z:0},
  *    color: [0-1,0-1,0-1],
  *    intensity: 0-1,
  *    attenuation: 0-1,
  *    attenuationFactor: "none"|"linear"|"squared"
  * }
  */
  PointLight.create = function create(desc)
  {
    // merge structures to generate entity
    var e = new PointLight();
    BaseEntity.create(desc, e);
    if (desc.color) e.color = desc.color;
    if (desc.intensity) e.intensity = desc.intensity;
    if (desc.position) e.position = desc.position;
    if (desc.attenuation) e.attenuation = desc.attenuation;
    if (desc.attenuationFactor) e.attenuationFactor = desc.attenuationFactor;

    return e;
  };

  Util.extend(PointLight, BaseLight, {
    // falloff
    attenuation: 0,
    attenuationFactor: null,

    transformToScene: function transformToScene(scene, matLocal, time)
    {
      // update worldposition position of light by local transformation -> world
      this.updatePosition(matLocal);
    }
  });
  Util.augment(PointLight, PositionalAspect);

  module.exports = PointLight;
});