import React, { useState } from "react";
import {
  Form,
  Modal,
  Input,
  DatePicker,
  Select,
  InputNumber,
  Button,
  message,
  Spin,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";

const ResidentForm = ({ title, open, close, refresh, mode, data }) => {
  const [form] = Form.useForm();
  const [loading, setLoader] = useState("");

  const handleFinish = (val) => {
    (async (_) => {
      setLoader("saving");
      let res =
        mode == "new"
          ? await _.post("/api/resident/new-resident", val)
          : await _.post("/api/resident/edit-resident", {
              ...val,
              _id: data._id,
            });
      if (res?.data.success) {
        message.success(res?.data?.message ?? "Success");
        setLoader("");
        refresh();
        close();
      } else {
        message.error(res?.data?.message ?? "Error in the Server");
        setLoader("");
      }
    })(axios);
  };

  return (
    <Modal
      open={open}
      title={title}
      onCancel={close}
      closable={false}
      footer={
        <Button onClick={form.submit} loading={loading == "saving"}>
          Register
        </Button>
      }
    >
      <Spin spinning={loading == "saving"}>
        <Form
          form={form}
          onFinish={handleFinish}
          labelAlign="left"
          labelCol={{
            span: 8,
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            initialValue={data?.name}
            rules={[
              {
                required: true,
                message: "Please input your name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Middle Name"
            name="middlename"
            initialValue={data?.middlename}
          >
            <Input placeholder="Optional" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastname"
            initialValue={data?.lastname}
            rules={[
              {
                required: true,
                message: "Please input your Last Name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            initialValue={data?.email}
            rules={[
              {
                required: true,
                message: "Please input your Email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dateOfBirth"
            initialValue={dayjs(data?.dateOfBirth)}
            rules={[
              {
                required: true,
                message: "Please input your Last Name",
              },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            initialValue={data?.gender}
            rules={[
              {
                required: true,
                message: "Please select your gender",
              },
            ]}
          >
            <Select
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Contact Number"
            name="phoneNumber"
            initialValue={data?.phoneNumber}
            rules={[
              { required: true, message: "Please input your Phone Number" },
            ]}
          >
            <InputNumber
              prefix="+63"
              maxLength={10}
              min={0}
              style={{ width: 200 }}
            />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            initialValue={data?.address}
            rules={[
              {
                required: true,
                message: "Please input your Address",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Civil Status"
            name="civilStatus"
            initialValue={data?.civilStatus}
            rules={[
              {
                required: true,
                message: "Please select civil status",
              },
            ]}
          >
            <Select style={{ width: 100, display: "flex" }}>
              <Select.Option value="single">Single</Select.Option>
              <Select.Option value="married">Married</Select.Option>
              <Select.Option value="widowed">Widowed</Select.Option>
              <Select.Option value="separated">Separated</Select.Option>
              <Select.Option value="livein">Live-in</Select.Option>
              <Select.Option value="others">Others</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ResidentForm;
