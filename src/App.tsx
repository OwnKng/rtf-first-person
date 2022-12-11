import { Canvas } from "@react-three/fiber"
import { Physics } from "@react-three/rapier"
import { Suspense } from "react"
import Ground from "./Ground"
import Player from "./Player"
import { KeyboardControls } from "@react-three/drei"
import Block from "./Block"
import Lighting from "./Lighting"
import { Stars } from "@react-three/drei"
import * as THREE from "three"
import Ball from "./Ball"

export default function App() {
  return (
    <>
      <div className='dot' />
      <Canvas shadows>
        <KeyboardControls
          map={[
            { name: "forward", keys: ["ArrowUp", "w", "W"] },
            { name: "backward", keys: ["ArrowDown", "s", "S"] },
            { name: "left", keys: ["ArrowLeft", "a", "A"] },
            { name: "right", keys: ["ArrowRight", "d", "D"] },
            { name: "jump", keys: ["Space"] },
          ]}
        >
          <Suspense>
            <Lighting />
            <Physics>
              <Stars />
              <Player />
              <Ground />
              {new Array(50).fill(0).map((_, i) => (
                <Block
                  key={`box-${i}`}
                  position={[
                    THREE.MathUtils.randInt(-20, 20),
                    1,
                    THREE.MathUtils.randInt(-20, 20),
                  ]}
                />
              ))}
              {new Array(50).fill(0).map((_, i) => (
                <Ball
                  key={`ball-${i}`}
                  position={[
                    THREE.MathUtils.randInt(-20, 20),
                    1,
                    THREE.MathUtils.randInt(-20, 20),
                  ]}
                />
              ))}
            </Physics>
          </Suspense>
        </KeyboardControls>
      </Canvas>
    </>
  )
}
