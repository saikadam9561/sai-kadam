import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Globe3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Wireframe Globe
    const globeRadius = 1.8;
    const globeGeo = new THREE.SphereGeometry(globeRadius, 28, 28);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x1e293b,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // 2. Continents / Node Points
    const dotCount = 350;
    const dotGeo = new THREE.BufferGeometry();
    const dotPositions = new Float32Array(dotCount * 3);
    const dotColors = new Float32Array(dotCount * 3);

    for (let i = 0; i < dotCount; i++) {
      const lat = (Math.random() - 0.5) * Math.PI;
      const lon = Math.random() * Math.PI * 2;

      const x = globeRadius * Math.cos(lat) * Math.cos(lon);
      const y = globeRadius * Math.sin(lat);
      const z = globeRadius * Math.cos(lat) * Math.sin(lon);

      dotPositions[i * 3] = x;
      dotPositions[i * 3 + 1] = y;
      dotPositions[i * 3 + 2] = z;

      const isCyan = Math.random() > 0.4;
      dotColors[i * 3] = isCyan ? 0.22 : 0.6;
      dotColors[i * 3 + 1] = isCyan ? 0.74 : 0.4;
      dotColors[i * 3 + 2] = isCyan ? 0.97 : 0.95;
    }

    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    dotGeo.setAttribute('color', new THREE.BufferAttribute(dotColors, 3));

    const dotMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(dots);

    // 3. Highlight Node (Sainath's Base - India: lat ~19 deg N, lon ~75 deg E)
    const baseLat = (19 * Math.PI) / 180;
    const baseLon = (75 * Math.PI) / 180;
    const bx = (globeRadius + 0.05) * Math.cos(baseLat) * Math.sin(baseLon);
    const by = (globeRadius + 0.05) * Math.sin(baseLat);
    const bz = (globeRadius + 0.05) * Math.cos(baseLat) * Math.cos(baseLon);

    const beaconGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(bx, by, bz);
    globeGroup.add(beacon);

    // Beacon Ripple Ring
    const beaconRingGeo = new THREE.RingGeometry(0.1, 0.16, 24);
    const beaconRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const beaconRing = new THREE.Mesh(beaconRingGeo, beaconRingMat);
    beaconRing.position.set(bx, by, bz);
    beaconRing.lookAt(0, 0, 0);
    globeGroup.add(beaconRing);

    // 4. Orbital Arcs
    const orbitalArcs: THREE.Line[] = [];
    for (let a = 0; a < 3; a++) {
      const curve = new THREE.EllipseCurve(0, 0, 2.3 + a * 0.2, 2.3 + a * 0.2, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(50);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points.map((p) => new THREE.Vector3(p.x, p.y, 0)));
      const arcMat = new THREE.LineBasicMaterial({
        color: a % 2 === 0 ? 0x38bdf8 : 0xa855f7,
        transparent: true,
        opacity: 0.35,
      });
      const arc = new THREE.Line(arcGeo, arcMat);
      arc.rotation.x = Math.PI / 3 + a * 0.5;
      arc.rotation.y = a * 0.8;
      globeGroup.add(arc);
      orbitalArcs.push(arc);
    }

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    container.addEventListener('mousemove', handleMove);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      globeGroup.rotation.y = t * 0.25 + mouseX * 0.3;
      globeGroup.rotation.x = 0.2 + mouseY * 0.2;

      // Pulse beacon
      const scale = 1 + Math.sin(t * 4) * 0.4;
      beaconRing.scale.set(scale, scale, 1);
      beaconRingMat.opacity = Math.max(0, 1 - (scale - 1) / 0.5);

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
      container.removeEventListener('mousemove', handleMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
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
          Global Reach • India Hub
        </span>
      </div>
    </div>
  );
}
