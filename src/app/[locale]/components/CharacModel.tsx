"use client";

import * as THREE from "three";
import React, { useEffect, useRef, type JSX } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import { GLTF } from "three-stdlib";

// --- Componente del Modelo (CharacModel) ---

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
      <group rotation={[-Math.PI / 2, 0, -0.5]} scale={1}>
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

// --- Componente de la Escena Principal ---

export default function YourSceneComponent() {
  // 1. Se crea una referencia para acceder a los controles
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);

  // 2. Función para imprimir el estado de la cámara en la consola
  const logCameraState = () => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      const target = controlsRef.current.target;

      console.log(
        `%cCamera Position:`,
        "color: yellow; font-weight: bold;",
        `[${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(
          2
        )}, ${camera.position.z.toFixed(2)}]`
      );
      console.log(
        `%cControls Target:`,
        "color: cyan; font-weight: bold;",
        `[${target.x.toFixed(2)}, ${target.y.toFixed(2)}, ${target.z.toFixed(
          2
        )}]`
      );
    }
  };

  return (
    <figure
      className="absolute inset-0 mx-auto z-30"
      style={{ width: "90vw", height: "90dvh" }}
    >
      <Canvas
        // Se han ajustado la cámara y el objetivo con nuevos valores para alejar y centrar
        camera={{ position: [-46, -30, -18], near: 0.1, far: 1000 }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <CharacModel position={[0, -50, 0]} />

        {/* Se mantiene el registro en consola para ajustes finos */}
        <OrbitControls
          ref={controlsRef}
          onChange={logCameraState}
          target={[0, -40, 0]}
        />
      </Canvas>
    </figure>
  );
}
