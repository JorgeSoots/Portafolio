import { useEffect, useMemo, useRef } from "react";
import { Float, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const MODEL_URL = "/models/digital_core.glb";
const TARGET_MAX_DIMENSION = 2.72;

/**
 * Loads the Blender Digital Core model. The model is automatically centered and
 * normalized to a predictable size so Blender scene units do not dictate the
 * composition of the portfolio. Original GLB materials are preserved.
 */
export default function DigitalCoreModel() {
  const { scene } = useGLTF(MODEL_URL);
  const group = useRef<THREE.Group>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const { camera } = useThree();

  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.updateMatrixWorld(true);

    const initialBounds = new THREE.Box3().setFromObject(clone);
    if (!initialBounds.isEmpty()) {
      const size = initialBounds.getSize(new THREE.Vector3());
      const largestDimension = Math.max(size.x, size.y, size.z);

      if (Number.isFinite(largestDimension) && largestDimension > 0) {
        clone.scale.setScalar(TARGET_MAX_DIMENSION / largestDimension);
      }

      clone.updateMatrixWorld(true);
      const normalizedBounds = new THREE.Box3().setFromObject(clone);
      const center = normalizedBounds.getCenter(new THREE.Vector3());
      clone.position.sub(center);
    }

    clone.traverse((object) => {
      if ((object as THREE.Mesh).isMesh) {
        const mesh = object as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        mesh.frustumCulled = true;
      }
    });

    return clone;
  }, [scene]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.set(
        (event.clientX / Math.max(window.innerWidth, 1)) * 2 - 1,
        1 - (event.clientY / Math.max(window.innerHeight, 1)) * 2,
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
    if (!group.current) return;

    const x = pointer.current.x;
    const y = pointer.current.y;
    const time = state.clock.elapsedTime;

    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      time * 0.075 + x * 0.16,
      1.55,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      y * 0.11 + Math.sin(time * 0.23) * 0.025,
      1.55,
      delta,
    );
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, -x * 0.045, 1.55, delta);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, x * 0.065, 1.8, delta);
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      Math.sin(time * 0.42) * 0.055 + y * 0.035,
      1.8,
      delta,
    );

    // Keep the camera parallax understated so the model never competes with text.
    camera.position.x = THREE.MathUtils.damp(camera.position.x, x * 0.105, 1.25, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, y * 0.075, 1.25, delta);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <Float speed={0.58} rotationIntensity={0.035} floatIntensity={0.075}>
        <primitive object={model} />
      </Float>

      {/* Restrained orbit accents preserve the composition around the imported sculpture. */}
      <mesh rotation={[1.18, 0.18, 0.25]}>
        <torusGeometry args={[1.58, 0.012, 8, 144]} />
        <meshStandardMaterial color="#8cebd7" metalness={0.55} roughness={0.2} emissive="#0b594d" emissiveIntensity={0.42} />
      </mesh>
      <mesh rotation={[0.25, 1.05, 0.78]}>
        <torusGeometry args={[1.72, 0.009, 8, 144]} />
        <meshStandardMaterial color="#dbe8e2" metalness={0.9} roughness={0.24} />
      </mesh>
      <mesh position={[1.52, 0.83, -0.48]} rotation={[0.2, 0.5, 0.1]}>
        <octahedronGeometry args={[0.12, 0]} />
        <meshPhysicalMaterial color="#c5ede2" metalness={0.38} roughness={0.13} clearcoat={0.85} />
      </mesh>
      <mesh position={[-1.58, -0.78, -0.28]} rotation={[0.4, 0.2, 0.7]}>
        <icosahedronGeometry args={[0.095, 0]} />
        <meshStandardMaterial color="#64d7c1" metalness={0.68} roughness={0.25} />
      </mesh>
    </group>
  );
}

