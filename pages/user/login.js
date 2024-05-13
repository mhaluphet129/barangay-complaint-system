import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Typography, Spin, Card } from "antd";
import { FaLocationPin } from "react-icons/fa6";
import Cookies from "js-cookie";
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
      <a
        className="login-loc"
        target="_blank"
        href="https://www.google.com/maps/place/Barangay+Hall+of+North+Poblacion/@7.7651134,125.0080075,17z/data=!3m1!4b1!4m6!3m5!1s0x32ff3b63041728cf:0xbecc7f5a714647b3!8m2!3d7.7651134!4d125.0080075!16s%2Fg%2F1tgldvs8?entry=ttu"
      >
        <FaLocationPin
          style={{
            fontSize: "1.1em",
            marginBottom: -2,
            color: "#fff",
            marginRight: 7,
          }}
        />{" "}
        Barangay Hall of North Poblacion Maramag, Bukidnon
      </a>
      <div
        className="main-body-complain"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          flexDirection: "row",
          flexDirection: "column",
        }}
      >
        <Card
          bodyStyle={{
            padding: 0,
          }}
          hoverable
        >
          <Form
            labelAlign="right"
            style={{
              padding: 20,
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                src="/web-logo.png"
                width={120}
                style={{ marginTop: 10, marginBottom: 10 }}
              />
              <Typography.Title
                level={4}
                style={{ fontWeight: 500, margin: 0, marginBottom: 25 }}
              >
                BARANGAY COMPLAINT SYSTEM
              </Typography.Title>
            </div>

            <Form.Item name="email">
              <Input
                prefix={<UserOutlined />}
                size="large"
                placeholder="Email/Username"
              />
            </Form.Item>
            <Form.Item name="password">
              <Input.Password
                prefix={<LockFilled />}
                size="large"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item noStyle>
              <Button
                type="primary"
                style={{
                  width: "100%",
                  fontSize: "1.5em",
                  height: 50,
                  fontWeight: 500,
                }}
                htmlType="submit"
                size="large"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Spin>
  );
};

export async function getServerSideProps() {
  return { props: { app_key: process.env.FILESTACK_KEY } };
}

export default Login;
