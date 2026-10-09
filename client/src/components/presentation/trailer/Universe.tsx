/**
 * Universe - the trailer's GPU particle world. One THREE.Points (one draw
 * call) whose vertex shader morphs every particle from its previous formation
 * to the next with a per-particle delay and an arcing flight path. A shared
 * mutable controller object (U) is tweened by the GSAP timeline; this
 * component reads it every frame. Post-processing: bloom, chromatic
 * aberration, film grain and vignette.
 *
 * Everything is a pure function of the controller (including U.t, the
 * timeline's own clock), so any frame can be reproduced exactly by seeking:
 * the same discipline that lets the trailer be scrubbed and exported to video.
 */
import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { N, CAM_Z, FOV, toWorld, GROUP_STARS, type Formation } from './formations';

export interface GroupCtl { glow: number; red: number; shift: number }

export interface UniverseCtl {
  /** timeline-driven clock for idle drift (seconds); never accumulated per frame */
  t: number;
  /** kick-drum envelope 0..1, a pure function of time (beat-synced pulse) */
  beat: number;
  /** camera shake amplitude */
  shake: number;
  /** hyperspace streaks 0..1 (chapter jumps) */
  warp: number;
  /** extra distance flown through the starfield (added to the steady drift) */
  flyBoost: number;
  /** heartbeat ripple: wave front 0..1 and its strength */
  ripple: number;
  rippleAmp: number;
  morph: number;
  span: number;
  chaos: number;
  pulse: number;
  spinSpeed: number;
  spin: number;
  camX: number;
  camY: number;
  camZ: number;
  roll: number;
  bloom: number;
  aberration: number;
  g: GroupCtl[];
}

export function createUniverseCtl(): UniverseCtl {
  return {
    t: 0, beat: 0, shake: 0, warp: 0, flyBoost: 0, ripple: 0, rippleAmp: 0,
    morph: 1, span: 0.3, chaos: 0, pulse: 0, spinSpeed: 0, spin: 0,
    camX: 0, camY: 0, camZ: CAM_Z + 3, roll: 0, bloom: 1.15, aberration: 0,
    g: Array.from({ length: 16 }, () => ({ glow: 0, red: 0, shift: 0 })),
  };
}

export interface UniverseApi { morphTo: (f: Formation, span?: number) => void }

const vertex = /* glsl */ `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute vec3 aColFrom;
  attribute vec3 aColTo;
  attribute float aSizeFrom;
  attribute float aSizeTo;
  attribute float aDelay;
  attribute float aGroup;
  attribute float aRand;
  attribute float aStarFrom;
  attribute float aStarTo;
  uniform float uFly;
  uniform float uRipple;
  uniform float uRippleAmp;
  uniform vec2 uHeart;
  uniform float uMorph;
  uniform float uSpan;
  uniform float uTime;
  uniform float uChaos;
  uniform float uPulse;
  uniform float uScale;
  uniform float uBeat;
  uniform float uGlow[16];
  uniform float uRed[16];
  uniform float uShift[16];
  varying vec3 vColor;

  float easeInOut(float r) {
    return r < 0.5 ? 4.0 * r * r * r : 1.0 - pow(-2.0 * r + 2.0, 3.0) / 2.0;
  }

  void main() {
    float d = aDelay * (1.0 - uSpan);
    float k = easeInOut(clamp((uMorph - d) / uSpan, 0.0, 1.0));
    vec3 p = mix(aFrom, aTo, k);

    // arcing flight path mid-morph
    vec3 dir = normalize(vec3(sin(aRand * 61.0), cos(aRand * 37.0), sin(aRand * 13.0) * 0.6));
    p += dir * sin(k * 3.14159) * (0.4 + aRand * 0.9);

    // the starfield flies slowly toward the camera (wrapping far to near),
    // weighted by star-ness so figures never move and morphs stay continuous
    float sw = mix(aStarFrom, aStarTo, k);
    float zw = -70.0 + mod(p.z + uFly + 70.0, 79.0);
    float vis = mix(1.0, smoothstep(-70.0, -58.0, zw) * (1.0 - smoothstep(2.5, 7.0, zw)), sw);
    p.z = mix(p.z, zw, sw);
    // heartbeat ripple: a ring of light travelling out from the heart
    float rip = 0.0;
    if (uRippleAmp > 0.001 && sw > 0.5) {
      float depth = max(0.5, 10.0 - p.z);
      vec2 d = p.xy * 10.0 / depth - uHeart;
      float r = length(d);
      rip = exp(-pow((r - uRipple * 9.5) / 1.1, 2.0)) * uRippleAmp;
      p.xy += (d / max(r, 0.001)) * rip * 0.9 * depth / 10.0;
    }

    int gi = int(aGroup + 0.5);
    bool isStar = gi == 15;
    float chaos = isStar ? 0.0 : uChaos;
    p += vec3(sin(uTime * 0.7 + aRand * 20.0), cos(uTime * 0.55 + aRand * 13.0), sin(uTime * 0.45 + aRand * 7.0))
         * (0.012 + chaos * 0.32);
    p.x += uShift[gi];

    float glow = uGlow[gi];
    vec3 col = mix(aColFrom, aColTo, k);
    col = mix(col, vec3(1.7, 0.22, 0.32), uRed[gi]);
    vColor = col * (1.0 + glow) * vis * (1.0 + rip * 5.0);

    float size = mix(aSizeFrom, aSizeTo, k) * (1.0 + glow * 0.7) * (0.35 + 0.65 * vis) * (1.0 + rip * 2.2);
    if (gi == 0) size *= 1.0 + uPulse;
    // beat-synced breath: figures swell on the kick, stars sparkle
    size *= 1.0 + uBeat * (isStar ? 0.35 : 0.16);
    vColor *= 1.0 + uBeat * (isStar ? 0.5 : 0.22);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = size * uScale / max(0.1, -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a = a * a + smoothstep(0.12, 0.0, d) * 0.6;
    gl_FragColor = vec4(vColor, a);
  }
`;

function Particles({ U, initial, apiRef }: { U: UniverseCtl; initial: Formation; apiRef: React.MutableRefObject<UniverseApi | null> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { size, gl, camera } = useThree();

  const { geometry, material, buffers } = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const b = {
      from: new Float32Array(initial.pos),
      to: new Float32Array(initial.pos),
      colFrom: new Float32Array(initial.col),
      colTo: new Float32Array(initial.col),
      sizeFrom: new Float32Array(initial.size),
      sizeTo: new Float32Array(initial.size),
      delay: new Float32Array(initial.delay),
      group: new Float32Array(initial.group),
      rand: new Float32Array(N).map(() => Math.random()),
      starFrom: new Float32Array(N).map((_, i) => (initial.group[i] === GROUP_STARS ? 1 : 0)),
      starTo: new Float32Array(N).map((_, i) => (initial.group[i] === GROUP_STARS ? 1 : 0)),
    };
    g.setAttribute('position', new THREE.BufferAttribute(b.to, 3));
    g.setAttribute('aFrom', new THREE.BufferAttribute(b.from, 3));
    g.setAttribute('aTo', new THREE.BufferAttribute(b.to, 3));
    g.setAttribute('aColFrom', new THREE.BufferAttribute(b.colFrom, 3));
    g.setAttribute('aColTo', new THREE.BufferAttribute(b.colTo, 3));
    g.setAttribute('aSizeFrom', new THREE.BufferAttribute(b.sizeFrom, 1));
    g.setAttribute('aSizeTo', new THREE.BufferAttribute(b.sizeTo, 1));
    g.setAttribute('aDelay', new THREE.BufferAttribute(b.delay, 1));
    g.setAttribute('aGroup', new THREE.BufferAttribute(b.group, 1));
    g.setAttribute('aRand', new THREE.BufferAttribute(b.rand, 1));
    g.setAttribute('aStarFrom', new THREE.BufferAttribute(b.starFrom, 1));
    g.setAttribute('aStarTo', new THREE.BufferAttribute(b.starTo, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 200);
    const m = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uMorph: { value: 1 },
        uSpan: { value: 0.3 },
        uTime: { value: 0 },
        uChaos: { value: 0 },
        uPulse: { value: 0 },
        uScale: { value: 26 },
        uBeat: { value: 0 },
        uFly: { value: 0 },
        uRipple: { value: 0 },
        uRippleAmp: { value: 0 },
        uHeart: { value: new THREE.Vector2(...toWorld(50, 40).slice(0, 2) as [number, number]) },
        uGlow: { value: new Array(16).fill(0) },
        uRed: { value: new Array(16).fill(0) },
        uShift: { value: new Array(16).fill(0) },
      },
    });
    return { geometry: g, material: m, buffers: b };
  }, [initial]);

  useEffect(() => {
    apiRef.current = {
      morphTo: (f: Formation, span = 0.3) => {
        // freeze the current interpolated state into "from"
        const sp = U.span;
        for (let i = 0; i < N; i++) {
          const d = buffers.delay[i] * (1 - sp);
          const r = Math.min(1, Math.max(0, (U.morph - d) / sp));
          const k = r < 0.5 ? 4 * r * r * r : 1 - Math.pow(-2 * r + 2, 3) / 2;
          for (let c = 0; c < 3; c++) {
            const j = i * 3 + c;
            buffers.from[j] = buffers.from[j] + (buffers.to[j] - buffers.from[j]) * k;
            buffers.colFrom[j] = buffers.colFrom[j] + (buffers.colTo[j] - buffers.colFrom[j]) * k;
          }
          buffers.sizeFrom[i] = buffers.sizeFrom[i] + (buffers.sizeTo[i] - buffers.sizeFrom[i]) * k;
          buffers.starFrom[i] = buffers.starFrom[i] + (buffers.starTo[i] - buffers.starFrom[i]) * k;
          buffers.starTo[i] = f.group[i] === GROUP_STARS ? 1 : 0;
        }
        buffers.to.set(f.pos);
        buffers.colTo.set(f.col);
        buffers.sizeTo.set(f.size);
        buffers.delay.set(f.delay);
        buffers.group.set(f.group);
        ['aFrom', 'aTo', 'aColFrom', 'aColTo', 'aSizeFrom', 'aSizeTo', 'aDelay', 'aGroup', 'aStarFrom', 'aStarTo', 'position'].forEach((n) => {
          (geometry.getAttribute(n) as THREE.BufferAttribute).needsUpdate = true;
        });
        U.morph = 0;
        U.span = span;
      },
    };
    return () => { apiRef.current = null; geometry.dispose(); material.dispose(); };
  }, [U, apiRef, buffers, geometry, material]);

  useFrame(() => {
    const u = material.uniforms;
    u.uMorph.value = U.morph;
    u.uSpan.value = U.span;
    u.uTime.value = U.t;
    u.uBeat.value = U.beat;
    u.uFly.value = U.t * 1.2 + U.flyBoost;
    u.uRipple.value = U.ripple;
    u.uRippleAmp.value = U.rippleAmp;
    u.uChaos.value = U.chaos;
    u.uPulse.value = U.pulse;
    u.uScale.value = 26 * (size.height / 1080) * gl.getPixelRatio();
    for (let i = 0; i < 16; i++) {
      u.uGlow.value[i] = U.g[i].glow;
      u.uRed.value[i] = U.g[i].red;
      u.uShift.value[i] = U.g[i].shift;
    }
    if (pointsRef.current) pointsRef.current.rotation.y = U.spin;
    // deterministic shake: a pure function of time, so seeking reproduces it
    const sh = U.shake;
    camera.position.set(U.camX + sh * 5 * Math.sin(U.t * 71.3), U.camY + sh * 3.2 * Math.sin(U.t * 57.9 + 1.1), U.camZ);
    camera.rotation.set(0, 0, U.roll + sh * Math.sin(U.t * 43.7 + 2.3));
  });

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />;
}

type FxEffect = { name: string; intensity?: number; offset?: THREE.Vector2 };

const warpVertex = /* glsl */ `
  attribute vec3 aSeed;   // angle, radius, start depth
  attribute float aEnd;   // 0 = head, 1 = tail
  uniform float uTravel;
  uniform float uWarp;
  varying float vFade;
  varying float vHue;
  void main() {
    float z = mod(aSeed.z + uTravel, 96.0) - 88.0;
    float len = 0.25 + uWarp * uWarp * 16.0;
    float zz = z - aEnd * len;
    vec3 p = vec3(cos(aSeed.x) * aSeed.y, sin(aSeed.x) * aSeed.y, zz);
    // fade in from the distance, out as streaks pass the camera
    vFade = smoothstep(-88.0, -55.0, z) * (1.0 - smoothstep(4.0, 8.0, z)) * (1.0 - aEnd * 0.85);
    vHue = fract(aSeed.x * 3.7);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const warpFragment = /* glsl */ `
  uniform float uWarp;
  varying float vFade;
  varying float vHue;
  void main() {
    vec3 c = mix(vec3(0.55, 0.62, 1.4), vec3(0.45, 1.15, 1.35), vHue);
    c = mix(c, vec3(1.3), step(0.82, vHue));
    gl_FragColor = vec4(c * vFade * uWarp, 1.0);
  }
`;

/** Hyperspace streaks for the chapter jumps: one LineSegments draw call,
 *  always drawn (black at rest) so its shader compiles at mount, never mid-jump. */
function Warp({ U }: { U: UniverseCtl }) {
  const ref = useRef<THREE.LineSegments>(null);
  const { geometry, material } = useMemo(() => {
    const COUNT = 1600;
    const seed = new Float32Array(COUNT * 2 * 3);
    const end = new Float32Array(COUNT * 2);
    let s = 7;
    const r = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
    for (let i = 0; i < COUNT; i++) {
      const a = r() * Math.PI * 2;
      const rad = 1.4 + Math.pow(r(), 0.7) * 11;
      const z0 = r() * 96;
      for (let e = 0; e < 2; e++) {
        seed.set([a, rad, z0], (i * 2 + e) * 3);
        end[i * 2 + e] = e;
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(COUNT * 2 * 3), 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 3));
    g.setAttribute('aEnd', new THREE.BufferAttribute(end, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 200);
    const m = new THREE.ShaderMaterial({
      vertexShader: warpVertex,
      fragmentShader: warpFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTravel: { value: 0 }, uWarp: { value: 0 } },
    });
    return { geometry: g, material: m };
  }, []);
  useEffect(() => () => { geometry.dispose(); material.dispose(); }, [geometry, material]);
  useFrame(() => {
    material.uniforms.uWarp.value = U.warp;
    material.uniforms.uTravel.value = U.t * 30;
  });
  return <lineSegments ref={ref} geometry={geometry} material={material} frustumCulled={false} />;
}

function Effects({ U }: { U: UniverseCtl }) {
  // Effects are reached through the composer: the effect wrappers serialize
  // their props, so a ref prop (a circular object under React 19) would throw.
  const composerRef = useRef<{ passes: { effects?: FxEffect[] }[] } | null>(null);
  const fx = useRef<{ bloom?: FxEffect; ca?: FxEffect }>({});
  const offset = useMemo(() => new THREE.Vector2(0, 0), []);
  useFrame(() => {
    if (!fx.current.bloom && composerRef.current) {
      composerRef.current.passes.forEach((p) => p.effects?.forEach((e) => {
        if (e.name === 'BloomEffect') fx.current.bloom = e;
        if (e.name === 'ChromaticAberrationEffect') fx.current.ca = e;
      }));
    }
    if (fx.current.bloom) fx.current.bloom.intensity = U.bloom * (1 + U.beat * 0.22);
    fx.current.ca?.offset?.set(U.aberration * 0.9, U.aberration * 0.45);
  });
  return (
    <EffectComposer ref={composerRef as never} multisampling={0}>
      <Bloom mipmapBlur intensity={U.bloom} luminanceThreshold={0.18} luminanceSmoothing={0.35} radius={0.78} />
      <ChromaticAberration offset={offset} radialModulation={false} modulationOffset={0} />
      <Noise premultiply opacity={0.18} />
      <Vignette offset={0.28} darkness={0.78} />
    </EffectComposer>
  );
}

export function Universe({ U, initial, apiRef }: { U: UniverseCtl; initial: Formation; apiRef: React.MutableRefObject<UniverseApi | null> }) {
  return (
    <Canvas
      camera={{ position: [0, 0, CAM_Z + 3], fov: FOV, near: 0.1, far: 200 }}
      gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
      dpr={1}
      // measure layout size, not the scaled bounding box: the stage is CSS-scaled
      resize={{ offsetSize: true, scroll: false }}
      style={{ position: 'absolute', inset: 0 }}
      onCreated={({ scene }) => { scene.background = new THREE.Color('#03030A'); }}
    >
      <Particles U={U} initial={initial} apiRef={apiRef} />
      <Warp U={U} />
      <Effects U={U} />
    </Canvas>
  );
}
