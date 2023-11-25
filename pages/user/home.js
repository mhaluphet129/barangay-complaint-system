import React, { useState } from "react";
import { Input, Layout, Typography } from "antd";
import { Sider, Header, Content } from "../layout";

import { VscGraph } from "react-icons/vsc";
import { GrGroup } from "react-icons/gr";
import { FaGears } from "react-icons/fa6";
import { CiFileOn, CiSearch } from "react-icons/ci";

import Residents from "../components/residents";
import Dashboard from "../components/dashboard";

const MyApp = ({ app_key }) => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const selectedItemsStyle = {
    color: "#aaa",
    backgroundColor: "#202d3a",
    borderRadius: 0,
    borderLeft: "2px solid #3a96ff",
  };

  return (
    <>
      <Layout>
        <Sider
          selectedIndex={(e) => setSelectedKey(e.key)}
          selectedKey={selectedKey}
          items={[
            {
              label: "Dashboard",
              key: "dashboard",
              icon: <VscGraph />,
              style:
                selectedKey == "dashboard"
                  ? selectedItemsStyle
                  : {
                      color: "#aaa",
                    },
            },
            {
              label: "Admin",
              key: "admin",
              icon: <GrGroup />,
              style:
                selectedKey == "admin" ? selectedItemsStyle : { color: "#aaa" },
            },
            {
              label: "Helpers",
              key: "helpers",
              icon: <FaGears />,
              style:
                selectedKey == "helpers"
                  ? selectedItemsStyle
                  : { color: "#aaa" },
            },
            {
              label: "Residents",
              key: "residents",
              icon: <CiFileOn />,
              style:
                selectedKey == "residents"
                  ? selectedItemsStyle
                  : { color: "#aaa" },
            },
          ]}
        >
          <Typography.Text
            style={{
              textAlign: "center",
              display: "block",
              fontSize: 21,
              marginTop: 20,
              marginBottom: 30,
              color: "#fff",
            }}
          >
            North Poblacion Maramag
          </Typography.Text>
          <div
            style={{
              backgroundColor: "#263544",
              paddingBottom: 10,
              paddingTop: 10,
            }}
          >
            <div
              style={{
                marginRight: 15,
                marginLeft: 15,
              }}
            >
              <Input
                suffix={<CiSearch color="#a0a0a0" />}
                style={{
                  borderRadius: 25,
                  backgroundColor: "#202d3a",
                  border: "none",
                }}
                styles={{
                  input: {
                    backgroundColor: "#202d3a",
                    color: "#bfbfbf",
                  },
                }}
              />
            </div>
          </div>
        </Sider>
        <Layout>
          <Header app_key={app_key} />
          <Content selectedKey={selectedKey} setSelectedKey={setSelectedKey}>
            {selectedKey == "dashboard" ? <Dashboard /> : null}
            {selectedKey == "residents" ? <Residents /> : null}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  return { props: { app_key: process.env.FILESTACK_KEY } };
}

export default MyApp;
