import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Cafe } from '../../types';

export const Route = createFileRoute('/cafes/')({
  component: Cafes,
})

export default function Cafes() {

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['GET_CAFES'],
    queryFn: async () => {
      const response =  await fetch('/api/v1/cafes',
      {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json'
        }
      })
  
      return await response.json();
    }
  })

  if(isPending){
    return <span>Loading cafes...</span>
  }
  
  if (error) {
    return <span> Error: {error.message}</span>
  }

  return (
    <div>
      {isFetching && <p>Refetching</p>}
      {
        data.map((cafe: Cafe) => {
              return <div key={cafe.id}>
                      <div>Id: {cafe.id}</div>
                      <div>Name: {cafe.name}</div>
                      <div>Descriptiom: {cafe.description}</div>
                      <div>Phone Number: {cafe.logo}</div>
                      <div>Location: {cafe.location}</div>
                    </div>
          }
        )
      }
    </div>
  )
}

