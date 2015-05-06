var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


var light = new THREE.AmbientLight( 0x404040 ); // soft white light
var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 0, 1, 0 );
scene.add( directionalLight );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var geometry2 = new THREE.BoxGeometry( 1, 1, 1 );

var geometry2 = new THREE.Geometry();
geometry2.vertices.push(
  new THREE.Vector3( -3, 3, 0 ),
  new THREE.Vector3( -3, -3, 0 ),
  new THREE.Vector3( 3, -3, 0 )
  );
  geometry2.faces.push(
    new THREE.Face3( 0, 1, 2 )
  );
  geometry2.computeBoundingSphere();


//geometry2.position.y = 10;
var material2 = new THREE.MeshPhongMaterial( { color: 0x0000ff } );
var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
var triangulo = new THREE.Mesh( geometry2, material );


group = new THREE.Object3D();
var loader = new THREE.JSONLoader();
loader.load('js/macaco.json', modelLoadedCallback);

scene.add( cube );
//scene.add( triangulo );
scene.add( light );
camera.position.z = 5;

cube.position.x += 2;

function render() {
  requestAnimationFrame( render );
  renderer.render( scene, camera );
  if(puloAtivo){
    pulo();
  }
  cube.rotation.x += 0.015;
  cube.rotation.y += 0.015;
  group.rotation.x += 0.015;
  group.rotation.y += 0.015;

  //cube.clone();
}
render();

function baixo() {
  camera.position.z -= 1;
}
function cima() {
  camera.position.z += 1;
}
var count = 0;
var puloAtivo = false;
function pulo(){

    if(count < 10 ){
      cube.position.y += 0.1;
    }
    else if(count < 20) {
      cube.position.y -= 0.1;
    }
    else {
      puloAtivo = false;
      count = 0;
    }
    count += 0.5;
    console.log(count);

}
function modelLoadedCallback(geometry) {

        mesh = new THREE.Mesh( geometry, material2 );

        group.add(mesh);
        scene.add( group );

}
//canvas.addEventListener("mousedown", seleciona);
document.addEventListener('keydown', function(event) {
      var keyCode = event.keyCode;
      console.log(keyCode);
      //S = 83
      if(keyCode == 83) {
          baixo();
      }
      //W = 87
      if(keyCode == 87){
        cima();
      }
      //A = 65
      if(keyCode == 65) {
        //esquerda();
      }
      //D = 68
      if(keyCode == 68) {
        //direita();
      }
      if(keyCode == 32) {
        puloAtivo = true;
      }
  }, false);
