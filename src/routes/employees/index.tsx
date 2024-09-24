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
  {field: 'employees', headerName: 'Employees'},
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
        
        <Input placeholder="Cafe Name or Cafe Id" />
        <br/>
        {isFetching && <p>Refetching</p>}
        {
        /* {
            <Table dataSource={data}>
              <Column title="Id" dataIndex="id" key="id" />
              <Column title="Name" dataIndex="name" key="name" />
              <Column title="Email Address" dataIndex="email_Address" key="email_Address" />
              <Column title="Phone Number" dataIndex="phone_Number" key="phone_Number" />
              <Column title="Gender" dataIndex="gender" key="gender" />
              <Column title="Cafe" dataIndex="cafe" key="cafe" />
              <Column title="Days Worked" dataIndex="days_Worked" key="days_Worked" />
              <Column
                title="Action"
                key="action"
                render={(_, record) => (
                  <Space size="middle">
                    <a>Edit</a>
                    <a>Delete</a>
                  </Space>
                )}
              />
            </Table>
          } */
        }
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
