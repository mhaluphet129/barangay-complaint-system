import React, { useState } from "react";
import {
  Layout,
  Menu,
  Typography,
  Affix,
  Avatar,
  Dropdown,
  Image,
  Breadcrumb,
} from "antd";
import { UserOutlined, LogoutOutlined, HomeOutlined } from "@ant-design/icons";

import Cookies from "js-cookie";
import { PageHeader } from "@ant-design/pro-layout";
import EditProfile from "./components/edit_profile";

import ReportGenerator from "./components/report_generator";
const user = Cookies.get("currentUser");

const Sider = ({ selectedIndex, selectedKey, items, image }) => {
  return (
    <Affix>
      <Layout.Sider collapsible theme="light" width={300}>
        <div
          style={{
            background: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Image
            preview={false}
            src={image == null ? "/next.svg" : image}
            alt="logo"
            width={150}
          />
        </div>
        <Menu
          onClick={selectedIndex}
          selectedKeys={selectedKey}
          items={items}
          defaultSelectedKeys="dashboard"
          style={{
            height: "100vh",
            fontSize: 17,
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
                    label: "Report",
                    key: "edit",
                    children: [],
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
          <Typography.Text style={{ marginLeft: 10 }}>
            Administrator
          </Typography.Text>
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
            <Typography.Text
              style={{
                fontSize: 22,
                fontWeight: 300,
              }}
            >
              {selectedKey.charAt(0).toUpperCase() + selectedKey.slice(1)}
            </Typography.Text>
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