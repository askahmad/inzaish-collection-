import * as THREE from 'three';

/**
 * The Loom of Light — Immersive Fashion Atelier 3D Textile Installation
 * Procedural raw silk and ethereal organza ribbons undulating with responsive cursor physics.
 * Optimized for high performance, mobile GPU scaling, and reduced-motion accessibility.
 */
export function initTextileCanvas(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return () => {};

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  let width = container.clientWidth || window.innerWidth;
  let height = container.clientHeight || window.innerHeight;

  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
  camera.position.set(0.5, 0.1, 7.2);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
  } catch (e) {
    console.warn('[Inzaish Collection] WebGL not supported on device:', e);
    return () => {};
  }

  // Device pixel ratio clamped for smooth 60fps performance
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.domElement.style.opacity = '0';
  renderer.domElement.style.transition = 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
  container.appendChild(renderer.domElement);

  // Progressive Fade-In
  requestAnimationFrame(() => {
    if (renderer.domElement) {
      renderer.domElement.style.opacity = '1';
    }
  });

  // Sculptural Lighting
  const ambientLight = new THREE.AmbientLight(0xfffbf2, 1.6);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xfff8ee, 3.2);
  mainLight.position.set(5, 7, 8);
  scene.add(mainLight);

  const rimLight = new THREE.DirectionalLight(0xc5a880, 2.5);
  rimLight.position.set(-6, -3, 3);
  scene.add(rimLight);

  const backLight = new THREE.DirectionalLight(0xe8dfd5, 1.4);
  backLight.position.set(0, -5, -4);
  scene.add(backLight);

  // Adaptive geometry resolution for mobile vs desktop
  const isMobile = window.innerWidth < 768;
  const segmentsX = isMobile ? 48 : 96;
  const segmentsY = isMobile ? 16 : 24;
  const ribbonWidth = 12.0;
  const ribbonHeight = 3.6;

  // Primary Ribbon Geometry (Champagne Raw Silk)
  const geometry1 = new THREE.PlaneGeometry(ribbonWidth, ribbonHeight, segmentsX, segmentsY);
  const posAttr1 = geometry1.attributes.position;
  const origPos1 = posAttr1.array.slice();

  const silkMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#FAF7F2'),
    roughness: 0.32,
    metalness: 0.08,
    clearcoat: 0.85,
    clearcoatRoughness: 0.2,
    sheen: 1.0,
    sheenColor: new THREE.Color('#DFCEB7'),
    side: THREE.DoubleSide
  });

  const ribbonMesh1 = new THREE.Mesh(geometry1, silkMaterial);
  ribbonMesh1.rotation.x = 0.30;
  ribbonMesh1.rotation.y = -0.22;
  ribbonMesh1.position.set(0.6, 0.2, 0);
  scene.add(ribbonMesh1);

  // Secondary Ethereal Ribbon Geometry (Sheer Translucent Organza)
  const geometry2 = new THREE.PlaneGeometry(
    ribbonWidth * 0.9,
    ribbonHeight * 0.75,
    isMobile ? 36 : 72,
    isMobile ? 14 : 20
  );
  const posAttr2 = geometry2.attributes.position;
  const origPos2 = posAttr2.array.slice();

  const organzaMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#F3EDE2'),
    roughness: 0.18,
    metalness: 0.04,
    transmission: 0.65,
    opacity: 0.75,
    transparent: true,
    clearcoat: 0.9,
    sheen: 0.9,
    sheenColor: new THREE.Color('#C5A880'),
    side: THREE.DoubleSide
  });

  const ribbonMesh2 = new THREE.Mesh(geometry2, organzaMaterial);
  ribbonMesh2.rotation.x = 0.42;
  ribbonMesh2.rotation.y = -0.15;
  ribbonMesh2.position.set(0.2, -0.4, -0.8);
  scene.add(ribbonMesh2);

  // If user prefers reduced motion, render single static frame and freeze
  if (prefersReducedMotion) {
    renderer.render(scene, camera);
    return () => {
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }

  // Pointer Interaction
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const handlePointerMove = (e) => {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    mouse.targetX = (clientX / window.innerWidth) * 2 - 1;
    mouse.targetY = -(clientY / window.innerHeight) * 2 + 1;
  };

  window.addEventListener('pointermove', handlePointerMove, { passive: true });

  // High-precision clock using performance.now (avoids THREE.Clock deprecation warnings)
  const startTime = performance.now();
  let isVisible = true;
  let isTabActive = true;
  let isContextLost = false;
  let animationFrameId;

  // Viewport Intersection Observer (suspends WebGL when scrolled away)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isVisible = entry.isIntersecting;
    });
  }, { threshold: 0.05 });
  observer.observe(container);

  // Page visibility listener (saves GPU cycles when tab is backgrounded)
  const handleVisibilityChange = () => {
    isTabActive = !document.hidden;
  };
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // WebGL Context Loss & Restoration Handling
  const handleContextLost = (e) => {
    e.preventDefault();
    isContextLost = true;
    cancelAnimationFrame(animationFrameId);
    console.warn('[Inzaish Collection 3D] WebGL context lost.');
  };

  const handleContextRestored = () => {
    console.log('[Inzaish Collection 3D] WebGL context restored.');
    isContextLost = false;
    animate();
  };

  renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);
  renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored, false);

  function animate() {
    if (isContextLost) return;
    animationFrameId = requestAnimationFrame(animate);

    if (!isVisible || !isTabActive) return;

    const elapsedTime = (performance.now() - startTime) * 0.001;

    // Smooth mouse interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.045;
    mouse.y += (mouse.targetY - mouse.y) * 0.045;

    // Undulate Primary Silk Ribbon
    const pos1 = geometry1.attributes.position;
    for (let i = 0; i < pos1.count; i++) {
      const u = (i % (segmentsX + 1)) / segmentsX;
      const origX = origPos1[i * 3];
      const origY = origPos1[i * 3 + 1];

      const wave1 = Math.sin(origX * 0.85 + elapsedTime * 1.3) * 0.45;
      const wave2 = Math.cos(origY * 1.2 + origX * 0.55 + elapsedTime * 0.85) * 0.35;
      const wave3 = Math.sin((origX + origY) * 0.4 + elapsedTime * 1.6) * 0.15;
      const pointerReact = Math.sin(u * Math.PI + elapsedTime * 1.8) * mouse.x * 0.55;

      pos1.setZ(i, wave1 + wave2 + wave3 + pointerReact);
    }
    pos1.needsUpdate = true;
    geometry1.computeVertexNormals();

    // Undulate Secondary Organza Ribbon (gentler harmonic phase)
    const pos2 = geometry2.attributes.position;
    const segs2X = isMobile ? 36 : 72;
    for (let i = 0; i < pos2.count; i++) {
      const origX = origPos2[i * 3];
      const origY = origPos2[i * 3 + 1];

      const wave1 = Math.cos(origX * 0.75 + elapsedTime * 1.1) * 0.38;
      const wave2 = Math.sin(origY * 1.1 + elapsedTime * 0.75) * 0.28;

      pos2.setZ(i, wave1 + wave2 + mouse.x * 0.3);
    }
    pos2.needsUpdate = true;
    geometry2.computeVertexNormals();

    // Mesh tilting
    ribbonMesh1.rotation.y = -0.22 + mouse.x * 0.14;
    ribbonMesh1.rotation.x = 0.30 - mouse.y * 0.12;

    ribbonMesh2.rotation.y = -0.15 + mouse.x * 0.18;
    ribbonMesh2.rotation.x = 0.42 - mouse.y * 0.15;

    renderer.render(scene, camera);
  }

  animate();

  // Resize Handler
  const handleResize = () => {
    if (!container || !renderer) return;
    const newWidth = container.clientWidth || window.innerWidth;
    const newHeight = container.clientHeight || window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    observer.disconnect();

    if (renderer.domElement) {
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    }

    geometry1.dispose();
    geometry2.dispose();
    silkMaterial.dispose();
    organzaMaterial.dispose();
    renderer.dispose();
  };
}
