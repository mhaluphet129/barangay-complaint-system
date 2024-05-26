import React, { useEffect, useState } from "react";
import { Input, Layout, Tooltip, Typography } from "antd";
import { Sider, Header, Content } from "../layout";

import { VscGraph } from "react-icons/vsc";
import { FaUsers } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { BsPersonFillLock, BsFillPrinterFill } from "react-icons/bs";
import { LiaSmsSolid } from "react-icons/lia";
import { BiMessageRoundedError } from "react-icons/bi";
import { PiNewspaperThin } from "react-icons/pi";
import { MdOutlineTextsms } from "react-icons/md";

import Residents from "../../components/residents";
import Dashboard from "../../components/dashboard";
import Admin from "../../components/admins";
import Complain from "../../components/complain";
import PrintForms from "../../components/print_forms";
import SMS from "../../components/sms";
import Cookies from "js-cookie";
import News from "@/components/news";
import SMSBulk from "@/components/sms_bulk";

const MyApp = ({ app_key, sms_key }) => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [openForms, setOpenForms] = useState(false);
  const [openBulkSMS, setOpenBulkSMS] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const selectedItemsStyle = {
    color: "#aaa",
    backgroundColor: "#202d3a",
    borderRadius: 0,
    borderLeft: "2px solid #3a96ff",
  };

  useEffect(() => {
    try {
      const _ = Cookies.get("currentUser");
      setCurrentUser(JSON.parse(_));
    } catch {}
  }, []);

  return (
    <>
      <Layout>
        <Sider
          selectedIndex={(e) => {
            switch (e.key) {
              case "print_form": {
                setOpenForms(true);
                break;
              }
              case "bulk_sms": {
                setOpenBulkSMS(true);
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
            currentUser && currentUser.role == "superadmin"
              ? {
                  label: "Admin",
                  key: "admin",
                  icon: <BsPersonFillLock />,
                  style:
                    selectedKey == "admin"
                      ? selectedItemsStyle
                      : { color: "#aaa" },
                }
              : null,
            {
              label: "Complaints",
              key: "complaints",
              icon: <BiMessageRoundedError />,
              style:
                selectedKey == "complaints"
                  ? selectedItemsStyle
                  : { color: "#aaa" },
            },
            {
              label: "SMS",
              key: "sms",
              icon: <LiaSmsSolid />,
              style:
                selectedKey == "sms" ? selectedItemsStyle : { color: "#aaa" },
            },
            {
              label: "News and Announcement",
              key: "news",
              icon: <PiNewspaperThin />,
              style:
                selectedKey == "news" ? selectedItemsStyle : { color: "#aaa" },
            },
            {
              label: "Print Form",
              key: "print_form",
              icon: <BsFillPrinterFill />,
              style: { color: "#aaa" },
            },
            {
              label: "Bulk SMS",
              key: "bulk_sms",
              icon: <MdOutlineTextsms />,
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
              paddingRight: 15,
              paddingLeft: 15,
            }}
          >
            <Tooltip title="Temporarily Disabled">
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
                disabled
              />
            </Tooltip>
          </div>
        </Sider>
        <Layout>
          <Header app_key={app_key} />
          <Content selectedKey={selectedKey} setSelectedKey={setSelectedKey}>
            {selectedKey == "dashboard" ? (
              <Dashboard setSelectedKey={setSelectedKey} />
            ) : null}
            {selectedKey == "residents" ? <Residents smskey={sms_key} /> : null}
            {selectedKey == "admin" ? <Admin /> : null}
            {selectedKey == "complaints" ? (
              <Complain appKey={app_key} smskey={sms_key} />
            ) : null}
            {selectedKey == "sms" ? <SMS sms_key={sms_key} /> : null}
            {selectedKey == "news" && <News appKey={app_key} />}
          </Content>
        </Layout>
      </Layout>

      {/* ETC */}
      <PrintForms
        open={openForms}
        close={() => setOpenForms(false)}
        funcOpen={() => setOpenForms(true)}
      />
      <SMSBulk
        open={openBulkSMS}
        close={() => setOpenBulkSMS(false)}
        smskey={sms_key}
      />
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: { app_key: process.env.FILESTACK_KEY, sms_key: process.env.SMS_KEY },
  };
}

export default MyApp;
