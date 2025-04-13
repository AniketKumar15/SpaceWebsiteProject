import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import earthTexture from '../Images/planetsTextures/earth.jpg';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg_canvas'), antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = true;


let radius = 2;
const earthGeometry = new THREE.SphereGeometry(radius, 32, 32);
const earthMaterial = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load(earthTexture),
});
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);

const glowMaterial = new THREE.ShaderMaterial({
  uniforms:
  {
    "c": { type: "f", value: 0.15 },
    "p": { type: "f", value: 3 },
    glowColor: { type: "c", value: new THREE.Color(0x0096ff) },
    viewVector: { type: "v3", value: camera.position },
  },
  vertexShader: document.getElementById('vertexShader').textContent,
  fragmentShader: document.getElementById('fragmentShader').textContent,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending,
  transparent: true,
});

let earthGlow = new THREE.Mesh(earthGeometry, glowMaterial);
earthGlow.scale.multiplyScalar(1.4);
scene.add(earthGlow);

// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(5, 5, 5).normalize();
// scene.add(light);
const ambientLight = new THREE.AmbientLight(0x404040, 14);
scene.add(ambientLight);

const trailGeometry = new THREE.BufferGeometry();
const trailMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00, opacity: 0.5, transparent: true });

// Create the line object (trail)
const trailLine = new THREE.Line(trailGeometry, trailMaterial);
scene.add(trailLine);

const maxTrailPoints = 500;
// Array to store positions
const trailPositions = [];


// Load ISS model
let issModel;
const loader = new GLTFLoader();
loader.load("/iss_stationary/scene.gltf", (gltf) => {
  issModel = gltf.scene;
  issModel.scale.set(0.05, 0.05, 0.05);
  scene.add(issModel);
});
// Lat/Lon to 3D conversion
function latLonToVec3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

const issInfo_data = document.querySelector(".issInfo-Data");
const latitudeText = document.createElement("p");
const longitudeText = document.createElement("p");
issInfo_data.appendChild(latitudeText);
issInfo_data.appendChild(longitudeText);

async function updateISSPosition() {
  const res = await fetch('http://api.open-notify.org/iss-now.json');
  const data = await res.json();
  const lat = parseFloat(data.iss_position.latitude);
  const lon = parseFloat(data.iss_position.longitude);
  const pos = latLonToVec3(lat, lon, 2.2);



  latitudeText.textContent = `Latitude: ${lat}`;
  longitudeText.textContent = `Longitude: ${lon}`;

  // Update ISS model position
  if (issModel) {
    issModel.position.copy(pos);
    issModel.lookAt(earthMesh.position);
  }

  // Add current position to trail
  trailPositions.push(pos.clone());
  if (trailPositions.length > maxTrailPoints) {
    trailPositions.shift(); // Remove the oldest point
  }

  // Convert Vector3 list into Float32Array
  const trailCoords = new Float32Array(trailPositions.length * 3);
  for (let i = 0; i < trailPositions.length; i++) {
    trailCoords[i * 3] = trailPositions[i].x;
    trailCoords[i * 3 + 1] = trailPositions[i].y;
    trailCoords[i * 3 + 2] = trailPositions[i].z;
  }

  // Update geometry with new points
  trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailCoords, 3));
  trailGeometry.setDrawRange(0, trailPositions.length);
  trailGeometry.attributes.position.needsUpdate = true;
}


function animate() {
  requestAnimationFrame(animate);
  // earthMesh.rotation.y += 0.0005;
  controls.update();
  renderer.render(scene, camera);
}
animate();
// Update ISS every second
setInterval(updateISSPosition, 1000);
// Handle resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}); 
