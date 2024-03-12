// confetti.js
import * as THREE from '/build/three.module.js';

export function generateConfetti(scene, density, shapeEnabled) {

    // Function to generate a random color
    function getRandomColor() {
        var randomColor = Math.floor(Math.random() * 16777215);
        return new THREE.Color(randomColor);
    }

    // Function to choose a random shape geometry based on enabled shapes
    function chooseShape() {
        var shapes = [
            shapeEnabled[0] ? new THREE.BoxGeometry() : null,
            shapeEnabled[1] ? new THREE.SphereGeometry() : null,
            shapeEnabled[2] ? new THREE.CylinderGeometry() : null,
            shapeEnabled[3] ? new THREE.CapsuleGeometry() : null,
            shapeEnabled[4] ? new THREE.CircleGeometry() : null,
            shapeEnabled[5] ? new THREE.ConeGeometry() : null,
            shapeEnabled[6] ? new THREE.DodecahedronGeometry() : null,
            shapeEnabled[7] ? new THREE.IcosahedronGeometry() : null,
            shapeEnabled[8] ? new THREE.OctahedronGeometry() : null,
            shapeEnabled[9] ? new THREE.PlaneGeometry() : null,
            shapeEnabled[10] ? new THREE.RingGeometry() : null,
            shapeEnabled[11] ? new THREE.TetrahedronGeometry() : null,
            shapeEnabled[12] ? new THREE.TorusGeometry() : null,
            shapeEnabled[13] ? new THREE.TorusKnotGeometry() : null,
        ].filter(geometry => geometry !== null);

        if (shapes.length === 0) {
            return null;
        }

        var chosenShape = Math.floor(Math.random() * shapes.length);

        return shapes[chosenShape];
    }

    // Generate confetti
    for (let i = 0; i < density; i++) { // Use density to control number of confetti generated
        // Create confetti
        var confettiGeometry = chooseShape();
        if (!confettiGeometry) {
            break; // No enabled shapes
        }
        var confettiMaterial = new THREE.MeshLambertMaterial({ color: getRandomColor() });
        var confetti = new THREE.Mesh(confettiGeometry, confettiMaterial);
        confetti.position.set((Math.random() - 0.5) * 100, (Math.random() * 10) + 20, -20);
        confetti.velocity = new THREE.Vector3(0, -10, 0);

        confetti.initialRotation = new THREE.Vector3(
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2
        );

        scene.add(confetti);
    }
}
