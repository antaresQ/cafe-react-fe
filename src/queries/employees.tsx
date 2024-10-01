import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { EmployeeCreateUpdate } from "../types";
import { useState } from "react";
import default_headers from "./default_headers";

//for production urls to be prefix with import.meta.env.VITE_API_BASE_URL


export function getEmployees(cafe?:string) {

  let api_url = (cafe == undefined || cafe == null || cafe === 'null') ? 
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/employees` : 
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/employees?cafe=${cafe}`

  return useQuery({
    queryKey: ['GET_EMPLOYEES', cafe],
    queryFn: async () => {
      const response =  await fetch(api_url,
      {
        method: 'GET',
        mode: 'cors',
        headers: default_headers()
      })

      return await response.json();
    }
  })
}

export function getEmployee(id:string) {
  return useQuery({
    queryKey: ['GET_EMPLOYEE', id],
    queryFn: async () => {
      const response =  await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/employee?employeeId=${id}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: default_headers()
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

      let url = `${import.meta.env.VITE_API_BASE_URL}/api/v1/employee`
      if (employee.name.length < 6 ) {url += `?employeeId=${employee.id}`}

      let http_method = (!(employee.id) || employee.id?.length == 0) ? 'POST' : employee.name.length < 6 ? 'DELETE' : 'PUT'

      const response = await fetch(url, 
      {
        method: http_method,
        mode: 'cors',
        headers:  default_headers(),
        body: http_method != 'DELETE' ? JSON.stringify(employee) : null
      })
      
      return await response.text()   
    },
    onSuccess(data, variables, context) {
      return data
    },
    onError(error, variables, context) {
      return error
    },
  })
  
}