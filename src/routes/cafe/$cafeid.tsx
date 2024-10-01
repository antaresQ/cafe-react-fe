import { createFileRoute, useNavigate, useBlocker } from '@tanstack/react-router'
import { Button, Form, Input, Space } from 'antd'
import { getCafe, useCafeData } from '../../queries/cafes'
import toast from 'react-hot-toast'
import * as uuid from 'uuid'
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

export const Route = createFileRoute('/cafe/$cafeid')({
  component: UpdateCafe,
})


export default function UpdateCafe() {
  
  const queryClient = useQueryClient()
  const { cafeid } = Route.useParams()
  const [form] = Form.useForm()
  const navigate = useNavigate();

  const [isFormChanged, setIsFormChanged] = useState<boolean>(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(true);

  const mutateCafe = useCafeData();
  
  var isValidCafeUUID = uuid.validate(cafeid)
  
  const cafeQ = getCafe(cafeid);

  useBlocker({
    blockerFn: () => window.confirm('Changes made will not be saved. Are you sure you want to leave?'),
    condition: isFormChanged,
  })

  function SetFormEditedStatus(isEdited:boolean) {
    setIsFormChanged(val => val = isEdited)
    setSubmitButtonDisabled(val => val = !isEdited)
  }

  if(cafeQ.isError) {
    return <div>{`Error: ${cafeQ.error}`}</div>
  }

  if(cafeQ.isLoading){
    return <div>Loading Cafe details...</div>
  }
  
  if(cafeQ.data)
  {
    const onFill = () => {
      form.setFieldsValue({
        name: cafeQ.data.name,
        description: cafeQ.data.description,
        logo: cafeQ.data.logo,
        location: cafeQ.data.location
      })
      SetFormEditedStatus(false)
    }

    const toCafesPage = () =>{
      return navigate({to:'/cafes/$location', params:{location: 'null'}});
    }

    const onFinish = () => {
      return toCafesPage();
    }

    const onReset = () => {
      form.resetFields()
    }

    async function updateCafeDetails() {

      let cafeData = form.getFieldsValue();
      if (isValidCafeUUID && cafeQ?.data?.id.toLowerCase() == cafeid.toLowerCase()){
        cafeData.id = cafeid.toUpperCase();
      }
      
      try 
      {
        await mutateCafe.mutateAsync(cafeData)
          .then(async(data:boolean)=>{

            if(data === true)
            {
              SetFormEditedStatus(false)
              toast.success(isValidCafeUUID && cafeQ?.data?.id.toLowerCase() == cafeid.toLowerCase() ? `Cafe Updated: ${cafeQ.data.name}` : 'Cafe Added')
              
              queryClient.invalidateQueries({queryKey:['GET_EMPLOYEE',cafeQ.data.id]})
            }
            else {
              return toast.error(`Error Updating Cafe: ${cafeQ.data.name}`)
            }
          })
      } 
      catch {
        toast.error(`Error Updating Employee: ${cafeQ.data.name}`)
      }
    }

    const onSubmit = async () => {

      await form.validateFields()
        .then(async () => {
          return updateCafeDetails()
        })
        .catch((err) => {
          let errors = form.getFieldsError().filter(e => e.errors.length > 0)
          return console.log(errors);
        })
    }

    return (
      <div>
        <div>{isValidCafeUUID ? 'Edit' : 'Add'} Cafe</div>
        {isValidCafeUUID ? <div>Cafe Id: {cafeid}</div> : null}
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
            initialValue={cafeQ?.data?.name}
          >
            <Input />
          </Form.Item>
        
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }, { max: 256 }]}
            initialValue={cafeQ?.data?.description}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="logo"
            label="Logo"
            rules={[{ required: false }]}
            initialValue={cafeQ?.data?.logo}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true }]}
            initialValue={cafeQ?.data?.location}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit"
                onClick={onSubmit}
                disabled={submitButtonDisabled}
              >
                Submit
              </Button>
              <Button
                htmlType="button"
                onClick={cafeQ.data ? onFill : onReset}
              >
                Reset
              </Button>
              <Button type="primary" htmlType="button" onClick={toCafesPage} danger>
                Cancel
              </Button> 
            </Space>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
