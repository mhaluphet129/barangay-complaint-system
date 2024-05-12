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
    if (mode == "new") {
      const phone = inputDate.phoneNumber;
      if (!phone.startsWith("9")) {
        message.error(
          "Phone number is invalid. Phone Number should start with 9."
        );
        return;
      }

      if (phone.length < 10) {
        message.error("Phone number length is invalid. Minimum of 10 digit.");
        return;
      }
    }
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
        close();
      }}
      closable={false}
      footer={
        <Button
          onClick={form.submit}
          loading={loading == "saving"}
          block
          size="large"
          type="primary"
        >
          {mode == "edit" ? "UPDATE" : "REGISTER"}
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
                <Input size="large" />
              </Form.Item>
              <Form.Item label="Middle Name" name="middlename">
                <Input placeholder="Optional" size="large" />
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
                <Input size="large" />
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
                <Input size="large" />
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
                  size="large"
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
                  size="large"
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
                  controls={false}
                  size="large"
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
                <Input size="large" />
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
                  size="large"
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
        </Form>
      </Spin>
    </Modal>
  );
};

export default ResidentForm;
