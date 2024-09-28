import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { Button, DatePicker, Form, Input, Radio, Select, Space } from 'antd'
import { useEmployeeData, getEmployee } from '../../queries/employees'
import { getCafes } from '../../queries/cafes'
import { Cafe, Employee, EmployeeCreateUpdate, EmployeeDetail } from '../../types'
import parse from 'html-react-parser'
import dayjs from 'dayjs'
import toast, {Toaster, ToastOptions} from 'react-hot-toast'
import { duration } from '@mui/material'

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
  
  const cafes = getCafes()
  const employeeQ = getEmployee(employeeid)
  const { mutate:upsertEmployee, isError:isUpsertError, error:upsertError } = useEmployeeData();
  const navigate = useNavigate()

  const onFill = () => {
    form.setFieldsValue({
      name: employeeQ.data.name,
      gender: employeeQ.data.gender,
      email_Address: employeeQ.data.email_Address,
      phone_Number: employeeQ.data.phone_Number,
      cafe_Id: cafes.data.filter((cafe:Cafe) => cafe.name == employeeQ.data?.cafe)[0]?.id,
      start_Date: dayjs(employeeQ.data.start_Date?.slice(0, 10)),
    })
  }

  const toEmployeesPage = () =>{

    return navigate({to:'/employees/$cafeId', params:{cafeId: 'null'}});
  }

  const onFinish = (values: EmployeeCreateUpdate) => {
    console.log(values)

    if(isUpsertError){
      return toast.error(upsertError.message)
    }
    else {
      toast.success(isEmployeeId ? `Employee Updated: ${employeeQ.data.name}` : 'Employee Added')
    }

    return toEmployeesPage();
  }

  const onReset = () => {
    form.resetFields()
  }

  const onSubmit = async () => {

    await form.validateFields()
      .catch((err) => {
        let errors = form.getFieldsError().filter(e => e.errors.length > 0)
        return console.log(errors);
      })
    
    let employeeData = form.getFieldsValue();
    if (isEmployeeId && employeeQ.data.id.toLowerCase() == employeeid.toLowerCase()){
      employeeData.id = employeeid.toUpperCase();
    }

    employeeData.phone_Number = parseInt(employeeData.phone_Number);
    employeeData.start_Date = new Date(employeeData.start_Date).toISOString()
    
    await upsertEmployee(employeeData);

  }

  if (employeeQ.data?.id.length > 0) {
    onFill()
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
        >
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
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
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone_Number"
          label="Phone Number"
          rules={[{ required: true }, { min: 8, max: 8 }]}
        >
          <Input type='text'/>
        </Form.Item>
        <Form.Item name="cafe_Id" label="Cafe" rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            //onChange={onCafeChange}
            allowClear
          >
            {cafes.data?.map((cafe: Cafe) => {
              return parse(
                `<Option value="${cafe.id}">${cafe.name}</Option>`,
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="start_Date"
          label="Start Date"
          rules={[{ required: true }]}
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
