import React from 'react';
import {useNavigate} from '@tanstack/react-router'
import {Button, Space} from 'antd'
import { Cafe, EmployeeCreateUpdate } from '../types';
import toast from 'react-hot-toast';
import { useEmployeeData } from '../queries/employees';
import { useCafeData } from '../queries/cafes';
import {v4 as uuidv4 } from 'uuid'

export const cafeLocationColumn = (apiData:any) => {
  const navigate = useNavigate({from: '/employees/$cafeId'})

  let location = apiData.value;
  return (
    <Space>
      <Button onClick={() => navigate({to:`/cafes/${location}`})}>{location}</Button> 
    </Space>
  )
}

export function cafesActionColumn(apiData:any) {
  const navigate = useNavigate({from: '/cafes/$location'})

  let cafeId = apiData.value;
  let cafeName = apiData.data.name;

  const {mutate:deleteCafe, isError:isDeleteError, error:deleteError }  = useCafeData()

  function cafeDelete() {
    
    const cafe:Cafe = {id: cafeId, name: "ab", description:"ab", location: "ab", logo: " "}
    deleteCafe(cafe)
  
    if (isDeleteError)
    {
      toast.error(`Error Deleting Cafe: ${cafeId}`)
      console.log(deleteError?.message)
    }
    else
    {
      toast.success(`Successfully Deleted CafeId: ${cafeId}`)
    }
    
    if (!isDeleteError) {
      setTimeout(function() {window.location.reload()}, 750);
      //return navigate({to:'/cafes/$location', params:{location: 'null'}});
    }
  }

  return (
    <Space>
      <Button onClick={() => navigate({to:`/employees/${cafeName}`})}> Employees  </Button>
      <Button type='primary' onClick={() => navigate({to:`/cafe/${cafeId}`})}>Edit</Button>
      <Button type='primary' onClick={() => cafeDelete()} danger>Delete</Button>
    </Space>
  )
}

export function employeesActionColumn(apiData:any) {
  const navigate = useNavigate({from: '/employees/$cafeId'})

  let employeeId = apiData.value;

  const {mutate:deleteEmployee, isError:isDeleteError, error:deleteError }  = useEmployeeData()


  function employeeDelete() {
    
    const employee:EmployeeCreateUpdate = {id: employeeId, name: "AB", cafe_id: uuidv4(), gender: "MALE", email_address: "abc@abc.com", phone_number: 80000000}
    deleteEmployee(employee)
  
    if (isDeleteError)
    {
      toast.error(`Error Deleting EmployeeId: ${employeeId}`)
      console.log(deleteError?.message)
    }
    else
    {
      toast.success(`Successfully Deleted EmployeeId: ${employeeId}`)
    }
    
    if (!isDeleteError) {
      setTimeout(function() {window.location.reload()}, 750);
      //return navigate({to:'/employees/$cafeId', params:{cafeId: 'null'}});
    }
  }

  return (
    <Space>
      <Button type='primary' onClick={() => navigate({to:`/employee/${employeeId}`})}>Edit</Button>
      <Button type='primary' data-action="delete" onClick={() => employeeDelete()} danger>Delete</Button>
    </Space>
  )
}

