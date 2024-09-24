import {useNavigate} from '@tanstack/react-router'

export const actionColumn = (apiData:any) => {
  const navigate = useNavigate({from: '/employees'})

  let employeeId = apiData.value;
  return (
    <div>
      <button className="action-button edit"  onClick={() => navigate({to:`/employees/${employeeId}`})}> Edit  </button> | <button className="action-button delete" data-action="delete" > Delete </button>
    </div>
  )
}
