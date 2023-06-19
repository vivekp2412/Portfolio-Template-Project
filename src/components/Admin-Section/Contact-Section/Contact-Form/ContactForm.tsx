import React, { useEffect, useState } from 'react';
import style from "../Contact-Form/style.module.css";
import { Button, Checkbox, Col, Form, Input, Radio, Row } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../Hooks/Hooks';
import { addDetails } from '../../../../slices/contactSlice';
import { faL } from '@fortawesome/free-solid-svg-icons';

export default function ContactForm() {
    const [isFormDisable,setIsFormDisable]=useState(true);
  const dispatch = useAppDispatch();
  const initialData = useAppSelector((state) => state.contact.contactDetails);
console.log(initialData);

  useEffect(() => {
    // Fetch initial data if not available
    if (!initialData) {
      // Dispatch action or fetch initial data here
    }
  }, []);
  const validatePhoneNumber = (_, value) => {
    const phoneNumberRegex = /^[0-9]{10}$/; // Example regex for 10-digit phone number
    if (!phoneNumberRegex.test(value)) {
      return Promise.reject('Please enter a valid phone number');
    }
    return Promise.resolve();
  };
  function onFinish(values) {
    console.log(values);
    setIsFormDisable(true);
    dispatch(addDetails(values));
  }

  if (!initialData) {
    // Render a loading state or fallback UI until initialData is available
    return <div>Loading...</div>;
  }

  return (
    <div className={style.formContainer}>
      <Form initialValues={initialData} disabled={isFormDisable} layout="vertical" name="control-hooks" onFinish={onFinish} style={{ maxWidth: 600 }}>
      <Form.Item name="Portfolio Name" label="Portfolio Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Address" label="Address" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="Phone Number"
            label="Phone No."
            rules={[
              { required: true },
              {
                validator: validatePhoneNumber,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="Whatsapp Number" label="WhatsApp No." rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="Email"
        label="Email Address"
        rules={[
          { required: true },
          {
            type: 'email',
            message: 'Please enter a valid email address',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="Facebook Url" label="Facebook URL" rules={[{ required: true },  {
            type: "url",
            message: "This field must be a valid url."
        }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Instagram Url" label="Instagram URL" rules={[{ required: true },  {
            type: "url",
            message: "This field must be a valid url."
        }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Twitter Url" label="Twitter URL" rules={[{ required: true },  {
            type: "url",
            message: "This field must be a valid url."
        }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Recieve Whatsapp"  valuePropName="checked">
     <Checkbox >Recieve on Whatsapp</Checkbox>
      </Form.Item>
      <Form.Item name="Recieve Mail"  valuePropName="checked">
     <Checkbox >Recieve on Email</Checkbox>
      </Form.Item>

      <div className={style.btnContainer}>

      <Button htmlType="submit" className={ isFormDisable ? style.disabled : style.submitbtn}>Submit</Button>
      <Button disabled={!isFormDisable} className={ !isFormDisable ? style.disabled: style.submitbtn} onClick={()=>setIsFormDisable(false)}>Edit</Button>
      </div>
    </Form>
    </div>
  );
}
