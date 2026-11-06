import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";

const MODEL_URL = "/models/digital-core.glb";

/**
 * Loader for the final Blender export.
 * Keep this component mounted inside DigitalCoreCanvas after digital-core.glb
 * has been copied to public/models. Until then, CorePlaceholder is used.
 */
export default function DigitalCoreModel() {
  const { scene } = useGLTF(MODEL_URL);
  const model = useMemo(() => scene.clone(true), [scene]);

  return <primitive object={model} scale={1} />;
}
