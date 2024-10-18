import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//THREE OBJECTS : 1. Scene    2.Camera 3. Renderer
//Scene == container that holds all youur objects cameras lights
const scene = new THREE.Scene();


//Perpective Camera mimics the human eye 
// THREE.PerspectiveCamera(fieldOfView, aspect-ratio, view-Frustum, view-Frustum );

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio);
//set a full screen canvas
renderer.setSize(window.innerWidth, window.innerHeight);
//currently camera is at center so we position it in the z axis to have a better view
camera.position.setZ(30)
camera.position.setX(-3);

renderer.render(scene,camera);

//THREE BASIC steps when adding an object: 1.GEOMETRY  2.MATERIAL  3.MESH
//Geometry : x y z points that make up a shape
//Material : wrapping paper for an object
//Mesh : Geometry + Material

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xe2711d });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights
// Point Light (Stronger and Positioned Differently)

const pointLight = new THREE.PointLight(0xffffff,1000);
pointLight.position.set(3, 3, 3);

const ambientLight = new THREE.AmbientLight(0xffffff,5);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper,gridHelper)


//instanciate OrbitControls class and pass camera and .domElement as arguments
const controls = new OrbitControls(camera, renderer.domElement); //allows to move around the scene using our mouse
//listen to dom events on the mouse and update the camera position accordingly
//then add controls.update() in the animate function to make sure the changes are reflected in the UI



//randomly add starts to the outer space
function addStar(){
   const geometry = new THREE.SphereGeometry(0.25, 24, 24);
   const material = new THREE.MeshStandardMaterial( {color: 0xffffff});
   const star = new THREE.Mesh(geometry, material);


   //fills array of size 3 with random values from -100 to +100
   const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread( 100));



   //finally set the position of the start
   star.position.set(x,y,z);
   scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('images/space4.png');
scene.background = spaceTexture;



const jeffTexture = new THREE.TextureLoader().load('images/prog1.png');
const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({ map: jeffTexture})
)
scene.add(jeff);

const moonTexture = new THREE.TextureLoader().load('images/moon.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({ map: moonTexture})
)
scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();


//now we rotate the torus
function animate(){
  requestAnimationFrame(animate); //captures fps depending on the device

  torus.rotation.x += 0.01; //rotating torus in the x axis
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();
  renderer.render(scene, camera);
}
animate();

//change MeshBasicMaterial to MeshStandardMaterial and remove wireframe
//adding point light : emits light in all directions just like a bulb
//adding ambient light : 
//add light helpers
//import OrbitControls
//func addStar