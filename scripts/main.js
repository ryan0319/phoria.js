define(function(require, exports, module) {
      var PhoriaUtil = require('Util'),
        PhoriaScene = require('Scene'),
        PhoriaRenderer = require('Renderer'),
        PhoriaCanvasRenderer = require('CanvasRenderer'),
        PhoriaEntity = require('Entity'),
        PhoriaDistantLight = require('DistantLight'),
        PhoriaConstants = require('Constants');


var requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
                       window.mozRequestAnimationFrame || window.msRequestAnimationFrame || 
                       function(c) {window.setTimeout(c, 15)};
/**
   Phoria
   pho·ri·a (fôr-)
   n. The relative directions of the eyes during binocular fixation on a given object
*/

// bind to window onload event
window.addEventListener('load', onloadHandler, false);

function onloadHandler()
{
   // get the canvas DOM element and the 2D drawing context
   var canvas = document.getElementById('canvas');
   
   // create the scene and setup camera, perspective and viewport
   var scene = new PhoriaScene();
   scene.camera.position = {x:0.0, y:5.0, z:-15.0};
   scene.perspective.aspect = canvas.width / canvas.height;
   scene.viewport.width = canvas.width;
   scene.viewport.height = canvas.height;
   
   // create a canvas renderer
   var renderer = new PhoriaCanvasRenderer(canvas);
   
   // add a grid to help visualise camera position etc.
   var plane = PhoriaUtil.generateTesselatedPlane(8,8,0,20);
   scene.graph.push(PhoriaEntity.create({
      points: plane.points,
      edges: plane.edges,
      polygons: plane.polygons,
      style: {
         drawmode: "wireframe",
         shademode: "plain",
         linewidth: 0.5,
         objectsortmode: "back"
      }
   }));
   var c = PhoriaUtil.generateUnitCube();
   var cube = PhoriaEntity.create({
      points: c.points,
      edges: c.edges,
      polygons: c.polygons
   });
   scene.graph.push(cube);
   scene.graph.push(new PhoriaDistantLight());

   var pause = false;
   var fnAnimate = function() {
      if (!pause)
      {
         // rotate local matrix of the cube
         cube.rotateY(0.5*PhoriaConstants.RADIANS);
         
         // execute the model view 3D pipeline and render the scene
         scene.modelView();
         renderer.render(scene);
      }
      requestAnimFrame(fnAnimate);
   };

   // key binding
   document.addEventListener('keydown', function(e) {
      switch (e.keyCode)
      {
         case 27: // ESC
            pause = !pause;
            break;
      }
   }, false);
   // add GUI controls
   var gui = new dat.GUI();
   var f = gui.addFolder('Perspective');
   f.add(scene.perspective, "fov").min(5).max(175);
   f.add(scene.perspective, "near").min(1).max(100);
   f.add(scene.perspective, "far").min(1).max(1000);
   //f.open();
   f = gui.addFolder('Camera LookAt');
   f.add(scene.camera.lookat, "x").min(-100).max(100);
   f.add(scene.camera.lookat, "y").min(-100).max(100);
   f.add(scene.camera.lookat, "z").min(-100).max(100);
   f.open();
   f = gui.addFolder('Camera Position');
   f.add(scene.camera.position, "x").min(-100).max(100);
   f.add(scene.camera.position, "y").min(-100).max(100);
   f.add(scene.camera.position, "z").min(-100).max(100);
   f.open();
   f = gui.addFolder('Camera Up');
   f.add(scene.camera.up, "x").min(-10).max(10).step(0.1);
   f.add(scene.camera.up, "y").min(-10).max(10).step(0.1);
   f.add(scene.camera.up, "z").min(-10).max(10).step(0.1);
   f = gui.addFolder('Rendering');
   f.add(cube.style, "drawmode", ["point", "wireframe", "solid"]);
   f.add(cube.style, "shademode", ["plain", "lightsource"]);
   f.add(cube.style, "fillmode", ["fill", "filltwice", "inflate", "fillstroke", "hiddenline"]);
   f.open();
   
   // start animation
   requestAnimFrame(fnAnimate);
}
});
