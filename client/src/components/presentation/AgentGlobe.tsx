/**
 * AgentGlobe - a slowly rotating 3D network sphere (three.js via
 * react-three-fiber): glowing nodes connected by faint arcs, the visual
 * signature of an agent network. Rendered behind the presenter's portrait on
 * the closing slide: the human in front of the network.
 *
 * Skipped entirely under reduced motion or lightweight quality.
 */
import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePresentationStore } from '../../store/presentationStore';

const NODE_COUNT = 220;
const RADIUS = 1.35;
const LINK_DISTANCE = 0.52;

function buildGeometry() {
  // Fibonacci sphere: evenly distributed nodes
  const positions = new Float32Array(NODE_COUNT * 3);
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const p = new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(RADIUS);
    pts.push(p);
    positions.set([p.x, p.y, p.z], i * 3);
  }
  // Links between close neighbors
  const linkPositions: number[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      if (pts[i].distanceTo(pts[j]) < LINK_DISTANCE) {
        linkPositions.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
      }
    }
  }
  return { positions, linkPositions: new Float32Array(linkPositions) };
}

function NetworkSphere() {
  const group = useRef<THREE.Group>(null);
  const { positions, linkPositions } = useMemo(buildGeometry, []);

  const pointsGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  const linesGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(linkPositions, 3));
    return g;
  }, [linkPositions]);

  useFrame((state, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.07;
    group.current.rotation.x = 0.25 + Math.sin(state.clock.elapsedTime * 0.12) * 0.06;
  });

  return (
    <group ref={group}>
      <points geometry={pointsGeo}>
        <pointsMaterial color="#A5B4FC" size={0.028} transparent opacity={0.9} sizeAttenuation depthWrite={false} />
      </points>
      <lineSegments geometry={linesGeo}>
        <lineBasicMaterial color="#22D3EE" transparent opacity={0.16} depthWrite={false} />
      </lineSegments>
      {/* Inner glow core */}
      <mesh>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshBasicMaterial color="#6366F1" transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

export function AgentGlobe({ style }: { style?: React.CSSProperties }) {
  const { isReducedMotion, qualityLevel } = usePresentationStore();
  if (isReducedMotion || qualityLevel === 'lightweight') return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 3.4], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', ...style }}
    >
      <NetworkSphere />
    </Canvas>
  );
}
