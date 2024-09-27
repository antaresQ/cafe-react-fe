import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Cafe, CafeEmployee } from '../../types'
import { getCafes } from '../../queries/cafes'
import {
  employeesActionColumn,
  cafesActionColumn,
  cafeLocationColumn,
} from '../../aggridCustom/customColumns'
import { AgGridReact } from 'ag-grid-react'
import { Button, Col, Input, Space, Table, Tag } from 'antd'
import {CloseOutlined } from '@ant-design/icons'

const CafeDetailColDef = [
  { field: 'logo' },
  { field: 'id' },
  { field: 'name' },
  { field: 'description' },
  { field: 'location', headerName: 'Location', cellRenderer: cafeLocationColumn },
  { field: 'name', headerName: 'Action', cellRenderer: cafesActionColumn, width: 250 },
]

export const Route = createFileRoute('/cafes/$location')({
  component: Cafes,
})

export default function Cafes() {
  
  const {location} = Route.useParams()
  const { isPending, error, data, isFetching } = getCafes(location)
  const navigate = useNavigate({from: '/cafes/$location'})

  
  const toAllCafesPage = () =>{
    return navigate({to:'/cafes/$location', params:{location: 'null'}});
  }

  if (isPending) {
    return <span>Loading cafes...</span>
  }

  if (error) {
    return <span> Error: {error.message}</span>
  }

  return (
    <div>
      Cafes
      <br/>
      {(location == null || location === 'null') ? null : <Button icon={<CloseOutlined onClick={toAllCafesPage} />} type='primary' iconPosition='end'>{location}</Button>}
      <br />
      {isFetching && <p>Refetching</p>}
      {
        <div className="ag-theme-quartz" style={{ height: 500 }}>
          <AgGridReact rowData={data} columnDefs={CafeDetailColDef}/>
        </div>
      }
    </div>
  )
}
