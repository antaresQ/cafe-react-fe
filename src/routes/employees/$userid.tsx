import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/employees/$userid')({
  component: Employee,
})

export default function Employee() {
  const { userid } = Route.useParams()

  if (userid === "unavail")
  {
    redirect({to: '/employees/add'})
  }

  return <div>UserId: {userid}</div>
}
