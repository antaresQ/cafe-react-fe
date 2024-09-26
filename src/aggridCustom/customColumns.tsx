import React from 'react';
import {useNavigate} from '@tanstack/react-router'
import {Button} from 'antd'

export const employeeActionColumn = (apiData:any) => {
  const navigate = useNavigate({from: '/employees'})

  let employeeId = apiData.value;
  return (
    <div>
      <Button type='primary' onClick={() => navigate({to:`/employee/${employeeId}`})}> Edit  </Button> 
      <Button type='primary' data-action="delete" danger> Delete </Button>
    </div>
  )
}

export const cafeEmployeesColumn = (apiData:any) => {
  const navigate = useNavigate({from: '/cafes'})

  let cafeId = apiData.value;
  return (
    <div>
      <Button onClick={() => navigate({to:`/employees?cafe=${cafeId}`})}> Employees  </Button>
    </div>
  )
}

export const cafeActionColumn = (apiData:any) => {
  const navigate = useNavigate({from: '/cafes'})

  let cafe_Id = apiData.value;
  return (
    <div>
      <Button type='primary' onClick={() => navigate({to:`/cafe/${cafe_Id}`})}> Edit  </Button>
      <Button type='primary' data-action="delete" danger> Delete </Button>
    </div>
  )
}

