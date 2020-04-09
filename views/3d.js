var width = window.innerWidth;
var height = window.innerHeight;

camera = new THREE.Camera();
scene = new THREE.Scene();
var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

var startTime = Date.now();

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var scene = new THREE.Scene();
var uniforms = {
  time: { value: 1.0 },
}

var gui = new dat.GUI();
var guiData = {
  "camX": -0.092, 
  "camY": -0.131,
  "camZ": -1.575,
  "zoom": -1.13,
  "colorA": [162,73,73],
  "colorB":[247,247,247],
  "t": 0.6,
  "power":8.,
  "rotate": 6.,
  "bailout": 10.,
  "light":2.,
};


gui.add(guiData, 'camX', -.2, .2).step(0.001);
gui.add(guiData, 'camY', -.2, .2).step(0.001);
gui.add(guiData, 'camZ', -2., 2.).step(0.001);
gui.add(guiData, 'bailout', 5., 25.).step(0.1);
gui.add(guiData, 'light', 0., 4.).step(0.1);
gui.add(guiData, 'zoom',-1.5,2.).step(0.01);
gui.addColor(guiData,'colorA');
gui.addColor(guiData,'colorB');
gui.add(guiData, 't',0.,1.).step(0.001);
gui.add(guiData, 'power',0.,30.).step(0.01);
gui.add(guiData, 'rotate',0.,30.).step(0.5);

var colorA = new THREE.Vector3( guiData.colorA[ 0 ] / 255, guiData.colorA[ 1 ] / 255, guiData.colorA[ 2 ] / 255 );
var colorB = new THREE.Vector3( guiData.colorB[ 0 ] / 255, guiData.colorB[ 1 ] / 255, guiData.colorB[ 2 ] / 255 );

var controls = new THREE.OrbitControls(camera, renderer.domElement);


material = new THREE.ShaderMaterial( {
  uniforms: {
    "time": { value: 0.0 },
    "resolution": { type: "v2", value: new THREE.Vector2() },
    "camX": { type: "f", value: guiData.camX },
    "camY": { type: "f", value: guiData.camY },
    "camZ": { type: "f", value: guiData.camZ },
    "zoom": { type: "f", value: guiData.zoom },
    "colorA" : { type : 'v3', value : colorA },
    "colorB" : { type : 'v3', value : colorB },
    "t": { type: "f", value: guiData.t },
    "power": { type: "f", value: guiData.power },
    "rotate": { type: "f", value: guiData.rotate },
    "bailout": { type: "f", value: guiData.bailout },
    "light": { type: "f", value: guiData.light },
  },
  fragmentShader: document.getElementById( 'mandelbulbFragmentShader' ).textContent,
  vertexShader: document.getElementById( 'vertexShader' ).textContent,

} );

var plane = new THREE.Mesh( geometry, material );
scene.add( plane );

function onWindowResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    var time = performance.now() * 0.0005;
    material.uniforms[ "time" ].value = time;
    material.uniforms[ "camX" ].value = guiData.camX;
    material.uniforms[ "camY" ].value = guiData.camY;
    material.uniforms[ "camZ" ].value = guiData.camZ;
    material.uniforms[ "zoom" ].value = guiData.zoom;
    material.uniforms[ "colorA" ].value = guiData.colorA;
    material.uniforms[ "colorB" ].value = guiData.colorB;
    material.uniforms[ "t" ].value = guiData.t;
    material.uniforms[ "power" ].value = guiData.power;
    material.uniforms[ "rotate" ].value = guiData.rotate;
    material.uniforms[ "light" ].value = guiData.light;
    material.uniforms[ "bailout" ].value = guiData.bailout;
  } 

window.addEventListener('resize', onWindowResize, false);
animate();
