import { useKeyboardControls } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { RigidBody, CapsuleCollider } from "@react-three/rapier"
import { RigidBodyApi, useRapier } from "@react-three/rapier"
import { useRef } from "react"
import * as THREE from "three"
import * as RAPIER from "@dimforge/rapier3d-compat"
import { useFirstPersonCamera } from "./hooks/useFirstPersonCamera"

const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()

const SPEED = 5

export default function Player() {
  const ref = useRef<RigidBodyApi>(null!)
  const headBobActive = useRef(false)
  const headBobTimer = useRef(0)
  const [, get] = useKeyboardControls()
  const rapier = useRapier()

  const [Camera, camera, setMoving] = useFirstPersonCamera(ref)

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

  useFrame((_, delta) => {
    const { forward, backward, left, right, jump } = get()
    const velocity = ref.current.linvel()

    //_ controls
    frontVector.set(0, 0, Number(backward) - Number(forward))
    sideVector.set(Number(left) - Number(right), 0, 0)

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation)
    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })

    //_ jump
    //* jumping
    const world = rapier.world.raw()
    const ray = new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 })
    const maxToi = 10
    const solid = false
    const hit = world.castRay(ray, maxToi, solid)

    const grounded = hit && hit.collider && Math.abs(hit.toi) < 1.25

    if (jump && grounded) ref.current.setLinvel({ x: 0, y: 5, z: 0 })

    //_ update camera
    if (grounded && (frontVector.length() > 0 || sideVector.length() > 0))
      setMoving()
  })

  return (
    <>
      <Camera />
      <RigidBody
        ref={ref}
        colliders={false}
        mass={1}
        type='dynamic'
        position={[0, 10, 0]}
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider args={[0.75, 0.5]} />
      </RigidBody>
    </>
  )
}
