import * as THREE from 'three';

/**
 * Atelier Material Lab — Interactive 3D Fabric Swatch Inspector
 * Allows customers to interactively test light reflections across different luxury textiles.
 */
export function initMaterialViewer(canvasContainerId) {
  const container = document.getElementById(canvasContainerId);
  if (!container) return;

  const width = container.clientWidth || 380;
  const height = container.clientHeight || 380;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
  camera.position.set(0, 0, 3.8);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  } catch (e) {
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  // Lighting
  const ambient = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xfffaed, 2.5);
  keyLight.position.set(4, 5, 4);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xc5a880, 2.0);
  rimLight.position.set(-4, -2, -2);
  scene.add(rimLight);

  // Curved Fabric Swatch Geometry
  const geometry = new THREE.CylinderGeometry(1.2, 1.2, 2.2, 48, 24, true, 0, Math.PI * 1.3);
  geometry.center();

  // Fabric Presets
  const FABRIC_PRESETS = {
    'raw-silk': {
      color: '#F4EFE6',
      roughness: 0.38,
      metalness: 0.12,
      clearcoat: 0.65,
      sheen: 1.0,
      sheenColor: '#E2D1B8',
      transmission: 0.0
    },
    'organza': {
      color: '#FFFFFF',
      roughness: 0.18,
      metalness: 0.05,
      clearcoat: 0.95,
      sheen: 0.8,
      sheenColor: '#FFFFFF',
      transmission: 0.75,
      ior: 1.35
    },
    'fine-lawn': {
      color: '#FDFBF7',
      roughness: 0.72,
      metalness: 0.0,
      clearcoat: 0.0,
      sheen: 0.2,
      sheenColor: '#F5F0E8',
      transmission: 0.0
    },
    'karandi': {
      color: '#E8E1D3',
      roughness: 0.62,
      metalness: 0.04,
      clearcoat: 0.15,
      sheen: 0.6,
      sheenColor: '#D8C3A5',
      transmission: 0.0
    }
  };

  const material = new THREE.MeshPhysicalMaterial({
    ...FABRIC_PRESETS['raw-silk'],
    side: THREE.DoubleSide
  });

  const swatchMesh = new THREE.Mesh(geometry, material);
  swatchMesh.rotation.y = Math.PI * 0.2;
  scene.add(swatchMesh);

  // Drag interaction to rotate swatch
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;

  const onPointerDown = (e) => {
    isDragging = true;
    prevMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    prevMouseY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const deltaX = clientX - prevMouseX;
    const deltaY = clientY - prevMouseY;
    prevMouseX = clientX;
    prevMouseY = clientY;

    swatchMesh.rotation.y += deltaX * 0.012;
    swatchMesh.rotation.x += deltaY * 0.008;
  };

  const onPointerUp = () => { isDragging = false; };

  container.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);

  let frameId;
  function animate() {
    frameId = requestAnimationFrame(animate);
    if (!isDragging) {
      swatchMesh.rotation.y += 0.004; // Gentle idle rotation
    }
    renderer.render(scene, camera);
  }
  animate();

  // Public switcher function
  window.switchAtelierFabric = (fabricKey) => {
    const preset = FABRIC_PRESETS[fabricKey];
    if (!preset) return;
    material.color.set(preset.color);
    material.roughness = preset.roughness;
    material.metalness = preset.metalness;
    material.clearcoat = preset.clearcoat;
    material.sheen = preset.sheen;
    material.sheenColor.set(preset.sheenColor);
    material.transmission = preset.transmission || 0;
    if (preset.ior) material.ior = preset.ior;
    material.needsUpdate = true;
  };

  return () => {
    cancelAnimationFrame(frameId);
    container.removeEventListener('pointerdown', onPointerDown);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    if (renderer.domElement && container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
  };
}
