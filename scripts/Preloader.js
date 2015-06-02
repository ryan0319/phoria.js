/**
 * @fileoverview phoria - Image Preloader.
 * Image Preloader class. Executes the supplied callback function once all registered images are loaded by the browser.
 * @author Kevin Roast / Ryan Russell
 * @date 06/01/2015
 */

/* globals define */
define(function(require, exports, module) {
  'use strict';

  var Preloader = function()
  {
    this.images = [];
    return this;
  };

  Preloader.prototype =
  {
    /**
    * Image list
    *
    * @property images
    * @type Array
    */
    images: null,

    /**
    * Callback function
    *
    * @property callback
    * @type Function
    */
    callback: null,

    /**
    * Images loaded so far counter
    */
    counter: 0,

    /**
    * Add an image to the list of images to wait for
    */
    addImage: function addImage(img, url)
    {
      var me = this;
      img.url = url;
      // attach closure to the image onload handler
      img.onload = function()
      {
        me.counter++;
        if (me.counter === me.images.length)
        {
          // all images are loaded - execute callback function
          me.callback.call(me);
        }
      };
      this.images.push(img);
    },

    /**
    * Load the images and call the supplied function when ready
    */
    onLoadCallback: function onLoadCallback(fn)
    {
      this.counter = 0;
      this.callback = fn;
      // load the images
      for (var i=0, j=this.images.length; i<j; i++)
      {
        this.images[i].src = this.images[i].url;
      }
    }
  };

  module.exports = Preloader;
});