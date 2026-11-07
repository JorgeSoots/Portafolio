import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Component, Suspense, type ReactNode } from "react";
import DigitalCoreModel from "./DigitalCoreModel";
import { Environment, Float, Lightformer, Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { Group, PointLight } from "three";

/**
 * Digital Core scene. Loads the Blender GLB with a procedural fallback while
 * preserving the architectural environment, rain and global lighting.
 */
type PortalFrameProps = {
  position: [number, number, number];
  scale: [number, number, number];
  rotation?: [number, number, number];
  opacity: number;
  tone: string;
};

function PortalFrame({ position, scale, rotation = [0, 0, 0], opacity, tone }: PortalFrameProps) {
  const materialProps = {
    color: tone,
    metalness: 0.82,
    roughness: 0.22,
    transparent: opacity < 0.9,
    opacity,
    depthWrite: opacity > 0.48,
    clearcoat: 0.72,
    clearcoatRoughness: 0.12,
    emissive: tone,
    emissiveIntensity: 0.12,
  };

  return (
    <group position={position} scale={scale} rotation={rotation}>
      <mesh position={[-0.9, 0, 0]}>
        <boxGeometry args={[0.105, 3.12, 0.17]} />
        <meshPhysicalMaterial {...materialProps} />
      </mesh>
      <mesh position={[0.9, 0, 0]}>
        <boxGeometry args={[0.105, 3.12, 0.17]} />
        <meshPhysicalMaterial {...materialProps} />
      </mesh>
      <mesh position={[0, 1.51, 0]}>
        <boxGeometry args={[1.9, 0.105, 0.17]} />
        <meshPhysicalMaterial {...materialProps} />
      </mesh>
      <mesh position={[0, -1.51, 0]}>
        <boxGeometry args={[1.9, 0.105, 0.17]} />
        <meshPhysicalMaterial {...materialProps} />
      </mesh>
      <mesh position={[-0.79, 0, 0.09]}>
        <boxGeometry args={[0.018, 2.76, 0.018]} />
        <meshBasicMaterial color="#9af0d9" transparent opacity={Math.min(opacity + 0.18, 0.82)} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh position={[0.79, 0, 0.09]}>
        <boxGeometry args={[0.012, 2.76, 0.018]} />
        <meshBasicMaterial color="#d2e7de" transparent opacity={Math.min(opacity + 0.1, 0.72)} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}

function ArchitecturalDepth() {
  const slowStructure = useRef<THREE.Group>(null);
  const plinth = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (slowStructure.current) {
      slowStructure.current.rotation.y = THREE.MathUtils.damp(
        slowStructure.current.rotation.y,
        Math.sin(state.clock.elapsedTime * 0.12) * 0.032,
        1.15,
        delta,
      );
      slowStructure.current.position.x = THREE.MathUtils.damp(
        slowStructure.current.position.x,
        Math.sin(state.clock.elapsedTime * 0.09) * 0.055,
        0.85,
        delta,
      );
    }
    if (plinth.current) {
      plinth.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.018;
    }
  });

  return (
    <group>
      <group ref={slowStructure}>
        {/* The closest portal is brighter and thicker; the nested frames recede into fog. */}
        <PortalFrame position={[0.18, 0.08, -3.65]} scale={[1.58, 1.48, 1]} opacity={0.58} tone="#8eb9a8" />
        <PortalFrame position={[0.18, 0.06, -5.15]} scale={[2.02, 1.82, 1]} rotation={[0, 0.025, -0.012]} opacity={0.36} tone="#a8c9bb" />
        <PortalFrame position={[0.18, 0.04, -6.75]} scale={[2.48, 2.15, 1]} rotation={[0, -0.018, 0.01]} opacity={0.22} tone="#6f9e8b" />
        <PortalFrame position={[-2.9, 0.08, -4.9]} scale={[0.76, 1.2, 1]} rotation={[0, 0.18, -0.025]} opacity={0.31} tone="#8db8a6" />
        <PortalFrame position={[3.03, 0.03, -5.15]} scale={[0.86, 1.28, 1]} rotation={[0, -0.16, 0.02]} opacity={0.34} tone="#83ab99" />

        {/* Architectural arcs frame the central object with a brighter metallic rim. */}
        <mesh position={[0.18, 0.05, -4.12]} rotation={[0, 0, -0.055]} scale={[1.34, 1.56, 0.72]}>
          <torusGeometry args={[1.55, 0.032, 8, 160]} />
          <meshStandardMaterial color="#c3ddd1" metalness={0.84} roughness={0.24} transparent opacity={0.43} depthWrite={false} />
        </mesh>
        <mesh position={[0.18, 0.05, -5.82]} rotation={[0, 0, 0.045]} scale={[1.62, 1.82, 0.68]}>
          <torusGeometry args={[1.58, 0.022, 7, 160]} />
          <meshBasicMaterial color="#8de1c9" transparent opacity={0.31} depthWrite={false} toneMapped={false} />
        </mesh>

        {/* Side monoliths now read as solid architectural masses rather than faint silhouettes. */}
        <mesh position={[-3.72, 0.04, -4.55]} rotation={[0.025, 0.13, -0.035]}>
          <boxGeometry args={[0.42, 4.95, 0.62]} />
          <meshPhysicalMaterial color="#365f50" metalness={0.86} roughness={0.26} transparent opacity={0.57} depthWrite={false} />
        </mesh>
        <mesh position={[3.82, 0.08, -4.85]} rotation={[-0.02, -0.12, 0.035]}>
          <boxGeometry args={[0.48, 5.2, 0.68]} />
          <meshPhysicalMaterial color="#456f5e" metalness={0.82} roughness={0.25} transparent opacity={0.5} depthWrite={false} />
        </mesh>
        <mesh position={[-2.45, 2.04, -5.25]} rotation={[0.05, 0.08, -0.12]}>
          <boxGeometry args={[2.2, 0.075, 0.2]} />
          <meshStandardMaterial color="#b5d8c8" metalness={0.86} roughness={0.22} transparent opacity={0.33} depthWrite={false} />
        </mesh>
        <mesh position={[2.45, 2.22, -5.65]} rotation={[-0.04, -0.08, 0.11]}>
          <boxGeometry args={[2.4, 0.075, 0.22]} />
          <meshStandardMaterial color="#8acbb2" metalness={0.8} roughness={0.24} transparent opacity={0.3} depthWrite={false} />
        </mesh>

        {/* Restrained light seams add depth without turning the scene into a neon grid. */}
        <mesh position={[-3.49, 0.04, -4.2]}>
          <boxGeometry args={[0.018, 4.25, 0.018]} />
          <meshBasicMaterial color="#9cf0d8" transparent opacity={0.66} toneMapped={false} />
        </mesh>
        <mesh position={[3.57, 0.08, -4.45]}>
          <boxGeometry args={[0.018, 4.45, 0.018]} />
          <meshBasicMaterial color="#9cf0d8" transparent opacity={0.5} toneMapped={false} />
        </mesh>
      </group>

      {/* Smooth dark reflective floor: no visible grid or cross-lines. */}
      <mesh position={[0, -1.91, -3.15]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 22]} />
        <meshPhysicalMaterial color="#0c1c17" metalness={0.62} roughness={0.24} clearcoat={0.38} clearcoatRoughness={0.25} />
      </mesh>

      {/* A low circular platform anchors the core and gives the floor a readable focal point. */}
      <group ref={plinth} position={[0, -1.78, -0.32]}>
        <mesh>
          <cylinderGeometry args={[2.18, 2.34, 0.13, 96, 1]} />
          <meshPhysicalMaterial color="#18392f" metalness={0.78} roughness={0.24} clearcoat={0.8} clearcoatRoughness={0.16} />
        </mesh>
        <mesh position={[0, 0.071, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.06, 2.17, 96]} />
          <meshBasicMaterial color="#9ce8d2" transparent opacity={0.58} toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.074, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.78, 1.8, 96]} />
          <meshBasicMaterial color="#d0e5db" transparent opacity={0.19} toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

function AtmosphericRain({ count = 150 }: { count?: number }) {
  const rain = useMemo(() => {
    const positions = new Float32Array(count * 2 * 3);
    const speeds = new Float32Array(count);
    const lengths = new Float32Array(count);
    const drift = new Float32Array(count);
    let seed = 47;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let index = 0; index < count; index += 1) {
      const x = (random() - 0.5) * 9.8;
      const y = (random() - 0.5) * 8.6;
      const z = -8.8 + random() * 9.5;
      const length = 0.12 + random() * 0.22;
      const base = index * 6;
      positions[base] = x;
      positions[base + 1] = y;
      positions[base + 2] = z;
      positions[base + 3] = x - 0.035;
      positions[base + 4] = y - length;
      positions[base + 5] = z;
      speeds[index] = 0.72 + random() * 1.45;
      lengths[index] = length;
      drift[index] = -0.035 - random() * 0.09;
    }

    const geometry = new THREE.BufferGeometry();
    const positionAttribute = new THREE.BufferAttribute(positions, 3);
    positionAttribute.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute("position", positionAttribute);
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, -3.8), 16);

    return { geometry, speeds, lengths, drift, count };
  }, [count]);

  useEffect(() => () => rain.geometry.dispose(), [rain]);

  useFrame((_, delta) => {
    const attribute = rain.geometry.getAttribute("position") as THREE.BufferAttribute;
    const positions = attribute.array as Float32Array;
    const step = Math.min(delta, 0.04);

    for (let index = 0; index < rain.count; index += 1) {
      const base = index * 6;
      const fall = rain.speeds[index] * step;
      const sideways = rain.drift[index] * step;
      positions[base + 1] -= fall;
      positions[base + 4] -= fall;
      positions[base] += sideways;
      positions[base + 3] += sideways;

      if (positions[base + 1] < -4.7) {
        const x = (Math.sin(index * 91.7 + rain.speeds[index]) * 0.5) * 9.8;
        const y = 4.1 + (index % 7) * 0.24;
        const z = -8.8 + (index % 19) * 0.5;
        positions[base] = x;
        positions[base + 1] = y;
        positions[base + 2] = z;
        positions[base + 3] = x - 0.035;
        positions[base + 4] = y - rain.lengths[index];
        positions[base + 5] = z;
      }
    }

    attribute.needsUpdate = true;
  });

  return (
    <lineSegments geometry={rain.geometry} frustumCulled={false}>
      <lineBasicMaterial color="#91d9c5" transparent opacity={0.3} depthWrite={false} toneMapped={false} />
    </lineSegments>
  );
}

function CorePlaceholder() {
  const core = useRef<Group>(null);
  const orbit = useRef<Group>(null);
  const keyLight = useRef<PointLight>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const { camera } = useThree();

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        1 - (event.clientY / window.innerHeight) * 2,
      );
    };
    const resetPointer = () => pointer.current.set(0, 0);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", resetPointer);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", resetPointer);
    };
  }, []);

  useFrame((state, delta) => {
    const pointerX = pointer.current.x;
    const pointerY = pointer.current.y;
    const time = state.clock.elapsedTime;

    if (core.current) {
      core.current.rotation.y = THREE.MathUtils.damp(
        core.current.rotation.y,
        time * 0.105 + pointerX * 0.2,
        2.1,
        delta,
      );
      core.current.rotation.x = THREE.MathUtils.damp(
        core.current.rotation.x,
        0.12 + pointerY * 0.14 + Math.sin(time * 0.28) * 0.035,
        2.1,
        delta,
      );
      core.current.rotation.z = THREE.MathUtils.damp(
        core.current.rotation.z,
        -pointerX * 0.09,
        2.1,
        delta,
      );
      core.current.position.x = THREE.MathUtils.damp(core.current.position.x, pointerX * 0.09, 2.4, delta);
      core.current.position.y = THREE.MathUtils.damp(
        core.current.position.y,
        Math.sin(time * 0.45) * 0.075 + pointerY * 0.055,
        2.4,
        delta,
      );
    }

    if (orbit.current) {
      orbit.current.rotation.z -= delta * (0.045 + pointerX * 0.012);
      orbit.current.rotation.x = THREE.MathUtils.damp(
        orbit.current.rotation.x,
        0.7 + pointerY * 0.08 + Math.sin(time * 0.2) * 0.06,
        1.6,
        delta,
      );
    }

    // A restrained camera parallax adds depth without taking control away from the page.
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointerX * 0.15, 1.6, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pointerY * 0.11, 1.6, delta);
    camera.lookAt(0, 0, 0);

    // Moving key light makes the metal highlights respond to the visitor's pointer.
    if (keyLight.current) {
      keyLight.current.position.x = THREE.MathUtils.damp(keyLight.current.position.x, pointerX * 2.4 - 1.4, 2.2, delta);
      keyLight.current.position.y = THREE.MathUtils.damp(keyLight.current.position.y, pointerY * 1.8 + 1.1, 2.2, delta);
    }
  });

  return (
    <group>
      <Float speed={0.7} rotationIntensity={0.08} floatIntensity={0.12}>
        <group ref={core}>
          <mesh castShadow receiveShadow scale={1.12}>
            <torusKnotGeometry args={[0.82, 0.19, 168, 20, 2, 3]} />
            <meshPhysicalMaterial
              color="#c7ddd5"
              metalness={0.64}
              roughness={0.2}
              clearcoat={1}
              clearcoatRoughness={0.1}
              iridescence={0.28}
              iridescenceIOR={1.25}
              emissive="#16483f"
              emissiveIntensity={0.18}
            />
          </mesh>
          <mesh rotation={[0.4, 0.25, 0.1]}>
            <icosahedronGeometry args={[0.54, 1]} />
            <meshPhysicalMaterial
              color="#315e55"
              metalness={0.52}
              roughness={0.18}
              clearcoat={1}
              clearcoatRoughness={0.1}
              iridescence={0.46}
              iridescenceIOR={1.28}
            />
          </mesh>
        </group>
      </Float>

      <group ref={orbit}>
        <mesh rotation={[1.18, 0.18, 0.25]}>
          <torusGeometry args={[1.42, 0.018, 10, 180]} />
          <meshStandardMaterial
            color="#8cebd7"
            metalness={0.48}
            roughness={0.2}
            emissive="#0b594d"
            emissiveIntensity={0.72}
          />
        </mesh>
        <mesh rotation={[0.25, 1.05, 0.78]}>
          <torusGeometry args={[1.62, 0.012, 8, 180]} />
          <meshStandardMaterial color="#dbe8e2" metalness={0.94} roughness={0.2} />
        </mesh>
      </group>

      <mesh position={[1.42, 0.78, -0.5]} rotation={[0.2, 0.5, 0.1]}>
        <octahedronGeometry args={[0.19, 0]} />
        <meshPhysicalMaterial color="#c5ede2" metalness={0.38} roughness={0.1} clearcoat={1} />
      </mesh>
      <mesh position={[-1.45, -0.72, -0.2]} rotation={[0.4, 0.2, 0.7]}>
        <icosahedronGeometry args={[0.14, 0]} />
        <meshStandardMaterial color="#64d7c1" metalness={0.68} roughness={0.22} />
      </mesh>
      <pointLight ref={keyLight} position={[-1.4, 1.1, 2.4]} intensity={26} distance={8} decay={2} color="#8bf1dc" />
    </group>
  );
}

function AmbientParticles() {
  const positions = useMemo(() => {
    const values = new Float32Array(220 * 3);
    let seed = 11;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < 220; i += 1) {
      values[i * 3] = (random() - 0.5) * 5.4;
      values[i * 3 + 1] = (random() - 0.5) * 5.4;
      values[i * 3 + 2] = (random() - 0.5) * 6.4 - 1.5;
    }
    return values;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#9ae9d9"
        size={0.014}
        sizeAttenuation
        transparent
        opacity={0.34}
        depthWrite={false}
      />
    </points>
  );
}

type CoreModelBoundaryProps = {
  fallback: ReactNode;
  children: ReactNode;
};

/** Keeps a missing/corrupt GLB from crashing the entire WebGL canvas. */
class CoreModelErrorBoundary extends Component<CoreModelBoundaryProps, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Digital Core GLB could not be loaded. Showing procedural fallback.", error);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

export default function DigitalCoreCanvas() {
  return (
    <Canvas
      dpr={[1, 1.12]}
      camera={{ position: [0, 0, 5.25], fov: 38 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color("#060b0b"), 0);
        gl.toneMappingExposure = 1.18;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <fog attach="fog" args={["#07100e", 9, 19]} />
      <ambientLight intensity={0.62} />
      <hemisphereLight args={["#d9fff4", "#10201d", 1.15]} />
      <directionalLight position={[3.5, 4.5, 5]} intensity={2.8} color="#f1fff9" />
      <directionalLight position={[-4, 0.8, -1]} intensity={1.5} color="#54d9c0" />
      <pointLight position={[2, -2, -1]} intensity={18} distance={7} decay={2} color="#b6d5cb" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2.2} position={[0, 4, 1]} scale={[5, 2, 1]} />
        <Lightformer form="rect" intensity={1.4} position={[-4, 1, -2]} rotation-y={Math.PI / 3} scale={[3, 4, 1]} color="#66d9c2" />
        <Lightformer form="rect" intensity={1.6} position={[4, -1, 1]} rotation-y={-Math.PI / 3} scale={[2, 4, 1]} color="#d7e7e0" />
      </Environment>
      <ArchitecturalDepth />
      <AtmosphericRain count={150} />
      <CoreModelErrorBoundary fallback={<CorePlaceholder />}>
        <Suspense fallback={<CorePlaceholder />}>
          <DigitalCoreModel />
        </Suspense>
      </CoreModelErrorBoundary>
      <AmbientParticles />
      <Sparkles count={24} scale={[4.8, 4.2, 3]} size={1.05} speed={0.09} opacity={0.28} color="#a9f2e3" />
    </Canvas>
  );
}
