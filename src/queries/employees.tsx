import { useQuery } from "@tanstack/react-query";

export function getEmployees(id?:string) {

  let api_url = (id != undefined && id?.length > 0) ? `/api/v1/employees/${id}` : '/api/v1/employees';

  return useQuery({
    queryKey: ['GET_EMPLOYEES'],
    queryFn: async () => {
      const response =  await fetch(api_url,
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
}