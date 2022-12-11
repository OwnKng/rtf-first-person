export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[20, 20, 0]} castShadow intensity={1} />
    </>
  )
}
