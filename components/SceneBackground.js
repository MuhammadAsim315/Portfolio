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
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    wrap.appendChild(renderer.domElement);

    // ---------- Night sky gradient ----------
    function makeSkyTexture() {
      const c = document.createElement("canvas");
      c.width = 8;
      c.height = 512;
      const ctx = c.getContext("2d");
      const g = ctx.createLinearGradient(0, 0, 0, 512);
      g.addColorStop(0, "#050505");
      g.addColorStop(0.5, "#111114");
      g.addColorStop(0.78, "#3d3b3a");
      g.addColorStop(1, "#8f897c");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 8, 512);
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
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

    // ---------- Glowing horizon sun/moon (static) ----------
    function makeGlowTexture() {
      const c = document.createElement("canvas");
      c.width = c.height = 256;
      const ctx = c.getContext("2d");
      const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      g.addColorStop(0, "rgba(255,255,255,0.9)");
      g.addColorStop(0.4, "rgba(230,228,220,0.32)");
      g.addColorStop(1, "rgba(230,228,220,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 256, 256);
      return new THREE.CanvasTexture(c);
    }
    const sunMat = new THREE.SpriteMaterial({
      map: makeGlowTexture(),
      transparent: true,
      depthWrite: false,
      fog: false,
    });
    const sun = new THREE.Sprite(sunMat);
    sun.scale.set(34, 34, 1);
    sun.position.set(6, 11, -95);
    scene.add(sun);

    // ---------- Ground ----------
    const groundMat = new THREE.MeshBasicMaterial({ color: 0x181815, fog: true });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(300, 200), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -0.1, -70);
    scene.add(ground);

    // ---------- Hill silhouettes (single static composition) ----------
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

    // camera stays completely fixed — no cursor parallax — so the only
    // moving element on the page is the scroll-linked star/arrow guide

    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
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
