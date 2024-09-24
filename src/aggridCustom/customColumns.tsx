import {useNavigate} from '@tanstack/react-router'

export const employeeActionColumn = (apiData:any) => {
  const navigate = useNavigate({from: '/employees'})

  let employeeId = apiData.value;
  return (
    <div>
      <button className="action-button edit"  onClick={() => navigate({to:`/employees/${employeeId}`})}> Edit  </button> | <button className="action-button delete" data-action="delete" > Delete </button>
    </div>
  )
}

export const cafeEmployeesColumn = (apiData:any) => {
  const navigate = useNavigate({from: '/cafes'})

  let cafeId = apiData.value;
  return (
    <div>
      <button className="action-button edit"  onClick={() => navigate({to:`/employees?cafe=${cafeId}`})}> Employees  </button>
    </div>
  )
}

export const cafeActionColumn = (apiData:any) => {
  const navigate = useNavigate({from: '/cafes'})

  let employeeId = apiData.value;
  return (
    <div>
      <button className="action-button edit"  onClick={() => navigate({to:`/cafes/${employeeId}`})}> Edit  </button> | <button className="action-button delete" data-action="delete" > Delete </button>
    </div>
  )
}

