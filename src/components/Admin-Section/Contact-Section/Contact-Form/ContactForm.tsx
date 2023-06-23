import React, { useEffect, useState } from "react";
import style from "../Contact-Form/style.module.css";
import { Button, Checkbox, Col, Form, Input, Radio, Row } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/Hooks";
import { addDetails, resetDetails } from "../../../../slices/contactSlice";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "antd/es/form/Form";
const TextArea = Input.TextArea;

export default function ContactForm() {
  const [isFormDisable, setIsFormDisable] = useState(true);
  const initialData = useAppSelector((state) => state.contact.contactDetails);
  const [showPhoneNumber, setShowPhoneNumber] = useState(
    initialData.isNumberDifferent
  );
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch initial data if not available
    if (!initialData) {
      // Dispatch action or fetch initial data here
    }
  }, []);
  const validatePhoneNumber = (_, value) => {
    const phoneNumberRegex = /^[0-9]{10}$/; // Example regex for 10-digit phone number
    if (!phoneNumberRegex.test(value)) {
      return Promise.reject("Please enter a valid phone number");
    }
    return Promise.resolve();
  };
  function onFinish(values) {
    setIsFormDisable(true);
    console.log(values);

    dispatch(addDetails({ ...values, isNumberDifferent: showPhoneNumber }));
  }
  const onReset = () => {
    dispatch(resetDetails());
    form.resetFields();
  };
  if (!initialData) {
    return <div>Loading...</div>;
  }
  console.log(initialData);

  return (
    <div className={style.formContainer}>
      <Form
        size="large"
        form={form}
        initialValues={initialData}
        disabled={isFormDisable}
        layout="vertical"
        name="control-hooks"
        onReset={onReset}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={24} md={12}>
            <Form.Item
              name="Portfolio Name"
              label="Portfolio Name"
              rules={[{ required: true, max: 20 }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="Email"
              label="Email Address"
              rules={[
                { required: true },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="Address" label="Address" rules={[{ required: true }]}>
          <TextArea rows={3} cols={4} />
        </Form.Item>

        <Form.Item name="isNumberDifferent" valuePropName="checked">
          <Checkbox
            onChange={(value) => setShowPhoneNumber(value.target.checked)}
          >
            Is Contact Number other than Whatsapp Number
          </Checkbox>
        </Form.Item>
        <Row gutter={16}>
          <Col span={24} md={12}>
            <Form.Item
              name="Whatsapp Number"
              label="WhatsApp No."
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
          <Col span={24} md={12}>
            {showPhoneNumber && (
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
            )}
          </Col>
          <Col span={24}></Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} md={8}>
            <Form.Item
              name="Facebook Url"
              label="Facebook URL"
              rules={[
                { required: true },
                {
                  type: "url",
                  message: "This field must be a valid url.",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={8}>
            <Form.Item
              name="Instagram Url"
              label="Instagram URL"
              rules={[
                { required: true },
                {
                  type: "url",
                  message: "This field must be a valid url.",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={8}>
            <Form.Item
              name="Twitter Url"
              label="Twitter URL"
              rules={[
                { required: true },
                {
                  type: "url",
                  message: "This field must be a valid url.",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="Recieve Whatsapp" valuePropName="checked">
          <Checkbox>Recieve on Whatsapp</Checkbox>
        </Form.Item>
        <Form.Item name="Recieve Mail" valuePropName="checked">
          <Checkbox>Recieve on Email</Checkbox>
        </Form.Item>

        <div className={style.btnContainer}>
          <Button
            htmlType="submit"
            className={isFormDisable ? style.disabled : style.activebtn}
          >
            Submit
          </Button>
          <Button
            htmlType="reset"
            className={isFormDisable ? style.disabled : style.resetbtn}
          >
            Reset
          </Button>
          <Button
            disabled={!isFormDisable}
            className={!isFormDisable ? style.disabled : style.activebtn}
            onClick={() => setIsFormDisable(false)}
          >
            Edit
          </Button>
        </div>
      </Form>
    </div>
  );
}
