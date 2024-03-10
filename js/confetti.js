// confetti.js
import * as THREE from '/build/three.module.js';

export function generateConfetti(scene) {

    // Adjust confetti generation based on density value
    var numConfetti = Math.floor(100 * Math.random());

    // Function to generate a random color
    function getRandomColor() {
        var randomColor = Math.floor(Math.random() * 16777215);
        return new THREE.Color(randomColor);
    }

    // Function to choose a random shape geometry
    function chooseShape(x, y, z) {
        var shapes = [
            new THREE.BoxGeometry(x, y, z),
            new THREE.SphereGeometry(1, 32, 32),
            new THREE.CylinderGeometry(1, 1, 2, 32),
            new THREE.CapsuleGeometry(1, 1, 4, 8),
            new THREE.CircleGeometry(5, 32),
            new THREE.ConeGeometry(x, y, z),
            new THREE.DodecahedronGeometry(),
            new THREE.IcosahedronGeometry(),
            new THREE.OctahedronGeometry(),
            new THREE.PlaneGeometry(x, y),
            new THREE.RingGeometry(),
            new THREE.TetrahedronGeometry(),
            new THREE.TorusGeometry(),
            new THREE.TorusKnotGeometry(),
        ];

        var chosenShape = Math.floor(Math.random() * shapes.length);

        return shapes[chosenShape];
    }

    // Generate confetti
    for (let i = 0; i < numConfetti; i++) {
        // Create and shoot confetti
        var confettiGeometry = chooseShape(Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5);
        var confettiMaterial = new THREE.MeshBasicMaterial({ color: getRandomColor() });
        var confetti = new THREE.Mesh(confettiGeometry, confettiMaterial);
        confetti.position.set((Math.random()-0.5)*500, (Math.random()*50), -50);
        confetti.velocity = new THREE.Vector3(0, -0.2, 0);

        confetti.rotation.set(
            Math.random() * Math.PI * 2, // Random rotation around x-axis
            Math.random() * Math.PI * 2, // Random rotation around y-axis
            Math.random() * Math.PI * 2  // Random rotation around z-axis
        );

        scene.add(confetti);
    }
}
