"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type * as THREE from "three";

type VehicleStageProps = {
  modelSrc: string;
  style?: CSSProperties;
};

/**
 * Transparent, auto-rotating three.js turntable for a single GLB model —
 * a from-scratch port of the design's <three-d-stage> custom element,
 * stripped of its download-model toolbar (removed per design review) and
 * driven directly by react/three instead of a CDN import map.
 *
 * Lazy-initialized and visibility-gated: this section sits far down a very
 * long scroll page, so the scene (and its multi-MB GLB) only loads once the
 * stage nears the viewport, and the render loop pauses whenever it scrolls
 * back out — a WebGL loop left running continuously behind an 11-section
 * pinned-scroll page is expensive enough to stall unrelated scrolling.
 */
export function VehicleStage({ modelSrc, style }: VehicleStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldInit, setShouldInit] = useState(false);
  const visibleRef = useRef(false);
  const loopRef = useRef<(() => void) | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) setShouldInit(true);
        rendererRef.current?.setAnimationLoop(entry.isIntersecting ? loopRef.current : null);
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldInit) return;
    let disposed = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const [THREE, { OrbitControls }, { GLTFLoader }] = await Promise.all([
        import("three"),
        import("three/examples/jsm/controls/OrbitControls.js"),
        import("three/examples/jsm/loaders/GLTFLoader.js"),
      ]);
      if (disposed || !containerRef.current) return;
      const container = containerRef.current;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.domElement.style.display = "block";
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 500);
      camera.position.set(3, 2.2, 4);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.2;
      controls.addEventListener("start", () => {
        controls.autoRotate = false;
      });

      scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d2c4, 1.0));
      const key = new THREE.DirectionalLight(0xffffff, 2.2);
      key.position.set(4, 7, 5);
      key.castShadow = true;
      key.shadow.mapSize.set(2048, 2048);
      key.shadow.bias = -0.0002;
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xfff4e6, 0.5);
      fill.position.set(-5, 3, -4);
      scene.add(fill);

      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200),
        new THREE.ShadowMaterial({ opacity: 0.18 })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      scene.add(ground);

      const fit = () => {
        const w = container.clientWidth || 1;
        const h = container.clientHeight || 1;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      fit();
      const ro = new ResizeObserver(fit);
      ro.observe(container);

      loopRef.current = () => {
        controls.update();
        renderer.render(scene, camera);
      };
      rendererRef.current = renderer;
      renderer.setAnimationLoop(visibleRef.current ? loopRef.current : null);

      const loader = new GLTFLoader();
      loader.load(modelSrc, (gltf) => {
        if (disposed) return;
        const model = gltf.scene;
        model.traverse((o) => {
          const mesh = o as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        // Center and scale the raw model, then re-measure the assembled
        // group so camera framing and ground placement always reflect the
        // model's true final bounds.
        const rawBox = new THREE.Box3().setFromObject(model);
        const rawSize = rawBox.getSize(new THREE.Vector3());
        const rawCenter = rawBox.getCenter(new THREE.Vector3());
        model.position.sub(rawCenter);
        const maxDim = Math.max(rawSize.x, rawSize.y, rawSize.z) || 1;
        model.scale.setScalar(2.2 / maxDim);

        const group = new THREE.Group();
        group.add(model);
        scene.add(group);

        const box = new THREE.Box3().setFromObject(group);
        if (!box.isEmpty()) {
          ground.position.y = box.min.y;
          const sphere = box.getBoundingSphere(new THREE.Sphere());
          const dist = (sphere.radius / Math.tan((camera.fov * Math.PI) / 360)) * 1.35;
          const dir = new THREE.Vector3(1, 0.55, 1.25).normalize();
          camera.position.copy(sphere.center).add(dir.multiplyScalar(dist));
          camera.near = Math.max(dist / 100, 0.01);
          camera.far = dist * 100;
          camera.updateProjectionMatrix();
          controls.target.copy(sphere.center);
          controls.update();
          const span = sphere.radius * 3;
          key.shadow.camera.left = -span;
          key.shadow.camera.right = span;
          key.shadow.camera.top = span;
          key.shadow.camera.bottom = -span;
          key.shadow.camera.updateProjectionMatrix();
        }
      });

      cleanup = () => {
        ro.disconnect();
        renderer.setAnimationLoop(null);
        rendererRef.current = null;
        loopRef.current = null;
        controls.dispose();
        scene.traverse((o) => {
          const mesh = o as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.geometry?.dispose();
            const mats: THREE.Material[] = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            mats.forEach((m) => m?.dispose());
          }
        });
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [shouldInit, modelSrc]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%", ...style }} />;
}
