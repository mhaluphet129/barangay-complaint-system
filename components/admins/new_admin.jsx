import React from "react";
import { Button, Form, Input, Modal, Typography } from "antd";

const NewAdmin = ({ open, close, handleFinish }) => {
  const [form] = Form.useForm();

  const clearAll = () => {
    form.resetFields();
    close();
  };
  return (
    <Modal
      open={open}
      onCancel={clearAll}
      footer={null}
      destroyOnClose
      centered
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={async (val) => {
          let a = await handleFinish(val);
          if (a) clearAll();
        }}
      >
        <Typography.Title level={5}>Personal Information</Typography.Title>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="middlename" label="Middle Name (optional)">
          <Input />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Last Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            ({ getFieldValue }) => ({
              validator(_) {
                const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                const email = getFieldValue("email");

                if (reg.test(email)) return Promise.resolve();
                else return Promise.reject("Invalid Email");
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Typography.Title level={5}>Credentials</Typography.Title>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item noStyle>
          <Button size="large" type="primary" htmlType="submit" block>
            REGISTER
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewAdmin;
