import React, { useState } from "react";
import {
  Layout,
  Menu,
  Typography,
  Affix,
  Avatar,
  Dropdown,
  Breadcrumb,
} from "antd";
import { UserOutlined, LogoutOutlined, HomeOutlined } from "@ant-design/icons";

import Cookies from "js-cookie";
import { PageHeader } from "@ant-design/pro-layout";
import EditProfile from "./components/edit_profile";

import ReportGenerator from "./components/report_generator";
const user = Cookies.get("currentUser");

const Sider = ({ selectedIndex, selectedKey, items, children }) => {
  return (
    <Affix>
      <Layout.Sider
        theme="light"
        width={250}
        style={{
          boxShadow: "2px 0 1px -2px #888",
          backgroundColor: "#202d3a",
        }}
      >
        {children}
        <Menu
          onClick={selectedIndex}
          selectedKeys={selectedKey}
          items={items}
          defaultSelectedKeys="dashboard"
          style={{
            fontSize: 17,
            backgroundColor: "#263544",
            height: "100vh",
          }}
        />
      </Layout.Sider>
    </Affix>
  );
};

const Header = ({ app_key }) => {
  const [openEditModal, setOpenEditModal] = useState({
    open: false,
    data: null,
  });
  const [report, setReport] = useState({
    open: false,
    columns: [],
    title: "",
    data: null,
  });

  return (
    <>
      <ReportGenerator
        {...report}
        close={() =>
          setReport({
            open: false,
            columns: [],
            data: null,
          })
        }
      />
      <Affix>
        <Layout.Header
          style={{
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            height: 60,
            width: "100%",
            paddingInline: 10,
          }}
        >
          <Typography.Text style={{ marginRight: 10 }}>
            Administrator
          </Typography.Text>
          <div style={{ display: "flex", alignSelf: "center" }}>
            <Dropdown
              menu={{
                items: [
                  {
                    label: "Edit Profile",
                    key: "edit",
                    onClick: () =>
                      setOpenEditModal({
                        open: true,
                        data: JSON.parse(user),
                      }),
                  },
                  {
                    type: "divider",
                  },
                  {
                    label: (
                      <div style={{ color: "#ff0000" }}>
                        logout <LogoutOutlined />
                      </div>
                    ),
                    key: "3",
                    onClick: () => {
                      Cookies.remove("currentUser");
                      Cookies.remove("loggedIn");
                      Cookies.remove("mode");
                      window.location.reload();
                    },
                  },
                ],
              }}
              trigger={["click"]}
            >
              <Avatar
                icon={<UserOutlined />}
                size={40}
                style={{ cursor: "pointer" }}
              />
            </Dropdown>
          </div>
        </Layout.Header>
      </Affix>

      {/* UTILS */}
      <EditProfile
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
      />
    </>
  );
};

const Content = ({ selectedKey, children }) => {
  return (
    <div
      style={{
        backgroundColor: "#ecf0f4",
        height: "100%",
        padding: "10px",
        overflow: "scroll",
      }}
    >
      <PageHeader
        title={
          <div
            style={{
              display: "block",
              justifyContent: "space-between",
            }}
          >
            <Breadcrumb
              items={[
                {
                  href: "",
                  title: (
                    <>
                      <HomeOutlined />
                      <span>Home</span>
                    </>
                  ),
                },
                {
                  title:
                    selectedKey.charAt(0).toUpperCase() + selectedKey.slice(1),
                },
              ]}
            />
          </div>
        }
      >
        {children}
      </PageHeader>
    </div>
  );
};

const Footer = () => {
  return (
    <Layout.Footer
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#aaa",
      }}
    >
      <Typography.Title level={5} style={{ marginTop: 10 }}></Typography.Title>
    </Layout.Footer>
  );
};

export { Sider, Header, Content, Footer };
export default () => <></>;
