import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';


// --- NATIVE SVG ICONS (Ensures 100% bug-free rendering) ---
const Volume2Icon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
  </svg>
);

const VolumeXIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
  </svg>
);

const ChevronRightIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const HeartIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const SparklesIcon = ({ className = "w-5 h-5", style }) => (
  <svg className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const GiftIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V6a2 2 0 10-2 2h2zm8 2v11a1 1 0 01-1 1H5a1 1 0 01-1-1V10h16zM3 8h18V6a1 1 0 00-1-1H4a1 1 0 00-1 1v2z" />
  </svg>
);

const CheckIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const RotateCcwIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const XIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CheckCircle2Icon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// --- MEMORY FLOWERS DATA ---
const FLOWERS_DATA = [
  {
    id: 1,
    title: "Mi princesa 👑",
    message: "Porque incluso los días normales se sienten especiales cuando estoy contigo.",
    image: "public/images-site/foto-1.jpg",
    orbitRadius: 5.5,
    speed: 0.8,
    size: 0.85,
    color: "#FFD700"
  },
  {
    id: 2,
    title: "Tu sonrisa 🌻",
    message: "Una de esas pequeñas cosas que siempre consiguen alegrarme el día.",
    image: "public/images-site/foto-2.jpg",
    orbitRadius: 7.5,
    speed: 0.65,
    size: 0.9,
    color: "#FFC107"
  },
  {
    id: 3,
    title: "Nuestros momentos 💛",
    message: "Cada momento contigo termina convirtiéndose en un recuerdo que quiero guardar.",
    image: "public/images-site/foto-3.jpg",
    orbitRadius: 9.5,
    speed: 0.5,
    size: 0.95,
    color: "#FFB300"
  },
  {
    id: 4,
    title: "Tú ✨",
    message: "No necesito una razón especial para quererte. Simplemente eres tú.",
    image: "public/images-site/foto-4.jpg",
    orbitRadius: 11.5,
    speed: 0.4,
    size: 1.0,
    color: "#FFA000"
  },
  {
    id: 5,
    title: "Gracias ❤️",
    message: "Gracias por formar parte de mi vida y por todos los momentos que hemos compartido.",
    image: "public/images-site/foto-5.jpg",
    orbitRadius: 13.5,
    speed: 0.32,
    size: 1.05,
    color: "#FF8F00"
  },
  {
    id: 6,
    title: "Mi lugar favorito 🫶",
    message: "No importa dónde estemos. Si estoy contigo, siento que estoy donde quiero estar.",
    image: "public/images-site/foto-6.jpg",
    orbitRadius: 15.5,
    speed: 0.25,
    size: 1.1,
    color: "#FFD700"
  },
  {
    id: 7,
    title: "21 de septiembre 🌻",
    message: "Hoy quería regalarte flores, pero terminé creando todo un universo para ti.",
    image: "public/images-site/foto-7.jpg",
    orbitRadius: 17.5,
    speed: 0.2,
    size: 1.15,
    color: "#FFC107"
  },
  {
    id: 8,
    title: "Para siempre 💛",
    message: "Este pequeño universo es para recordarte lo importante que eres para mí.",
    image: "public/images-site/foto-8.jpg",
    orbitRadius: 19.5,
    speed: 0.16,
    size: 1.2,
    color: "#FFAB00"
  }
];

// --- PROCEDURAL 3D SUNFLOWER GENERATION ---
function getSunflowerSeedTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Deep rich dark brown center background
  ctx.fillStyle = '#1A0B03';
  ctx.fillRect(0, 0, 512, 512);

  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  const goldenAngle = (2 - goldenRatio) * Math.PI * 2;
  const maxSeeds = 1100;
  const center = 256;

  for (let i = 0; i < maxSeeds; i++) {
    const r = Math.sqrt(i) * 7.2;
    const theta = i * goldenAngle;
    const x = center + r * Math.cos(theta);
    const y = center + r * Math.sin(theta);

    if (x >= 0 && x <= 512 && y >= 0 && y <= 512) {
      const distRatio = r / 256;
      ctx.beginPath();
      ctx.arc(x, y, 2.6 - distRatio * 1.1, 0, Math.PI * 2);
      
      // Color gradient from dark inner seeds to warm reddish-amber outer ring
      if (distRatio < 0.35) {
        ctx.fillStyle = '#2A1305';
      } else if (distRatio < 0.72) {
        ctx.fillStyle = '#5C2203';
      } else {
        ctx.fillStyle = '#A05200';
      }
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function createPetalGeometry(length, width) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(width * 0.8, length * 0.35, width * 0.62, length * 0.75);
  shape.quadraticCurveTo(width * 0.35, length * 0.98, 0, length);
  shape.quadraticCurveTo(-width * 0.35, length * 0.98, -width * 0.62, length * 0.75);
  shape.quadraticCurveTo(-width * 0.8, length * 0.35, 0, 0);

  const extrudeSettings = {
    steps: 3,
    depth: 0.03,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.015,
    bevelSegments: 3
  };

  const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geo.center();
  return geo;
}

function createSunflowerMesh(size = 1, isCentral = false, colorHex = "#FFD700") {
  const group = new THREE.Group();
  const headGroup = new THREE.Group();

  // 1. Center Seed Disc (Dome oriented towards +Z front face)
  const seedTex = getSunflowerSeedTexture();
  const discGeo = new THREE.SphereGeometry(size * 0.78, 40, 20, 0, Math.PI * 2, 0, Math.PI * 0.42);
  const discMat = new THREE.MeshStandardMaterial({
    map: seedTex,
    bumpMap: seedTex,
    bumpScale: 0.15,
    roughness: 0.8,
    metalness: 0.05,
    color: isCentral ? 0xFFE082 : 0xFFFFFF
  });
  const discMesh = new THREE.Mesh(discGeo, discMat);
  discMesh.rotation.x = Math.PI / 2;
  headGroup.add(discMesh);

  if (isCentral) {
    const sunCoreGeo = new THREE.SphereGeometry(size * 0.6, 24, 24);
    const sunCoreMat = new THREE.MeshBasicMaterial({ color: 0xFF9800, transparent: true, opacity: 0.85 });
    headGroup.add(new THREE.Mesh(sunCoreGeo, sunCoreMat));
  }

  // 2. Green Leaf Accents
  const leafGeo = createPetalGeometry(size * 1.5, size * 0.75);
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.55, side: THREE.DoubleSide });

  const leafAngles = [0.4, 2.1, 3.8, 5.3];
  leafAngles.forEach((angle) => {
    const leaf = new THREE.Mesh(leafGeo, leafMat);
    leaf.position.set(
      Math.cos(angle) * size * 0.95,
      Math.sin(angle) * size * 0.95,
      -size * 0.1
    );
    leaf.rotation.z = angle - Math.PI / 2;
    leaf.rotation.x = -0.35;
    headGroup.add(leaf);
  });

  // 3. Dense Multi-layer Yellow Petals - Facing +Z Front
  const outerCount = isCentral ? 42 : 36;
  const middleCount = isCentral ? 38 : 32;
  const innerCount = isCentral ? 34 : 28;

  const outerGeo = createPetalGeometry(size * 1.55, size * 0.44);
  const middleGeo = createPetalGeometry(size * 1.38, size * 0.40);
  const innerGeo = createPetalGeometry(size * 1.18, size * 0.35);

  const baseColor = new THREE.Color("#FFC107");
  const middleColor = new THREE.Color("#FFD54F");
  const innerColor = new THREE.Color("#FFCA28");

  // Outer Petal Layer
  const outerMat = new THREE.MeshStandardMaterial({
    color: baseColor,
    emissive: new THREE.Color(isCentral ? 0xFF8C00 : 0x3d1d00),
    emissiveIntensity: isCentral ? 0.85 : 0.2,
    roughness: 0.35,
    side: THREE.DoubleSide
  });

  for (let i = 0; i < outerCount; i++) {
    const angle = (i / outerCount) * Math.PI * 2;
    const petalMesh = new THREE.Mesh(outerGeo, outerMat);
    petalMesh.position.set(
      Math.cos(angle) * size * 0.82,
      Math.sin(angle) * size * 0.82,
      -size * 0.05
    );
    petalMesh.rotation.z = angle - Math.PI / 2;
    petalMesh.rotation.x = -0.38;
    headGroup.add(petalMesh);
  }

  // Middle Petal Layer
  const middleMat = new THREE.MeshStandardMaterial({
    color: middleColor,
    emissive: new THREE.Color(isCentral ? 0xFFA000 : 0x3d1d00),
    emissiveIntensity: isCentral ? 0.85 : 0.2,
    roughness: 0.35,
    side: THREE.DoubleSide
  });

  for (let i = 0; i < middleCount; i++) {
    const angle = (i / middleCount) * Math.PI * 2 + (Math.PI / middleCount / 2);
    const petalMesh = new THREE.Mesh(middleGeo, middleMat);
    petalMesh.position.set(
      Math.cos(angle) * size * 0.74,
      Math.sin(angle) * size * 0.74,
      0
    );
    petalMesh.rotation.z = angle - Math.PI / 2;
    petalMesh.rotation.x = -0.24;
    headGroup.add(petalMesh);
  }

  // Inner Petal Layer
  const innerMat = new THREE.MeshStandardMaterial({
    color: innerColor,
    emissive: new THREE.Color(isCentral ? 0xFFB300 : 0x3d1d00),
    emissiveIntensity: isCentral ? 0.9 : 0.2,
    roughness: 0.35,
    side: THREE.DoubleSide
  });

  for (let i = 0; i < innerCount; i++) {
    const angle = (i / innerCount) * Math.PI * 2 + (Math.PI / innerCount);
    const petalMesh = new THREE.Mesh(innerGeo, innerMat);
    petalMesh.position.set(
      Math.cos(angle) * size * 0.65,
      Math.sin(angle) * size * 0.65,
      size * 0.05
    );
    petalMesh.rotation.z = angle - Math.PI / 2;
    petalMesh.rotation.x = -0.12;
    headGroup.add(petalMesh);
  }

  group.add(headGroup);

  if (isCentral) {
    const haloGeo = new THREE.SphereGeometry(size * 2.2, 24, 24);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xFFB300,
      transparent: true,
      opacity: 0.25,
      side: THREE.BackSide
    });
    group.add(new THREE.Mesh(haloGeo, haloMat));
  }

  return group;
}

class AmbientAudioSynth {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.oscillators = [];
    this.gainNode = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
  }

  play() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) return;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.15, this.ctx.currentTime + 3);
    this.gainNode.connect(this.ctx.destination);

    const freqs = [130.81, 164.81, 196.00, 246.94, 329.63]; 
    this.oscillators = freqs.map((freq) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);

      oscGain.gain.value = 0.2;
      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(this.gainNode);

      osc.start();
      return osc;
    });

    this.isPlaying = true;
  }

  stop() {
    if (!this.isPlaying || !this.gainNode) return;

    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);

    setTimeout(() => {
      this.oscillators.forEach(osc => {
        try { osc.stop(); } catch(e){}
      });
      this.oscillators = [];
      this.isPlaying = false;
    }, 1500);
  }
}

const audioSynth = new AmbientAudioSynth();

function ThreeSolarCanvas({ visitedIds, onSelectFlower, isFinale }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const flowerObjectsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x020617, 0.016);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      50, 
      container.clientWidth / container.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 15, 28);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xFFA500, 5.0, 60);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const dirLight = new THREE.DirectionalLight(0xFFF8DC, 1.4);
    dirLight.position.set(15, 25, 20);
    scene.add(dirLight);

    // 5. Starfield Background
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 2500;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 150;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMat = new THREE.PointsMaterial({ color: 0xFFD700, size: 0.18, transparent: true, opacity: 0.8 });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // 6. Central Sun Sunflower
    const centralFlower = createSunflowerMesh(2.2, true, "#FFD700");
    scene.add(centralFlower);

    // 7. Orbiting Sunflowers
    flowerObjectsRef.current = [];

    FLOWERS_DATA.forEach((data) => {
      const ringGeo = new THREE.RingGeometry(data.orbitRadius - 0.04, data.orbitRadius + 0.04, 90);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xFFD700, transparent: true, opacity: 0.22, side: THREE.DoubleSide });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      scene.add(ringMesh);

      const flowerMesh = createSunflowerMesh(data.size, false, data.color);
      scene.add(flowerMesh);

      const auraGeo = new THREE.RingGeometry(data.size * 1.15, data.size * 1.35, 36);
      const auraMat = new THREE.MeshBasicMaterial({ color: 0xFFD700, transparent: true, opacity: 0.0, side: THREE.DoubleSide });
      const auraMesh = new THREE.Mesh(auraGeo, auraMat);
      auraMesh.position.z = -0.08;
      flowerMesh.add(auraMesh);

      flowerObjectsRef.current.push({
        id: data.id,
        data,
        flowerMesh,
        auraMat
      });
    });

    // 8. Orbit & Drag Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let cameraAngleX = 0;
    let cameraAngleY = 0.42;
    let cameraDistance = 28;

    const updateCameraPosition = () => {
      camera.position.x = cameraDistance * Math.sin(cameraAngleX) * Math.cos(cameraAngleY);
      camera.position.z = cameraDistance * Math.cos(cameraAngleX) * Math.cos(cameraAngleY);
      camera.position.y = cameraDistance * Math.sin(cameraAngleY);
      camera.lookAt(0, 0, 0);
    };

    const handleMouseDown = (e) => {
      isDragging = false;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
        isDragging = true;
      }

      if (e.buttons === 1) {
        cameraAngleX -= deltaX * 0.005;
        cameraAngleY = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, cameraAngleY + deltaY * 0.005));

        previousMousePosition = { x: e.clientX, y: e.clientY };
        updateCameraPosition();
      }
    };

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e) => {
      if (isDragging) return;
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const interactiveMeshes = [];
      flowerObjectsRef.current.forEach(item => {
        item.flowerMesh.traverse((child) => {
          if (child.isMesh) {
            child.userData.flowerData = item.data;
            interactiveMeshes.push(child);
          }
        });
      });

      const intersects = raycaster.intersectObjects(interactiveMeshes, false);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        if (hitMesh.userData && hitMesh.userData.flowerData) {
          onSelectFlower(hitMesh.userData.flowerData);
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    domElement.addEventListener('click', handleClick);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Central Sunflower spins gently facing the camera
      centralFlower.quaternion.copy(camera.quaternion);
      if (centralFlower.children[0]) {
        centralFlower.children[0].rotation.z = elapsedTime * (isFinale ? 0.6 : 0.25);
      }

      flowerObjectsRef.current.forEach((item) => {
        const speedMultiplier = isFinale ? 0.04 : 0.32;
        const angle = elapsedTime * item.data.speed * speedMultiplier;
        
        // Smooth orbital movement
        const x = Math.cos(angle) * item.data.orbitRadius;
        const z = Math.sin(angle) * item.data.orbitRadius;
        const y = Math.sin(elapsedTime * 1.5 + item.data.id) * 0.25;

        item.flowerMesh.position.set(x, y, z);
        
        // Always billboard directly facing the camera so sunflowers never lose their shape
        item.flowerMesh.quaternion.copy(camera.quaternion);
      });

      starField.rotation.y = elapsedTime * 0.02;

      if (isFinale && cameraDistance > 16) {
        cameraDistance = THREE.MathUtils.lerp(cameraDistance, 16, 0.02);
        updateCameraPosition();
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      domElement.removeEventListener('click', handleClick);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isFinale]);

  useEffect(() => {
    flowerObjectsRef.current.forEach((item) => {
      const isVisited = visitedIds.includes(item.data.id);
      if (item.auraMat) {
        item.auraMat.opacity = isVisited ? 0.75 : 0.0;
      }
      item.flowerMesh.traverse((child) => {
        // Explicitly target MeshStandardMaterial to avoid undefined uniform error
        if (child.isMesh && child.material && child.material.isMeshStandardMaterial) {
          if (isVisited) {
            child.material.emissive.setHex(0xFFCC00);
            child.material.emissiveIntensity = 0.65;
          } else {
            child.material.emissive.setHex(0x2b1500);
            child.material.emissiveIntensity = 0.25;
          }
        }
      });
    });
  }, [visitedIds]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}

function FallingPetalsCanvas({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const petals = Array.from({ length: 75 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 14 + 8,
      speedY: Math.random() * 1.6 + 0.9,
      speedX: Math.random() * 1.2 - 0.6,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2.2,
      opacity: Math.random() * 0.7 + 0.3,
      color: ['#FFD700', '#FFA500', '#FF8C00', '#E6C200', '#FFDA33'][Math.floor(Math.random() * 5)]
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.012) + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size / 2, -p.size, 0, -p.size);
        ctx.bezierCurveTo(p.size / 2, -p.size, p.size / 2, -p.size / 2, 0, 0);
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-40 w-full h-full"
    />
  );
}

export default function App() {
  const [phase, setPhase] = useState('letter');
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [visitedIds, setVisitedIds] = useState([]);
  const [activeFlower, setActiveFlower] = useState(null);
  const [isFinale, setIsFinale] = useState(false);
  const [showFinaleModal, setShowFinaleModal] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleAudio = () => {
    if (isPlayingAudio) {
      audioSynth.stop();
      setIsPlayingAudio(false);
    } else {
      audioSynth.play();
      setIsPlayingAudio(true);
    }
  };

  const handleOpenLetter = () => {
    setIsEnvelopeOpen(true);
    if (!isPlayingAudio) {
      audioSynth.play();
      setIsPlayingAudio(true);
    }
  };

  const handleEnterSolarSystem = () => {
    setPhase('transition');
    setTimeout(() => {
      setPhase('solar');
    }, 1400);
  };

  const handleSelectFlower = (flower) => {
    setActiveFlower(flower);
    
    setVisitedIds((prev) => {
      if (!prev.includes(flower.id)) {
        const nextVisited = [...prev, flower.id];
        
        if (nextVisited.length === FLOWERS_DATA.length) {
          setTimeout(() => {
            setIsFinale(true);
            setShowFinaleModal(true);
          }, 1000);
        }
        return nextVisited;
      }
      return prev;
    });
  };

  const handleCloseModal = () => {
    setActiveFlower(null);
  };

  const handleReset = () => {
    setVisitedIds([]);
    setIsFinale(false);
    setShowFinaleModal(false);
    setActiveFlower(null);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 font-sans text-amber-100 select-none">
      
      {/* Falling Petals Particle Effects */}
      <FallingPetalsCanvas active={isFinale} />

      {/* Audio Ambient Toggle Button */}
      <button
        onClick={toggleAudio}
        className="fixed top-5 right-5 z-50 p-3 rounded-full bg-slate-900/85 border border-amber-500/40 text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-all duration-300 shadow-xl backdrop-blur-md flex items-center gap-2 cursor-pointer"
        title="Música ambiental"
      >
        {isPlayingAudio ? <Volume2Icon className="w-5 h-5 animate-pulse text-amber-400" /> : <VolumeXIcon className="w-5 h-5" />}
        <span className="text-xs font-semibold hidden sm:inline">
          {isPlayingAudio ? 'Música ambiental' : 'Activar Música'}
        </span>
      </button>

      {/* PHASE 1: 💌 WHITE ELEGANT LETTER SCREEN */}
      {phase === 'letter' && (
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 bg-slate-950 text-amber-100">
          
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-slate-950 to-slate-950" />
          <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />

          <div className="relative flex flex-col items-center max-w-md w-full text-center">
            
            <div className="mb-8 space-y-2">
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-amber-500/15 text-amber-300 border border-amber-400/30 shadow-sm backdrop-blur-md">
                21 de septiembre 🌻
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif text-amber-100 font-bold tracking-tight drop-shadow-md">
                Para mi Qlazo camila lazo👑
              </h1>
            </div>

            {/* Pristine White 3D Envelope */}
            <div 
              onClick={!isEnvelopeOpen ? handleOpenLetter : undefined}
              className={`group relative w-72 h-48 sm:w-80 sm:h-52 cursor-pointer transition-all duration-700 ${
                isEnvelopeOpen ? 'scale-105' : 'hover:scale-105'
              }`}
            >
              {/* White Envelope Base */}
              <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl border-2 border-amber-300/80 overflow-hidden">
                <div className={`absolute inset-x-3 bottom-3 top-10 bg-amber-50/80 rounded-xl p-5 text-slate-900 shadow-inner border border-amber-200/60 flex flex-col items-center justify-between transition-all duration-700 ${
                  isEnvelopeOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}>
                  <div className="space-y-2 my-auto">
                    <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold">Mensaje especial</p>
                    <p className="text-base sm:text-lg font-serif italic text-slate-800 leading-relaxed">
                      "Tengo un pequeño detalle preparado para ti..."
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnterSolarSystem();
                    }}
                    className="w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Dale clic acá 💛</span>
                    <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Top Flap of White Envelope */}
              <div 
                className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-slate-100 via-white to-amber-50/50 origin-top transition-transform duration-700 z-20 rounded-t-2xl border-t-2 border-amber-300 ${
                  isEnvelopeOpen ? '[transform:rotateX(180deg)]' : ''
                }`}
                style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
              />

              {!isEnvelopeOpen && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <HeartIcon className="w-6 h-6 text-slate-950 animate-pulse" />
                </div>
              )}
            </div>

            <p className="mt-8 text-xs text-amber-300/80 font-medium animate-pulse">
              {!isEnvelopeOpen ? "Toca la carta blanca para abrirla 💌" : "Presiona el botón para descubrir tu universo ✨"}
            </p>
          </div>
        </div>
      )}

      {/* PHASE 2: CINEMATIC TRANSITION */}
      {phase === 'transition' && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center">
          <div className="relative flex flex-col items-center gap-4 text-center px-4">
            <div className="w-16 h-16 rounded-full border-4 border-amber-500/20 border-t-amber-400 animate-spin" />
            <p className="text-amber-200 font-serif text-lg tracking-wide animate-pulse">
              Creando tu universo de girasoles... ☀️🌻
            </p>
          </div>
        </div>
      )}

      {/* PHASE 3: 3D SUNFLOWER PLANETARY SYSTEM */}
      {phase === 'solar' && (
        <div className="relative w-full h-full">
          
          {/* Top Bar Progress Tracker & Quick Select Toolbar */}
          <div className="absolute top-5 left-5 right-16 sm:right-auto z-30 flex flex-col gap-3 max-w-md">
            <div className="bg-slate-900/90 backdrop-blur-md border border-amber-500/40 rounded-2xl p-3 shadow-xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <SparklesIcon className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <div>
                  <h2 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Explora los girasoles 🌻
                  </h2>
                  <p className="text-xs text-slate-300 font-medium">
                    Descubiertos: <span className="font-bold text-amber-300">{visitedIds.length}</span> / {FLOWERS_DATA.length}
                  </p>
                </div>
              </div>

              {visitedIds.length === FLOWERS_DATA.length && !showFinaleModal && (
                <button
                  onClick={() => setShowFinaleModal(true)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs shadow-lg transition-all duration-300 flex items-center gap-1.5 cursor-pointer animate-bounce"
                >
                  <GiftIcon className="w-4 h-4" />
                  <span>Ver Final ❤️</span>
                </button>
              )}
            </div>

            {/* Quick-Access Sunflower Buttons Toolbar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {FLOWERS_DATA.map((flower) => {
                const isVisited = visitedIds.includes(flower.id);
                return (
                  <button
                    key={flower.id}
                    onClick={() => handleSelectFlower(flower)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1 shrink-0 cursor-pointer ${
                      isVisited 
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
                        : 'bg-slate-900/80 border border-amber-500/30 text-amber-200/70 hover:text-amber-200 hover:bg-slate-800'
                    }`}
                  >
                    <span>🌻 #{flower.id}</span>
                    {isVisited && <CheckIcon className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reset button */}
          <button
            onClick={handleReset}
            className="absolute bottom-5 right-5 z-30 p-2.5 rounded-xl bg-slate-900/80 border border-amber-500/30 text-amber-300/70 hover:text-amber-300 hover:bg-slate-800 transition-all text-xs flex items-center gap-1.5 backdrop-blur-md cursor-pointer"
            title="Reiniciar progreso"
          >
            <RotateCcwIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>

          {/* Canvas 3D */}
          <ThreeSolarCanvas 
            visitedIds={visitedIds} 
            onSelectFlower={handleSelectFlower} 
            isFinale={isFinale}
          />

          {/* FLOWER MEMORY CARD MODAL */}
          {activeFlower && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-300">
              <div 
                className="relative max-w-sm w-full bg-slate-900/90 border border-amber-500/40 rounded-3xl p-6 shadow-2xl text-center overflow-hidden"
                style={{ boxShadow: '0 0 45px rgba(245, 158, 11, 0.25)' }}
              >
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-amber-300/70 hover:text-amber-200 hover:bg-amber-500/20 transition-all cursor-pointer"
                >
                  <XIcon className="w-5 h-5" />
                </button>

                <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-5 border border-amber-500/30">
                  <img 
                    src={activeFlower.image} 
                    alt={activeFlower.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500 text-slate-950 backdrop-blur-md">
                    Girasol #{activeFlower.id}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-amber-200 mb-2">
                  {activeFlower.title}
                </h3>
                <p className="text-sm font-sans text-amber-100/90 leading-relaxed italic mb-6">
                  "{activeFlower.message}"
                </p>

                <button
                  onClick={handleCloseModal}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2Icon className="w-4 h-4" />
                  <span>Guardar recuerdo 💛</span>
                </button>
              </div>
            </div>
          )}

          {/* GRAND FINALE OVERLAY MODAL */}
          {showFinaleModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg animate-in fade-in duration-500">
              <div className="relative max-w-md w-full bg-gradient-to-b from-amber-950/90 via-slate-900 to-slate-950 border-2 border-amber-500/50 rounded-3xl p-8 shadow-2xl text-center space-y-6">
                
                <button
                  onClick={() => setShowFinaleModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-amber-300/70 hover:text-amber-200 cursor-pointer"
                >
                  <XIcon className="w-5 h-5" />
                </button>

                <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center">
                  <SparklesIcon className="w-8 h-8 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                </div>

                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-widest text-amber-400 font-bold">Universo Completado ☀️</p>
                  <h2 className="text-2xl font-serif font-bold text-amber-100">
                    Y si llegaste hasta aquí...
                  </h2>
                  <p className="text-amber-200/90 italic font-serif text-base">
                    "solo quería recordarte algo..."
                  </p>
                </div>

                <div className="py-4 px-6 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                  <p className="text-xl font-serif font-bold text-amber-300 leading-snug">
                    Te quiero muchísimo, princesa te veo hoy en el mall. 💛
                  </p>
                  <p className="text-sm font-semibold text-amber-400/90 mt-2">
                    Feliz 21 de septiembre 🌻
                  </p>
                </div>

                <p className="text-xs text-amber-200/60 leading-relaxed">
                  Gracias por recorrer cada uno de los girasoles de este universo que fue creado especialmente para ti.
                </p>

                <button
                  onClick={() => setShowFinaleModal(false)}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl transition-all duration-300 cursor-pointer"
                >
                  Seguir contemplando el universo ✨
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}