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

// Create lighting
var amblight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.05);
scene.add(amblight);

const spotlight = new THREE.SpotLight(new THREE.Color(1, 1, 1));
spotlight.position.set(0, 70, 0); // Position the spotlight above
spotlight.target.position.set(0, 0, 0); // Set the target position to the center of the scene
spotlight.castShadow = true;

var angle = { Angle: 1 };

// Adjust spotlight properties
spotlight.angle = (Math.PI / 180) * angle.Angle; // Set the angle of the cone to 45 degrees (in radians)
spotlight.penumbra = 0.2; // Set the penumbra to soften the edges of the cone
spotlight.distance = 400; // Set the distance the spotlight shines
spotlight.intensity = 1.5; // Increase intensity for better visibility

// Custom shadow camera near and far planes
spotlight.shadow.camera.near = 10;
spotlight.shadow.camera.far = 800;

scene.add(spotlight);
scene.add(spotlight.target); // Add the spotlight's target to the scene

// Add fog to the scene
scene.fog = new THREE.Fog(0xffff66, 0.1, 500); // Adjusted yellowish fog color, near, and far distances

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

var lightingFolder = gui.addFolder('Lighting');
lightingFolder.add(angle, 'Angle', 1, 10);

// Update function
var previousTime = performance.now();
var timeSinceLastConfetti = 0;
function update(currentTime) {
    requestAnimationFrame(update);

    // Calculate time elapsed since last frame
    var deltaTime = (currentTime - previousTime) / 1000; // Convert to seconds
    previousTime = currentTime;

    // Update time since last confetti
    timeSinceLastConfetti += deltaTime;

    // Generate confetti based on density and time elapsed
    while (timeSinceLastConfetti >= 1 / density.Density) {
        generateConfetti(scene, 1, shapesEnabled); // Generate 1 confetti per call
        timeSinceLastConfetti -= 1 / density.Density;
    }

    spotlight.angle = Math.PI / angle.Angle; // Corrected calculation

    // Move objects with velocity and update rotation
    scene.children.forEach(object => {
        if (object instanceof THREE.Mesh && object.velocity) {
            object.position.addScaledVector(object.velocity, deltaTime);
            if (object.position.y < -30) {
                scene.remove(object);
            }

            object.rotation.x += deltaTime * Math.PI * (spin.Spin_Speed * Math.random());
            object.rotation.y += deltaTime * Math.PI * (spin.Spin_Speed * Math.random());
            object.rotation.z += deltaTime * Math.PI * (spin.Spin_Speed * Math.random());
        }
    });

    // Render scene
    renderer.render(scene, camera);
}

// Camera setup
camera.position.z = 5;

//this fucntion is called when the window is resized
var MyResize = function ( )
{
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width,height);
  camera.aspect = width/height;
  camera.updateProjectionMatrix();
  renderer.render(scene,camera);
};

//link the resize of the window to the update of the camera
window.addEventListener( 'resize', MyResize);

// Start animation loop
update(0);