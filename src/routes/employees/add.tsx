import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/employees/add')({
  component: AddEmployee,
})

export default function AddEmployee() {

  return <div>Add Employee </div>
}
