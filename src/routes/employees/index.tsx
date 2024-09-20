import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/employees/')({
  component: Employees,
})

export default function Employees() {
  return <div>Hello Employees page</div>
}
