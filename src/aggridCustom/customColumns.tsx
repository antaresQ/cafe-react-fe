import React from 'react';
import {useNavigate} from '@tanstack/react-router'

export const employeeActionColumn = (apiData:any) => {
  const navigate = useNavigate({from: '/employees'})

  let employeeId = apiData.value;
  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"  onClick={() => navigate({to:`/employees/${employeeId}`})}> Edit  </button> 
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4" data-action="delete" > Delete </button>
    </div>
  )
}

export const cafeEmployeesColumn = (apiData:any) => {
  const navigate = useNavigate({from: '/cafes'})

  let cafeId = apiData.value;
  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"  onClick={() => navigate({to:`/employees?cafe=${cafeId}`})}> Employees  </button>
    </div>
  )
}

export const cafeActionColumn = (apiData:any) => {
  const navigate = useNavigate({from: '/cafes'})

  let employeeId = apiData.value;
  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"  onClick={() => navigate({to:`/cafes/${employeeId}`})}> Edit  </button>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4" data-action="delete" > Delete </button>
    </div>
  )
}

