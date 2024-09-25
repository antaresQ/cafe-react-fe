import { createFileRoute, redirect } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Button, DatePicker, Form, Input, Select, Space } from 'antd'
import { addEmployee, getEmployee } from '../../queries/employees'
import { getCafes } from '../../queries/cafes'
import { Cafe, Employee, EmployeeDetailView } from '../../types'
import parse from 'html-react-parser'
import dayjs from 'dayjs'

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

  const cafes = getCafes()

  const isEmployeeId = employeeid.substring(0, 2).toLowerCase() === 'ui'

  const [form] = Form.useForm()

  const employeeQ = getEmployee(employeeid)

  const onFill = () => {
    form.setFieldsValue({
      name: employeeQ.data.name,
      gender: employeeQ.data.gender,
      email_Address: employeeQ.data.email_Address,
      phone_Number: employeeQ.data.phone_Number,
      cafe: cafes.data.filter((cafe:Cafe) => cafe.name == employeeQ.data.cafe)[0].id,
      start_Date: dayjs(employeeQ.data.start_Date?.slice(0, 10)),
    })
  }

  const onFinish = (values: string) => {
    console.log(values)
    return redirect({to:'/employees'})
  }

  const onReset = () => {
    form.resetFields()
  }

  const onSubmit = async () => {

    form.validateFields()
      .then(async(outcome) => {
        let errors = form.getFieldsError().filter(e => e.errors.length > 0)
        if (errors.length === 0) 
        {
          let employeeData = form.getFieldsValue();
          if(isEmployeeId && employeeQ.data.id.toLowerCase() == employeeid.toLowerCase()){
            employeeData.id = employeeid.toUpperCase();
          }
          employeeData.start_Date = new Date(employeeData.start_Date).toISOString()
          console.log(employeeData);
          const addEmpMut = await addEmployee(employeeData);

          if(addEmpMut.error){
            console.log(addEmpMut.error);
          }

          if(addEmpMut.data) {
            return redirect({to:'/employees'});
          }
        };
      })
      .catch((err) => {
        let errors = form.getFieldsError().filter(e => e.errors.length > 0)
        console.log(errors);
      })

  }

  if (employeeQ.data) {
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
        onFinish={onFinish}
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
          <Select
            placeholder="Select a option and change input text above"
            //onChange={onGenderChange}
            //allowClear
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
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
          rules={[{ required: true }, { len: 8 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="cafe" label="Cafe" rules={[{ required: true }]}>
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
            {/* <Button type="link" htmlType="button" onClick={onFill}>
              Fill form
            </Button>  */}
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}
