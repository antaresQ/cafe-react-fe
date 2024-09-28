import { FormInstance } from 'antd';
import React from 'react'
import { UseQueryResult } from '@tanstack/react-query';
import { EmployeeDetailView } from '../types';
import { useEmployeeData } from '../queries/employees';
import toast from 'react-hot-toast';

export default async function updateInsertEmployee(form:FormInstance, isEmployeeId:boolean, employeeQ:UseQueryResult<EmployeeDetailView, Error>, employeeid: string) {
    
    const { mutate:upsertEmployee, isError:isUpsertError, error:upsertError } = useEmployeeData();

    await form.validateFields()
      .catch((err) => {
        let errors = form.getFieldsError().filter(e => e.errors.length > 0)
        return console.log(errors);
      })
    
    let employeeData = form.getFieldsValue();
    if (isEmployeeId && employeeQ?.data?.id.toLowerCase() == employeeid?.toLowerCase()){
      employeeData.id = employeeid.toUpperCase();
    }

    employeeData.phone_Number = parseInt(employeeData.phone_Number);
    employeeData.start_Date = new Date(employeeData.start_Date).toISOString()
    
    await upsertEmployee(employeeData);

    if (isUpsertError)
    {
        return toast.error(upsertError.message)
    }
    else {
    toast.success(isEmployeeId ? `Employee Updated: ${employeeQ.data?.name}` : 'Employee Added')
    }
}