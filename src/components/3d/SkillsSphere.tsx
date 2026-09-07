import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { skillsData } from '../../data/portfolioData';

interface SkillsSphereProps {
  activeSkillId?: string | null;
  onSelectSkill?: (id: string) => void;
}

export default function SkillsSphere({ activeSkillId, onSelectSkill }: SkillsSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // Create Fibonacci sphere distribution for nodes
    const numNodes = skillsData.length;
    const radius = 1.9;
    const nodePositions: THREE.Vector3[] = [];
    const nodeMeshes: THREE.Mesh[] = [];

    // Inner wireframe sphere
    const wireframeGeo = new THREE.IcosahedronGeometry(radius * 0.95, 2);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x1e293b,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireframeSphere = new THREE.Mesh(wireframeGeo, wireframeMat);
    networkGroup.add(wireframeSphere);

    // Add nodes
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    skillsData.forEach((skill, i) => {
      const y = 1 - (i / (numNodes - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const pos = new THREE.Vector3(x * radius, y * radius, z * radius);
      nodePositions.push(pos);

      // Node Mesh (Glowing sphere)
      const colorNum = new THREE.Color(skill.color).getHex();
      const nodeGeo = new THREE.SphereGeometry(0.13, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: colorNum,
        emissive: colorNum,
        emissiveIntensity: 0.5,
        roughness: 0.2,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      nodeMesh.userData = { skillId: skill.id, skillName: skill.name };
      networkGroup.add(nodeMesh);
      nodeMeshes.push(nodeMesh);

      // 2D Text Sprite for Node Label
      const labelCanvas = document.createElement('canvas');
      labelCanvas.width = 128;
      labelCanvas.height = 48;
      const ctx = labelCanvas.getContext('2d')!;
      ctx.fillStyle = 'rgba(7, 9, 14, 0.8)';
      ctx.roundRect(4, 4, 120, 40, 8);
      ctx.fill();
      ctx.strokeStyle = skill.color;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = 'bold 20px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(skill.name, 64, 25);

      const labelTexture = new THREE.CanvasTexture(labelCanvas);
      const spriteMat = new THREE.SpriteMaterial({ map: labelTexture, transparent: true });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.copy(pos).multiplyScalar(1.22);
      sprite.scale.set(0.6, 0.22, 1);
      networkGroup.add(sprite);
    });

    // Connecting Network Lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.28,
    });

    const linesGroup = new THREE.Group();
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 1.8) {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([
            nodePositions[i],
            nodePositions[j],
          ]);
          const line = new THREE.Line(lineGeo, lineMaterial);
          linesGroup.add(line);
        }
      }
    }
    networkGroup.add(linesGroup);

    // Center Core Glow
    const coreGeo = new THREE.SphereGeometry(0.35, 24, 24);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.8,
      roughness: 0.3,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    networkGroup.add(core);

    // Orbital Ring
    const orbitRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.3, 0.01, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.4 })
    );
    networkGroup.add(orbitRing);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 2, 8);
    pointLight.position.set(2, 3, 3);
    scene.add(pointLight);

    // Mouse Tracking / Raycasting
    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      mouse.x = x;
      mouse.y = y;

      targetRotY = x * 0.8;
      targetRotX = -y * 0.5;

      // Raycast to find hovered skill
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        setHoveredSkill(hit.userData.skillName || null);
      } else {
        setHoveredSkill(null);
      }
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);
      if (intersects.length > 0 && onSelectSkill) {
        const skillId = intersects[0].object.userData.skillId;
        onSelectSkill(skillId);
      }
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('click', handleClick);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Continuous slow rotation + mouse dampening
      networkGroup.rotation.y += 0.004;
      networkGroup.rotation.x += (targetRotX - networkGroup.rotation.x) * 0.04;
      orbitRing.rotation.z = t * 0.3;

      // Pulse core
      core.scale.setScalar(1 + Math.sin(t * 2) * 0.08);

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
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onSelectSkill]);

  return (
    <div className="relative w-full h-[380px] md:h-[460px] flex items-center justify-center">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating tooltip when node is hovered */}
      {hoveredSkill && (
        <div className="absolute top-4 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono backdrop-blur-md animate-fade-in pointer-events-none shadow-lg shadow-cyan-500/20">
          Node: {hoveredSkill} • Click to Filter
        </div>
      )}

      <div className="absolute bottom-2 text-center pointer-events-none">
        <span className="text-[11px] font-mono tracking-widest text-slate-500 uppercase">
          3D Skill Constellation • Drag to Rotate
        </span>
      </div>
    </div>
  );
}
