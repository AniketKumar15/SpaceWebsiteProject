import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import mercuryTexture from '../Images/planetsTextures/mercury.jpg';
import venusTexture from '../Images/planetsTextures/venus.jpg';
import earthTexture from '../Images/planetsTextures/earth.jpg';
import marsTexture from '../Images/planetsTextures/mars.jpg';
import jupiterTexture from '../Images/planetsTextures/jupiter.jpg';
import saturnTexture from '../Images/planetsTextures/saturn.jpg';
import uranusTexture from '../Images/planetsTextures/uranus.jpg';
import neptuneTexture from '../Images/planetsTextures/neptune.jpg';
import sunTexture from '../Images/sun.jpg';


const textureArray = [
    mercuryTexture,
    venusTexture,
    earthTexture,
    marsTexture,
    jupiterTexture,
    saturnTexture,
    uranusTexture,
    neptuneTexture
];
const planetNames = [
    'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'
];


const canvas = document.getElementById('earth-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 22;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
// Lock vertical rotation
controls.minPolarAngle = Math.PI / 2; // 90 degrees
controls.maxPolarAngle = Math.PI / 2; // 90 degrees
controls.enablePan = false; // Disable panning
controls.enableZoom = false; // Disable zooming

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(labelRenderer.domElement);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const pointLight = new THREE.PointLight(0xffffff, 1.2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 4);
scene.add(ambientLight);

const sunGeometry = new THREE.SphereGeometry(3, 64, 64);
const sunMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load(sunTexture),
    roughness: 0.5,
    metalness: 0.6
});
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sunMesh);

const orbitRadius = 15;     // Radius of the orbit circle
const planetRadius = 2;
const planetCount = 8;
const textureLoader = new THREE.TextureLoader();

// Array to store all planet meshes
const planets = [];
const labels = [];

for (let i = 0; i < planetCount; i++) {
    const angle = (2 * Math.PI / planetCount) * i;

    const x = orbitRadius * Math.cos(angle);
    const z = orbitRadius * Math.sin(angle); // use z for circular layout in XZ plane

    const planetGeometry = new THREE.SphereGeometry(planetRadius, 64, 64);
    const planetMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(textureArray[i]),
        roughness: 0.5,
        metalness: 0.6
    });

    const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
    planetMesh.position.set(x, 0, z);
    scene.add(planetMesh);

    // Create a label for the planet
    const label = document.createElement('div');
    label.className = 'planet-label';
    label.textContent = planetNames[i];
    label.style.position = 'absolute';
    label.style.color = 'white';
    label.style.fontSize = '16px';
    label.style.fontFamily = 'Arial';
    label.style.pointerEvents = 'none'; // Disable pointer interaction

    // Create the CSS2DObject and add it to the scene
    const labelObject = new CSS2DObject(label);
    labelObject.position.set(x, planetRadius + 1, z); // Position it above the planet
    scene.add(labelObject);


    planets.push(planetMesh);
    labels.push(labelObject);
}

// Animation
function animate() {
    requestAnimationFrame(animate);
    sunMesh.rotation.y += 0.005; // Rotate the sun
    // Rotate each planet
    planets.forEach(planet => {
        planet.rotation.y += 0.005;
    });

    // Update the labels' positions to follow the planets' orbits
    labels.forEach((label, index) => {
        const angle = (2 * Math.PI / planetCount) * index;
        const x = orbitRadius * Math.cos(angle);
        const z = orbitRadius * Math.sin(angle);
        label.position.set(x, planetRadius + 1, z); // Update position of each label
    });
    controls.update(); // Smooth camera movement
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}
animate();



let planetDataArray = [];

fetch('./src/Js/planetsData.json')
    .then(res => res.json())
    .then(data => {
        planetDataArray = data.solar_system.planets;
    });

function showPlanetInfo(name, data) {
    const modal = document.getElementById('infoModal');
    const nameEl = document.getElementById('planetName');
    const detailsEl = document.getElementById('planetDetails');

    nameEl.textContent = name;

    // Create dynamic HTML for planet details
    detailsEl.innerHTML = Object.entries(data).map(([key, value]) => {
        const label = key.replace(/_/g, ' ').replace(/km/g, 'km').replace(/kg/g, 'kg');
        return `<p><strong>${label}:</strong> ${value}</p>`;
    }).join('');

    modal.style.display = 'block';
}

document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('infoModal').style.display = 'none';
});



window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planets);

    if (intersects.length > 0) {
        const clickedPlanet = intersects[0].object;
        const index = planets.indexOf(clickedPlanet);
        const planetName = planetNames[index];

        const planetData = planetDataArray.find(p => p.name === planetName);

        if (planetData) {
            showPlanetInfo(planetName, planetData);
        }
    }
});

// Handle resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
}); 