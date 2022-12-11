import { RigidBody } from "@react-three/rapier"
import { MeshProps } from "@react-three/fiber"

const WIDTH = 40
const HEIGHT = 40
const BORDER_HEIGHT = 10

interface WallProps extends MeshProps {
  position: [number, number, number]
  width: number
  height: number
}

const Wall = ({ position, width, height, ...props }: WallProps) => {
  return (
    <mesh position={position} {...props} receiveShadow castShadow>
      <boxGeometry args={[width, height, 0.1]} />
      <meshStandardMaterial color='#0B1E31' />
    </mesh>
  )
}

const Walls = () => (
  <RigidBody type='fixed'>
    <Wall
      position={[0, 0, HEIGHT * 0.5]}
      width={WIDTH}
      height={BORDER_HEIGHT}
    />
    <Wall
      position={[0, 0, -HEIGHT * 0.5]}
      width={WIDTH}
      height={BORDER_HEIGHT}
    />
    <Wall position={[0, 0, 0]} width={10} height={5} />
    <Wall
      position={[0, 0, 0]}
      width={10}
      height={5}
      rotation={[0, -Math.PI * 0.5, 0]}
    />
    <Wall
      position={[-HEIGHT * 0.5, 0, 0]}
      width={WIDTH}
      height={BORDER_HEIGHT}
      rotation={[0, -Math.PI * 0.5, 0]}
    />
    <Wall
      position={[HEIGHT * 0.5, 0, 0]}
      width={WIDTH}
      height={BORDER_HEIGHT}
      rotation={[0, -Math.PI * 0.5, 0]}
    />
  </RigidBody>
)

export default function Ground() {
  return (
    <RigidBody type='fixed'>
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} receiveShadow>
        <boxGeometry args={[WIDTH, HEIGHT, 0.1]} />
        <meshStandardMaterial color='#0B1E31' />
      </mesh>
      <Walls />
    </RigidBody>
  )
}
