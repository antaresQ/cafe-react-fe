import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { EmployeeDetailView, EmployeeDetailViewColDef } from '../../types'
import { Col, Input, Space, Table, Tag }from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component'
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { useMutation } from '@tanstack/react-query';

export const Route = createFileRoute('/employees/')({
  component: Employees,
})

export default function Employees() {

  const { Column, ColumnGroup } = Table;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['GET_EMPLOYEES'],
    queryFn: async () => {
      const response =  await fetch('/api/v1/employees',
      {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json'
        }
        //body: JSON.stringify()
      })
  
      return await response.json();
    }
  })

  if(isPending){
    return <span>Loading Employees...</span>
  }
  
  if (error) {
    return <span> Error: {error.message}</span>
  }

  return (
    <div>
      
      <Input placeholder="Cafe Name or Cafe Id" />
      <br/>
      {isFetching && <p>Refetching</p>}
      {/* {
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
      } */}
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
