import React from 'react';
import {useNavigate} from '@tanstack/react-router'
import {Button, Space} from 'antd'

export const cafeLocationColumn = (apiData:any) => {
  const navigate = useNavigate({from: '/employees/$cafeId'})

  let location = apiData.value;
  return (
    <Space>
      <Button onClick={() => navigate({to:`/cafes/${location}`})}>{location}</Button> 
    </Space>
  )
}

export const cafesActionColumn = (apiData:any) => {
  const navigate = useNavigate({from: '/cafes/$location'})

  let cafeId = apiData.value;
  let cafeName = apiData.data.name;
  return (
    <Space>
      <Button onClick={() => navigate({to:`/employees/${cafeName}`})}> Employees  </Button>
      <Button type='primary' onClick={() => navigate({to:`/cafe/${cafeId}`})}>Edit</Button>
      <Button type='primary' data-action="delete" danger>Delete</Button>
    </Space>
  )
}

export const employeesActionColumn = (apiData:any) => {
  const navigate = useNavigate({from: '/employees/$cafeId'})

  let employeeId = apiData.value;
  return (
    <Space>
      <Button type='primary' onClick={() => navigate({to:`/employee/${employeeId}`})}>Edit</Button>
      <Button type='primary' data-action="delete" danger>Delete</Button>
    </Space>
  )
}

