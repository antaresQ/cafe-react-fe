import { useQuery, useMutation } from "@tanstack/react-query";
import { EmployeeCreateUpdate } from "../types";

export function getEmployees(cafe?:string) {

  let api_url = (cafe == undefined || cafe == null) ? '/api/v1/employees' : `/api/v1/employees?cafe=${cafe}`

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

export function useEmployeeData(){
  return useMutation({
    mutationKey: ['MUTATE_EMPLOYEE'],
    mutationFn: async (employee:EmployeeCreateUpdate) => {
      //event.preventDefault();
      const response = await fetch('/api/v1/employee', 
      {
        method: employee.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
      })
      
      return await response.json()
    },
    onSuccess(data, variables, context) {
        
    },
    onError(error, variables, context) {
        console.log('Fetch PUT failed:')
        console.log(error);
    },
  })
  
}