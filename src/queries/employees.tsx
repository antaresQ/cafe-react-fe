import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { EmployeeCreateUpdate } from "../types";
import { useState } from "react";

const queryClient = new QueryClient({defaultOptions: {queries: {staleTime: 0}}});

export function getEmployees(cafe?:string) {

  let api_url = (cafe == undefined || cafe == null || cafe === 'null') ? '/api/v1/employees' : `/api/v1/employees?cafe=${cafe}`

  return useQuery({
    queryKey: ['GET_EMPLOYEES', cafe],
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

export function getEmployee(id:string) {
  return useQuery({
    queryKey: ['GET_EMPLOYEE', id],
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

      let url = '/api/v1/employee'
      if (employee.name.length < 6 ) {url += `?employeId=${employee.id}`}

      let http_method = (!(employee.id) || employee.id?.length == 0) ? 'POST' : employee.name.length < 6 ? 'DELETE' : 'PUT'

      const response = await fetch(url, 
      {
        method: http_method,
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