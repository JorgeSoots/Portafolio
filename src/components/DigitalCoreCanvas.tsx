import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { Group } from "three";

/**
 * Temporary procedural scene for Digital Core.
 * Once the Blender model is ready, replace CorePlaceholder with a GLB model
 * loaded through useGLTF. The Canvas and lighting setup can remain.
 */
function CorePlaceholder() {
  const core = useRef<Group>(null);
  const orbit = useRef<Group>(null);

  useFrame((state, delta) => {
    if (core.current) {
      core.current.rotation.y += delta * 0.12;
      core.current.rotation.x = 0.12 + Math.sin(state.clock.elapsedTime * 0.28) * 0.07;
      core.current.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.08;
    }
    if (orbit.current) {
      orbit.current.rotation.z -= delta * 0.055;
      orbit.current.rotation.x = 0.7 + Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
    }
  });

  return (
    <group>
      <Float speed={0.7} rotationIntensity={0.08} floatIntensity={0.12}>
        <group ref={core}>
          <mesh castShadow receiveShadow>
            <torusKnotGeometry args={[0.78, 0.2, 180, 22, 2, 3]} />
            <meshPhysicalMaterial
              color="#9dbeb5"
              metalness={0.82}
              roughness={0.2}
              clearcoat={0.9}
              clearcoatRoughness={0.16}
            />
          </mesh>
          <mesh rotation={[0.4, 0.25, 0.1]}>
            <icosahedronGeometry args={[0.54, 1]} />
            <meshPhysicalMaterial
              color="#163b36"
              metalness={0.72}
              roughness={0.22}
              clearcoat={1}
              wireframe={false}
            />
          </mesh>
        </group>
      </Float>

      <group ref={orbit}>
        <mesh rotation={[1.18, 0.18, 0.25]}>
          <torusGeometry args={[1.42, 0.018, 10, 180]} />
          <meshStandardMaterial
            color="#65dec8"
            metalness={0.72}
            roughness={0.28}
            emissive="#0b594d"
            emissiveIntensity={0.55}
          />
        </mesh>
        <mesh rotation={[0.25, 1.05, 0.78]}>
          <torusGeometry args={[1.62, 0.012, 8, 180]} />
          <meshStandardMaterial color="#d1ded9" metalness={0.92} roughness={0.24} />
        </mesh>
      </group>

      <mesh position={[1.42, 0.78, -0.5]} rotation={[0.2, 0.5, 0.1]}>
        <octahedronGeometry args={[0.19, 0]} />
        <meshPhysicalMaterial color="#b4e5da" metalness={0.35} roughness={0.12} clearcoat={1} />
      </mesh>
      <mesh position={[-1.45, -0.72, -0.2]} rotation={[0.4, 0.2, 0.7]}>
        <icosahedronGeometry args={[0.14, 0]} />
        <meshStandardMaterial color="#64d7c1" metalness={0.65} roughness={0.25} />
      </mesh>
    </group>
  );
}

function AmbientParticles() {
  const positions = useMemo(() => {
    const values = new Float32Array(180 * 3);
    let seed = 11;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < 180; i += 1) {
      values[i * 3] = (random() - 0.5) * 5.4;
      values[i * 3 + 1] = (random() - 0.5) * 4.8;
      values[i * 3 + 2] = (random() - 0.5) * 3.8 - 0.8;
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
        opacity={0.52}
        depthWrite={false}
      />
    </points>
  );
}

export default function DigitalCoreCanvas() {
  return (
    <Canvas
      dpr={[1, 1.35]}
      camera={{ position: [0, 0, 5.6], fov: 38 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color("#060b0b"), 0);
      }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} color="#e1fff7" />
      <pointLight position={[-3, 1.5, 2]} intensity={24} distance={8} color="#51d9c0" />
      <pointLight position={[2, -2, -1]} intensity={15} distance={7} color="#9ebbb4" />
      <CorePlaceholder />
      <AmbientParticles />
      <Sparkles count={32} scale={[4.8, 4.2, 3]} size={1.3} speed={0.12} opacity={0.38} color="#8de7d7" />
    </Canvas>
  );
}
