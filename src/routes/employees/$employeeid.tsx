import { createFileRoute, redirect } from '@tanstack/react-router'

import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/employees/$employeeid')({
  component: Employee,
})

export default function Employee() {
  const { employeeid } = Route.useParams()

  var isEmployeeId = employeeid.substring(0, 2).toLowerCase() === 'ui'

  if (isEmployeeId) {
    //Form with Values

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
  } else {
    //Form empty to add
  }

  return (
    <div>
      <div>{isEmployeeId ? 'Edit' : 'Add'} Employee</div>
      {isEmployeeId ? <div>UserId: {employeeid}</div> : null}
    </div>
  )
}
