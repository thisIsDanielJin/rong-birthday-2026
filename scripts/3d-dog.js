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

    // Materials with improved colors and textures
    const furMaterial = new THREE.MeshPhongMaterial({
        color: 0xD2691E, // More realistic brown
        shininess: 20,
        specular: 0x333333
    });
    const darkFurMaterial = new THREE.MeshPhongMaterial({
        color: 0x8B4513,
        shininess: 20,
        specular: 0x222222
    });
    const blackMaterial = new THREE.MeshPhongMaterial({
        color: 0x1a1a1a,
        shininess: 80
    });
    const noseMaterial = new THREE.MeshPhongMaterial({
        color: 0x2d2d2d,
        shininess: 100
    });
    const pinkMaterial = new THREE.MeshPhongMaterial({
        color: 0xff9cb4,
        shininess: 30
    });

    // Body (more elongated like a real dog)
    const bodyGeometry = new THREE.SphereGeometry(1, 32, 32);
    bodyGeometry.scale(1.5, 1.1, 0.9);
    const body = new THREE.Mesh(bodyGeometry, furMaterial);
    body.position.set(0, 0.3, 0);
    body.castShadow = true;
    dog3D.add(body);

    // Chest (makes it more dog-like)
    const chestGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    chestGeometry.scale(1, 1.2, 1);
    const chest = new THREE.Mesh(chestGeometry, furMaterial);
    chest.position.set(0, 0, 0.9);
    dog3D.add(chest);

    // Head (more proportional)
    const headGeometry = new THREE.SphereGeometry(0.9, 32, 32);
    headGeometry.scale(1, 1.1, 1.1);
    const head = new THREE.Mesh(headGeometry, furMaterial);
    head.position.set(0, 0.8, 1.4);
    head.castShadow = true;
    dog3D.add(head);

    // Snout (more prominent)
    const snoutGeometry = new THREE.SphereGeometry(0.45, 16, 16);
    snoutGeometry.scale(0.9, 0.7, 1.4);
    const snout = new THREE.Mesh(snoutGeometry, darkFurMaterial);
    snout.position.set(0, 0.5, 2.1);
    dog3D.add(snout);

    // Nose (wet dog nose!)
    const noseGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    noseGeometry.scale(1.2, 0.8, 1);
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0, 0.5, 2.6);
    dog3D.add(nose);

    // Nostrils
    const nostrilGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const leftNostril = new THREE.Mesh(nostrilGeometry, blackMaterial);
    leftNostril.position.set(-0.08, 0.48, 2.68);
    dog3D.add(leftNostril);
    const rightNostril = new THREE.Mesh(nostrilGeometry, blackMaterial);
    rightNostril.position.set(0.08, 0.48, 2.68);
    dog3D.add(rightNostril);

    // Eyes (more expressive)
    const eyeGeometry = new THREE.SphereGeometry(0.18, 16, 16);
    const leftEye = new THREE.Mesh(eyeGeometry, blackMaterial);
    leftEye.position.set(-0.35, 0.95, 2);
    dog3D.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, blackMaterial);
    rightEye.position.set(0.35, 0.95, 2);
    dog3D.add(rightEye);

    // Eye shine (makes eyes look alive)
    const shineGeometry = new THREE.SphereGeometry(0.06, 8, 8);
    const shineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const leftShine = new THREE.Mesh(shineGeometry, shineMaterial);
    leftShine.position.set(-0.3, 1, 2.1);
    dog3D.add(leftShine);

    const rightShine = new THREE.Mesh(shineGeometry, shineMaterial);
    rightShine.position.set(0.4, 1, 2.1);
    dog3D.add(rightShine);

    // Eyebrows (adds expression)
    const browGeometry = new THREE.SphereGeometry(0.15, 8, 8);
    browGeometry.scale(1.5, 0.3, 0.3);
    const leftBrow = new THREE.Mesh(browGeometry, darkFurMaterial);
    leftBrow.position.set(-0.35, 1.15, 1.95);
    leftBrow.rotation.z = -0.2;
    dog3D.add(leftBrow);
    const rightBrow = new THREE.Mesh(browGeometry, darkFurMaterial);
    rightBrow.position.set(0.35, 1.15, 1.95);
    rightBrow.rotation.z = 0.2;
    dog3D.add(rightBrow);

    // Ears (long floppy ears)
    const earGeometry = new THREE.SphereGeometry(0.45, 16, 16);
    earGeometry.scale(0.5, 1.5, 0.25);

    const leftEar = new THREE.Mesh(earGeometry, darkFurMaterial);
    leftEar.position.set(-0.65, 1.1, 1.3);
    leftEar.rotation.z = -0.5;
    leftEar.rotation.x = 0.3;
    dog3D.add(leftEar);

    const rightEar = new THREE.Mesh(earGeometry, darkFurMaterial);
    rightEar.position.set(0.65, 1.1, 1.3);
    rightEar.rotation.z = 0.5;
    rightEar.rotation.x = 0.3;
    dog3D.add(rightEar);

    // Legs (more proportional)
    const legGeometry = new THREE.CylinderGeometry(0.22, 0.2, 1.2, 16);

    const frontLeftLeg = new THREE.Mesh(legGeometry, furMaterial);
    frontLeftLeg.position.set(-0.45, -0.6, 0.8);
    frontLeftLeg.castShadow = true;
    dog3D.add(frontLeftLeg);

    const frontRightLeg = new THREE.Mesh(legGeometry, furMaterial);
    frontRightLeg.position.set(0.45, -0.6, 0.8);
    frontRightLeg.castShadow = true;
    dog3D.add(frontRightLeg);

    const backLeftLeg = new THREE.Mesh(legGeometry, furMaterial);
    backLeftLeg.position.set(-0.45, -0.6, -0.6);
    backLeftLeg.castShadow = true;
    dog3D.add(backLeftLeg);

    const backRightLeg = new THREE.Mesh(legGeometry, furMaterial);
    backRightLeg.position.set(0.45, -0.6, -0.6);
    backRightLeg.castShadow = true;
    dog3D.add(backRightLeg);

    // Paws (more detailed)
    const pawGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    pawGeometry.scale(1, 0.6, 1.1);

    const paws = [
        [-0.45, -1.15, 0.8],
        [0.45, -1.15, 0.8],
        [-0.45, -1.15, -0.6],
        [0.45, -1.15, -0.6]
    ];

    paws.forEach(pos => {
        const paw = new THREE.Mesh(pawGeometry, darkFurMaterial);
        paw.position.set(...pos);
        paw.castShadow = true;
        dog3D.add(paw);
    });

    // Paw pads
    const padGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    padGeometry.scale(1, 0.3, 1);
    paws.forEach(pos => {
        for (let i = 0; i < 3; i++) {
            const pad = new THREE.Mesh(padGeometry, pinkMaterial);
            pad.position.set(
                pos[0] + (i - 1) * 0.12,
                pos[1] - 0.08,
                pos[2] + 0.15
            );
            dog3D.add(pad);
        }
    });

    // Tail (more curved and fluffy)
    const tailCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0.4, -1.2),
        new THREE.Vector3(0, 1.8, -1.8),
        new THREE.Vector3(0, 1.4, -0.8)
    );
    const tailGeometry = new THREE.TubeGeometry(tailCurve, 20, 0.18, 12, false);
    const tail = new THREE.Mesh(tailGeometry, furMaterial);
    tail.castShadow = true;
    dog3D.add(tail);

    // Tail tip (fluffy end)
    const tailTipGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const tailTip = new THREE.Mesh(tailTipGeometry, darkFurMaterial);
    tailTip.position.set(0, 1.4, -0.8);
    dog3D.add(tailTip);

    // Tongue (hanging out)
    const tongueGeometry = new THREE.BoxGeometry(0.25, 0.4, 0.08);
    tongueGeometry.translate(0, -0.2, 0);
    const tongue = new THREE.Mesh(tongueGeometry, pinkMaterial);
    tongue.position.set(0, 0.35, 2.5);
    tongue.rotation.x = 0.3;
    dog3D.add(tongue);

    // Collar (adds character)
    const collarGeometry = new THREE.TorusGeometry(0.6, 0.08, 8, 24);
    const collarMaterial = new THREE.MeshPhongMaterial({
        color: 0xff4444,
        shininess: 50
    });
    const collar = new THREE.Mesh(collarGeometry, collarMaterial);
    collar.position.set(0, 0.3, 1.2);
    collar.rotation.x = Math.PI / 2;
    dog3D.add(collar);

    // Collar tag
    const tagGeometry = new THREE.CircleGeometry(0.12, 16);
    const tagMaterial = new THREE.MeshPhongMaterial({
        color: 0xffd700,
        shininess: 80
    });
    const tag = new THREE.Mesh(tagGeometry, tagMaterial);
    tag.position.set(0, 0.1, 1.65);
    dog3D.add(tag);

    // Position the entire dog
    dog3D.position.set(0, 1, 0);
    dog3D.rotation.y = Math.PI / 8; // Slight angle
    dog3D.scale.set(0.9, 0.9, 0.9); // Slightly smaller to fit better

    dogScene.add(dog3D);

    // Store references for animation
    dog3D.userData = {
        tail: tail,
        tailTip: tailTip,
        tongue: tongue,
        leftEar: leftEar,
        rightEar: rightEar,
        body: body,
        head: head,
        leftEye: leftEye,
        rightEye: rightEye
    };
}

function animate3DDog() {
    dogAnimationFrame = requestAnimationFrame(animate3DDog);

    if (!dog3D) return;

    const time = Date.now() * 0.001;

    // Gentle breathing
    const breathScale = 1 + Math.sin(time * 1.5) * 0.04;
    dog3D.userData.body.scale.set(1.5, breathScale * 1.1, 0.9);

    // Head slight movement (looking around)
    dog3D.userData.head.rotation.x = Math.sin(time * 0.7) * 0.08;
    dog3D.userData.head.rotation.y = Math.sin(time * 0.5) * 0.12;

    // Tail wagging (happy dog!)
    const tailWag = Math.sin(time * 4) * 0.6;
    dog3D.userData.tail.rotation.z = tailWag;
    if (dog3D.userData.tailTip) {
        dog3D.userData.tailTip.rotation.z = tailWag * 0.8;
    }

    // Ears slight flutter
    dog3D.userData.leftEar.rotation.x = 0.3 + Math.sin(time * 2.2) * 0.1;
    dog3D.userData.rightEar.rotation.x = 0.3 + Math.sin(time * 2.5) * 0.1;

    // Tongue wiggle
    dog3D.userData.tongue.scale.y = 1 + Math.sin(time * 3) * 0.08;

    // Whole dog gentle rotation
    dog3D.rotation.y = Math.PI / 8 + Math.sin(time * 0.4) * 0.15;

    // Slight bounce
    dog3D.position.y = 1 + Math.sin(time * 1.2) * 0.2;

    // Occasional blink
    const blinkTime = (time * 1.5) % 4;
    if (blinkTime > 3.8) {
        const blinkScale = Math.max(0.1, 1 - (blinkTime - 3.8) * 5);
        dog3D.userData.leftEye.scale.y = blinkScale;
        dog3D.userData.rightEye.scale.y = blinkScale;
    } else {
        dog3D.userData.leftEye.scale.y = 1;
        dog3D.userData.rightEye.scale.y = 1;
    }

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
