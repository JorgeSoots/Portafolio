import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { Group } from "three";

type Specimen = "core" | "portal" | "crystal";
type Finish = "chrome" | "glass" | "mineral";

type DigitalLabCanvasProps = {
  specimen: Specimen;
  material: Finish;
  isMoving: boolean;
};

function FinishMaterial({ finish, color = "#c6ddd4" }: { finish: Finish; color?: string }) {
  // Keep a single material class for every finish. Swapping between
  // MeshPhysicalMaterial variants avoids tearing down/rebuilding GPU programs.
  // Glass is simulated with layered transparency + reflections instead of
  // transmission, which is considerably more expensive on many GPUs.
  const isGlass = finish === "glass";
  const isMineral = finish === "mineral";

  return (
    <meshPhysicalMaterial
      color={isGlass ? "#9be5d1" : isMineral ? "#829889" : color}
      metalness={isGlass ? 0.12 : isMineral ? 0.48 : 0.9}
      roughness={isGlass ? 0.1 : isMineral ? 0.42 : 0.16}
      transparent={isGlass}
      opacity={isGlass ? 0.38 : 1}
      depthWrite={!isGlass}
      side={isGlass ? THREE.DoubleSide : THREE.FrontSide}
      flatShading={isMineral}
      clearcoat={1}
      clearcoatRoughness={isGlass ? 0.045 : isMineral ? 0.24 : 0.055}
      iridescence={isGlass ? 0.12 : isMineral ? 0.04 : 0.28}
      iridescenceIOR={1.24}
      ior={1.32}
    />
  );
}

function PortalFrame3D({ finish, scale = 1, z = 0 }: { finish: Finish; scale?: number; z?: number }) {
  return (
    <group position={[0, 0, z]} scale={scale}>
      <mesh position={[-0.82, 0, 0]}>
        <boxGeometry args={[0.105, 2.7, 0.18]} />
        <FinishMaterial finish={finish} color="#a9c9bd" />
      </mesh>
      <mesh position={[0.82, 0, 0]}>
        <boxGeometry args={[0.105, 2.7, 0.18]} />
        <FinishMaterial finish={finish} color="#d5e4dc" />
      </mesh>
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[1.72, 0.105, 0.18]} />
        <FinishMaterial finish={finish} color="#c8ddd4" />
      </mesh>
      <mesh position={[0, -1.3, 0]}>
        <boxGeometry args={[1.72, 0.105, 0.18]} />
        <FinishMaterial finish={finish} color="#789e90" />
      </mesh>
      <mesh position={[-0.74, 0, 0.105]}>
        <boxGeometry args={[0.018, 2.42, 0.018]} />
        <meshBasicMaterial color="#83ebd0" toneMapped={false} />
      </mesh>
      <mesh position={[0.74, 0, 0.105]}>
        <boxGeometry args={[0.012, 2.42, 0.018]} />
        <meshBasicMaterial color="#b9d8cc" toneMapped={false} />
      </mesh>
    </group>
  );
}

function SpecimenGeometry({ specimen, finish }: { specimen: Specimen; finish: Finish }) {
  if (specimen === "portal") {
    return (
      <group>
        <PortalFrame3D finish={finish} scale={1} z={0} />
        <PortalFrame3D finish={finish} scale={0.72} z={-0.36} />
        <mesh rotation={[Math.PI / 2, 0.18, 0.18]} scale={[0.9, 1.25, 0.8]}>
          <torusGeometry args={[0.78, 0.035, 12, 100]} />
          <meshStandardMaterial color="#76dfc3" metalness={0.6} roughness={0.2} emissive="#1a6c58" emissiveIntensity={0.45} />
        </mesh>
        <mesh position={[0, 0, -0.62]} scale={[0.56, 0.82, 0.12]}>
          <boxGeometry args={[1, 1, 0.08]} />
          <meshBasicMaterial color="#194a3d" transparent opacity={0.36} side={THREE.DoubleSide} />
        </mesh>
      </group>
    );
  }

  if (specimen === "crystal") {
    return (
      <group>
        <mesh rotation={[0.22, 0.36, -0.12]}>
          <icosahedronGeometry args={[1.02, 1]} />
          <FinishMaterial finish={finish} color="#b9dcd0" />
        </mesh>
        <mesh position={[0.8, 0.36, 0.22]} rotation={[0.4, 0.2, 0.8]} scale={0.32}>
          <octahedronGeometry args={[1, 0]} />
          <FinishMaterial finish={finish} color="#d8eee5" />
        </mesh>
        <mesh position={[-0.75, -0.45, 0.35]} rotation={[-0.2, 0.52, 0.12]} scale={0.22}>
          <dodecahedronGeometry args={[1, 0]} />
          <FinishMaterial finish={finish} color="#78cdb4" />
        </mesh>
        <mesh position={[0.08, -0.92, -0.24]} rotation={[0.2, 0.4, 0.12]} scale={0.17}>
          <octahedronGeometry args={[1, 0]} />
          <FinishMaterial finish={finish} color="#9fc8b8" />
        </mesh>
      </group>
    );
  }

  return (
    <group>
      <mesh scale={1.08} rotation={[0.12, 0.12, -0.08]}>
        <torusKnotGeometry args={[0.76, 0.22, 144, 20, 2, 3]} />
        <FinishMaterial finish={finish} color="#d2e2da" />
      </mesh>
      <mesh rotation={[0.55, 0.2, 0.12]} scale={0.47}>
        <icosahedronGeometry args={[1, 1]} />
        <FinishMaterial finish={finish} color="#6eb9a4" />
      </mesh>
    </group>
  );
}

function LabObject({ specimen, finish, isMoving }: { specimen: Specimen; finish: Finish; isMoving: boolean }) {
  const object = useRef<Group>(null);
  const orbit = useRef<Group>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    if (object.current) {
      const idleRotation = isMoving ? time * 0.105 : 0;
      object.current.rotation.y = THREE.MathUtils.damp(object.current.rotation.y, idleRotation + pointer.x * 0.28, 2, delta);
      object.current.rotation.x = THREE.MathUtils.damp(object.current.rotation.x, pointer.y * 0.2 + (isMoving ? Math.sin(time * 0.34) * 0.035 : 0), 2, delta);
      object.current.rotation.z = THREE.MathUtils.damp(object.current.rotation.z, -pointer.x * 0.08, 2, delta);
      object.current.position.y = THREE.MathUtils.damp(object.current.position.y, isMoving ? Math.sin(time * 0.7) * 0.075 : 0, 2, delta);
    }
    if (orbit.current) {
      orbit.current.rotation.z = THREE.MathUtils.damp(orbit.current.rotation.z, isMoving ? time * 0.055 : 0, 1.8, delta);
      orbit.current.rotation.x = THREE.MathUtils.damp(orbit.current.rotation.x, 0.82 + pointer.y * 0.12, 1.8, delta);
    }
  });

  return (
    <group>
      <group ref={object}>
        <SpecimenGeometry key={specimen} specimen={specimen} finish={finish} />
      </group>

      <group ref={orbit}>
        <mesh rotation={[1.12, 0.16, 0.28]}>
          <torusGeometry args={[1.48, 0.014, 8, 160]} />
          <meshStandardMaterial color="#8be8d0" metalness={0.55} roughness={0.2} emissive="#1c6b58" emissiveIntensity={0.5} />
        </mesh>
        <mesh rotation={[0.25, 1.08, 0.68]}>
          <torusGeometry args={[1.67, 0.009, 8, 160]} />
          <meshStandardMaterial color="#d3e4dc" metalness={0.92} roughness={0.18} />
        </mesh>
      </group>

      <mesh position={[1.43, 0.72, -0.25]} rotation={[0.18, 0.4, 0.2]} scale={0.14}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial color="#c5f0e2" metalness={0.45} roughness={0.12} clearcoat={1} />
      </mesh>
      <mesh position={[-1.44, -0.65, -0.28]} rotation={[0.3, 0.18, 0.7]} scale={0.105}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#65d3b8" metalness={0.7} roughness={0.22} />
      </mesh>
    </group>
  );
}

function ContextLossWatcher({ onContextLost }: { onContextLost?: () => void }) {
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    const canvas = gl.domElement;
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      onContextLost?.();
    };
    canvas.addEventListener("webglcontextlost", handleContextLost, { passive: false });
    return () => canvas.removeEventListener("webglcontextlost", handleContextLost);
  }, [gl, onContextLost]);

  return null;
}

export default function DigitalLabCanvas({ specimen, material, isMoving, onContextLost }: DigitalLabCanvasProps & { onContextLost?: () => void }) {
  return (
    <Canvas
      dpr={[1, 1.08]}
      frameloop={isMoving ? "always" : "demand"}
      camera={{ position: [0, 0, 5.2], fov: 39 }}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power", toneMapping: THREE.ACESFilmicToneMapping }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color("#07120f"), 0);
        gl.toneMappingExposure = 1.08;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <fog attach="fog" args={["#07120f", 6.5, 12]} />
      <ambientLight intensity={0.58} />
      <hemisphereLight args={["#e1fff4", "#10221d", 1.15]} />
      <directionalLight position={[3.2, 4.2, 4.5]} intensity={2.35} color="#f2fff9" />
      <directionalLight position={[-3.8, 0.8, -1.5]} intensity={1.65} color="#65d9c0" />
      <pointLight position={[2.3, -1.8, 1.2]} intensity={12} distance={7} decay={2} color="#a3f0d9" />
      <Environment resolution={32}>
        <Lightformer form="rect" intensity={2.1} position={[0, 4, 1]} scale={[4.5, 1.5, 1]} />
        <Lightformer form="rect" intensity={1.25} position={[-4, 0.8, -1]} rotation-y={Math.PI / 3} scale={[2, 3, 1]} color="#5ed2b6" />
        <Lightformer form="rect" intensity={1.35} position={[4, -0.7, 1]} rotation-y={-Math.PI / 3} scale={[2, 3, 1]} color="#dcece4" />
      </Environment>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.64, -0.5]}>
        <circleGeometry args={[2.18, 96]} />
        <meshPhysicalMaterial color="#18382e" metalness={0.7} roughness={0.28} clearcoat={0.55} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.625, -0.5]}>
        <ringGeometry args={[2.08, 2.18, 96]} />
        <meshBasicMaterial color="#72dfc3" transparent opacity={0.55} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      <ContextLossWatcher onContextLost={onContextLost} />
      <LabObject specimen={specimen} finish={material} isMoving={isMoving} />
      <Sparkles count={24} scale={[4.6, 4.2, 3.2]} size={0.9} speed={isMoving ? 0.14 : 0} opacity={0.3} color="#a8f3dc" />
    </Canvas>
  );
}
