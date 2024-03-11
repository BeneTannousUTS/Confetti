// script.js
import * as THREE from '/build/three.module.js';
import { generateConfetti } from './confetti.js';
import { GUI } from '/node_modules/dat.gui/build/dat.gui.module.js';

// Create the scene
var scene = new THREE.Scene();

// Create a GUI object
var gui = new GUI();

// Set the aspect ratio
var ratio = window.innerWidth / window.innerHeight;

// Create the perspective camera
var camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000);

// Manage Confetti properties
var density = { Density: 1 };
var spin = { Spin_Speed: 1 };
var shapesEnabled = [
    true, // Box
    true, // Sphere
    true, // Cylinder
    true, // Capsule
    true, // Circle
    true, // Cone
    true, // Dodecahedron
    true, // Icosahedron
    true, // Octahedron
    true, // Plane
    true, // Ring
    true, // Tetrahedron
    true, // Torus
    true, // TorusKnot
];
var shapeNames = [
    'Box',
    'Sphere',
    'Cylinder',
    'Capsule',
    'Circle',
    'Cone',
    'Dodecahedron',
    'Icosahedron',
    'Octahedron',
    'Plane',
    'Ring',
    'Tetrahedron',
    'Torus',
    'TorusKnot',
];

// Create the WebGL renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Generate confetti initially
generateConfetti(scene, density, shapesEnabled);

// Add GUI controls for density and spin speed
var confettiFolder = gui.addFolder('Confetti');
confettiFolder.open();
confettiFolder.add(density, 'Density', 0, 100);
confettiFolder.add(spin, 'Spin_Speed', 0, 10);

// Add checkboxes for shapes
var shapeFolder = confettiFolder.addFolder('Shapes');
shapeNames.forEach((name, index) => {
    shapeFolder.add(shapesEnabled, index, shapesEnabled[index]).name(name);
});

// Update function
var previousTime = performance.now();
function update(currentTime) {
    requestAnimationFrame(update);

    // Calculate time elapsed since last frame
    var deltaTime = (currentTime - previousTime) / 1000; // Convert to seconds
    previousTime = currentTime;

    // Move objects with velocity and update rotation
    scene.children.forEach(object => {
        if (object instanceof THREE.Mesh && object.velocity) {
            object.position.addScaledVector(object.velocity, deltaTime);
            if (object.position.y < -30) {
                scene.remove(object);
            }

            object.rotation.x += deltaTime * Math.PI * spin.Spin_Speed * Math.random();
            object.rotation.y += deltaTime * Math.PI * spin.Spin_Speed * Math.random();
            object.rotation.z += deltaTime * Math.PI * spin.Spin_Speed * Math.random();
        }
    });

    // Generate new confetti with the updated density and shape options
    generateConfetti(scene, density.Density, shapesEnabled);

    // Render scene
    renderer.render(scene, camera);
}

// Camera setup
camera.position.z = 5;

// Start animation loop
update(0);
