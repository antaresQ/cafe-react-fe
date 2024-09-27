import React, { useEffect, useState } from 'react'
import { createFileRoute, useParams, useNavigate } from '@tanstack/react-router'
import {EmployeeDetailViewTable} from '../../types'
import { Button, Col, Input, Space, Table, Tag } from 'antd'
import {CloseOutlined } from '@ant-design/icons'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { employeeActionColumn } from '../../aggridCustom/customColumns'
import { getEmployees } from '../../queries/employees'

const EmployeeDetailViewColDef = [
  { field: 'id' },
  { field: 'name' },
  { field: 'gender' },
  { field: 'email_Address', headerName: 'Email Address' },
  { field: 'phone_Number', headerName: 'Phone Number' },
  { field: 'cafe' },
  { field: 'days_Worked', headerName: 'Days Worked' },
  { field: 'start_Date', headerName: 'Start Date', hide: true },
  {
    field: 'action',
    headerName: 'Actions',
    cellRenderer: employeeActionColumn,
  },
]

export const Route = createFileRoute('/employees/$cafeId')({
  component: EmployeesCafeComponent
})

export default function EmployeesCafeComponent() {
  // const { isPending, error, employees, isFetching } = cafe
  //   ? getEmployees(cafe)
  //   : getEmployees()

  const {cafeId} = Route.useParams()
  const navigate = useNavigate({from: '/'})
  const nullCafe = 'null';

  const { isPending, error, data: employees, isFetching } = getEmployees(cafeId)

  const toAllEmployeesPage = () =>{
    return navigate({to:'/employees/$cafeId', params:{cafeId: 'null'}});
  }

  if (isPending) {
    return <span>Loading Employees...</span>
  }

  if (error) {
    return <span> Error: {error.message}</span>
  }

  if (employees) {
    employees.map((emp: EmployeeDetailViewTable) => {
      emp.action = emp.id
    })

    // employees.array.forEach((emp:EmployeeDetailViewTable) => {
    //   emp.action = emp.id
    // });

    return (
      <div>
        Employees
        <br />
        {(cafeId == null || cafeId === 'null') ? null : <Button icon={<CloseOutlined onClick={toAllEmployeesPage} />} type='primary' iconPosition='end'>{cafeId}</Button>}
        <br />
        {isFetching && <p>Refetching</p>}
        {
          <div className="ag-theme-quartz" style={{ height: 500 }}>
            <AgGridReact rowData={employees} columnDefs={EmployeeDetailViewColDef} />
          </div>
        }
      </div>
    )
  }
}
