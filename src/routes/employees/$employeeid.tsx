import { createFileRoute, redirect } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Button, DatePicker, Form, Input, Select, Space }  from 'antd'
import { getEmployees } from '../../queries/employees';
import { getCafes } from '../../queries/cafes';
import { Cafe, Employee, EmployeeDetailView } from '../../types';
import parse from 'html-react-parser'
import dayjs from 'dayjs'

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export const Route = createFileRoute('/employees/$employeeid')({
  component: EmployeeEdit,
})

export default function EmployeeEdit() {
  const { employeeid } = Route.useParams()

  const cafes = getCafes();

  var isEmployeeId = employeeid.substring(0, 2).toLowerCase() === 'ui'

  if (!isEmployeeId) {
    //Form with Values

    
  }

  const employeeQ = getEmployees(employeeid);

  const [form] = Form.useForm();
  // const onGenderChange = (value: string) => {
  //   switch (value) {
  //     case 'male':
  //       form.setFieldsValue({
  //         note: 'Hi, man!',
  //       });
  //       break;
  //     case 'female':
  //       form.setFieldsValue({
  //         note: 'Hi, lady!',
  //       });
  //       break;
  //     default:
  //   }
  // };

  

  const onFinish = (values: string) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      name: employeeQ.data.name,
      gender: employeeQ.data.gender,
      emailAddress: employeeQ.data.email_Address,
      phoneNumber: employeeQ.data.phone_Number,
      cafe: employeeQ.data.cafe,
      startDate: dayjs(employeeQ.data.start_Date.slice(0,10))
    });
  };

  return (
    <div>
      <div>{isEmployeeId ? 'Edit' : 'Add'} Employee</div>
      {isEmployeeId ? <div>UserId: {employeeid}</div> : null}
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600}}
      >
      <Form.Item name="name" label="Name" 
        rules={[
          { required: true },
          {min: 6},
          {max: 10}
        ]}
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
        <Form.Item name="emailAddress" label="Email Address" 
          rules={[
            { required: true },
            { type: 'email' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="Phone Number" label="Phone Number" 
          rules={[
            { required: true },
            { len: 8 }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="cafe" label="Cafe" rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            //onChange={onCafeChange}
            allowClear
          >
            {
              cafes.data?.map((cafe:Cafe) => {
                return parse(`<Option value="${cafe.id}">${cafe.name}</Option>`)
              })
            }
          </Select>
        </Form.Item>
        <Form.Item name="startDate" label="Start Date" 
          rules={[
            { required: true }
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
            <Button type="link" htmlType="button" onClick={onFill}>
              Fill form
            </Button> 
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}
