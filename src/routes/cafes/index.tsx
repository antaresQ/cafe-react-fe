import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cafes/')({
  component: Cafes,
})

export default function Cafes() {
  return <div>Hello Cafe page</div>
}
