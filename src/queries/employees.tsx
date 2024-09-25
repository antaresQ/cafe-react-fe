import { useQuery } from "@tanstack/react-query";

export function getEmployees(id?:string) {

  let isEmployeeId = false;

  if (id != undefined)
  {
    isEmployeeId = id.substring(0, 2).toLowerCase() === 'ui';
  }

  let api_url = (id == undefined) ? '/api/v1/employees' : isEmployeeId ? `/api/v1/employees?employeeId=${id}` : `/api/v1/employees?cafe=${id}`; 

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