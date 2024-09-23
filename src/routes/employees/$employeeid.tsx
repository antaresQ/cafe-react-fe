import { createFileRoute, redirect } from '@tanstack/react-router'

import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/employees/$employeeid')({
  component: Employee,
})

export default function Employee() {
  const { employeeid } = Route.useParams()

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['GET_EMPLOYEE'],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/employees?employeeId=${employeeid}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          //body: JSON.stringify()
        },
      )

      return await response.json()
    },
  })

  if (employeeid === 'unavail') {
    redirect({ to: '/employees/add' })
  }

  
  return <div>UserId: {employeeid}</div>
}
