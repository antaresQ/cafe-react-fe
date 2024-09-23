import { createFileRoute, redirect } from '@tanstack/react-router'

import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/employees/$employeeid')({
  component: Employee,
})

export default function Employee() {
  const { employeeid } = Route.useParams()

  var isEdit = employeeid.substring(0,2).toLowerCase() === 'ui';

  if (isEdit) {
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

  }
  else {
    //Form empty to add
  }

  
  return (
    <div>
      <div>{isEdit ? 'Edit' : 'Add'} Employee</div>
      {
        isEdit ? <div>UserId: {employeeid}</div> : null
      }
      
    </div>
  )
}
