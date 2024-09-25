import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Cafe } from '../../types';
import { getCafes } from '../../queries/cafes';
import { cafeActionColumn, cafeEmployeesColumn } from '../../aggridCustom/customColumns';
import { AgGridReact } from 'ag-grid-react';

const CafeDetailColDef = [
  {field: "logo"},
  {field: "id"},
  {field: "name"},
  {field: "description"},
  {field: "location"},
  {field: 'employees', headerName: 'Employees'},
  {field: 'id', headerName: "Action", cellRenderer: cafeActionColumn}
]


export const Route = createFileRoute('/cafes/')({
  component: Cafes,
})

export default function Cafes() {
  
  const { isPending, error, data, isFetching } = getCafes()

  if(isPending){
    return <span>Loading cafes...</span>
  }
  
  if (error) {
    return <span> Error: {error.message}</span>
  }

  return (
    <div>
      Cafes
      {isFetching && <p>Refetching</p>}
      {
        <div className='ag-theme-quartz' style={{height:500}}>
          <AgGridReact
            rowData={data}
            columnDefs={CafeDetailColDef}
          />
        </div>
      }
    </div>
  )
}

