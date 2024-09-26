import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button, DatePicker, Form, Input, Select, Space } from 'antd'
import { getCafe } from '../../queries/cafes'
import toast, { Toaster } from 'react-hot-toast'
import { Cafe } from '../../types'
import * as uuid from 'uuid'

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

export const Route = createFileRoute('/cafe/$cafeid')({
  component: UpdateCafe,
})


export default function UpdateCafe() {
  
  const { cafeid } = Route.useParams()
  const [form] = Form.useForm()
  const navigate = useNavigate();
  
  var isValidUUID = uuid.validate(cafeid)

  const cafeQ = getCafe(cafeid);
  
  const onFill = () => {
    form.setFieldsValue({
      name: cafeQ.data.name,
      description: cafeQ.data.description,
      logo: cafeQ.data.logo,
      location: cafeQ.data.location
    })
  }

  const returnToCafesPage = () =>{
    return navigate({to:'/cafes'});
  }

  const onFinish = (values: Cafe) => {
    // console.log(values)

    // if(isUpsertError){
    //   return toast.error(upsertError.message)
    // }
    // else {
    //   toast.success(isEmployeeId ? `Employee Updated: ${cafeQ.data.name}` : 'Employee Added')
    // }

    // return navigate({to:'/employees'});
  }

  const onReset = () => {
    form.resetFields()
  }

  const onSubmit = async () => {

    // await form.validateFields()
    //   .catch((err) => {
    //     let errors = form.getFieldsError().filter(e => e.errors.length > 0)
    //     return console.log(errors);
    //   })
    
    // let employeeData = form.getFieldsValue();
    // if(isEmployeeId && cafeQ.data.id.toLowerCase() == employeeid.toLowerCase()){
    //   employeeData.id = employeeid.toUpperCase();
    // }

    // employeeData.phone_Number = parseInt(employeeData.phone_Number);
    // employeeData.start_Date = new Date(employeeData.start_Date).toISOString()
    
    // await upsertEmployee(employeeData);

  }

  if (cafeQ.data) {
    onFill()
  }

  return (
    <div>
      <div>{isValidUUID ? 'Edit' : 'Add'} Employee</div>
      {isValidUUID ? <div>Cafe Id: {cafeid}</div> : null}
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
       
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }, { max: 256 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="logo"
          label="Logo"
          rules={[{ required: true }, { len: 8 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true }]}
        >
          <Input />
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
              onClick={cafeQ.data ? onFill : onReset}
            >
              Reset
            </Button>
            <Button type="primary" htmlType="button" onClick={returnToCafesPage} danger>
              Cancel
            </Button> 
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}
