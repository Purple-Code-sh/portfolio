"use client";

import * as THREE from "three";
import React, { useEffect, useRef, type JSX } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    ["Object080_08_-_Default_0"]: THREE.Mesh;
  };
  materials: {
    ["08_-_Default"]: THREE.MeshStandardMaterial;
  };
  animations: THREE.AnimationClip[];
};

function CharacModel(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/charac.glb"
  ) as unknown as GLTFResult;
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    if (animations.length > 0) {
      actions[animations[0].name]?.play();
    }
  }, [actions, animations]);

  return (
    <group {...props} ref={group} dispose={null}>
      <group
        rotation={[-Math.PI / 2, 0, -0.5]}
        // Escala final ajustada
        scale={0.8}
      >
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes["Object080_08_-_Default_0"].geometry}
            material={materials["08_-_Default"]}
            position={[-24.139, 24.624, -3.52]}
            rotation={[0, -0.262, 0]}
            scale={0.138}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/charac.glb");

// --- Componente de la Escena Principal (Versión Final) ---

export default function YourSceneComponent() {
  return (
    <figure
      className="absolute inset-0 mx-auto z-30"
      style={{ width: "90vw", height: "90dvh" }}
    >
      <Canvas
        // Se establecen los valores finales de la cámara
        camera={{ position: [-33, -40, 42], near: 0.1, far: 1000 }}
      >
        <ambientLight intensity={1.5} color={"#d5e6da"} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Se establece la posición final del modelo */}
        <CharacModel position={[10, -70, 40]} />

        {/* Se establece el objetivo final y se eliminan los logs */}
        <OrbitControls target={[0, -40, 0]} enabled={false} />
      </Canvas>
    </figure>
  );
}
