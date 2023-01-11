import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import SplineLoader from '@splinetool/loader';
// import {GLTFLoader} from './node_modules/three/examples/jsm/loaders/GLTFLoader.js'

// camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 5, 100000);
camera.position.set(100, 100, 700);
camera.quaternion.setFromEuler(new THREE.Euler(-0.63, 0.91, 0.53));
camera.lookAt(0,0,0)

// scene
const scene = new THREE.Scene();

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(800, 400);
renderer.setAnimationLoop(animate);


var container = document.getElementById('warrior')
container.appendChild(renderer.domElement);

// scene settings
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

scene.background = new THREE.Color('transparent');
renderer.setClearAlpha(0);

// spline scene
const loader = new SplineLoader();
loader.load(
    'https://prod.spline.design/VQy5H1la5MKInLxn/scene.splinecode',
    (splineScene) => {
        scene.add(splineScene);
    }
);

// load model
// const beerModel=()=>{
//     const gltfLoader = new GLTFLoader()
//     gltfLoader.load('./assets/comp_graph_lec.gltf', (gltfScene)=>{
//         scene.add(gltfScene)
//     })
// }

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.125;

window.addEventListener('resize', onWindowResize);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(time) {
    controls.update();
    renderer.render(scene, camera);
}