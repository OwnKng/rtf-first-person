import { useFrame } from "@react-three/fiber"
import { useThree } from "@react-three/fiber"
import React, { useRef } from "react"
import { PointerLockControls } from "@react-three/drei"
import { RigidBodyApi } from "@react-three/rapier"

interface RigidBodyApiRef {
  current: RigidBodyApi
}

export const useFirstPersonCamera = (
  ref: RigidBodyApiRef,
  moveSpeed = 5
): [React.FunctionComponent, THREE.Camera, () => void] => {
  const { camera } = useThree()
  const headBobActive = useRef(false)
  const headBobTimer = useRef(0)

  const updateHeadBob = (delta: number) => {
    if (headBobActive.current) {
      const waveLength = Math.PI
      const nextStep =
        1 + Math.floor(((headBobTimer.current + 0.000001) * 10) / waveLength)
      const nextStepTime = (nextStep * waveLength) / 10
      headBobTimer.current = Math.min(
        headBobTimer.current + delta,
        nextStepTime
      )

      if (headBobTimer.current === nextStepTime) {
        headBobActive.current = false
      }
    }
  }

  const setMoving = () => (headBobActive.current = true)

  useFrame((_, delta) => {
    const cameraPosition = ref.current.translation()
    cameraPosition.y += Math.sin(headBobTimer.current * moveSpeed * 2) * 0.25
    camera.position.lerp(cameraPosition, 0.5)
    updateHeadBob(delta)
  })

  return [PointerLockControls, camera, setMoving]
}
