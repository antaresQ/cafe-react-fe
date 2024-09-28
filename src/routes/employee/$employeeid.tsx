import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { Button, DatePicker, Form, Input, Radio, Select, Space } from 'antd'
import { useEmployeeData, getEmployee } from '../../queries/employees'
import { getCafes } from '../../queries/cafes'
import { Cafe, Employee, EmployeeCreateUpdate, EmployeeDetail, EmployeeDetailView } from '../../types'
import parse from 'html-react-parser'
import dayjs from 'dayjs'
import toast, {Toaster, ToastOptions} from 'react-hot-toast'
import { duration } from '@mui/material'
import { useState } from 'react'
import updateInsertEmployee from '../../routesService/employeeService'

const { Option } = Select
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

  const { employeeid } = Route.useParams()
  const isEmployeeId = employeeid.substring(0, 2).toLowerCase() === 'ui'
  const [form] = Form.useForm()
  const [employee, setEmployee] = useState<EmployeeDetailView>()
  
  // const cafes = getCafes()
  // const employeeQ = getEmployee(employeeid)
  //const { mutate:upsertEmployee, isError:isUpsertError, error:upsertError } = useEmployeeData();
  const navigate = useNavigate()

  const [cafes, employeeQ] = [getCafes(), getEmployee(employeeid)]

  if(employeeQ.isLoading || cafes.isLoading){
    return <div>Loading Employee form....</div>
  }

  if((employeeQ.isError && employeeQ.error) || cafes.isError) {
    return <div>Error: {employeeQ.error?.message}</div>
  }

  if (employeeQ.data && cafes.data) {

    setEmployee(employeeQ.data)  

    const toEmployeesPage = () =>{

      return navigate({to:'/employees/$cafeId', params:{cafeId: 'null'}});
    }

    const onFinish = (values: EmployeeCreateUpdate) => {
      // console.log(values)

      // if(isUpsertError){
      //   return toast.error(upsertError.message)
      // }
      // else {
      //   toast.success(isEmployeeId ? `Employee Updated: ${employeeQ.data.name}` : 'Employee Added')
      // }

      return toEmployeesPage();
    }

    const onReset = () => {
      if(employee){
        form.setFieldsValue({
          name: employee?.name,
          gender: employee?.gender,
          email_Address: employee?.email_address,
          phone_Number: employee?.phone_number,
          cafe_Id: cafes.data.filter((cafe:Cafe) => cafe.name == employee?.cafe)[0]?.id,
          start_Date: dayjs(employee?.start_date?.toString().slice(0, 10)),
        })
      }
      else {
        form.resetFields()
      }
    }

    const onSubmit = async () => {

      // await form.validateFields()
      //   .catch((err) => {
      //     let errors = form.getFieldsError().filter(e => e.errors.length > 0)
      //     return console.log(errors);
      //   })
      
      // let employeeData = form.getFieldsValue();
      // if (isEmployeeId && employeeQ.data.id.toLowerCase() == employeeid.toLowerCase()){
      //   employeeData.id = employeeid.toUpperCase();
      // }

      // employeeData.phone_Number = parseInt(employeeData.phone_Number);
      // employeeData.start_Date = new Date(employeeData.start_Date).toISOString()
      
      updateInsertEmployee(form, isEmployeeId, employeeQ, employeeid)

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
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true }, { min: 6 }, { max: 10 }]}
            initialValue={employee?.name}
          >
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]} initialValue={employee?.gender}>
            <Radio.Group
              //placeholder="Select a option and change input text above"
              //onChange={onGenderChange}
              //allowClear
            >
              <Radio.Button value="Male">Male</Radio.Button>
              <Radio.Button value="Female">Female</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="email_Address"
            label="Email Address"
            rules={[{ required: true }, { type: 'email' }]}
            initialValue={employee?.email_address}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone_Number"
            label="Phone Number"
            rules={[{ required: true }, { min: 8, max: 8 }]}
            initialValue={employee?.phone_number}
          >
            <Input type='text'/>
          </Form.Item>
          <Form.Item name="cafe_Id" label="Cafe" rules={[{ required: true }]} initialValue={employee?.cafe}>
            <Select
              placeholder="Select a option and change input text above"
              //onChange={onCafeChange}
              allowClear
            >
              {cafes.data?.map((cafe: Cafe) => {
                return parse(
                  `<Option key="${cafe.id}" value="${cafe.id}">${cafe.name}</Option>`,
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="start_Date"
            label="Start Date"
            rules={[{ required: true }]}
            initialValue={employee?.start_date}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit"
                onClick={onSubmit}
              >
                Submit
              </Button>
              <Button
                htmlType="button"
                onClick={onReset}
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
