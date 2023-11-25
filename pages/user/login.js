import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Form, Input, Button, message, Typography, Spin } from "antd";
import axios from "axios";

import { UserOutlined, LockFilled } from "@ant-design/icons";

const Login = ({ app_key }) => {
  const [messageAPI, contextholder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const validate = (val) => {
    const { email, password, confirmpassword } = val;
    let emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!emailRegEx.test(email)) {
      message.error("Invalid email");
      return;
    }

    if (password != confirmpassword) {
      message.error("Passwords didn't match");
      return;
    }

    (async (_) => {
      let { data } = await _.post("/api/auth/new-user", val);

      if (data.status == 201) {
        message.error(data.message);
        return;
      } else if (data.status == 200) {
        Cookies.set("loggedIn", "true");
        Cookies.set("currentUser", JSON.stringify(data.user));
        message.success(data.message);
        location?.reload();
      } else message.error(data.message);
    })(axios);
  };

  useEffect(() => {
    messageAPI.open({
      type: "loading",
      content: "Connecting to database...",
    });
    setLoading(true);
    (async (_) => {
      let { data } = await _.get("/api/init");

      if (data.success) {
        messageAPI.destroy();
        message.open({
          type: "success",
          content: "Database Successfully Connected",
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    })(axios);
  }, []);

  return (
    <Spin spinning={loading}>
      {contextholder}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          flexDirection: "row",
          flexDirection: "column",
        }}
      >
        <Typography.Title level={2} style={{ fontWeight: 500 }}>
          BARANGAY COMPLAINT SYSTEM
        </Typography.Title>

        <Form
          labelAlign="right"
          style={{
            width: 400,
            padding: 30,
            background: "#eee",
            borderRadius: 20,
            border: "1px solid #fff",
          }}
          onFinish={(val) => {
            (async (_) => {
              let { data } = await _.post("/api/auth/login", {
                ...val,
              });
              if ([451, 452].includes(data.status)) {
                message.error(data.message);
                return;
              }
              if (data.status == 200) {
                Cookies.set("loggedIn", "true");
                Cookies.set("currentUser", JSON.stringify(data.userData));
                message.success(data.message);
                location?.reload();
              }
            })(axios);
          }}
        >
          <Typography.Title
            level={4}
            style={{
              textAlign: "center",
              fontFamily: "sans-serif",
              fontWeight: 300,
            }}
          >
            Admin Login
          </Typography.Title>

          <Form.Item name="email">
            <Input prefix={<UserOutlined />} size="large" />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password prefix={<LockFilled />} size="large" />
          </Form.Item>

          <Form.Item noStyle>
            <Button
              type="primary"
              style={{ width: "100%" }}
              htmlType="submit"
              size="large"
            >
              Login
            </Button>
            <p>
              Forgot password? <a>click here</a>
            </p>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export async function getServerSideProps() {
  return { props: { app_key: process.env.FILESTACK_KEY } };
}

export default Login;
