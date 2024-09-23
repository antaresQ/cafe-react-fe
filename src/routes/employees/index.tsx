import { createFileRoute } from '@tanstack/react-router'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getEmployees } from '../../queries/getEmployees'
import { EmployeeDetailView } from '../../types'

export const Route = createFileRoute('/employees/')({
  component: Employees,
})

export default function Employees() {

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['GET_EMPLOYEES'],
    queryFn: async () => {
      const response =  await fetch('/api/v1/employees',
      {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json'
        }
        //body: JSON.stringify()
      })
  
      return await response.json();
    }
  })

  if(isPending){
    return <span>loadning...</span>
  }
  
  if (error) {
    return <span> Error: {error.message}</span>
  }

  return (
    <div>
      {isFetching && <p>Refetching</p>}
      {
        data.map((employee: EmployeeDetailView) => {
              console.log(employee);
              return <div>
                      <div>Id: {employee.id}</div>
                      <div>Name: {employee.name}</div>
                      <div>Email Address: {employee.email_address}</div>
                      <div>Phone Number: {employee.phone_number}</div>
                      <div>Gender: {employee.gender}</div>
                      <div>Cafe: {employee.cafe}</div>
                      <div>Days Worked: {employee.days_worked}</div>
                    </div>
          }
        )
      }
    </div>
  )

  //return (<div>Hu Employees Index</div>)
}
