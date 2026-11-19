import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './IsometricStack3D.css';

/**
 * Procedural Canvas Texture Generator for Front-Facing Labels & Icons
 */
function createLabelTexture(type) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 320;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerY = canvas.height / 2;
  const startX = 140;

  if (type === 'frontend') {
    // Desktop Computer Monitor Icon
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';

    // Screen
    ctx.beginPath();
    ctx.roundRect(startX, centerY - 64, 110, 80, 14);
    ctx.fill();
    ctx.stroke();

    // Stand & Base
    ctx.beginPath();
    ctx.moveTo(startX + 55, centerY + 16);
    ctx.lineTo(startX + 55, centerY + 46);
    ctx.moveTo(startX + 28, centerY + 46);
    ctx.lineTo(startX + 82, centerY + 46);
    ctx.stroke();

    // Text: Frontend
    ctx.font = 'bold 96px Inter, system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    ctx.shadowBlur = 18;
    ctx.textBaseline = 'middle';
    ctx.fillText('Frontend', startX + 160, centerY - 4);
  } else if (type === 'backend') {
    // 3-Tier Server / Database Icon
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.fillStyle = 'rgba(52, 211, 153, 0.4)';

    const iconX = startX + 55;
    const rx = 52;
    const ry = 18;

    // Top Disk
    ctx.beginPath();
    ctx.ellipse(iconX, centerY - 44, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Middle Arc
    ctx.beginPath();
    ctx.ellipse(iconX, centerY, rx, ry, 0, 0, Math.PI);
    ctx.stroke();

    // Bottom Arc
    ctx.beginPath();
    ctx.ellipse(iconX, centerY + 44, rx, ry, 0, 0, Math.PI);
    ctx.stroke();

    // Vertical Sides
    ctx.beginPath();
    ctx.moveTo(iconX - rx, centerY - 44);
    ctx.lineTo(iconX - rx, centerY + 44);
    ctx.moveTo(iconX + rx, centerY - 44);
    ctx.lineTo(iconX + rx, centerY + 44);
    ctx.stroke();

    // Text: Backend
    ctx.font = '800 102px Inter, system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(16, 185, 129, 0.95)';
    ctx.shadowBlur = 28;
    ctx.textBaseline = 'middle';
    ctx.fillText('Backend', startX + 165, centerY - 2);
  } else if (type === 'database') {
    // 3-Tier Database Cylinder Icon
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.fillStyle = 'rgba(45, 212, 191, 0.28)';

    const iconX = startX + 55;
    const rx = 52;
    const ry = 18;

    // Top Disk
    ctx.beginPath();
    ctx.ellipse(iconX, centerY - 44, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Middle Arc
    ctx.beginPath();
    ctx.ellipse(iconX, centerY, rx, ry, 0, 0, Math.PI);
    ctx.stroke();

    // Bottom Arc
    ctx.beginPath();
    ctx.ellipse(iconX, centerY + 44, rx, ry, 0, 0, Math.PI);
    ctx.stroke();

    // Vertical Sides
    ctx.beginPath();
    ctx.moveTo(iconX - rx, centerY - 44);
    ctx.lineTo(iconX - rx, centerY + 44);
    ctx.moveTo(iconX + rx, centerY - 44);
    ctx.lineTo(iconX + rx, centerY + 44);
    ctx.stroke();

    // Text: Database
    ctx.font = 'bold 96px Inter, system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    ctx.shadowBlur = 18;
    ctx.textBaseline = 'middle';
    ctx.fillText('Database', startX + 160, centerY - 4);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

/**
 * Procedural Texture Generator for the Floating Code Screen </> Glyph
 */
function createCodeScreenTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 840;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  // Specular Top Sheen Arc
  ctx.beginPath();
  ctx.moveTo(cx - 380, 60);
  ctx.lineTo(cx + 340, 60);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Multi-pass neon glow for </> glyph
  ctx.shadowColor = '#10b981';
  ctx.shadowBlur = 45;
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 42;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // < bracket
  ctx.beginPath();
  ctx.moveTo(cx - 110, cy - 130);
  ctx.lineTo(cx - 240, cy);
  ctx.lineTo(cx - 110, cy + 130);
  ctx.stroke();

  // / slash
  ctx.beginPath();
  ctx.moveTo(cx + 60, cy - 170);
  ctx.lineTo(cx - 50, cy + 170);
  ctx.stroke();

  // > bracket
  ctx.beginPath();
  ctx.moveTo(cx + 120, cy - 130);
  ctx.lineTo(cx + 250, cy);
  ctx.lineTo(cx + 120, cy + 130);
  ctx.stroke();

  // 3D Bevel Highlight Overlay (Inner bright core)
  ctx.shadowBlur = 0;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 14;

  ctx.beginPath();
  ctx.moveTo(cx - 110, cy - 128);
  ctx.lineTo(cx - 236, cy);
  ctx.lineTo(cx - 110, cy + 128);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx + 58, cy - 166);
  ctx.lineTo(cx - 48, cy + 166);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx + 122, cy - 128);
  ctx.lineTo(cx + 246, cy);
  ctx.lineTo(cx + 122, cy + 128);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

/**
 * Procedural Ground Contact Shadow Texture
 */
function createShadowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const cx = 256;
  const cy = 256;
  const radGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 250);
  radGrad.addColorStop(0, 'rgba(0, 0, 0, 0.55)');
  radGrad.addColorStop(0.3, 'rgba(0, 0, 0, 0.32)');
  radGrad.addColorStop(0.55, 'rgba(16, 185, 129, 0.22)');
  radGrad.addColorStop(0.8, 'rgba(0, 0, 0, 0.05)');
  radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = radGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  return texture;
}

/**
 * Helper to build extruded rounded rectangle geometry
 */
function createRoundedSlabGeometry(w, h, d, radius, bevel) {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;

  shape.moveTo(x + radius, y);
  shape.lineTo(x + w - radius, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + radius);
  shape.lineTo(x + w, y + h - radius);
  shape.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  shape.lineTo(x + radius, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  const extrudeSettings = {
    depth: d - bevel * 2,
    bevelEnabled: true,
    bevelSegments: 8,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
  };

  const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geom.center();
  return geom;
}

export default function IsometricStack3D({
  onSelectCategory,
  hoveredCard,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Transparent Renderer
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Camera Setup (Perspective with Isometric Angle)
    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    // Elevated 3/4 camera view
    camera.position.set(4.8, 4.4, 5.8);
    camera.lookAt(0, -0.05, 0);

    // 3. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    // Main Key Light (sharp bevel highlights)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(6, 9, 6);
    scene.add(keyLight);

    // Cool Rim Light (accents back-left glass edges)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
    rimLight.position.set(-6, 4, -5);
    scene.add(rimLight);

    // Warm Fill Light
    const fillLight = new THREE.DirectionalLight(0x94a3b8, 1.2);
    fillLight.position.set(-4, 6, 4);
    scene.add(fillLight);

    // Backend Centerpiece Volumetric Core Light
    const backendCoreLight = new THREE.PointLight(0x34d399, 4.2, 4.5);
    backendCoreLight.position.set(0, -0.12, 0);
    scene.add(backendCoreLight);

    // Floating Code Glyph Light
    const glyphLight = new THREE.PointLight(0x34d399, 2.4, 3.0);
    glyphLight.position.set(0, 1.45, 0.4);
    scene.add(glyphLight);

    // 4. Materials Setup
    // Smoked Graphite Glass (Frontend & Database)
    const darkGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#16202e'),
      metalness: 0.15,
      roughness: 0.18,
      transmission: 0.85,
      thickness: 1.4,
      ior: 1.52,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.94,
      reflectivity: 0.9,
    });

    // Luminous Emerald Glass (Backend - Hero Centerpiece)
    const emeraldGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#10b981'),
      emissive: new THREE.Color('#059669'),
      emissiveIntensity: 0.82,
      metalness: 0.05,
      roughness: 0.12,
      transmission: 0.88,
      thickness: 1.6,
      ior: 1.54,
      attenuationColor: new THREE.Color('#34d399'),
      attenuationDistance: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      transparent: true,
      opacity: 0.93,
    });

    // Database Material (Dark Smoked Glass catching emerald reflection)
    const databaseGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#121e28'),
      emissive: new THREE.Color('#064e3b'),
      emissiveIntensity: 0.35,
      metalness: 0.12,
      roughness: 0.18,
      transmission: 0.85,
      thickness: 1.4,
      ior: 1.52,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.94,
    });

    // Base Platform Material (Dark Graphite with metallic reflection)
    const basePlateMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0e1722'),
      metalness: 0.45,
      roughness: 0.28,
    });

    // Glowing Mint-Teal Rim Material
    const mintRimMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#2dd4bf'),
    });

    // 5. Main 3D Architecture Stack Hierarchy
    const stackGroup = new THREE.Group();
    // 45 degree isometric orientation
    stackGroup.rotation.y = Math.PI / 4;
    scene.add(stackGroup);

    // Dimensions
    const slabW = 2.65;
    const slabH = 2.65;
    const slabD = 0.38;
    const slabRadius = 0.45;
    const slabBevel = 0.075;

    // --- Base Platform ---
    const baseGeom = createRoundedSlabGeometry(3.05, 3.05, 0.18, 0.55, 0.05);
    const baseMesh = new THREE.Mesh(baseGeom, basePlateMaterial);
    baseMesh.rotation.x = -Math.PI / 2;
    baseMesh.position.y = -1.35;
    stackGroup.add(baseMesh);

    // Glowing mint rim line around the bottom of the base
    const baseRimCurvePoints = [];
    const baseRimR = 1.48;
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      baseRimCurvePoints.push(
        new THREE.Vector3(Math.cos(theta) * baseRimR, -1.43, Math.sin(theta) * baseRimR)
      );
    }
    const baseRimCurve = new THREE.CatmullRomCurve3(baseRimCurvePoints, true);
    const baseRimGeom = new THREE.TubeGeometry(baseRimCurve, 80, 0.016, 8, true);
    const baseRimMesh = new THREE.Mesh(baseRimGeom, mintRimMaterial);
    stackGroup.add(baseRimMesh);

    // --- Ground Contact Shadows ---
    const shadowTexture = createShadowTexture();
    const shadowGeom = new THREE.PlaneGeometry(6.4, 6.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.46;
    scene.add(shadowMesh);

    // Helper to create and attach front-facing label plane
    function attachFrontLabel(mesh, type) {
      const labelTex = createLabelTexture(type);
      if (!labelTex) return;
      const labelGeom = new THREE.PlaneGeometry(slabW * 0.78, slabD * 0.95);
      const labelMat = new THREE.MeshBasicMaterial({
        map: labelTex,
        transparent: true,
        opacity: 0.98,
        depthWrite: false,
      });
      const labelMesh = new THREE.Mesh(labelGeom, labelMat);
      labelMesh.position.set(0, slabH / 2 + slabBevel + 0.005, 0);
      labelMesh.rotation.x = Math.PI / 2;
      mesh.add(labelMesh);
    }

    // --- Layer 3: Database Slab (Bottom) ---
    const databaseGeom = createRoundedSlabGeometry(slabW, slabH, slabD, slabRadius, slabBevel);
    const databaseMesh = new THREE.Mesh(databaseGeom, databaseGlassMaterial);
    databaseMesh.rotation.x = -Math.PI / 2;
    databaseMesh.position.y = -0.75;
    databaseMesh.userData = { category: 'database', baseY: -0.75 };
    attachFrontLabel(databaseMesh, 'database');
    stackGroup.add(databaseMesh);

    // --- Layer 2: Backend Slab (Hero Centerpiece) ---
    const backendGeom = createRoundedSlabGeometry(slabW, slabH, slabD + 0.04, slabRadius, slabBevel);
    const backendMesh = new THREE.Mesh(backendGeom, emeraldGlassMaterial);
    backendMesh.rotation.x = -Math.PI / 2;
    backendMesh.position.y = -0.15;
    backendMesh.userData = { category: 'backend', baseY: -0.15 };
    attachFrontLabel(backendMesh, 'backend');
    stackGroup.add(backendMesh);

    // --- Layer 1: Frontend Slab (Top) ---
    const frontendGeom = createRoundedSlabGeometry(slabW, slabH, slabD, slabRadius, slabBevel);
    const frontendMesh = new THREE.Mesh(frontendGeom, darkGlassMaterial);
    frontendMesh.rotation.x = -Math.PI / 2;
    frontendMesh.position.y = 0.45;
    frontendMesh.userData = { category: 'frontend', baseY: 0.45 };
    attachFrontLabel(frontendMesh, 'frontend');
    stackGroup.add(frontendMesh);

    // --- Floating Code Screen (Above the stack) ---
    const screenGroup = new THREE.Group();
    screenGroup.position.set(0, 1.38, 0);
    // Tilted backwards and slightly angled
    screenGroup.rotation.set(-0.32, -0.22, -0.04);
    stackGroup.add(screenGroup);

    const screenGeom = createRoundedSlabGeometry(1.4, 1.15, 0.1, 0.22, 0.04);
    const screenGlassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0c1622'),
      metalness: 0.15,
      roughness: 0.14,
      transmission: 0.82,
      thickness: 0.9,
      ior: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.92,
    });
    const screenPlate = new THREE.Mesh(screenGeom, screenGlassMat);
    screenPlate.rotation.x = -Math.PI / 2;
    screenGroup.add(screenPlate);

    // Glowing </> decal on front face of screen
    const codeScreenTex = createCodeScreenTexture();
    const codeDecalGeom = new THREE.PlaneGeometry(1.36, 1.12);
    const codeDecalMat = new THREE.MeshBasicMaterial({
      map: codeScreenTex,
      transparent: true,
      depthWrite: false,
    });
    const codeDecalMesh = new THREE.Mesh(codeDecalGeom, codeDecalMat);
    codeDecalMesh.position.set(0, 1.15 / 2 + 0.04 + 0.005, 0);
    codeDecalMesh.rotation.x = Math.PI / 2;
    screenPlate.add(codeDecalMesh);

    // 6. 3D Orbital Rings with Revolving Spheres
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    const orbitMat = new THREE.MeshStandardMaterial({
      color: 0x2dd4bf,
      emissive: 0x10b981,
      emissiveIntensity: 0.95,
      roughness: 0.2,
      metalness: 0.2,
    });

    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xa7f3d0,
      emissive: 0x34d399,
      emissiveIntensity: 1.6,
      roughness: 0.1,
      metalness: 0.1,
    });

    // Upper Orbit Ring
    const upperOrbitGroup = new THREE.Group();
    upperOrbitGroup.position.set(0, 0.65, 0);
    upperOrbitGroup.rotation.set(0.32, -0.42, 0.18);
    orbitGroup.add(upperOrbitGroup);

    const upperOrbitPoints = [];
    const upperRx = 2.45;
    const upperRz = 1.35;
    for (let i = 0; i <= 80; i++) {
      const theta = (i / 80) * Math.PI * 2;
      upperOrbitPoints.push(
        new THREE.Vector3(Math.cos(theta) * upperRx, 0, Math.sin(theta) * upperRz)
      );
    }
    const upperCurve = new THREE.CatmullRomCurve3(upperOrbitPoints, true);
    const upperTubeGeom = new THREE.TubeGeometry(upperCurve, 100, 0.013, 8, true);
    const upperTubeMesh = new THREE.Mesh(upperTubeGeom, orbitMat);
    upperOrbitGroup.add(upperTubeMesh);

    const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(0.085, 20, 20), sphereMat);
    const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.075, 20, 20), sphereMat);
    upperOrbitGroup.add(sphere1);
    upperOrbitGroup.add(sphere2);

    // Lower Orbit Ring
    const lowerOrbitGroup = new THREE.Group();
    lowerOrbitGroup.position.set(0, -0.55, 0);
    lowerOrbitGroup.rotation.set(-0.35, 0.44, -0.16);
    orbitGroup.add(lowerOrbitGroup);

    const lowerOrbitPoints = [];
    const lowerRx = 2.65;
    const lowerRz = 1.45;
    for (let i = 0; i <= 80; i++) {
      const theta = (i / 80) * Math.PI * 2;
      lowerOrbitPoints.push(
        new THREE.Vector3(Math.cos(theta) * lowerRx, 0, Math.sin(theta) * lowerRz)
      );
    }
    const lowerCurve = new THREE.CatmullRomCurve3(lowerOrbitPoints, true);
    const lowerTubeGeom = new THREE.TubeGeometry(lowerCurve, 100, 0.013, 8, true);
    const lowerTubeMesh = new THREE.Mesh(lowerTubeGeom, orbitMat);
    lowerOrbitGroup.add(lowerTubeMesh);

    const sphere3 = new THREE.Mesh(new THREE.SphereGeometry(0.09, 20, 20), sphereMat);
    const sphere4 = new THREE.Mesh(new THREE.SphereGeometry(0.075, 20, 20), sphereMat);
    lowerOrbitGroup.add(sphere3);
    lowerOrbitGroup.add(sphere4);

    // 7. Interactive Parallax & Raycasting Setup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;
    let hoveredSlabCategory = null;

    const interactiveSlabs = [frontendMesh, backendMesh, databaseMesh];

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      mouse.x = x * 2 - 1;
      mouse.y = -(y * 2 - 1);

      // Smooth tilt target: max ~0.25 rad
      targetParallaxX = (x - 0.5) * 0.28;
      targetParallaxY = -(y - 0.5) * 0.2;
    };

    const handlePointerLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
      targetParallaxX = 0;
      targetParallaxY = 0;
      hoveredSlabCategory = null;
      container.style.cursor = 'default';
    };

    const handleClick = () => {
      if (hoveredSlabCategory && onSelectCategory) {
        onSelectCategory(hoveredSlabCategory);
      }
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);
    container.addEventListener('click', handleClick);

    // 8. Animation & Render Loop
    let animationFrameId;
    let clock = new THREE.Clock();
    let t1 = 0.2;
    let t2 = 0.7;
    let t3 = 0.15;
    let t4 = 0.65;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Check prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Mouse Parallax Lerping
      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.08;
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.08;

      // Base rotation + mouse parallax tilt
      stackGroup.rotation.y = Math.PI / 4 + currentParallaxX;
      stackGroup.rotation.x = currentParallaxY;
      orbitGroup.rotation.y = currentParallaxX * 0.7;
      orbitGroup.rotation.x = currentParallaxY * 0.7;

      if (!prefersReducedMotion) {
        // Floating Levitation Motion
        stackGroup.position.y = Math.sin(elapsed * 1.4) * 0.05;
        screenGroup.position.y = 1.38 + Math.sin(elapsed * 1.8 + 0.4) * 0.08;
        screenGroup.rotation.z = -0.04 + Math.sin(elapsed * 1.2) * 0.02;

        // Backend Luminous Pulse
        backendMesh.material.emissiveIntensity = 0.82 + Math.sin(elapsed * 2.5) * 0.22;
        backendCoreLight.intensity = 4.2 + Math.sin(elapsed * 2.5) * 1.2;

        // Orbital Spheres Movement
        t1 = (t1 + delta * 0.045) % 1;
        t2 = (t2 + delta * 0.045) % 1;
        t3 = (t3 + delta * 0.038) % 1;
        t4 = (t4 + delta * 0.038) % 1;

        upperCurve.getPointAt(t1, sphere1.position);
        upperCurve.getPointAt(t2, sphere2.position);
        lowerCurve.getPointAt(t3, sphere3.position);
        lowerCurve.getPointAt(t4, sphere4.position);
      }

      // Raycasting for interactive hover lift
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveSlabs, false);

      if (intersects.length > 0) {
        hoveredSlabCategory = intersects[0].object.userData.category;
        container.style.cursor = 'pointer';
      } else {
        hoveredSlabCategory = null;
        container.style.cursor = 'default';
      }

      // Apply elevation based on hover or prop
      interactiveSlabs.forEach((slab) => {
        const cat = slab.userData.category;
        const isLifted = hoveredSlabCategory === cat || hoveredCard === cat;
        const targetY = slab.userData.baseY + (isLifted ? 0.18 : 0);
        slab.position.y += (targetY - slab.position.y) * 0.15;
      });

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling via ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    // 10. Complete Memory & GPU Resource Disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      container.removeEventListener('click', handleClick);

      // Dispose Three.js objects
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [hoveredCard, onSelectCategory]);

  return (
    <div
      ref={containerRef}
      className="iso-stack-container"
      role="region"
      aria-label="3D Technical Architecture Ecosystem - Frontend, Backend, Database"
    />
  );
}
