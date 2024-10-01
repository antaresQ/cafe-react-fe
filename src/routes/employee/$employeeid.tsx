import { createFileRoute, useBlocker, useNavigate } from '@tanstack/react-router'
import { Button, DatePicker, Form, Input, message, Radio, Select, Space } from 'antd'
import { useEmployeeData, getEmployee } from '../../queries/employees'
import { getCafes } from '../../queries/cafes'
import { Cafe } from '../../types'
import dayjs from 'dayjs'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}

export const Route = createFileRoute('/employee/$employeeid')({
  component: EmployeeEdit,
})

export default function EmployeeEdit() {
  
  const queryClient = useQueryClient()
  const { employeeid } = Route.useParams()
  const isEmployeeId = employeeid.substring(0, 2).toLowerCase() === 'ui'
  const [form] = Form.useForm()

  const [isFormChanged, setIsFormChanged] = useState<boolean>(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(true);

  const mutateEmployee = useEmployeeData();
  
  const cafes = getCafes()
  const employeeQ = getEmployee(employeeid)
  const navigate = useNavigate()

  useBlocker({
    blockerFn: () => window.confirm('Changes made will not be saved. Are you sure you want to leave?'),
    condition: isFormChanged,
  })

  function SetFormEditedStatus(isEdited:boolean) {
    setIsFormChanged(val => val = isEdited)
    setSubmitButtonDisabled(val => val = !isEdited)
  }
  

  if (employeeQ.isError || cafes.isError ) {
    return (
      <div>
        {employeeQ.isError ? <div>Error: {employeeQ.error.message}</div> : null}
        {cafes.isError ? <div>Error: {cafes.error.message}</div> : null}
      </div>
    )
  }

  if(employeeQ.isLoading || cafes.isLoading) {
    return <div>Loading.....</div>
  }

  if(employeeQ.data && cafes.data)
  {
    const onFill = () => {
      form.setFieldsValue({
        name: employeeQ.data.name,
        gender: employeeQ.data.gender,
        email_Address: employeeQ.data.email_Address,
        phone_Number: employeeQ.data.phone_Number,
        cafe_Id: cafes.data.filter((cafe:Cafe) => cafe.name == employeeQ.data?.cafe)[0]?.id,
        start_Date: employeeQ.data ? dayjs(employeeQ.data.start_Date?.slice(0, 10)) : dayjs(new Date().toISOString().slice(0, 10)),
      })
      SetFormEditedStatus(false)
    }
  
    const toEmployeesPage = () =>{
  
      return navigate({to:'/employees/$cafeId', params:{cafeId: 'null'}});
    }
  
    const onFinish = () => {
      return toEmployeesPage();
    }
  
    const onReset = () => {
      form.resetFields()
    }

    async function updateEmployeeDetails() {

      let employeeData = form.getFieldsValue();

      if (isEmployeeId && employeeQ.data.id.toLowerCase() == employeeid.toLowerCase()){
        employeeData.id = employeeid.toUpperCase();
      }
  
      employeeData.phone_Number = parseInt(employeeData.phone_Number);
      employeeData.start_Date = new Date(employeeData.start_Date).toISOString()
      
      try 
      {
        await mutateEmployee.mutateAsync(employeeData)
          .then(async(data:boolean)=>{

            if(data === true)
            {
              console.log('isSuccess hit')
  
              SetFormEditedStatus(false)
              toast.success(isEmployeeId ? `Employee Updated: ${employeeQ.data.name}` : 'Employee Added')
              
              queryClient.invalidateQueries({queryKey:['GET_EMPLOYEE',employeeQ.data.id]})
            }
            else {
              console.log('isError hit')
              return toast.error(`Error Updating Employee: ${employeeQ.data.name}`)
            }

          })
      } 
      catch {
        toast.error(`Error Updating Employee: ${employeeQ.data.name}`)
      }
    }
  
    const onSubmit = async () => {
  
      await form.validateFields()
        .then(async () => {
          return updateEmployeeDetails()
        })
        .catch((err) => {
          let errors = form.getFieldsError().filter(e => e.errors.length > 0)
          return console.log(errors);
        })
    }

    return (
      <div>
        <div>{isEmployeeId ? 'Edit' : 'Add'} Employee</div>
        {isEmployeeId ? <div>UserId: {employeeid}</div> : null}
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          //onFinish={onFinish}
          style={{ maxWidth: 600 }}
          onFieldsChange={() => {SetFormEditedStatus(true)}}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true }, { min: 6 }, { max: 10 }]}
            initialValue={employeeQ?.data?.name}
          >
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]} initialValue={employeeQ?.data?.gender}>
            <Radio.Group>
              <Radio.Button value="Male">Male</Radio.Button>
              <Radio.Button value="Female">Female</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="email_Address"
            label="Email Address"
            rules={[{ required: true }, { type: 'email' }]}
            initialValue={employeeQ?.data?.email_Address}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone_Number"
            label="Phone Number"
            rules={[
              { 
                required: true,
                pattern: new RegExp("(8000000[0-9]|800000[1-9][0-9]|80000[1-9][0-9]{2}|8000[1-9][0-9]{3}|800[1-9][0-9]{4}|80[1-9][0-9]{5}|8[1-9][0-9]{6}|9[0-9]{7})"), 
                message: "Invalid phone number" 
              }
            ]}
            initialValue={employeeQ?.data?.phone_Number}
          >
            <Input type='text'/>
          </Form.Item>
          <Form.Item name="cafe_Id" label="Cafe" rules={[{ required: true }]} initialValue={employeeQ?.data?.cafe_Id}>
            <Select
              placeholder="Select a option and change input text above"
              //onChange={onCafeChange}
              allowClear
            >
              {cafes.data?.map((cafe: Cafe) => {

                return <Select.Option key={cafe.id} value={cafe.id}>{cafe.name}</Select.Option>
                
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="start_Date"
            label="Start Date"
            rules={[{ required: true }]}
            initialValue={dayjs(employeeQ?.data?.start_Date.slice(0, 10))}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button 
                type="primary" 
                htmlType="button"
                onClick={onSubmit}
                disabled={submitButtonDisabled}
              >
                Submit
              </Button>
              <Button
                htmlType="button"
                onClick={employeeQ.data ? onFill : onReset}
              >
                Reset
              </Button>
              <Button type="primary" htmlType="button" onClick={toEmployeesPage} danger>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
