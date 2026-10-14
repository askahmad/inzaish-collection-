import * as THREE from 'three';

/**
 * Atelier Material Lab — Interactive 3D Fabric Swatch Inspector
 * Precision textile physics inspector allowing clients to test light refraction,
 * sheen, and tactile drape across core subcontinental luxury fabrics.
 */
export function initMaterialViewer(canvasContainerId) {
  const container = document.getElementById(canvasContainerId);
  if (!container) return () => {};

  const width = container.clientWidth || 380;
  const height = container.clientHeight || 380;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
  camera.position.set(0, 0, 3.8);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  } catch (e) {
    console.warn('[Inzaish Collection] Material viewer WebGL unavailable:', e);
    return () => {};
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  container.style.cursor = 'grab';
  container.appendChild(renderer.domElement);

  // Lighting
  const ambient = new THREE.AmbientLight(0xfffbf2, 1.4);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xfffaed, 2.8);
  keyLight.position.set(4, 5, 4);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xc5a880, 2.2);
  rimLight.position.set(-4, -2, -2);
  scene.add(rimLight);

  // Curved Sculptural Fabric Swatch Geometry
  const geometry = new THREE.CylinderGeometry(1.2, 1.2, 2.2, 48, 24, true, 0, Math.PI * 1.3);
  geometry.center();

  // Curated Subcontinental Fabric Presets
  const FABRIC_PRESETS = {
    'raw-silk': {
      title: 'Lahore Raw Silk',
      color: '#FAF7F2',
      roughness: 0.34,
      metalness: 0.08,
      clearcoat: 0.75,
      clearcoatRoughness: 0.25,
      sheen: 1.0,
      sheenColor: '#DFCEB7',
      transmission: 0.0
    },
    'organza': {
      title: 'Mulberry Silk Organza',
      color: '#FFFFFF',
      roughness: 0.16,
      metalness: 0.04,
      clearcoat: 0.95,
      clearcoatRoughness: 0.1,
      sheen: 0.85,
      sheenColor: '#FFFFFF',
      transmission: 0.82,
      ior: 1.35
    },
    'fine-lawn': {
      title: 'Combed Luxury Lawn',
      color: '#FDFBF7',
      roughness: 0.76,
      metalness: 0.0,
      clearcoat: 0.0,
      clearcoatRoughness: 0.0,
      sheen: 0.25,
      sheenColor: '#F5F0E8',
      transmission: 0.0
    },
    'karandi': {
      title: 'Handspun Winter Karandi',
      color: '#E8E1D3',
      roughness: 0.62,
      metalness: 0.04,
      clearcoat: 0.18,
      clearcoatRoughness: 0.4,
      sheen: 0.65,
      sheenColor: '#D8C3A5',
      transmission: 0.0
    },
    'chikankari': {
      title: 'Embroidered Chikankari',
      color: '#F8F5F0',
      roughness: 0.42,
      metalness: 0.06,
      clearcoat: 0.55,
      clearcoatRoughness: 0.3,
      sheen: 0.9,
      sheenColor: '#E6D7C3',
      transmission: 0.05
    }
  };

  const initialPreset = FABRIC_PRESETS['raw-silk'];
  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(initialPreset.color),
    roughness: initialPreset.roughness,
    metalness: initialPreset.metalness,
    clearcoat: initialPreset.clearcoat,
    clearcoatRoughness: initialPreset.clearcoatRoughness,
    sheen: initialPreset.sheen,
    sheenColor: new THREE.Color(initialPreset.sheenColor),
    transmission: initialPreset.transmission,
    side: THREE.DoubleSide
  });

  const swatchMesh = new THREE.Mesh(geometry, material);
  swatchMesh.rotation.y = Math.PI * 0.2;
  scene.add(swatchMesh);

  // Drag interaction with rotational inertia/momentum physics
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let velocityX = 0;
  let velocityY = 0;

  const onPointerDown = (e) => {
    isDragging = true;
    container.style.cursor = 'grabbing';
    prevMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    prevMouseY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    velocityX = 0;
    velocityY = 0;
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const deltaX = clientX - prevMouseX;
    const deltaY = clientY - prevMouseY;
    prevMouseX = clientX;
    prevMouseY = clientY;

    velocityX = deltaX * 0.012;
    velocityY = deltaY * 0.008;

    swatchMesh.rotation.y += velocityX;
    swatchMesh.rotation.x += velocityY;
  };

  const onPointerUp = () => {
    isDragging = false;
    container.style.cursor = 'grab';
  };

  container.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);

  // Smooth Material Interpolation Engine
  let transitionTarget = null;
  let transitionProgress = 1;

  function updateMaterialTransition() {
    if (!transitionTarget || transitionProgress >= 1) return;
    transitionProgress = Math.min(1, transitionProgress + 0.06);

    const t = transitionProgress;
    material.roughness = THREE.MathUtils.lerp(material.roughness, transitionTarget.roughness, t);
    material.metalness = THREE.MathUtils.lerp(material.metalness, transitionTarget.metalness, t);
    material.clearcoat = THREE.MathUtils.lerp(material.clearcoat, transitionTarget.clearcoat, t);
    material.sheen = THREE.MathUtils.lerp(material.sheen, transitionTarget.sheen, t);
    material.transmission = THREE.MathUtils.lerp(material.transmission, transitionTarget.transmission || 0, t);
    material.color.lerp(new THREE.Color(transitionTarget.color), 0.12);
    material.sheenColor.lerp(new THREE.Color(transitionTarget.sheenColor), 0.12);
    material.needsUpdate = true;
  }

  // Animation Loop with Inertia Decay
  let frameId;
  let isTabActive = true;
  const onVisibilityChange = () => { isTabActive = !document.hidden; };
  document.addEventListener('visibilitychange', onVisibilityChange);

  function animate() {
    frameId = requestAnimationFrame(animate);
    if (!isTabActive) return;

    if (!isDragging) {
      // Apply momentum decay
      if (Math.abs(velocityX) > 0.0001 || Math.abs(velocityY) > 0.0001) {
        swatchMesh.rotation.y += velocityX;
        swatchMesh.rotation.x += velocityY;
        velocityX *= 0.94;
        velocityY *= 0.94;
      } else {
        // Return to gentle idle rotation
        swatchMesh.rotation.y += 0.004;
      }

      // Restrict vertical tilt to natural garment angles
      swatchMesh.rotation.x = THREE.MathUtils.clamp(swatchMesh.rotation.x, -0.4, 0.4);
    }

    updateMaterialTransition();
    renderer.render(scene, camera);
  }
  animate();

  // Public Fabric Preset Switcher
  window.switchAtelierFabric = (fabricKey) => {
    const preset = FABRIC_PRESETS[fabricKey];
    if (!preset) return;
    transitionTarget = preset;
    transitionProgress = 0;
  };

  // Resize Handler
  const handleResize = () => {
    if (!container || !renderer) return;
    const newWidth = container.clientWidth || 380;
    const newHeight = container.clientHeight || 380;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  };
  window.addEventListener('resize', handleResize);

  return () => {
    cancelAnimationFrame(frameId);
    container.removeEventListener('pointerdown', onPointerDown);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('visibilitychange', onVisibilityChange);

    if (renderer.domElement && container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }

    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}
