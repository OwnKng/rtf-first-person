import { RigidBody } from "@react-three/rapier"
import { RigidBodyApi } from "@react-three/rapier/dist/declarations/src/types"
import { useRef } from "react"

const SHOT_POWER = 10

export default function Block({
  position = [0, 0, 0],
}: {
  position?: [number, number, number]
}) {
  const ref = useRef<RigidBodyApi>(null!)

  return (
    <RigidBody ref={ref} colliders='cuboid' position={position}>
      <mesh
        castShadow
        receiveShadow
        onClick={(e) =>
          ref.current.applyImpulseAtPoint(
            e.ray.direction.normalize().multiplyScalar(SHOT_POWER),
            e.point
          )
        }
      >
        <boxGeometry />
        <meshStandardMaterial color='#77B28C' />
      </mesh>
    </RigidBody>
  )
}
