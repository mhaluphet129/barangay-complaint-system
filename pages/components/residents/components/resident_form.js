import React, { useEffect, useState } from "react";
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
  Steps,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";

const ResidentForm = ({ open, close, refresh, mode, data }) => {
  const [form] = Form.useForm();
  const [loading, setLoader] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [inputDate, setInputData] = useState({});

  const handleFinish = () => {
    (async (_) => {
      setLoader("saving");
      let res =
        mode == "new"
          ? await _.post("/api/resident/new-resident", inputDate)
          : await _.post("/api/resident/edit-resident", {
              ...inputDate,
              _id: data._id,
            });
      if (res?.data.success) {
        message.success(res?.data?.message ?? "Success");
        setLoader("");
        refresh();
        setCurrentStep(0);
        close();
      } else {
        message.error(
          `Fields are empty. please provide for field ${res?.data.error.join(
            ", "
          )}` ?? "Error in the Server"
        );
        setLoader("");
      }
    })(axios);
  };

  const getCurrentStepsStatus = (i) => {
    let status = "process";

    if (data && i == 0) {
      if (Object.keys(data).length != 0) {
        let _ = data;

        delete _.username;
        delete _.password;

        if (
          Object.values(_)?.every(
            (el) =>
              ![null, ""].includes(el) ||
              (!Array.isArray(el) && Object.keys(el).length != 0) ||
              (Array.isArray(el) && el.length != 0)
          )
        ) {
          status = "finish";
        }
      }
    } else {
      if (
        data?.username &&
        ![null, ""].includes(data.username) &&
        data?.password &&
        ![null, ""].includes(data.password)
      )
        status = "finish";
    }

    return status;
  };

  useEffect(() => {
    if (data) {
      if (data?.dateOfBirth ?? false)
        data.dateOfBirth = dayjs(data.dateOfBirth);
      form.setFieldsValue(data);
    }
  }, [data]);

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields();
        setCurrentStep(0);
        close();
      }}
      closable={false}
      footer={
        <Button
          onClick={() => (currentStep == 0 ? setCurrentStep(1) : form.submit())}
          loading={loading == "saving"}
        >
          {currentStep == 0 ? "Next" : "Register"}
        </Button>
      }
      centered
    >
      <Steps
        type="navigation"
        current={currentStep}
        onChange={(e) => setCurrentStep(e)}
        items={[
          {
            status: getCurrentStepsStatus(0),
            title: "Basic Info",
          },
          {
            status: getCurrentStepsStatus(1),
            title: "Login Credentials",
          },
        ]}
      />
      <Spin spinning={loading == "saving"}>
        <Form
          form={form}
          onFinish={handleFinish}
          labelAlign="left"
          labelCol={{
            span: 8,
          }}
          style={{ marginTop: 25 }}
          onChange={(_) =>
            setInputData((e) => {
              return { ...e, [_.target.id]: _.target.value };
            })
          }
        >
          {currentStep == 0 && (
            <>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Middle Name" name="middlename">
                <Input placeholder="Optional" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastname"
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
                rules={[
                  {
                    required: true,
                    message: "Please input your Last Name",
                  },
                ]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  onChange={(_) =>
                    setInputData((e) => {
                      return { ...e, dateOfBirth: _ };
                    })
                  }
                />
              </Form.Item>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please select your gender",
                  },
                ]}
              >
                <Select
                  onChange={(_) =>
                    setInputData((e) => {
                      return { ...e, gender: _ };
                    })
                  }
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="Contact Number"
                name="phoneNumber"
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
                rules={[
                  {
                    required: true,
                    message: "Please select civil status",
                  },
                ]}
              >
                <Select
                  style={{ width: 100, display: "flex" }}
                  onChange={(_) =>
                    setInputData((e) => {
                      return { ...e, civilStatus: _ };
                    })
                  }
                >
                  <Select.Option value="single">Single</Select.Option>
                  <Select.Option value="married">Married</Select.Option>
                  <Select.Option value="widowed">Widowed</Select.Option>
                  <Select.Option value="separated">Separated</Select.Option>
                  <Select.Option value="livein">Live-in</Select.Option>
                  <Select.Option value="others">Others</Select.Option>
                </Select>
              </Form.Item>
            </>
          )}
          {currentStep == 1 && (
            <>
              <Form.Item label="Username" name="username">
                <Input />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input.Password />
              </Form.Item>
            </>
          )}
        </Form>
      </Spin>
    </Modal>
  );
};

export default ResidentForm;
