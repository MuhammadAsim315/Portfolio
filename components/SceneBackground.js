"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Fixed, static night backdrop: gradient sky, twinkling stars, a soft
 * glowing horizon light, silhouetted hills and ground mist. Nothing in
 * this scene moves in response to scroll or cursor — it's a still
 * painterly background behind the page content.
 */
export default function SceneBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const wrap = mountRef.current;
    if (!wrap) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      400
    );
    camera.position.set(0, 3.2, 9);
    camera.lookAt(0, 4, -60);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    wrap.appendChild(renderer.domElement);

    // ---------- Night sky gradient ----------
    function makeSkyTexture() {
      const c = document.createElement("canvas");
      c.width = 16;
      c.height = 512;
      const ctx = c.getContext("2d");
      const g = ctx.createLinearGradient(0, 0, 0, 512);
      g.addColorStop(0, "#050505");
      g.addColorStop(0.5, "#111114");
      g.addColorStop(0.78, "#3d3b3a");
      g.addColorStop(1, "#8f897c");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 16, 512);
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.generateMipmaps = false;
      tex.minFilter = THREE.LinearFilter;
      return tex;
    }
    scene.background = makeSkyTexture();
    scene.fog = new THREE.Fog(0x2a2926, 30, 150);

    // ---------- Stars (static, gently twinkling in place) ----------
    const starCount = 260;
    const starGeo = new THREE.BufferGeometry();
    const starArr = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starArr[i * 3] = (Math.random() - 0.5) * 200;
      starArr[i * 3 + 1] = 12 + Math.random() * 70;
      starArr[i * 3 + 2] = -40 - Math.random() * 160;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starArr, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xf2f0ec,
      size: 0.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
      fog: false,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ---------- Glowing horizon sun/moon (static, perfectly circular) ----------
    function makeGlowTexture() {
      const c = document.createElement("canvas");
      c.width = c.height = 512;
      const ctx = c.getContext("2d");
      const g = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
      g.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      g.addColorStop(0.2, "rgba(242, 240, 236, 0.75)");
      g.addColorStop(0.45, "rgba(217, 214, 204, 0.3)");
      g.addColorStop(0.75, "rgba(143, 140, 134, 0.08)");
      g.addColorStop(1, "rgba(6, 6, 6, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 512, 512);
      const tex = new THREE.CanvasTexture(c);
      tex.generateMipmaps = false;
      tex.minFilter = THREE.LinearFilter;
      return tex;
    }
    const sunMat = new THREE.SpriteMaterial({
      map: makeGlowTexture(),
      transparent: true,
      depthWrite: false,
      fog: false,
    });
    const sun = new THREE.Sprite(sunMat);
    scene.add(sun);

    // ---------- Ground ----------
    const groundMat = new THREE.MeshBasicMaterial({ color: 0x181815, fog: true });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(300, 200), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -0.1, -70);
    scene.add(ground);

    // ---------- Hill silhouettes ----------
    function hillShape(w, h) {
      const s = new THREE.Shape();
      s.moveTo(-w / 2, 0);
      s.bezierCurveTo(-w / 4, h, w / 6, h * 0.85, w / 2, h * 0.3);
      s.lineTo(w / 2, 0);
      s.lineTo(-w / 2, 0);
      return s;
    }
    const hillDefs = [
      { x: -46, z: -118, w: 70, h: 24, c: 0x59564f },
      { x: 40, z: -124, w: 62, h: 20, c: 0x504d47 },
      { x: -26, z: -78, w: 46, h: 16, c: 0x38362f },
      { x: 30, z: -72, w: 50, h: 17, c: 0x2f2d28 },
      { x: -60, z: -70, w: 40, h: 13, c: 0x211f1c },
      { x: 62, z: -66, w: 44, h: 14, c: 0x211f1c },
    ];
    hillDefs.forEach((d) => {
      const geo = new THREE.ShapeGeometry(hillShape(d.w, d.h));
      const mat = new THREE.MeshBasicMaterial({ color: d.c, fog: true });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(d.x, -0.1, d.z);
      mesh.renderOrder = -Math.abs(d.z);
      scene.add(mesh);
    });

    // ---------- Static ground mist ----------
    const mistCount = 140;
    const mistGeo = new THREE.BufferGeometry();
    const mistArr = new Float32Array(mistCount * 3);
    for (let i = 0; i < mistCount; i++) {
      mistArr[i * 3] = (Math.random() - 0.5) * 90;
      mistArr[i * 3 + 1] = Math.random() * 3.5;
      mistArr[i * 3 + 2] = -20 - Math.random() * 130;
    }
    mistGeo.setAttribute("position", new THREE.BufferAttribute(mistArr, 3));
    const mistMat = new THREE.PointsMaterial({
      color: 0xcac6ba,
      size: 0.16,
      transparent: true,
      opacity: 0.3,
      fog: true,
    });
    const mist = new THREE.Points(mistGeo, mistMat);
    scene.add(mist);

    // Responsive layout adapter for viewport changes (portrait/mobile vs desktop)
    function handleResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const aspect = w / h;
      camera.aspect = aspect;

      if (aspect < 1) {
        // Mobile portrait: widen FOV slightly so composition doesn't clip, center and scale sun proportionately
        camera.fov = 66;
        sun.scale.set(22, 22, 1);
        sun.position.set(2, 9.5, -95);
      } else {
        // Desktop / landscape
        camera.fov = 52;
        sun.scale.set(34, 34, 1);
        sun.position.set(6, 11, -95);
      }

      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    let rafId;
    const clock = new THREE.Clock();
    function animate() {
      rafId = requestAnimationFrame(animate);
      const t = clock.elapsedTime;

      if (!reduceMotion) {
        starMat.opacity = 0.72 + Math.sin(t * 0.9) * 0.13;
      }

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      mistGeo.dispose();
      mistMat.dispose();
      groundMat.dispose();
      sunMat.map.dispose();
      sunMat.dispose();
      if (wrap.contains(renderer.domElement)) {
        wrap.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div id="canvas-wrap" ref={mountRef} />
      <div id="grain" />
    </>
  );
}
