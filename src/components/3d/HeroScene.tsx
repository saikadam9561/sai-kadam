import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Laptop, Sparkles, RefreshCw } from 'lucide-react';

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.04);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 5.2);
    camera.lookAt(0, 0.2, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Main workspace group
    const workspaceGroup = new THREE.Group();
    scene.add(workspaceGroup);

    // 1. Sleek Modern Desk
    const deskGeo = new THREE.BoxGeometry(3.6, 0.1, 1.8);
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.35,
      metalness: 0.8,
    });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.position.set(0, -0.6, 0);
    workspaceGroup.add(desk);

    // Desk Mat
    const matGeo = new THREE.BoxGeometry(2.4, 0.01, 1.0);
    const matMat = new THREE.MeshStandardMaterial({
      color: 0x030712,
      roughness: 0.8,
      metalness: 0.2,
    });
    const deskPad = new THREE.Mesh(matGeo, matMat);
    deskPad.position.set(0, -0.54, 0.1);
    workspaceGroup.add(deskPad);

    // 2. Laptop Base
    const lapBaseGeo = new THREE.BoxGeometry(1.2, 0.03, 0.8);
    const lapBaseMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.2,
      metalness: 0.9,
    });
    const laptopBase = new THREE.Mesh(lapBaseGeo, lapBaseMat);
    laptopBase.position.set(0, -0.52, 0.1);
    workspaceGroup.add(laptopBase);

    // Keyboard recess
    const keyboardGeo = new THREE.BoxGeometry(1.0, 0.01, 0.45);
    const keyboardMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.5,
    });
    const keyboard = new THREE.Mesh(keyboardGeo, keyboardMat);
    keyboard.position.set(0, -0.505, 0.2);
    workspaceGroup.add(keyboard);

    // Trackpad
    const padGeo = new THREE.BoxGeometry(0.35, 0.005, 0.22);
    const padMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
    });
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.position.set(0, -0.51, -0.15);
    workspaceGroup.add(pad);

    // 3. Laptop Screen with Animated Code Canvas Texture
    const codeCanvas = document.createElement('canvas');
    codeCanvas.width = 512;
    codeCanvas.height = 340;
    const ctx = codeCanvas.getContext('2d')!;

    const codeTexture = new THREE.CanvasTexture(codeCanvas);
    codeTexture.minFilter = THREE.LinearFilter;

    const screenPivot = new THREE.Group();
    screenPivot.position.set(0, -0.51, -0.3);

    const screenFrameGeo = new THREE.BoxGeometry(1.2, 0.8, 0.02);
    const screenFrame = new THREE.Mesh(screenFrameGeo, lapBaseMat);
    screenFrame.position.set(0, 0.4, 0);

    const displayGeo = new THREE.PlaneGeometry(1.14, 0.74);
    const displayMat = new THREE.MeshBasicMaterial({
      map: codeTexture,
    });
    const display = new THREE.Mesh(displayGeo, displayMat);
    display.position.set(0, 0.4, 0.011);

    screenPivot.add(screenFrame);
    screenPivot.add(display);
    screenPivot.rotation.x = -0.22; // Open angled screen
    workspaceGroup.add(screenPivot);

    // Screen Glow Light (Cyan/Blue)
    const screenLight = new THREE.PointLight(0x38bdf8, 2.5, 3.5);
    screenLight.position.set(0, 0.1, 0.2);
    workspaceGroup.add(screenLight);

    // 4. Desk Accessories
    // Coffee Cup
    const cupGeo = new THREE.CylinderGeometry(0.1, 0.08, 0.22, 16);
    const cupMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.1 });
    const cup = new THREE.Mesh(cupGeo, cupMat);
    cup.position.set(0.9, -0.43, 0.1);
    workspaceGroup.add(cup);

    // Sleek Desk Minimalist Lamp
    const lampStem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.9, 12),
      new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9 })
    );
    lampStem.position.set(-1.2, -0.15, -0.3);
    lampStem.rotation.z = -0.3;
    workspaceGroup.add(lampStem);

    const lampHead = new THREE.Mesh(
      new THREE.ConeGeometry(0.12, 0.25, 16),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, metalness: 0.8 })
    );
    lampHead.position.set(-1.0, 0.25, -0.3);
    lampHead.rotation.z = 1.8;
    workspaceGroup.add(lampHead);

    const lampLight = new THREE.PointLight(0x67e8f9, 2, 4);
    lampLight.position.set(-0.9, 0.2, -0.2);
    workspaceGroup.add(lampLight);

    // 5. Floating 3D Programming Badges & Icons
    const floatingItems: {
      mesh: THREE.Object3D;
      baseY: number;
      speed: number;
      rotSpeed: number;
      phase: number;
    }[] = [];

    // Helper to create glowing stylized 3D tech badge
    const createTechBadge = (label: string, color: number, x: number, y: number, z: number, shape: 'box' | 'cylinder' | 'torus') => {
      const badgeGroup = new THREE.Group();

      let geom: THREE.BufferGeometry;
      if (shape === 'box') {
        geom = new THREE.BoxGeometry(0.38, 0.38, 0.08);
      } else if (shape === 'cylinder') {
        geom = new THREE.CylinderGeometry(0.24, 0.24, 0.08, 24);
      } else {
        geom = new THREE.TorusGeometry(0.22, 0.05, 12, 32);
      }

      const mat = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.2,
        metalness: 0.7,
        emissive: color,
        emissiveIntensity: 0.25,
      });
      const mesh = new THREE.Mesh(geom, mat);
      badgeGroup.add(mesh);

      // Label canvas texture
      const labelCanvas = document.createElement('canvas');
      labelCanvas.width = 128;
      labelCanvas.height = 128;
      const lctx = labelCanvas.getContext('2d')!;
      lctx.fillStyle = 'rgba(7, 9, 14, 0.85)';
      lctx.fillRect(0, 0, 128, 128);
      lctx.font = 'bold 36px "Space Grotesk", sans-serif';
      lctx.fillStyle = '#ffffff';
      lctx.textAlign = 'center';
      lctx.textBaseline = 'middle';
      lctx.fillText(label, 64, 64);

      const labelTex = new THREE.CanvasTexture(labelCanvas);
      const labelMat = new THREE.MeshBasicMaterial({ map: labelTex, transparent: true });
      const labelPlane = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.32), labelMat);
      labelPlane.position.z = 0.045;
      badgeGroup.add(labelPlane);

      badgeGroup.position.set(x, y, z);
      workspaceGroup.add(badgeGroup);

      floatingItems.push({
        mesh: badgeGroup,
        baseY: y,
        speed: 1.2 + Math.random() * 0.8,
        rotSpeed: 0.015 + Math.random() * 0.01,
        phase: Math.random() * Math.PI * 2,
      });
    };

    // Add floating icons: C++, Java, Python, React, JS, HTML/CSS, and code symbols
    createTechBadge('C++', 0x00599c, -1.3, 0.9, 0.2, 'box');
    createTechBadge('Java', 0xea2d2e, 1.4, 0.8, -0.1, 'cylinder');
    createTechBadge('Py', 0x3776ab, -0.9, 1.4, -0.4, 'cylinder');
    createTechBadge('⚛', 0x61dafb, 1.1, 1.5, -0.3, 'torus');
    createTechBadge('JS', 0xf7df1e, 0.0, 1.75, -0.5, 'box');
    createTechBadge('{ }', 0x10b981, -1.6, 0.3, 0.4, 'box');
    createTechBadge('</>', 0x818cf8, 1.6, 0.2, 0.3, 'box');

    // 6. Floating Code Syntax Atoms & Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.2) * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const isCyan = Math.random() > 0.4;
      colors[i * 3] = isCyan ? 0.22 : 0.5;
      colors[i * 3 + 1] = isCyan ? 0.8 : 0.4;
      colors[i * 3 + 2] = isCyan ? 1.0 : 0.95;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Atmospheric Lighting
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(4, 6, 4);
    scene.add(dirLight);

    const purpleBacklight = new THREE.PointLight(0xa855f7, 2.0, 8);
    purpleBacklight.position.set(0, 2, -2);
    scene.add(purpleBacklight);

    // Mouse Tracking / Parallax
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotationY = x * 0.45;
      targetRotationX = -y * 0.25;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        const x = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.touches[0].clientY - rect.top) / rect.height) * 2 - 1);
        targetRotationY = x * 0.35;
        targetRotationX = -y * 0.2;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Animated Code Screen lines
    const codeLines = [
      '// Sainath Kadam - B.Tech CSE',
      'import { Code, Future } from "@cse/core";',
      'const engineer = new Student({',
      '  name: "Sainath Kadam",',
      '  goal: "Build Impactful Systems",',
      '  stack: ["C++", "Java", "React", "Python"]',
      '});',
      'async function buildFuture() {',
      '  await engineer.solveDSA(500);',
      '  await engineer.deploy("Smart Farmer");',
      '  return "Ready for Innovation 🚀";',
      '}',
      'buildFuture().then(console.log);',
      '// Status: Online & Compiling 100%'
    ];

    let lineOffset = 0;
    let lastCodeUpdate = 0;

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth parallax dampening
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      workspaceGroup.rotation.y = currentRotationY;
      workspaceGroup.rotation.x = currentRotationX;
      workspaceGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.04;

      // Animate floating tech items
      floatingItems.forEach((item) => {
        item.mesh.position.y = item.baseY + Math.sin(elapsedTime * item.speed + item.phase) * 0.12;
        item.mesh.rotation.y += item.rotSpeed;
        item.mesh.rotation.x = Math.sin(elapsedTime * 0.5 + item.phase) * 0.1;
      });

      // Slowly rotate particle field
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      // Update Laptop Code Screen Canvas
      if (elapsedTime - lastCodeUpdate > 0.08) {
        lastCodeUpdate = elapsedTime;
        lineOffset += 0.4;
        if (lineOffset > 240) lineOffset = 0;

        ctx.fillStyle = '#060a12';
        ctx.fillRect(0, 0, 512, 340);

        // Terminal top bar
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, 512, 36);
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(20, 18, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#eab308';
        ctx.beginPath();
        ctx.arc(36, 18, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(52, 18, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '13px "JetBrains Mono", monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('bash - sainath@workspace ~/portfolio', 75, 22);

        // Code body
        ctx.font = '15px "JetBrains Mono", monospace';
        codeLines.forEach((line, index) => {
          const y = 60 + index * 20 - (lineOffset % 30);
          if (y > 36 && y < 330) {
            if (line.startsWith('//')) {
              ctx.fillStyle = '#64748b';
            } else if (line.includes('const') || line.includes('function') || line.includes('import')) {
              ctx.fillStyle = '#38bdf8';
            } else if (line.includes('"')) {
              ctx.fillStyle = '#34d399';
            } else {
              ctx.fillStyle = '#f8fafc';
            }
            ctx.fillText(line, 24, y);
          }
        });

        // Blinking cursor
        if (Math.floor(elapsedTime * 2) % 2 === 0) {
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(24, 300, 10, 16);
        }

        codeTexture.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();
    setLoaded(true);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[480px] lg:h-[580px] flex items-center justify-center">
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Interactive 3D Workspace - Move mouse to rotate"
      />

      {/* Floating Futuristic HUD Overlay */}
      <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-xs text-cyan-300 backdrop-blur-md pointer-events-none select-none">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>3D Workspace • Move Cursor</span>
      </div>

      <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-400 backdrop-blur-md pointer-events-none select-none">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="font-mono text-[11px]">WebGL Active • 60 FPS</span>
      </div>
    </div>
  );
}
