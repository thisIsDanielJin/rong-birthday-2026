/**
 * Three.js 3D Dog Scene
 * Creates an animated 3D dog character
 */

// Initialize Three.js scene
let dogScene, dogCamera, dogRenderer, dog3D;
let dogAnimationFrame;

function init3DDog() {
    const container = document.querySelector('.dog-character');
    if (!container) return;

    // Clear emoji
    container.innerHTML = '';
    container.style.width = '200px';
    container.style.height = '200px';

    // Scene setup
    dogScene = new THREE.Scene();

    // Camera
    dogCamera = new THREE.PerspectiveCamera(
        50,
        1, // aspect ratio (square)
        0.1,
        1000
    );
    dogCamera.position.set(0, 2, 8);
    dogCamera.lookAt(0, 0, 0);

    // Renderer
    dogRenderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    dogRenderer.setSize(200, 200);
    dogRenderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(dogRenderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    dogScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    dogScene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffb88c, 0.5);
    pointLight.position.set(-5, 5, 5);
    dogScene.add(pointLight);

    // Create simple dog model
    createSimpleDog();

    // Start animation
    animate3DDog();

    console.log('🐕 3D dog initialized!');
}

function createSimpleDog() {
    dog3D = new THREE.Group();

    // Materials
    const brownMaterial = new THREE.MeshPhongMaterial({
        color: 0x8B4513,
        shininess: 30
    });
    const darkBrownMaterial = new THREE.MeshPhongMaterial({
        color: 0x654321,
        shininess: 30
    });
    const blackMaterial = new THREE.MeshPhongMaterial({
        color: 0x000000,
        shininess: 50
    });
    const pinkMaterial = new THREE.MeshPhongMaterial({
        color: 0xffb6c1,
        shininess: 20
    });

    // Body (rounded)
    const bodyGeometry = new THREE.SphereGeometry(1, 32, 32);
    bodyGeometry.scale(1.2, 1, 0.8);
    const body = new THREE.Mesh(bodyGeometry, brownMaterial);
    body.position.set(0, 0, 0);
    dog3D.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const head = new THREE.Mesh(headGeometry, brownMaterial);
    head.position.set(0, 0.5, 1.2);
    dog3D.add(head);

    // Snout
    const snoutGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    snoutGeometry.scale(0.8, 0.6, 1.2);
    const snout = new THREE.Mesh(snoutGeometry, darkBrownMaterial);
    snout.position.set(0, 0.2, 1.9);
    dog3D.add(snout);

    // Nose
    const noseGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const nose = new THREE.Mesh(noseGeometry, blackMaterial);
    nose.position.set(0, 0.25, 2.3);
    dog3D.add(nose);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const leftEye = new THREE.Mesh(eyeGeometry, blackMaterial);
    leftEye.position.set(-0.3, 0.6, 1.7);
    dog3D.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, blackMaterial);
    rightEye.position.set(0.3, 0.6, 1.7);
    dog3D.add(rightEye);

    // Eye shine (white dots)
    const shineGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const shineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const leftShine = new THREE.Mesh(shineGeometry, shineMaterial);
    leftShine.position.set(-0.25, 0.65, 1.8);
    dog3D.add(leftShine);

    const rightShine = new THREE.Mesh(shineGeometry, shineMaterial);
    rightShine.position.set(0.35, 0.65, 1.8);
    dog3D.add(rightShine);

    // Ears (floppy)
    const earGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    earGeometry.scale(0.6, 1.2, 0.3);

    const leftEar = new THREE.Mesh(earGeometry, darkBrownMaterial);
    leftEar.position.set(-0.6, 0.7, 1.1);
    leftEar.rotation.z = -0.3;
    dog3D.add(leftEar);

    const rightEar = new THREE.Mesh(earGeometry, darkBrownMaterial);
    rightEar.position.set(0.6, 0.7, 1.1);
    rightEar.rotation.z = 0.3;
    dog3D.add(rightEar);

    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.2, 0.18, 1, 16);

    const frontLeftLeg = new THREE.Mesh(legGeometry, brownMaterial);
    frontLeftLeg.position.set(-0.5, -0.9, 0.6);
    dog3D.add(frontLeftLeg);

    const frontRightLeg = new THREE.Mesh(legGeometry, brownMaterial);
    frontRightLeg.position.set(0.5, -0.9, 0.6);
    dog3D.add(frontRightLeg);

    const backLeftLeg = new THREE.Mesh(legGeometry, brownMaterial);
    backLeftLeg.position.set(-0.5, -0.9, -0.4);
    dog3D.add(backLeftLeg);

    const backRightLeg = new THREE.Mesh(legGeometry, brownMaterial);
    backRightLeg.position.set(0.5, -0.9, -0.4);
    dog3D.add(backRightLeg);

    // Paws
    const pawGeometry = new THREE.SphereGeometry(0.22, 16, 16);
    pawGeometry.scale(1, 0.5, 1);

    const paws = [
        [-0.5, -1.4, 0.6],
        [0.5, -1.4, 0.6],
        [-0.5, -1.4, -0.4],
        [0.5, -1.4, -0.4]
    ];

    paws.forEach(pos => {
        const paw = new THREE.Mesh(pawGeometry, darkBrownMaterial);
        paw.position.set(...pos);
        dog3D.add(paw);
    });

    // Tail (curved)
    const tailCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0.2, -1),
        new THREE.Vector3(0, 1.5, -1.5),
        new THREE.Vector3(0, 1, -0.5)
    );
    const tailGeometry = new THREE.TubeGeometry(tailCurve, 20, 0.15, 8, false);
    const tail = new THREE.Mesh(tailGeometry, brownMaterial);
    dog3D.add(tail);

    // Tongue (optional cute detail)
    const tongueGeometry = new THREE.BoxGeometry(0.2, 0.3, 0.05);
    const tongue = new THREE.Mesh(tongueGeometry, pinkMaterial);
    tongue.position.set(0, 0, 2.2);
    dog3D.add(tongue);

    // Position the entire dog
    dog3D.position.set(0, 0, 0);
    dog3D.rotation.y = Math.PI / 6; // Slight angle

    dogScene.add(dog3D);

    // Store references for animation
    dog3D.userData = {
        tail: tail,
        tongue: tongue,
        leftEar: leftEar,
        rightEar: rightEar,
        body: body,
        head: head
    };
}

function animate3DDog() {
    dogAnimationFrame = requestAnimationFrame(animate3DDog);

    if (!dog3D) return;

    const time = Date.now() * 0.001;

    // Gentle breathing
    const breathScale = 1 + Math.sin(time * 1.5) * 0.05;
    dog3D.userData.body.scale.set(1.2, breathScale, 0.8);

    // Head slight movement
    dog3D.userData.head.rotation.x = Math.sin(time * 0.8) * 0.1;
    dog3D.userData.head.rotation.y = Math.sin(time * 0.5) * 0.15;

    // Tail wagging
    dog3D.userData.tail.rotation.z = Math.sin(time * 3) * 0.5;

    // Ears slight flutter
    dog3D.userData.leftEar.rotation.x = Math.sin(time * 2) * 0.1;
    dog3D.userData.rightEar.rotation.x = Math.sin(time * 2.2) * 0.1;

    // Tongue wiggle
    dog3D.userData.tongue.scale.y = 1 + Math.sin(time * 4) * 0.1;

    // Whole dog gentle rotation
    dog3D.rotation.y = Math.PI / 6 + Math.sin(time * 0.3) * 0.2;

    // Slight bounce
    dog3D.position.y = Math.sin(time * 1.2) * 0.3;

    dogRenderer.render(dogScene, dogCamera);
}

// Cleanup function
function cleanup3DDog() {
    if (dogAnimationFrame) {
        cancelAnimationFrame(dogAnimationFrame);
    }
    if (dogRenderer) {
        dogRenderer.dispose();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DDog);
} else {
    init3DDog();
}

// Cleanup on landing scene hidden
const landingScene = document.getElementById('landing-scene');
if (landingScene) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (landingScene.classList.contains('hidden')) {
                cleanup3DDog();
            }
        });
    });
    observer.observe(landingScene, { attributes: true, attributeFilter: ['class'] });
}
