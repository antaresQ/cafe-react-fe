import { queryOptions, useQuery, UseQueryResult } from "@tanstack/react-query";

export const getEmployees = useQuery({
  queryKey: ['GET_EMPLOYEES'],
  queryFn: async () => {
    const response =  await fetch('http://127.0.0.1:8060/api/v1/employees',
    {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json'
      },
      //body: JSON.stringify()
    })

    return await response.json();
  }
})