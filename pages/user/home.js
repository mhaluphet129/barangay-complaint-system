import React, { useState } from "react";
import { Input, Layout, Typography } from "antd";
import { Sider, Header, Content } from "../layout";

import { VscGraph } from "react-icons/vsc";
import { FaUsers } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { BsPersonFillLock, BsFillPrinterFill } from "react-icons/bs";
import { PlusOutlined } from "@ant-design/icons";
import { BiMessageRoundedError } from "react-icons/bi";

import Residents from "../components/residents";
import Dashboard from "../components/dashboard";
import Admin from "../components/admins";
import Complain from "../components/complain";

import SmsComposer from "../components/sms_composer";
import PrintForms from "../components/print_forms";

const MyApp = ({ app_key }) => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [openComposer, setOpenComposer] = useState(false);
  const [openForms, setOpenForms] = useState(false);
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
          selectedIndex={(e) => {
            switch (e.key) {
              case "compose": {
                setOpenComposer(true);
                break;
              }
              case "print_form": {
                setOpenForms(true);
                break;
              }
              default: {
                setSelectedKey(e.key);
              }
            }
          }}
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
              label: "Residents",
              key: "residents",
              icon: <FaUsers />,
              style:
                selectedKey == "residents"
                  ? selectedItemsStyle
                  : { color: "#aaa" },
            },
            {
              label: "Admin",
              key: "admin",
              icon: <BsPersonFillLock />,
              style:
                selectedKey == "admin" ? selectedItemsStyle : { color: "#aaa" },
            },
            {
              label: "Complains",
              key: "complain",
              icon: <BiMessageRoundedError />,
              style:
                selectedKey == "complain"
                  ? selectedItemsStyle
                  : { color: "#aaa" },
            },
            {
              label: "Compose Message",
              key: "compose",
              icon: <PlusOutlined />,
              style: { color: "#aaa" },
            },
            {
              label: "Print Form",
              key: "print_form",
              icon: <BsFillPrinterFill />,
              style: { color: "#aaa" },
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
            {selectedKey == "admin" ? <Admin /> : null}
            {selectedKey == "complain" ? <Complain /> : null}
          </Content>
        </Layout>
      </Layout>

      {/* ETC */}
      <SmsComposer
        open={openComposer}
        close={() => setOpenComposer(false)}
        onSend={() => {}}
      />
      <PrintForms
        open={openForms}
        close={() => setOpenForms(false)}
        funcOpen={() => setOpenForms(true)}
      />
    </>
  );
};

export async function getServerSideProps() {
  return { props: { app_key: process.env.FILESTACK_KEY } };
}

export default MyApp;
