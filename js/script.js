// script.js
import * as THREE from '/build/three.module.js';
import { generateConfetti } from './confetti.js';

// Create the scene
var scene = new THREE.Scene();

// Set the aspect ratio
var ratio = window.innerWidth / window.innerHeight;

// Create the perspective camera
var camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000);

// Create the WebGL renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

generateConfetti(scene);

// Update function
var previousTime = 0;
function update(currentTime) {
    requestAnimationFrame(update);

    // Calculate time elapsed since last frame
    var deltaTime = (currentTime - previousTime) / 1; // Convert to seconds
    previousTime = currentTime;

    // Move objects with velocity
    scene.children.forEach(object => {
        if (object instanceof THREE.Mesh && object.velocity) {
            object.position.addScaledVector(object.velocity, deltaTime);
            if (object.position.z > 0) {
                scene.remove(object);
            }
        }
    });

    // Generate new confetti if needed
    if (Math.random() < deltaTime * 0.1) { // Adjust this factor to control confetti generation rate
        generateConfetti(scene);
    }

    // Render scene
    renderer.render(scene, camera);
}

// Camera setup
camera.position.z = 5;

// Start animation loop
update(0);
