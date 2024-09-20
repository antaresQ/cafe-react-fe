import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cafes/add')({
  component: AddCafe,
})

export default function AddCafe() {

  return <div>Add Cafe</div>
}
