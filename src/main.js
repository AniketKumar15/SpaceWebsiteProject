import * as THREE from 'three';
// Image import
import sun from '../Images/sun.jpg';

// Creating scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bgCanvas'),
    alpha: true, // allows background transparency
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);


// Texture loader
const loader = new THREE.TextureLoader();
const backgroundTexture = loader.load(sun); // Replace with your image URL

// Sphere
const geometry = new THREE.SphereGeometry(1.7, 64, 64);
const material = new THREE.MeshStandardMaterial({
    map: backgroundTexture,
    roughness: 0.5,
    metalness: 0.6
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);



// Light
const pointLight = new THREE.PointLight(0xffffff, 1.2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);


const ambientLight = new THREE.AmbientLight(0xffffff, 4);
scene.add(ambientLight);

// Animation
function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.005;
    renderer.render(scene, camera);
}
animate();

// Handle resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}); 