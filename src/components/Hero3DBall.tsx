import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Zap, 
  RotateCw, 
  Sun, 
  Moon, 
  Gauge, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight,
  Activity,
  Layers,
  Award,
  PackageCheck,
  CheckCircle2,
  Info
} from 'lucide-react';
import { STATS_DATA } from '../data/mockData';

type BallType = 'red' | 'white' | 'pink';
type SwingMode = 'outswing' | 'inswing' | 'reverse' | 'spin' | 'scramble';
type KitCategory = 'ball' | 'bat' | 'stumps' | 'helmet' | 'pads' | 'gloves';

interface Hero3DBallProps {
  onOpenBooking: () => void;
  onOpenAICoach: () => void;
}

export const Hero3DBall: React.FC<Hero3DBallProps> = ({ onOpenBooking, onOpenAICoach }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ballType, setBallType] = useState<BallType>('red');
  const [swingMode, setSwingMode] = useState<SwingMode>('outswing');
  const [speedKmh, setSpeedKmh] = useState<number>(138);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [lightingMode, setLightingMode] = useState<'floodlight' | 'day' | 'golden'>('floodlight');
  
  // 3D Kit Viewer category selection
  const [activeKitCategory, setActiveKitCategory] = useState<KitCategory>('ball');

  // Three.js object references
  const ballMeshRef = useRef<THREE.Mesh | null>(null);
  const kitGroupRef = useRef<THREE.Group | null>(null);
  const keyLightRef = useRef<THREE.SpotLight | null>(null);
  const rimLightRef = useRef<THREE.PointLight | null>(null);
  const activeMeshGroupRef = useRef<THREE.Group | null>(null);

  // Ball Colors Definition
  const ballColors: Record<BallType, { primary: number; seamColor: number; roughness: number; metalness: number; name: string }> = {
    red: {
      primary: 0x8b0000,
      seamColor: 0xffffff,
      roughness: 0.28,
      metalness: 0.15,
      name: 'Kookaburra Red Test 4-Piece'
    },
    white: {
      primary: 0xf3f4f6,
      seamColor: 0x111827,
      roughness: 0.25,
      metalness: 0.1,
      name: 'SG White Club Tournament Ball'
    },
    pink: {
      primary: 0xdb2777,
      seamColor: 0x18181b,
      roughness: 0.22,
      metalness: 0.2,
      name: 'Duker Pink Day-Night Seam'
    },
  };

  // Helper to build 3D Cricket Models procedurally in Three.js
  const buildModelForCategory = (cat: KitCategory, bType: BallType): THREE.Group => {
    const group = new THREE.Group();

    if (cat === 'ball') {
      // 1. Cricket Ball
      const ballGeo = new THREE.SphereGeometry(1.25, 64, 64);
      const cfg = ballColors[bType];
      const ballMat = new THREE.MeshPhysicalMaterial({
        color: cfg.primary,
        roughness: cfg.roughness,
        metalness: cfg.metalness,
        clearcoat: 0.45,
        clearcoatRoughness: 0.15,
      });
      const ballMesh = new THREE.Mesh(ballGeo, ballMat);
      group.add(ballMesh);
      ballMeshRef.current = ballMesh;

      // Seam Stitch Helper
      const seamMat = new THREE.MeshStandardMaterial({
        color: cfg.seamColor,
        roughness: 0.5,
        metalness: 0.05,
      });
      const stitchCount = 52;
      const radius = 1.256;
      for (let i = 0; i < stitchCount; i++) {
        const theta = (i / stitchCount) * Math.PI * 2;
        const offset = (i % 2 === 0 ? 0.022 : -0.022);
        const stitch = new THREE.Mesh(
          new THREE.BoxGeometry(0.045, 0.09, 0.025),
          seamMat
        );
        stitch.position.set(Math.cos(theta) * radius, Math.sin(theta) * radius, offset);
        stitch.rotation.z = theta + (i % 2 === 0 ? 0.2 : -0.2);
        group.add(stitch);
      }
      // Seam ridge
      const ridgeGeo = new THREE.TorusGeometry(1.255, 0.022, 16, 64);
      const ridgeMat = new THREE.MeshStandardMaterial({ color: cfg.seamColor, roughness: 0.4 });
      const ridge = new THREE.Mesh(ridgeGeo, ridgeMat);
      group.add(ridge);
    } 
    else if (cat === 'bat') {
      // 2. English Willow Bat
      // Blade
      const bladeGeo = new THREE.BoxGeometry(0.95, 2.5, 0.28);
      const willowMat = new THREE.MeshStandardMaterial({
        color: 0xe2ba86, // Natural English Willow grain
        roughness: 0.4,
        metalness: 0.05
      });
      const blade = new THREE.Mesh(bladeGeo, willowMat);
      blade.position.set(0, -0.4, 0);
      group.add(blade);

      // Spine hump on back
      const spineGeo = new THREE.CylinderGeometry(0.2, 0.35, 2.3, 16);
      const spineMat = new THREE.MeshStandardMaterial({ color: 0xcda26b, roughness: 0.45 });
      const spine = new THREE.Mesh(spineGeo, spineMat);
      spine.position.set(0, -0.4, -0.12);
      spine.scale.set(1.4, 1, 0.4);
      group.add(spine);

      // Brand Face Sticker
      const stickerGeo = new THREE.PlaneGeometry(0.7, 1.4);
      const stickerMat = new THREE.MeshStandardMaterial({
        color: 0xdc2626, // Shanmukha Pro Red brand
        roughness: 0.3,
        metalness: 0.2,
      });
      const sticker = new THREE.Mesh(stickerGeo, stickerMat);
      sticker.position.set(0, -0.2, 0.145);
      group.add(sticker);

      // Handle Cane
      const handleGeo = new THREE.CylinderGeometry(0.13, 0.13, 1.2, 32);
      const gripMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b, // Chevron Rubber Grip
        roughness: 0.85
      });
      const handle = new THREE.Mesh(handleGeo, gripMat);
      handle.position.set(0, 1.35, 0);
      group.add(handle);

      // Grip spiral rings
      for (let r = 0; r < 7; r++) {
        const ringGeo = new THREE.TorusGeometry(0.135, 0.015, 8, 24);
        const ringMat = new THREE.MeshStandardMaterial({ color: 0xef4444 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.set(0, 0.9 + r * 0.12, 0);
        ring.rotation.x = Math.PI / 2;
        group.add(ring);
      }
      group.rotation.set(0.2, -0.4, 0.1);
    }
    else if (cat === 'stumps') {
      // 3. Wooden Match Stumps with Bails
      const woodMat = new THREE.MeshStandardMaterial({
        color: 0xdfa15a,
        roughness: 0.35,
        metalness: 0.05
      });
      const metalMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        metalness: 0.8,
        roughness: 0.2
      });

      // 3 Stumps (Off, Middle, Leg)
      const stumpPositions = [-0.65, 0, 0.65];
      stumpPositions.forEach((xPos) => {
        // Wooden post
        const postGeo = new THREE.CylinderGeometry(0.09, 0.09, 2.7, 24);
        const post = new THREE.Mesh(postGeo, woodMat);
        post.position.set(xPos, 0, 0);
        group.add(post);

        // Brass/Metal pointed base spike
        const spikeGeo = new THREE.ConeGeometry(0.09, 0.4, 24);
        const spike = new THREE.Mesh(spikeGeo, metalMat);
        spike.position.set(xPos, -1.5, 0);
        spike.rotation.x = Math.PI;
        group.add(spike);

        // Top crown spigot
        const spigotGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.15, 16);
        const spigot = new THREE.Mesh(spigotGeo, woodMat);
        spigot.position.set(xPos, 1.4, 0);
        group.add(spigot);
      });

      // 2 Bails resting on top
      const bailMat = new THREE.MeshStandardMaterial({ color: 0xc88e46, roughness: 0.4 });
      [-0.32, 0.32].forEach((xPos) => {
        const bailGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.62, 16);
        const bail = new THREE.Mesh(bailGeo, bailMat);
        bail.position.set(xPos, 1.42, 0);
        bail.rotation.z = Math.PI / 2;
        group.add(bail);
      });
      group.rotation.set(0.15, 0.35, 0);
    }
    else if (cat === 'helmet') {
      // 4. Titanium Grille Cricket Helmet
      const shellMat = new THREE.MeshStandardMaterial({
        color: 0x1e3a8a, // Navy Blue Academy Shell
        roughness: 0.3,
        metalness: 0.2
      });
      const shellGeo = new THREE.SphereGeometry(1.15, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.72);
      const shell = new THREE.Mesh(shellGeo, shellMat);
      shell.position.set(0, 0.2, 0);
      group.add(shell);

      // Peak / Visor rim
      const peakGeo = new THREE.CylinderGeometry(1.2, 1.25, 0.15, 32, 1, false, 0, Math.PI);
      const peakMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 });
      const peak = new THREE.Mesh(peakGeo, peakMat);
      peak.position.set(0, 0.2, 0.2);
      group.add(peak);

      // Titanium Wire Grille Face Guard
      const grilleMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.9,
        roughness: 0.15
      });
      for (let y = -0.3; y <= 0.2; y += 0.12) {
        const barGeo = new THREE.TorusGeometry(0.85, 0.022, 8, 32, Math.PI * 0.9);
        const bar = new THREE.Mesh(barGeo, grilleMat);
        bar.position.set(0, y, 0.45);
        bar.rotation.x = Math.PI / 2;
        bar.rotation.z = -Math.PI / 1.8;
        group.add(bar);
      }
      group.rotation.set(0.1, 0.5, 0);
    }
    else if (cat === 'pads') {
      // 5. Test Match High-Density Foam Leg Guards (Pair of Pads)
      const padMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc, // Pure White Test Pads
        roughness: 0.5,
        metalness: 0.05
      });
      const caneMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        roughness: 0.4
      });

      [-0.45, 0.45].forEach((xPos) => {
        const padGroup = new THREE.Group();
        // Main shin bolster
        const shinGeo = new THREE.BoxGeometry(0.65, 2.2, 0.35);
        const shin = new THREE.Mesh(shinGeo, padMat);
        shin.position.set(0, -0.2, 0);
        padGroup.add(shin);

        // Top knee roll
        const kneeGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.65, 16);
        const knee = new THREE.Mesh(kneeGeo, caneMat);
        knee.position.set(0, 0.9, 0.05);
        knee.rotation.z = Math.PI / 2;
        padGroup.add(knee);

        // Cane ribs vertical stripes
        for (let c = -0.2; c <= 0.2; c += 0.1) {
          const ribGeo = new THREE.CylinderGeometry(0.025, 0.025, 2.0, 8);
          const rib = new THREE.Mesh(ribGeo, caneMat);
          rib.position.set(c, -0.2, 0.18);
          padGroup.add(rib);
        }

        // Fastening Velcro Straps
        for (let s = -0.7; s <= 0.5; s += 0.6) {
          const strapGeo = new THREE.BoxGeometry(0.7, 0.08, 0.38);
          const strapMat = new THREE.MeshStandardMaterial({ color: 0xef4444 });
          const strap = new THREE.Mesh(strapGeo, strapMat);
          strap.position.set(0, s, 0);
          padGroup.add(strap);
        }

        padGroup.position.set(xPos, 0, 0);
        group.add(padGroup);
      });
      group.rotation.set(0.1, 0.3, 0);
    }
    else if (cat === 'gloves') {
      // 6. Split-Finger Sausage Batting Gloves
      const gloveMat = new THREE.MeshStandardMaterial({
        color: 0xf1f5f9,
        roughness: 0.45,
        metalness: 0.1
      });
      const redTrimMat = new THREE.MeshStandardMaterial({
        color: 0xdc2626,
        roughness: 0.3
      });

      [-0.55, 0.55].forEach((xPos, idx) => {
        const glove = new THREE.Group();
        // Hand back block
        const handGeo = new THREE.BoxGeometry(0.85, 1.1, 0.4);
        const hand = new THREE.Mesh(handGeo, gloveMat);
        glove.add(hand);

        // 4 Finger sausages
        for (let f = -0.3; f <= 0.3; f += 0.2) {
          const fingerGeo = new THREE.CapsuleGeometry(0.08, 0.6, 8, 16);
          const finger = new THREE.Mesh(fingerGeo, gloveMat);
          finger.position.set(f, 0.75, 0.05);
          glove.add(finger);

          // Impact fiber caps
          const capGeo = new THREE.SphereGeometry(0.085, 12, 12);
          const cap = new THREE.Mesh(capGeo, redTrimMat);
          cap.position.set(f, 1.05, 0.05);
          glove.add(cap);
        }

        // Thumb guard
        const thumbGeo = new THREE.CapsuleGeometry(0.09, 0.45, 8, 16);
        const thumb = new THREE.Mesh(thumbGeo, redTrimMat);
        thumb.position.set(idx === 0 ? 0.45 : -0.45, 0.4, 0.1);
        thumb.rotation.z = idx === 0 ? -0.4 : 0.4;
        glove.add(thumb);

        // Wrist band
        const wristGeo = new THREE.BoxGeometry(0.9, 0.3, 0.42);
        const wristMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
        const wrist = new THREE.Mesh(wristGeo, wristMat);
        wrist.position.set(0, -0.65, 0);
        glove.add(wrist);

        glove.position.set(xPos, 0, 0);
        group.add(glove);
      });
      group.rotation.set(0.3, 0.2, 0);
    }

    return group;
  };

  // Setup Three.js Scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    const width = parent?.clientWidth || 480;
    const height = parent?.clientHeight || 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.SpotLight(0xffffff, 4, 30, Math.PI / 4, 0.4, 1.2);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const rimLight = new THREE.PointLight(0xef4444, 2.5, 20);
    rimLight.position.set(-4, -1, -3);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    const fillLight = new THREE.DirectionalLight(0x60a5fa, 1.2);
    fillLight.position.set(-3, 3, 2);
    scene.add(fillLight);

    // Root Group
    const kitGroup = new THREE.Group();
    scene.add(kitGroup);
    kitGroupRef.current = kitGroup;

    // Build initial model
    const initialMeshGroup = buildModelForCategory(activeKitCategory, ballType);
    kitGroup.add(initialMeshGroup);
    activeMeshGroupRef.current = initialMeshGroup;

    // Mouse drag interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !kitGroupRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      kitGroupRef.current.rotation.y += deltaX * 0.008;
      kitGroupRef.current.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: clientX, y: clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const el = canvas;
    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    el.addEventListener('touchstart', onMouseDown, { passive: true });
    window.addEventListener('touchmove', onMouseMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (kitGroupRef.current && isRotating && !isDragging) {
        const rotMultiplier = (speedKmh / 140) * 1.5;
        
        if (activeKitCategory === 'ball') {
          if (swingMode === 'spin') {
            kitGroupRef.current.rotation.z += 0.03 * rotMultiplier;
            kitGroupRef.current.rotation.y += 0.015 * rotMultiplier;
          } else if (swingMode === 'outswing') {
            kitGroupRef.current.rotation.y += 0.012 * rotMultiplier;
            kitGroupRef.current.rotation.x = 0.35 + Math.sin(elapsedTime * 1.2) * 0.04;
          } else if (swingMode === 'inswing') {
            kitGroupRef.current.rotation.y -= 0.012 * rotMultiplier;
            kitGroupRef.current.rotation.x = -0.35 + Math.sin(elapsedTime * 1.2) * 0.04;
          } else if (swingMode === 'reverse') {
            kitGroupRef.current.rotation.y += 0.02 * rotMultiplier;
            kitGroupRef.current.rotation.z = Math.sin(elapsedTime * 2) * 0.08;
          } else {
            kitGroupRef.current.rotation.x += 0.015 * rotMultiplier;
            kitGroupRef.current.rotation.y += 0.008 * rotMultiplier;
          }
        } else {
          // Subtle showcase spin for bat, stumps, pads, helmet, gloves
          kitGroupRef.current.rotation.y += 0.008;
          kitGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('touchstart', onMouseDown);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
      renderer.dispose();
    };
  }, []);

  // Update 3D Model when activeKitCategory or ballType changes
  useEffect(() => {
    if (!kitGroupRef.current) return;

    // Remove old children
    while (kitGroupRef.current.children.length > 0) {
      kitGroupRef.current.remove(kitGroupRef.current.children[0]);
    }

    // Reset rotation & build new model
    kitGroupRef.current.rotation.set(0, 0, 0);
    kitGroupRef.current.position.set(0, 0, 0);

    const newGroup = buildModelForCategory(activeKitCategory, ballType);
    kitGroupRef.current.add(newGroup);
    activeMeshGroupRef.current = newGroup;

    if (activeKitCategory === 'ball') {
      if (swingMode === 'outswing') kitGroupRef.current.rotation.set(0.35, -0.45, 0.25);
      else if (swingMode === 'inswing') kitGroupRef.current.rotation.set(-0.35, 0.45, -0.25);
      else if (swingMode === 'reverse') kitGroupRef.current.rotation.set(0.2, -0.7, 0.4);
      else if (swingMode === 'spin') kitGroupRef.current.rotation.set(0.8, 0.2, 0.9);
      else kitGroupRef.current.rotation.set(0.1, 0, 0);
    }
  }, [activeKitCategory, ballType, swingMode]);

  // Update Lighting on Mode Change
  useEffect(() => {
    if (!keyLightRef.current || !rimLightRef.current) return;
    if (lightingMode === 'floodlight') {
      keyLightRef.current.color.setHex(0xffffff);
      keyLightRef.current.intensity = 4.2;
      rimLightRef.current.color.setHex(0xef4444);
      rimLightRef.current.intensity = 2.5;
    } else if (lightingMode === 'day') {
      keyLightRef.current.color.setHex(0xfff7ed);
      keyLightRef.current.intensity = 3.5;
      rimLightRef.current.color.setHex(0x38bdf8);
      rimLightRef.current.intensity = 1.8;
    } else {
      keyLightRef.current.color.setHex(0xfbbf24);
      keyLightRef.current.intensity = 4.5;
      rimLightRef.current.color.setHex(0xf43f5e);
      rimLightRef.current.intensity = 3.0;
    }
  }, [lightingMode]);

  // Telemetry values
  const rpm = Math.round((speedKmh * 18.5) + (swingMode === 'spin' ? 850 : 250));
  const magnusForce = (speedKmh * 0.042 * (swingMode === 'outswing' || swingMode === 'inswing' ? 1.4 : 1.0)).toFixed(2);
  const driftAngle = swingMode === 'outswing' ? '3.8° Away' : swingMode === 'inswing' ? '4.2° In' : swingMode === 'reverse' ? '5.6° Late Reverse' : swingMode === 'spin' ? '6.4° Turn' : '0.5° True';

  // Kit Specifications data
  const kitInfoMap: Record<KitCategory, { title: string; subtitle: string; spec1: string; spec2: string; spec3: string }> = {
    ball: {
      title: 'Match-Grade Cricket Leather Ball',
      subtitle: 'Official 4-Piece Alum-Tanned Leather (156g)',
      spec1: 'Seam: 80 Hand-Crafted Linen Stitches',
      spec2: 'Core: Layered Portuguese Cork & Wool',
      spec3: 'Aerodynamics: Magnus Effect Swing Ready'
    },
    bat: {
      title: 'Grade-1 English Willow Master Bat',
      subtitle: 'Handcrafted Profile with Massive 40mm Edges',
      spec1: 'Willow: Premium Grade 1+ English Willow',
      spec2: 'Handle: 12-Piece Saravak Cane with Rubber Inlays',
      spec3: 'Weight: 2.85 lbs (Mid-to-Low Sweet Spot)'
    },
    stumps: {
      title: 'International Regulation Match Stumps',
      subtitle: 'Solid Seasoned Ash Wood with Zinc Spikes',
      spec1: 'Height: 28 inches (71.1 cm) Official Stumps',
      spec2: 'Bails: 4.31 inches Dual Wooden Bails',
      spec3: 'Pitch Anchoring: Hardened Ground Spikes'
    },
    helmet: {
      title: 'Titanium High-Impact Safety Helmet',
      subtitle: 'Conforms to latest ICC & BS7928:2013 Standards',
      spec1: 'Shell: Reinforced Polymer with EPS Liner',
      spec2: 'Grille: Lightweight Titanium Faceguard',
      spec3: 'Fit: 3D Dial-Fit with Neck Protector Pad'
    },
    pads: {
      title: 'Test Pro High-Density Foam Batting Pads',
      subtitle: 'Ultra-Lightweight 7-Cane Front Protection',
      spec1: 'Knee Cup: Ergonomic Gel-Lined 3-Piece Cap',
      spec2: 'Bolster: Litlon & High-Density Plastazote Foam',
      spec3: 'Straps: 50mm Padded Lycra Velcro Locking'
    },
    gloves: {
      title: 'Multi-Split Sausage Batting Gloves',
      subtitle: 'Supple Pittards Leather Palm for Pro Grip',
      spec1: 'Protection: High-Density High-Impact Fiber Inserts',
      spec2: 'Thumb: 3-Piece Curved Impact Shield',
      spec3: 'Ventilation: Airflow Mesh Gusset for Moisture Control'
    },
  };

  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-slate-950">
      <div id="ball-physics" className="absolute top-0 left-0 w-1 h-1 pointer-events-none opacity-0" />
      {/* Background Ambience Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Copy & CTA */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-950/80 to-slate-900 border border-red-500/40 text-xs font-bold text-red-300 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>BCCI Certified Elite Academy • Est. 2012</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.08]">
                Master the <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">Science</span> of Cricket Excellence
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-medium">
                Shanmukha Cricket Academy — Where Passion Meets Elite Biomechanics.
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Train with ex-First Class players on 8 floodlit turf wickets, Bola bowling machines, 
              240FPS high-speed video biomechanics, complete professional match kits, and personalized AI coaching powered by Google Gemini.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-600 text-white font-extrabold text-sm transition-all shadow-xl shadow-red-600/30 hover:scale-[1.02] active:scale-95 border border-red-400/30"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Book Free Trial Assessment</span>
              </button>

              <button
                onClick={onOpenAICoach}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-bold text-sm transition-all shadow-md hover:shadow-amber-500/20 active:scale-95"
              >
                <Activity className="w-4 h-4 text-amber-400" />
                <span>AI Coach Shanmukha</span>
              </button>

              <a
                href="#/programs"
                className="flex items-center gap-1.5 px-4 py-3.5 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <span>View Programs & Fees</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-800/80">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 text-center">
                <p className="font-display text-2xl font-bold text-red-400">14+</p>
                <p className="text-[11px] text-slate-400 font-medium leading-tight">Ranji / State Stars</p>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 text-center">
                <p className="font-display text-2xl font-bold text-amber-400">8 Turf</p>
                <p className="text-[11px] text-slate-400 font-medium leading-tight">Match Pitch Nets</p>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 text-center">
                <p className="font-display text-2xl font-bold text-emerald-400">240 FPS</p>
                <p className="text-[11px] text-slate-400 font-medium leading-tight">Biomechanics Hub</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Cricket Kit & Ball Physics Laboratory */}
          <div className="lg:col-span-6">
            <div className="relative glass-card rounded-2xl p-4 sm:p-6 border border-red-500/20 shadow-2xl overflow-hidden group">
              
              {/* Top Header / 3D Kit Navigation Selector */}
              <div className="space-y-3 pb-3 border-b border-slate-800">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <span className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      <span>3D Cricket Kit & Physics Studio</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsRotating(!isRotating)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isRotating ? 'bg-red-600/30 border-red-500 text-red-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                      title="Toggle 3D Rotation"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setLightingMode(lightingMode === 'floodlight' ? 'day' : lightingMode === 'golden' ? 'floodlight' : 'golden')}
                      className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-amber-300 hover:text-amber-200"
                      title="Toggle Stadium Lighting"
                    >
                      {lightingMode === 'floodlight' ? <Zap className="w-3.5 h-3.5" /> : lightingMode === 'day' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* 3D Cricket Kit Gear Tabs (Ball, Bat, Stumps, Helmet, Pads, Gloves) */}
                <div className="grid grid-cols-6 gap-1 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
                  {[
                    { id: 'ball', label: 'Match Ball' },
                    { id: 'bat', label: 'English Bat' },
                    { id: 'stumps', label: 'Stumps' },
                    { id: 'helmet', label: 'Helmet' },
                    { id: 'pads', label: 'Pads' },
                    { id: 'gloves', label: 'Gloves' },
                  ].map((gear) => (
                    <button
                      key={gear.id}
                      onClick={() => setActiveKitCategory(gear.id as KitCategory)}
                      className={`py-1.5 px-1 rounded-lg text-[10px] sm:text-[11px] font-bold uppercase transition-all truncate text-center ${
                        activeKitCategory === gear.id
                          ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/40 border border-red-400/50 scale-[1.03]'
                          : 'text-slate-400 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      {gear.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3D Interactive Canvas Stage */}
              <div className="relative w-full h-[300px] sm:h-[340px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
                <canvas ref={canvasRef} className="w-full h-full" />
                
                {/* 3D Gear Badge Overlay */}
                <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[10px] text-slate-300 pointer-events-none">
                  <span className="text-amber-400 font-bold">Shanmukha Pro Gear</span> • {kitInfoMap[activeKitCategory].subtitle}
                </div>

                {/* Interactive Drag Hint */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800 pointer-events-none">
                  Rotate 360° with mouse / touch
                </div>
              </div>

              {/* Dynamic Controls based on selected gear */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                
                {activeKitCategory === 'ball' ? (
                  <>
                    {/* Ball Type Selector */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-300">Match Ball:</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          onClick={() => setBallType('red')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                            ballType === 'red'
                              ? 'bg-red-700 text-white shadow-lg shadow-red-700/40 border border-red-400'
                              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                          }`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-red-600 border border-white" />
                          <span>Red (Test)</span>
                        </button>
                        <button
                          onClick={() => setBallType('white')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                            ballType === 'white'
                              ? 'bg-slate-100 text-slate-950 shadow-lg shadow-white/20 border border-white'
                              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                          }`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-white border border-slate-400" />
                          <span>White (T20)</span>
                        </button>
                        <button
                          onClick={() => setBallType('pink')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                            ballType === 'pink'
                              ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/40 border border-pink-400'
                              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                          }`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-pink-500 border border-white" />
                          <span>Pink (D/N)</span>
                        </button>
                      </div>
                    </div>

                    {/* Seam / Swing Mode Selector */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-300">Seam Presentation:</span>
                      <div className="flex flex-wrap gap-1">
                        {(['outswing', 'inswing', 'reverse', 'spin', 'scramble'] as SwingMode[]).map((mode) => (
                          <button
                            key={mode}
                            onClick={() => setSwingMode(mode)}
                            className={`px-2 py-1 rounded-md text-[11px] font-bold uppercase transition-all ${
                              swingMode === mode
                                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border border-red-400'
                                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Speed Slider */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                          <Gauge className="w-3.5 h-3.5 text-amber-400" /> Delivery Velocity:
                        </span>
                        <span className="font-display text-lg font-bold text-amber-400">
                          {speedKmh} km/h <span className="text-xs text-slate-400 font-sans">({(speedKmh * 0.621371).toFixed(1)} mph)</span>
                        </span>
                      </div>
                      <input
                        type="range"
                        min={75}
                        max={155}
                        step={1}
                        value={speedKmh}
                        onChange={(e) => setSpeedKmh(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                      />
                    </div>

                    {/* Live Aerodynamics Telemetry */}
                    <div className="grid grid-cols-3 gap-2 pt-2 text-center bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase">Rev / Backspin</p>
                        <p className="text-xs font-bold text-white">{rpm} RPM</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase">Magnus Drift</p>
                        <p className="text-xs font-bold text-emerald-400">{magnusForce} N</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase">Deviation</p>
                        <p className="text-xs font-bold text-amber-400">{driftAngle}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Kit Equipment Detailed Biomechanical Specs */
                  <div className="space-y-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                        <PackageCheck className="w-4 h-4 text-emerald-400" />
                        {kitInfoMap[activeKitCategory].title}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold uppercase">
                        BCCI Approved
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                      <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800/80">
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">Specification</p>
                        <p className="text-slate-200 font-medium">{kitInfoMap[activeKitCategory].spec1}</p>
                      </div>
                      <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800/80">
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">Construction</p>
                        <p className="text-slate-200 font-medium">{kitInfoMap[activeKitCategory].spec2}</p>
                      </div>
                      <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800/80">
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">Match Performance</p>
                        <p className="text-slate-200 font-medium">{kitInfoMap[activeKitCategory].spec3}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                      <span>Standard Academy Kit Provided for all enrolled Cadets.</span>
                      <button
                        onClick={onOpenBooking}
                        className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
                      >
                        Request Gear Sizing
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>

        {/* Floating Stats Counter Banner */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
          {STATS_DATA.map((st) => (
            <div
              key={st.label}
              className="glass-card glass-card-hover rounded-2xl p-4 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-600/10 rounded-full blur-xl pointer-events-none" />
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-red-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
                {st.value}{st.suffix}
              </p>
              <p className="text-xs font-bold text-slate-300 mt-1 uppercase tracking-wider">
                {st.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
