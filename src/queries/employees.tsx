import { useQuery, useMutation } from "@tanstack/react-query";
import { EmployeeCreateUpdate } from "../types";

export function getEmployees(cafe?:string) {

  let api_url = (cafe == undefined || cafe == null) ? '/api/v1/employees' : `/api/v1/employees?cafe=${cafe}`; 

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

export function getEmployee(id?:string) {
  return useQuery({
    queryKey: ['GET_EMPLOYEE'],
    queryFn: async () => {
      const response =  await fetch(`/api/v1/employees?employeeId=${id}`,
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

export function addEmployee(employee:EmployeeCreateUpdate){
  return useMutation({
    mutationKey: ['ADD_EMPLOYEE'],
    mutationFn: async (event:Event) => {
      //event.preventDefault();
      const response = await fetch('/api/v1/employee', 
      {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
      })

      return await response.json()
    }
  })
  
}