import React from 'react';
import {useNavigate} from '@tanstack/react-router'
import {Button} from 'antd'

export const cafeLocationColumn = (apiData:any) => {
  const navigate = useNavigate({from: '/employees/$cafeId'})

  let location = apiData.value;
  return (
    <div>
      <Button onClick={() => navigate({to:`/cafes/${location}`})}>{location}</Button> 
    </div>
  )
}

export const cafesActionColumn = (apiData:any) => {
  const navigate = useNavigate({from: '/cafes/$location'})

  let cafeId = apiData.value;
  return (
    <div>
      <Button onClick={() => navigate({to:`/employees/${cafeId}`})}> Employees  </Button>
      <Button type='primary' onClick={() => navigate({to:`/cafe/${cafeId}`})}>Edit</Button>
      <Button type='primary' data-action="delete" danger>Delete</Button>
    </div>
  )
}

export const employeesActionColumn = (apiData:any) => {
  const navigate = useNavigate({from: '/employees/$cafeId'})

  let employeeId = apiData.value;
  return (
    <div>
      <Button type='primary' onClick={() => navigate({to:`/employee/${employeeId}`})}>Edit</Button>
      <Button type='primary' data-action="delete" danger>Delete</Button>
    </div>
  )
}

