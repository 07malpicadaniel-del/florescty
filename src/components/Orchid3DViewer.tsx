'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  RotateCw, 
  Sparkles, 
  Flower2, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  RefreshCw
} from 'lucide-react';

interface ColorTheme {
  name: string;
  label: string;
  petal: number;
  lip: number;
  throat: number;
  glow: string;
  badge: string;
}

const COLOR_THEMES: ColorTheme[] = [
  { 
    name: 'Amatista Real', 
    label: 'Amatista',
    petal: 0xc89fd9, 
    lip: 0x6e1b65, 
    throat: 0xf5b041,
    glow: 'rgba(155, 113, 178, 0.4)',
    badge: 'bg-[#9B71B2] text-white'
  },
  { 
    name: 'Blanca Luna (Phalaenopsis amabilis)', 
    label: 'Blanca Pura',
    petal: 0xfaf6fa, 
    lip: 0xa87bb8, 
    throat: 0xf39c12,
    glow: 'rgba(250, 246, 250, 0.4)',
    badge: 'bg-white text-garden-darkPurple'
  },
  { 
    name: 'Fucsia Imperial', 
    label: 'Fucsia',
    petal: 0x9e2d78, 
    lip: 0x4d0a39, 
    throat: 0xf1c40f,
    glow: 'rgba(158, 45, 120, 0.4)',
    badge: 'bg-[#9e2d78] text-white'
  },
  { 
    name: 'Rosa Crepúsculo', 
    label: 'Rosa Suave',
    petal: 0xe8c7df, 
    lip: 0x822d6e, 
    throat: 0xf39c12,
    glow: 'rgba(232, 199, 223, 0.4)',
    badge: 'bg-[#e8c7df] text-garden-darkPurple'
  },
];

// Helper to generate a delicate petal texture with soft radial gradient and fine veins
function createPetalTexture(baseHex: number, centerHex: number = 0xffffff): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const baseCol = new THREE.Color(baseHex);
  const centerCol = new THREE.Color(centerHex);

  // Soft background gradient
  const grad = ctx.createRadialGradient(256, 380, 20, 256, 256, 260);
  grad.addColorStop(0, centerCol.getStyle());
  grad.addColorStop(0.4, baseCol.getStyle());
  grad.addColorStop(1, baseCol.clone().multiplyScalar(0.85).getStyle());
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Delicate radiating botanical veins
  ctx.strokeStyle = baseCol.clone().multiplyScalar(0.7).getStyle();
  ctx.lineWidth = 1.2;
  ctx.globalAlpha = 0.18;
  for (let i = 0; i < 28; i++) {
    const angle = (i / 28) * Math.PI * 0.85 + Math.PI * 0.075;
    ctx.beginPath();
    ctx.moveTo(256, 460);
    const cp1x = 256 + Math.cos(angle - Math.PI / 2) * 140;
    const cp1y = 460 - Math.sin(angle - Math.PI / 2) * 160;
    const targetX = 256 + Math.cos(angle - Math.PI / 2) * 260;
    const targetY = 460 - Math.sin(angle - Math.PI / 2) * 360;
    ctx.quadraticCurveTo(cp1x, cp1y, targetX, targetY);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Helper to generate realistic speckled lip texture
function createLipTexture(lipHex: number, throatHex: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const lipCol = new THREE.Color(lipHex);
  const throatCol = new THREE.Color(throatHex);

  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, throatCol.getStyle());
  grad.addColorStop(0.35, lipCol.clone().multiplyScalar(1.1).getStyle());
  grad.addColorStop(1, lipCol.clone().multiplyScalar(0.75).getStyle());
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Natural crimson speckles in the throat
  ctx.fillStyle = '#400828';
  for (let i = 0; i < 160; i++) {
    const x = 180 + Math.random() * 152;
    const y = 80 + Math.random() * 220;
    const r = 1 + Math.random() * 2.5;
    ctx.globalAlpha = 0.3 + Math.random() * 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export default function Orchid3DViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [colorIndex, setColorIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const orchidGroupRef = useRef<THREE.Group | null>(null);
  const petalMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const lipMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const zoomActionRef = useRef<((delta: number) => void) | null>(null);
  const resetActionRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 5.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (e) {
      console.warn('WebGL no disponible en este entorno:', e);
      container.innerHTML = `
        <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:16px;">
          <img src="/flowers/orquidea-phalaenopsis.jpg" alt="Orquídea Phalaenopsis" style="max-height:240px;border-radius:20px;object-fit:cover;box-shadow:0 10px 30px rgba(0,0,0,0.6);margin-bottom:12px;border:1px solid rgba(216,196,233,0.3);" />
          <p style="color:#D8C4E9;font-family:serif;font-size:14px;font-weight:600;margin:0;">Orquídea Phalaenopsis amabilis</p>
          <span style="color:rgba(216,196,233,0.7);font-size:11px;font-style:italic;">Floración constante y cuidados del hogar</span>
        </div>
      `;
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- Lighting Studio ---
    // Warm front key light
    const frontKeyLight = new THREE.DirectionalLight(0xfff7ed, 2.4);
    frontKeyLight.position.set(2.5, 3.5, 4.5);
    scene.add(frontKeyLight);

    // Amethyst backlight for translucent rim
    const rimAmethystLight = new THREE.DirectionalLight(0xb589c9, 2.0);
    rimAmethystLight.position.set(-3, 2, -2.5);
    scene.add(rimAmethystLight);

    // Soft botanical ambient
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.2);
    scene.add(ambientLight);

    // Ground fill light (warm cal poly / olive bounce)
    const groundBounceLight = new THREE.PointLight(0x6c6d11, 1.0, 8);
    groundBounceLight.position.set(0, -2.2, 1.8);
    scene.add(groundBounceLight);

    // --- Master Root Group ---
    const orchid = new THREE.Group();
    orchidGroupRef.current = orchid;
    scene.add(orchid);

    // Current Theme Textures
    const currentTheme = COLOR_THEMES[colorIndex];
    const petalTexture = createPetalTexture(currentTheme.petal, 0xffffff);
    const lipTexture = createLipTexture(currentTheme.lip, currentTheme.throat);

    // High quality standard materials
    const petalMat = new THREE.MeshStandardMaterial({
      map: petalTexture,
      color: 0xffffff,
      roughness: 0.32,
      metalness: 0.04,
      side: THREE.DoubleSide,
    });
    petalMaterialsRef.current = [petalMat];

    const lipMat = new THREE.MeshStandardMaterial({
      map: lipTexture,
      color: 0xffffff,
      roughness: 0.38,
      metalness: 0.08,
      side: THREE.DoubleSide,
    });
    lipMaterialRef.current = lipMat;

    const stemMat = new THREE.MeshStandardMaterial({
      color: 0x374126, // Cal Poly Green
      roughness: 0.45,
      metalness: 0.1,
    });

    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x223018,
      roughness: 0.28,
      metalness: 0.12,
      side: THREE.DoubleSide,
    });

    const columnMat = new THREE.MeshStandardMaterial({
      color: currentTheme.throat,
      roughness: 0.25,
      metalness: 0.15,
    });

    // Helper: Parametric curved petal mesh with organic taper, cupping, and ruffled margins
    function createSmoothPetalMesh({
      width = 1.3,
      height = 1.6,
      cup = 0.35,
      ruffle = 0.06,
      ruffleFreq = 4,
      taperPower = 0.7,
      isLateralSepal = false
    }) {
      const geom = new THREE.PlaneGeometry(width, height, 32, 32);
      const pos = geom.attributes.position;
      const uv = geom.attributes.uv;

      for (let i = 0; i < pos.count; i++) {
        let x = pos.getX(i);
        let y = pos.getY(i);

        // Normalized: u in [-1, 1], v in [-1, 1]
        const u = x / (width * 0.5);
        const v = y / (height * 0.5);

        // Natural width profile: narrow base, wide middle, tapered rounded apex
        const baseFactor = Math.sin((v + 1) * 0.5 * Math.PI);
        const taper = Math.pow(Math.max(0, baseFactor), taperPower);
        x = x * (0.35 + taper * 0.75);

        // Asymmetry for lateral sepals (pointing outward and downward)
        if (isLateralSepal && v < 0) {
          x += Math.sin(v * Math.PI) * 0.12;
        }

        // Cup curvature: natural dish shape
        const distFromCenter = Math.sqrt(u * u * 0.7 + v * v * 0.9);
        const zCup = -Math.cos(Math.min(1, distFromCenter) * Math.PI * 0.5) * cup;

        // Ruffled edge effect on perimeter
        const edgeFactor = Math.pow(Math.abs(u), 1.8);
        const zRuffle = Math.sin(v * ruffleFreq * Math.PI) * ruffle * edgeFactor;

        // Central spine ridge
        const zSpine = (1 - Math.abs(u)) * 0.05 * Math.cos(v * Math.PI * 0.5);

        pos.setX(i, x);
        pos.setZ(i, zCup + zRuffle + zSpine);
      }

      geom.computeVertexNormals();
      return geom;
    }

    // --- 1. Natural Arched Botanical Spike (Stem) ---
    const stemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.05, -2.6, 0.1),
      new THREE.Vector3(0.12, -1.6, 0.05),
      new THREE.Vector3(0.0, -0.4, 0.0),
      new THREE.Vector3(-0.08, 0.4, -0.05),
      new THREE.Vector3(-0.25, 1.1, -0.15),
      new THREE.Vector3(-0.5, 1.6, -0.3),
      new THREE.Vector3(-0.75, 1.85, -0.45)
    ]);
    const stemGeom = new THREE.TubeGeometry(stemCurve, 40, 0.065, 12, false);
    const stemMesh = new THREE.Mesh(stemGeom, stemMat);
    stemMesh.castShadow = true;
    orchid.add(stemMesh);

    // Stem nodes (bract rings)
    [ -1.6, -0.4, 0.4, 1.1 ].forEach((nodeY) => {
      const ringGeom = new THREE.TorusGeometry(0.075, 0.015, 8, 16);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0x4f5e36, roughness: 0.6 });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.set(0, nodeY, 0);
      ring.rotation.x = Math.PI / 2;
      orchid.add(ring);
    });

    // --- 2. Base Thick Leathery Orchid Leaves ---
    const leafAngles = [ 0.3, 2.4, 4.3 ];
    leafAngles.forEach((angle, idx) => {
      const leafGeom = new THREE.PlaneGeometry(0.9, 2.4, 16, 20);
      const pos = leafGeom.attributes.position;
      for (let j = 0; j < pos.count; j++) {
        const x = pos.getX(j);
        const y = pos.getY(j);
        // Thick drooping arch
        const arch = Math.sin((y + 1.2) / 2.4 * Math.PI) * 0.55;
        const valley = Math.abs(x) * 0.18;
        pos.setZ(j, -arch + valley);
      }
      leafGeom.computeVertexNormals();
      const leaf = new THREE.Mesh(leafGeom, leafMat);
      const radius = 0.22;
      leaf.position.set(Math.cos(angle) * radius, -2.35 + idx * 0.08, Math.sin(angle) * radius);
      leaf.rotation.set(0.95 + idx * 0.05, angle, -0.2);
      orchid.add(leaf);
    });

    // --- 3. The Main Phalaenopsis Flower ---
    const flower = new THREE.Group();
    flower.position.set(-0.02, 0.15, 0.18);

    // Pedicel (delicate flower stalk attaching flower to stem)
    const pedicelCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.05, 0.2, -0.1),
      new THREE.Vector3(-0.02, 0.18, 0.05),
      new THREE.Vector3(-0.02, 0.15, 0.18)
    ]);
    const pedicelGeom = new THREE.TubeGeometry(pedicelCurve, 12, 0.04, 8, false);
    const pedicel = new THREE.Mesh(pedicelGeom, stemMat);
    orchid.add(pedicel);

    // A) Dorsal Sepal (Top Petal)
    const dorsalGeom = createSmoothPetalMesh({
      width: 1.1,
      height: 1.55,
      cup: 0.28,
      ruffle: 0.04,
      taperPower: 0.75
    });
    const dorsal = new THREE.Mesh(dorsalGeom, petalMat);
    dorsal.position.set(0, 0.95, -0.06);
    dorsal.rotation.set(-0.14, 0, 0);
    flower.add(dorsal);

    // B & C) Lateral Sepals (Bottom-Left and Bottom-Right Sepals)
    const latSepalLeftGeom = createSmoothPetalMesh({
      width: 0.98,
      height: 1.45,
      cup: 0.24,
      ruffle: 0.035,
      taperPower: 0.8,
      isLateralSepal: true
    });
    const latSepalLeft = new THREE.Mesh(latSepalLeftGeom, petalMat);
    latSepalLeft.position.set(-0.68, -0.55, -0.06);
    latSepalLeft.rotation.set(0.12, 0.25, -0.68);
    flower.add(latSepalLeft);

    const latSepalRightGeom = createSmoothPetalMesh({
      width: 0.98,
      height: 1.45,
      cup: 0.24,
      ruffle: 0.035,
      taperPower: 0.8,
      isLateralSepal: true
    });
    const latSepalRight = new THREE.Mesh(latSepalRightGeom, petalMat);
    latSepalRight.position.set(0.68, -0.55, -0.06);
    latSepalRight.rotation.set(0.12, -0.25, 0.68);
    flower.add(latSepalRight);

    // D & E) Large "Butterfly Wings" Petals (Defining Phalaenopsis Feature)
    // Left Wing
    const wingLeftGeom = createSmoothPetalMesh({
      width: 1.62,
      height: 1.42,
      cup: 0.38,
      ruffle: 0.075,
      ruffleFreq: 5,
      taperPower: 0.55
    });
    const wingLeft = new THREE.Mesh(wingLeftGeom, petalMat);
    wingLeft.position.set(-1.05, 0.32, 0.08);
    wingLeft.rotation.set(0.06, 0.38, -1.25);
    flower.add(wingLeft);

    // Right Wing
    const wingRightGeom = createSmoothPetalMesh({
      width: 1.62,
      height: 1.42,
      cup: 0.38,
      ruffle: 0.075,
      ruffleFreq: 5,
      taperPower: 0.55
    });
    const wingRight = new THREE.Mesh(wingRightGeom, petalMat);
    wingRight.position.set(1.05, 0.32, 0.08);
    wingRight.rotation.set(0.06, -0.38, 1.25);
    flower.add(wingRight);

    // F) Elaborate 3-Lobed Labellum (The Orchid Lip)
    const lipGroup = new THREE.Group();
    lipGroup.position.set(0, -0.38, 0.22);

    // Midlobe: shaped like an anchor, curving down and forward
    const midlobeGeom = createSmoothPetalMesh({
      width: 0.72,
      height: 0.95,
      cup: 0.42,
      ruffle: 0.05,
      taperPower: 0.9
    });
    const midlobe = new THREE.Mesh(midlobeGeom, lipMat);
    midlobe.rotation.set(0.42, 0, 0);
    lipGroup.add(midlobe);

    // Antenna-like terminal cirri/tendrils at the apex of the lip
    const cirrusGeom = new THREE.TorusGeometry(0.12, 0.02, 8, 16, Math.PI * 1.2);
    const cirrusMat = new THREE.MeshStandardMaterial({ color: currentTheme.lip, roughness: 0.3 });
    const cirrusLeft = new THREE.Mesh(cirrusGeom, cirrusMat);
    cirrusLeft.position.set(-0.12, -0.42, 0.18);
    cirrusLeft.rotation.set(0.6, 0.3, -1.2);
    lipGroup.add(cirrusLeft);

    const cirrusRight = new THREE.Mesh(cirrusGeom, cirrusMat);
    cirrusRight.position.set(0.12, -0.42, 0.18);
    cirrusRight.rotation.set(0.6, -0.3, 1.2);
    lipGroup.add(cirrusRight);

    // Sidelobes: Two upright flaps curving inward hugging the central column
    const sideLobeGeom = new THREE.SphereGeometry(0.24, 16, 16, 0, Math.PI);
    sideLobeGeom.scale(0.8, 1.4, 0.6);
    const sideLobeLeft = new THREE.Mesh(sideLobeGeom, lipMat);
    sideLobeLeft.position.set(-0.25, 0.2, 0.05);
    sideLobeLeft.rotation.set(0.2, 0.6, -0.3);
    lipGroup.add(sideLobeLeft);

    const sideLobeRight = new THREE.Mesh(sideLobeGeom, lipMat);
    sideLobeRight.position.set(0.25, 0.2, 0.05);
    sideLobeRight.rotation.set(0.2, -0.6, 0.3);
    lipGroup.add(sideLobeRight);

    // Golden Callus / Crest in center of lip
    const callusGeom = new THREE.BoxGeometry(0.14, 0.22, 0.14);
    const callusMat = new THREE.MeshStandardMaterial({
      color: 0xf39c12, // Bright rich gold
      roughness: 0.2,
      metalness: 0.3
    });
    const callus = new THREE.Mesh(callusGeom, callusMat);
    callus.position.set(0, 0.12, 0.12);
    callus.rotation.set(-0.3, 0, 0);
    lipGroup.add(callus);

    flower.add(lipGroup);

    // G) Arching Column (Gynostemium)
    const columnCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.22, 0.12),
      new THREE.Vector3(0, 0.02, 0.26),
      new THREE.Vector3(0, 0.2, 0.32)
    ]);
    const columnGeom = new THREE.TubeGeometry(columnCurve, 16, 0.08, 12, false);
    const column = new THREE.Mesh(columnGeom, columnMat);
    flower.add(column);

    // Golden Anther / Pollinia Cap at tip of column
    const antherGeom = new THREE.SphereGeometry(0.095, 16, 16);
    antherGeom.scale(1, 0.8, 1.2);
    const antherMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      roughness: 0.18,
      metalness: 0.25
    });
    const antherCap = new THREE.Mesh(antherGeom, antherMat);
    antherCap.position.set(0, 0.21, 0.36);
    antherCap.rotation.set(-0.3, 0, 0);
    flower.add(antherCap);

    orchid.add(flower);

    // --- 4. Delicate Developing Orchid Buds on Upper Spike ---
    // Bud 1: Larger bud nearing bloom
    const bud1Group = new THREE.Group();
    bud1Group.position.set(-0.32, 1.25, -0.18);
    const bud1Geom = new THREE.SphereGeometry(0.24, 16, 16);
    bud1Geom.scale(0.85, 1.45, 0.95);
    const bud1 = new THREE.Mesh(bud1Geom, petalMat);
    bud1Group.add(bud1);
    bud1Group.rotation.set(0.3, 0.2, -0.5);
    orchid.add(bud1Group);

    // Bud 2: Medium green-amethyst bud
    const bud2Group = new THREE.Group();
    bud2Group.position.set(-0.55, 1.62, -0.32);
    const bud2Geom = new THREE.SphereGeometry(0.18, 14, 14);
    bud2Geom.scale(0.8, 1.35, 0.85);
    const bud2Mat = new THREE.MeshStandardMaterial({ color: 0x556b2f, roughness: 0.5 });
    const bud2 = new THREE.Mesh(bud2Geom, bud2Mat);
    bud2Group.add(bud2);
    bud2Group.rotation.set(0.4, 0.3, -0.7);
    orchid.add(bud2Group);

    // Bud 3: Tiny terminal apex bud
    const bud3Geom = new THREE.SphereGeometry(0.1, 10, 10);
    bud3Geom.scale(0.7, 1.3, 0.7);
    const bud3 = new THREE.Mesh(bud3Geom, stemMat);
    bud3.position.set(-0.76, 1.86, -0.46);
    bud3.rotation.set(0.6, 0.4, -0.9);
    orchid.add(bud3);

    // --- 5. Ambient Glowing Pollen & Spores ---
    const particleCount = 55;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 4.5;
      positions[i + 1] = (Math.random() - 0.5) * 5.5;
      positions[i + 2] = (Math.random() - 0.5) * 3.5;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf5e6cb,
      size: 0.055,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // --- 6. Smooth Mouse / Touch Interaction with Damping ---
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotY += deltaX * 0.008;
      targetRotX += deltaY * 0.006;
      targetRotX = Math.max(-0.55, Math.min(0.55, targetRotX));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      targetRotY += deltaX * 0.008;
      targetRotX += deltaY * 0.006;
      targetRotX = Math.max(-0.55, Math.min(0.55, targetRotX));
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.003;
      camera.position.z = Math.max(3.2, Math.min(7.5, camera.position.z));
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });

    // Zoom and reset helpers
    zoomActionRef.current = (delta: number) => {
      camera.position.z = Math.max(3.2, Math.min(7.5, camera.position.z + delta));
    };

    resetActionRef.current = () => {
      targetRotX = 0;
      targetRotY = 0;
      camera.position.set(0, 0.3, 5.2);
    };

    // --- 7. Animation Loop ---
    let animationId: number;
    let startTime = performance.now();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Natural gentle auto-rotation
      if (autoRotate && !isDragging) {
        targetRotY += 0.005;
      }

      // Smooth damping interpolation
      orchid.rotation.y += (targetRotY - orchid.rotation.y) * 0.06;
      orchid.rotation.x += (targetRotX - orchid.rotation.x) * 0.06;

      // Soft natural floating breeze
      orchid.position.y = Math.sin(elapsed * 1.2) * 0.07;
      orchid.position.x = Math.cos(elapsed * 0.8) * 0.02;

      // Gently flutter flower wings in breeze
      wingLeft.rotation.z = -1.25 + Math.sin(elapsed * 2.2) * 0.025;
      wingRight.rotation.z = 1.25 - Math.sin(elapsed * 2.2) * 0.025;

      // Animate floating pollen
      const pArr = particleGeom.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        pArr[i] += Math.sin(elapsed + i) * 0.0025;
      }
      particleGeom.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();
    setIsReady(true);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
      domElement.removeEventListener('wheel', onWheel);
      if (container && domElement.parentNode === container) {
        container.removeChild(domElement);
      }
      renderer.dispose();
    };
  }, [autoRotate]);

  // Update theme colors dynamically
  const switchColorTheme = (idx: number) => {
    setColorIndex(idx);
    const theme = COLOR_THEMES[idx];
    const newPetalTex = createPetalTexture(theme.petal, 0xffffff);
    const newLipTex = createLipTexture(theme.lip, theme.throat);

    if (petalMaterialsRef.current.length > 0) {
      petalMaterialsRef.current.forEach(mat => {
        mat.map = newPetalTex;
        mat.needsUpdate = true;
      });
    }
    if (lipMaterialRef.current) {
      lipMaterialRef.current.map = newLipTex;
      lipMaterialRef.current.needsUpdate = true;
    }
  };

  const currentTheme = COLOR_THEMES[colorIndex];

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#2B1428]/95 via-garden-darkPurple/90 to-[#1E0E1B]/95 border-2 border-garden-thistle/40 dark:border-garden-darkBorder shadow-2xl p-4 sm:p-5 flex flex-col group transition-all duration-300 hover:border-garden-amethyst/60">
      {/* Decorative ambient background glow matching selected flower color */}
      <div 
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{ backgroundColor: currentTheme.glow }}
      />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 text-xs relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="font-serif font-bold text-white tracking-wide flex items-center gap-1.5 text-sm">
            <Flower2 className="w-4 h-4 text-garden-amethyst" />
            Visor 3D Interactivo
          </span>
          <span className="text-garden-thistle/90 font-serif text-xs hidden sm:inline italic">
            · Orquídea Mariposa
          </span>
        </div>

        {/* Color Palette Switcher */}
        <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-full border border-white/10 backdrop-blur-sm">
          {COLOR_THEMES.map((theme, idx) => (
            <button
              key={theme.name}
              type="button"
              onClick={() => switchColorTheme(idx)}
              className={`w-5 h-5 rounded-full transition-all duration-200 cursor-pointer ${
                colorIndex === idx 
                  ? 'scale-125 ring-2 ring-white shadow-lg' 
                  : 'opacity-70 hover:opacity-100 hover:scale-110'
              }`}
              style={{
                backgroundColor: `#${theme.petal.toString(16).padStart(6, '0')}`,
              }}
              title={`Variedad: ${theme.name}`}
            />
          ))}
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-gradient-to-b from-black/60 via-[#180a16]/40 to-black/70 border border-white/10 cursor-grab active:cursor-grabbing flex items-center justify-center select-none shadow-inner"
      />

      {/* Floating Bottom Bar: Controls & Variety Label */}
      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-garden-thistle/90 relative z-10">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium border transition-all ${
              autoRotate 
                ? 'bg-garden-amethyst text-white border-garden-amethyst shadow-sm' 
                : 'bg-white/10 text-garden-thistle hover:text-white border-white/20'
            }`}
            title={autoRotate ? 'Pausar rotación automática' : 'Reanudar rotación automática'}
          >
            <RotateCw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} />
            <span>{autoRotate ? 'Rotando' : 'Pausado'}</span>
          </button>

          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded-full border border-white/10">
            <button
              type="button"
              onClick={() => zoomActionRef.current && zoomActionRef.current(-0.5)}
              className="cursor-pointer text-garden-thistle hover:text-white px-1 font-bold text-xs"
              title="Acercar"
            >
              +
            </button>
            <span className="text-[10px] text-garden-thistle/50">|</span>
            <button
              type="button"
              onClick={() => zoomActionRef.current && zoomActionRef.current(0.5)}
              className="cursor-pointer text-garden-thistle hover:text-white px-1 font-bold text-xs"
              title="Alejar"
            >
              −
            </button>
            <span className="text-[10px] text-garden-thistle/50">|</span>
            <button
              type="button"
              onClick={() => resetActionRef.current && resetActionRef.current()}
              className="cursor-pointer text-[10px] text-garden-thistle hover:text-white px-1"
              title="Restablecer vista"
            >
              <RefreshCw className="w-2.5 h-2.5" />
            </button>
          </div>

          <span className="text-[11px] text-garden-thistle/70 hidden lg:inline font-serif italic">
            Arrastra para rotar 360° · Rueda para zoom
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-serif">
          <span className="text-[11px] text-garden-thistle/70 hidden sm:inline uppercase tracking-wider">Variedad:</span>
          <span className="font-script text-garden-thistle text-xl tracking-wide font-normal">
            {currentTheme.name}
          </span>
        </div>
      </div>
    </div>
  );
}
