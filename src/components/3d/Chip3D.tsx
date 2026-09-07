import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Chip3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    const chipGroup = new THREE.Group();
    scene.add(chipGroup);

    // 1. Ceramic/Silicon Chip Substrate Body
    const bodyGeo = new THREE.BoxGeometry(2.4, 2.4, 0.2);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0b1120,
      roughness: 0.3,
      metalness: 0.85,
    });
    const chipBody = new THREE.Mesh(bodyGeo, bodyMat);
    chipGroup.add(chipBody);

    // Chip Heat Spreader / Core Lid
    const lidGeo = new THREE.BoxGeometry(1.6, 1.6, 0.08);
    const lidMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.2,
      metalness: 0.95,
    });
    const chipLid = new THREE.Mesh(lidGeo, lidMat);
    chipLid.position.z = 0.14;
    chipGroup.add(chipLid);

    // Central Engraving / Core Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Draw futuristic chip graphics
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 512, 512);

    // Circuit grid
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
    ctx.lineWidth = 2;
    for (let i = 40; i < 512; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 512);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }

    // Glowing core center
    const grad = ctx.createRadialGradient(256, 256, 20, 256, 256, 160);
    grad.addColorStop(0, '#38bdf8');
    grad.addColorStop(0.5, '#0284c7');
    grad.addColorStop(1, '#090d16');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(256, 256, 120, 0, Math.PI * 2);
    ctx.fill();

    // Central CSE emblem
    ctx.font = 'bold 38px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('CSE CORE', 256, 230);

    ctx.font = '22px "JetBrains Mono", monospace';
    ctx.fillStyle = '#67e8f9';
    ctx.fillText('SAINATH • V3.8', 256, 280);

    const coreTexture = new THREE.CanvasTexture(canvas);
    const corePlaneGeo = new THREE.PlaneGeometry(1.4, 1.4);
    const corePlaneMat = new THREE.MeshBasicMaterial({ map: coreTexture });
    const corePlane = new THREE.Mesh(corePlaneGeo, corePlaneMat);
    corePlane.position.z = 0.185;
    chipGroup.add(corePlane);

    // 2. Gold Contact Pins (along edges)
    const pinGeo = new THREE.BoxGeometry(0.04, 0.28, 0.04);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.2,
    });

    const numPinsPerSide = 14;
    for (let i = 0; i < numPinsPerSide; i++) {
      const pos = -1.0 + (i / (numPinsPerSide - 1)) * 2.0;

      // Top pins
      const pinTop = new THREE.Mesh(pinGeo, pinMat);
      pinTop.position.set(pos, 1.3, 0);
      chipGroup.add(pinTop);

      // Bottom pins
      const pinBottom = new THREE.Mesh(pinGeo, pinMat);
      pinBottom.position.set(pos, -1.3, 0);
      chipGroup.add(pinBottom);

      // Left pins (rotated)
      const pinLeft = new THREE.Mesh(pinGeo, pinMat);
      pinLeft.position.set(-1.3, pos, 0);
      pinLeft.rotation.z = Math.PI / 2;
      chipGroup.add(pinLeft);

      // Right pins (rotated)
      const pinRight = new THREE.Mesh(pinGeo, pinMat);
      pinRight.position.set(1.3, pos, 0);
      pinRight.rotation.z = Math.PI / 2;
      chipGroup.add(pinRight);
    }

    // 3. Glowing Orbital Data Rings
    const ringGeo1 = new THREE.TorusGeometry(1.9, 0.015, 16, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    chipGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.1, 0.012, 16, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    chipGroup.add(ring2);

    // 4. Subtle Surrounding Floating Data Bits
    const bitCount = 40;
    const bitGeo = new THREE.BufferGeometry();
    const bitPos = new Float32Array(bitCount * 3);
    for (let i = 0; i < bitCount * 3; i++) {
      bitPos[i] = (Math.random() - 0.5) * 4.5;
    }
    bitGeo.setAttribute('position', new THREE.BufferAttribute(bitPos, 3));
    const bitMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.7,
    });
    const bits = new THREE.Points(bitGeo, bitMat);
    chipGroup.add(bits);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 3, 6);
    cyanLight.position.set(2, 2, 2);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 2, 6);
    purpleLight.position.set(-2, -2, 2);
    scene.add(purpleLight);

    // Tilt with mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    container.addEventListener('mousemove', handlePointerMove);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Continuous rotation with interactive hover tilt
      chipGroup.rotation.y = t * 0.4 + mouseX * 0.5;
      chipGroup.rotation.x = Math.sin(t * 0.3) * 0.2 + mouseY * 0.4;
      chipGroup.rotation.z = Math.cos(t * 0.2) * 0.1;

      // Spin orbital rings
      ring1.rotation.z = t * 0.6;
      ring2.rotation.y = t * 0.8;

      renderer.render(scene, camera);
    };

    animate();

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
      container.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] md:h-[380px] flex items-center justify-center">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-2 text-center pointer-events-none">
        <span className="text-[11px] font-mono tracking-widest text-slate-500 uppercase">
          Silicon Arch • CSE Core
        </span>
      </div>
    </div>
  );
}
