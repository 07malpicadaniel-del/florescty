'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  RotateCw, 
  Sparkles, 
  Palette, 
  ZoomIn, 
  Maximize2,
  Flower2,
  Leaf
} from 'lucide-react';

interface ColorTheme {
  name: string;
  petal: number;
  lip: number;
  throat: number;
}

const COLOR_THEMES: ColorTheme[] = [
  { name: 'Amatista', petal: 0xb589c9, lip: 0x6e2863, throat: 0xf5b041 },
  { name: 'Blanca', petal: 0xfaf4f8, lip: 0x9b71b2, throat: 0xf39c12 },
  { name: 'Magenta Imperial', petal: 0x8e2a6d, lip: 0x4a1236, throat: 0xf1c40f },
  { name: 'Suave Thistle', petal: 0xe3d0ea, lip: 0x7d3c98, throat: 0xf4d03f },
];

export default function Orchid3DViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [colorIndex, setColorIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const orchidGroupRef = useRef<THREE.Group | null>(null);
  const petalMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const lipMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    scene.background = null; // transparent to show luxury garden dark background

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const frontLight = new THREE.DirectionalLight(0xfff5ea, 2.2);
    frontLight.position.set(2, 4, 4);
    scene.add(frontLight);

    const rimLight = new THREE.DirectionalLight(0x9b71b2, 2.0);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    const bottomGlow = new THREE.PointLight(0x6c6d11, 1.2, 8);
    bottomGlow.position.set(0, -2, 2);
    scene.add(bottomGlow);

    // Root Group
    const orchid = new THREE.Group();
    orchidGroupRef.current = orchid;
    scene.add(orchid);

    // Materials
    const currentTheme = COLOR_THEMES[colorIndex];

    const petalMat = new THREE.MeshStandardMaterial({
      color: currentTheme.petal,
      roughness: 0.35,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
    petalMaterialsRef.current = [petalMat];

    const lipMat = new THREE.MeshStandardMaterial({
      color: currentTheme.lip,
      roughness: 0.4,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
    lipMaterialRef.current = lipMat;

    const stemMat = new THREE.MeshStandardMaterial({
      color: 0x374126, // Cal Poly Green
      roughness: 0.5,
      metalness: 0.1,
    });

    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x2b341e,
      roughness: 0.3,
      metalness: 0.15,
      side: THREE.DoubleSide,
    });

    const columnMat = new THREE.MeshStandardMaterial({
      color: currentTheme.throat,
      roughness: 0.2,
      metalness: 0.2,
    });

    // Helper: Build curved petal
    function createPetalMesh(widthScale = 1, lengthScale = 1, curl = 0.2) {
      const geom = new THREE.PlaneGeometry(1.2 * widthScale, 1.8 * lengthScale, 16, 16);
      const pos = geom.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        // Taper petal at base and tip, curl backwards
        const taper = Math.cos((y / (1.8 * lengthScale)) * Math.PI) * 0.5 + 0.5;
        pos.setX(i, x * (0.4 + taper * 0.7));
        const z = -Math.sin(((y + 0.9) / 1.8) * Math.PI) * curl - (x * x) * 0.15;
        pos.setZ(i, z);
      }
      geom.computeVertexNormals();
      return geom;
    }

    // --- Stem (Arched) ---
    const stemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -2.6, 0),
      new THREE.Vector3(0.1, -1.5, 0.1),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-0.15, 0.8, -0.1),
      new THREE.Vector3(-0.3, 1.3, -0.2)
    ]);
    const stemGeom = new THREE.TubeGeometry(stemCurve, 32, 0.055, 12, false);
    const stemMesh = new THREE.Mesh(stemGeom, stemMat);
    orchid.add(stemMesh);

    // --- Leaves at base ---
    for (let i = 0; i < 3; i++) {
      const leafGeom = new THREE.PlaneGeometry(0.8, 2.2, 12, 12);
      const pos = leafGeom.attributes.position;
      for (let j = 0; j < pos.count; j++) {
        const x = pos.getX(j);
        const y = pos.getY(j);
        const arch = Math.sin((y + 1.1) / 2.2 * Math.PI) * 0.4;
        pos.setZ(j, -arch - (x * x) * 0.2);
      }
      leafGeom.computeVertexNormals();
      const leafMesh = new THREE.Mesh(leafGeom, leafMat);
      const angle = (i * Math.PI * 2) / 3 + 0.3;
      leafMesh.position.set(Math.cos(angle) * 0.2, -2.2, Math.sin(angle) * 0.2);
      leafMesh.rotation.set(0.9, angle, 0);
      orchid.add(leafMesh);
    }

    // --- Main Orchid Flower Blossom ---
    const flower = new THREE.Group();
    flower.position.set(0, 0.1, 0.1);

    // 1. Dorsal Sepal (Top)
    const dorsalGeom = createPetalMesh(0.75, 1.1, 0.25);
    const dorsal = new THREE.Mesh(dorsalGeom, petalMat);
    dorsal.position.set(0, 0.85, -0.05);
    dorsal.rotation.set(-0.15, 0, 0);
    flower.add(dorsal);

    // 2 & 3. Lateral Sepals (Bottom Left & Right)
    const latGeom = createPetalMesh(0.7, 1.0, 0.2);
    const latLeft = new THREE.Mesh(latGeom, petalMat);
    latLeft.position.set(-0.6, -0.45, -0.05);
    latLeft.rotation.set(0.1, 0.2, -0.7);
    flower.add(latLeft);

    const latRight = new THREE.Mesh(latGeom, petalMat);
    latRight.position.set(0.6, -0.45, -0.05);
    latRight.rotation.set(0.1, -0.2, 0.7);
    flower.add(latRight);

    // 4 & 5. Lateral Petals (Large, Winged, Phalaenopsis "Butterfly" Petals)
    const wingGeom = createPetalMesh(1.25, 1.15, 0.3);
    const wingLeft = new THREE.Mesh(wingGeom, petalMat);
    wingLeft.position.set(-0.85, 0.25, 0.05);
    wingLeft.rotation.set(0.05, 0.35, -1.2);
    flower.add(wingLeft);

    const wingRight = new THREE.Mesh(wingGeom, petalMat);
    wingRight.position.set(0.85, 0.25, 0.05);
    wingRight.rotation.set(0.05, -0.35, 1.2);
    flower.add(wingRight);

    // 6. Orchid Labellum (Lip / Central Crest)
    const lipGeom = createPetalMesh(0.6, 0.8, 0.5);
    const lip = new THREE.Mesh(lipGeom, lipMat);
    lip.position.set(0, -0.5, 0.2);
    lip.rotation.set(0.5, 0, 0);
    flower.add(lip);

    // 7. Column (Reproductive organ / Throat)
    const colGeom = new THREE.ConeGeometry(0.12, 0.5, 16);
    const colMesh = new THREE.Mesh(colGeom, columnMat);
    colMesh.position.set(0, -0.05, 0.25);
    colMesh.rotation.set(-0.5, 0, 0);
    flower.add(colMesh);

    // Golden pollinia cap
    const capGeom = new THREE.SphereGeometry(0.09, 16, 16);
    const capMat = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.2 });
    const capMesh = new THREE.Mesh(capGeom, capMat);
    capMesh.position.set(0, 0.16, 0.32);
    flower.add(capMesh);

    orchid.add(flower);

    // Secondary bud on top stem
    const budGeom = new THREE.SphereGeometry(0.18, 16, 16);
    budGeom.scale(1, 1.6, 1);
    const budMesh = new THREE.Mesh(budGeom, petalMat);
    budMesh.position.set(-0.28, 1.35, -0.2);
    budMesh.rotation.set(0.2, 0, -0.4);
    orchid.add(budMesh);

    // Floating botanical particles (pollen / glowing spores)
    const particleCount = 45;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 4;
      positions[i + 1] = (Math.random() - 0.5) * 5;
      positions[i + 2] = (Math.random() - 0.5) * 3;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe3d0ea,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // Interactive Drag Controls (Mouse & Touch)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotationY += deltaX * 0.01;
      targetRotationX += deltaY * 0.01;
      targetRotationX = Math.max(-0.6, Math.min(0.6, targetRotationX));
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
      targetRotationY += deltaX * 0.01;
      targetRotationX += deltaY * 0.01;
      targetRotationX = Math.max(-0.6, Math.min(0.6, targetRotationX));
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.003;
      camera.position.z = Math.max(3.5, Math.min(7.5, camera.position.z));
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle auto-rotation
      if (autoRotate && !isDragging) {
        targetRotationY += 0.006;
      }

      // Smooth interpolation
      orchid.rotation.y += (targetRotationY - orchid.rotation.y) * 0.08;
      orchid.rotation.x += (targetRotationX - orchid.rotation.x) * 0.08;

      // Subtle breathing float
      orchid.position.y = Math.sin(elapsedTime * 1.5) * 0.06;

      // Animate floating pollen
      const pos = particleGeom.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        pos[i] += Math.sin(elapsedTime + i) * 0.002;
      }
      particleGeom.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
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
    if (petalMaterialsRef.current.length > 0) {
      petalMaterialsRef.current.forEach(mat => mat.color.setHex(theme.petal));
    }
    if (lipMaterialRef.current) {
      lipMaterialRef.current.color.setHex(theme.lip);
    }
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#2B1428] via-garden-darkPurple to-[#1E0E1B] border-2 border-garden-thistle/50 dark:border-garden-darkBorder shadow-2xl p-4 sm:p-5 flex flex-col group transition-all">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-garden-olive animate-pulse" />
          <span className="font-serif font-bold text-white tracking-wide flex items-center gap-1.5">
            <Flower2 className="w-4 h-4 text-garden-amethyst" />
            Modelado 3D Interactivo
          </span>
          <span className="text-garden-thistle font-script text-lg hidden sm:inline">
            Orquídea Phalaenopsis
          </span>
        </div>

        {/* Color Palette Switcher */}
        <div className="flex items-center gap-1.5">
          {COLOR_THEMES.map((theme, idx) => (
            <button
              key={theme.name}
              onClick={() => switchColorTheme(idx)}
              className={`w-5 h-5 rounded-full transition-transform border border-white/40 ${
                colorIndex === idx ? 'scale-125 ring-2 ring-white shadow-md' : 'opacity-70 hover:opacity-100 hover:scale-110'
              }`}
              style={{
                backgroundColor: `#${theme.petal.toString(16).padStart(6, '0')}`,
              }}
              title={`Color: ${theme.name}`}
            />
          ))}
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-gradient-to-b from-black/50 via-garden-darkCard/30 to-black/60 border border-white/10 cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
      />

      {/* Floating Guidance & Rotation Controls */}
      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-garden-thistle/90">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium border transition-colors ${
              autoRotate 
                ? 'bg-garden-amethyst text-white border-garden-amethyst' 
                : 'bg-white/10 text-garden-thistle hover:text-white border-white/20'
            }`}
          >
            <RotateCw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} />
            <span>{autoRotate ? 'Rotando' : 'Pausado'}</span>
          </button>
          <span className="text-[11px] text-garden-thistle/70 hidden sm:inline font-serif">
            Arrastra para rotar 360° · Rueda para zoom
          </span>
        </div>

        <span className="font-script text-garden-thistle text-lg tracking-wide">
          {COLOR_THEMES[colorIndex].name}
        </span>
      </div>
    </div>
  );
}
