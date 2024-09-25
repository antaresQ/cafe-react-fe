import React from 'react';
import { createFileRoute, useParams } from '@tanstack/react-router'
import { EmployeeDetail, EmployeeDetailView, EmployeeDetailViewTable} from '../../types'
import { Col, Input, Space, Table, Tag }from 'antd';
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { employeeActionColumn } from '../../aggridCustom/customColumns'
import { getEmployees } from '../../queries/employees';

const EmployeeDetailViewColDef = [
  {field: "id"},
  {field: "name"},
  {field: "gender"},
  {field: "email_Address", headerName: "Email Address"},
  {field: "phone_Number", headerName: "Phone Number"},
  {field: "cafe"},
  {field: "days_Worked", headerName: "Days Worked"},
  {field: "start_Date", headerName: "Start Date", hide: true},
  {field: 'action', headerName: 'Actions', cellRenderer: employeeActionColumn}
]

export const Route = createFileRoute('/employees/')({
  component: Employees
})


export default function Employees() {

  const { isPending, error, data, isFetching } = getEmployees()

  if(isPending){
    return <span>Loading Employees...</span>
  }
  
  if (error) {
    return <span> Error: {error.message}</span>
  }

  if(data)
  {
    data.map((emp: EmployeeDetailViewTable) => {
      emp.action = emp.id
    })

    return (
      <div>
        Employees
        <Input placeholder="Cafe Name or Cafe Id" />
        <br/>
        {isFetching && <p>Refetching</p>}
        {
  
          <div className='ag-theme-quartz' style={{height:500}}>
            <AgGridReact
              rowData={data}
              columnDefs={EmployeeDetailViewColDef}
            />
          </div>
        }
      </div>
    )
  }
  
}
