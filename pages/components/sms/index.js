import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  message,
  Tag,
  Tabs,
  Space,
  Tooltip,
  Popconfirm,
  Typography,
} from "antd";
import dayjs from "dayjs";
import Cookies from "js-cookie";

import {
  PlusOutlined,
  CloseOutlined,
  CheckOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";

import SmsComposer from "../sms_composer";
import SMSService from "@/assets/utilities/sms";
import { getKeyword } from "@/assets/utilities/keyword_generator";
import SMSViewer from "./components/sms_viewer";

// TODO: Add filter
// Todo: fix registered as complai

const SMS = ({ sms_key }) => {
  const [openNewSms, setOpenNewSms] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [loading, setLoading] = useState("");
  const [sms, setSms] = useState([]);
  const [inSms, setInSms] = useState([]);
  const [selectedTabs, setSelectedTabs] = useState("outgoing");
  const [smsViewerOpt, setSmsViewerOpt] = useState({ open: false, data: null });

  const _ = new SMSService(sms_key);
  let currentUser = Cookies.get("currentUser");

  const topKeyword = (msg) => {
    if (msg.length > 3) {
      const node = (
        <>
          <Tag>{msg[0]}</Tag>
          <Tag>{msg[1]}</Tag>
          <Tag>{msg[2]}</Tag>
          <Tag>{`${msg.length - 3}+ more`}</Tag>
        </>
      );
      return node;
    } else if (msg.length == 0) return <></>;
    else
      return (
        <>
          {msg.map((e) => (
            <Tag>{e}</Tag>
          ))}
        </>
      );
  };

  const columns = [
    {
      title: "Sent to",
      dataIndex: "phone",
    },
    {
      title: "Message",
      width: 300,
      dataIndex: "message",
    },
    {
      title: "Keywords",
      dataIndex: "message",
      render: (_) => topKeyword(getKeyword(_)),
    },
    {
      title: "Added Date",
      dataIndex: "timestamp",
      render: (_) => dayjs(new Date(_ * 1000)).format("MMM DD, YYYY"),
    },
    // {
    //   title: "Functions",
    //   align: "center",
    //   render: (_, row) => (
    //     <Space>
    //       <Tooltip title="view full">
    //         <Button icon={<EyeOutlined />} />
    //       </Tooltip>
    //     </Space>
    //   ),
    // },
  ];

  const columns2 = [
    {
      title: "Number",
      dataIndex: "phone",
    },
    {
      title: "Message",
      dataIndex: "message",
      render: (_) => (
        <Typography.Paragraph
          style={{
            maxWidth: 300,
          }}
          ellipsis={{
            rows: 1,
          }}
        >
          {_}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Registered as Complain",
      dataIndex: "toComplain",
      align: "center",
      render: (_) =>
        _ ? (
          <CheckOutlined
            style={{
              color: "#5cb85c",
            }}
          />
        ) : (
          <CloseOutlined
            style={{
              color: "#f00",
            }}
          />
        ),
    },
    {
      title: "Date Received",
      dataIndex: "timestamp",
      render: (_) => dayjs.unix(_).format("MMM DD, YYYY - hh:mma"),
    },
    {
      title: "Functions",
      align: "center",
      render: (q, row) => (
        <Space>
          <Tooltip title="Register as Complain">
            <Popconfirm
              title="Confirmation"
              description="You are about to register this sms to the system"
              okText="Confirm"
              okButtonProps={{
                size: "large",
              }}
              cancelButtonProps={{
                size: "large",
              }}
              onConfirm={async (e) => {
                e.stopPropagation();
                e.preventDefault();

                await _.toComplain(q, JSON.parse(currentUser)._id).then((e) => {
                  if (e.success) setTrigger(trigger + 1);
                });
              }}
              onCancel={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <Button
                icon={<AppstoreAddOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const tableHeader = () => (
    <div>
      <Button
        icon={<PlusOutlined />}
        style={{
          backgroundColor: "green",
          color: "#fff",
          fontWeight: 400,
        }}
        onClick={() => setOpenNewSms(true)}
      >
        New SMS
      </Button>
    </div>
  );

  const fetchOutgoingSMS = (page) => {
    setLoading("fetch");

    (async (q) => {
      let { success, data } = await q.getReceivedSms({ page });

      if (success) {
        setSms(data);
        setLoading("");
      } else {
        message.error(data?.message ?? "Error in the server.");
        setLoading("");
      }
    })(_);
  };

  const fetchIngoingSMS = (page) => {
    setLoading("fetch");
    (async (q) => {
      let { success, data } = await q.getSentSms({ page });
      if (success) {
        setInSms(data);
        setLoading("");
      } else setLoading("");
    })(_);
  };

  useEffect(() => {
    if (selectedTabs == "outgoing") fetchOutgoingSMS(0);
    else fetchIngoingSMS(0);
  }, [trigger, selectedTabs]);

  useEffect(() => {
    currentUser = JSON.parse(currentUser);
  }, [currentUser]);

  return (
    <>
      <Tabs
        tabPosition="left"
        onChange={(e) => setSelectedTabs(e)}
        activeKey={selectedTabs}
        items={[
          {
            label: "Outgoing",
            key: "outgoing",
            children: (
              <Table
                title={tableHeader}
                columns={columns}
                style={{ borderRadius: 0 }}
                loading={loading == "fetch"}
                dataSource={sms}
                rowKey={(e) => e._id}
              />
            ),
          },
          {
            label: "Ingoing",
            key: "ingoing",
            children: (
              <Table
                columns={columns2}
                style={{ borderRadius: 0 }}
                loading={loading == "fetch"}
                dataSource={inSms}
                rowKey={(e) => e._id}
                onRow={(_) => {
                  return {
                    onClick: () => setSmsViewerOpt({ open: true, data: _ }),
                  };
                }}
              />
            ),
          },
        ]}
      />

      {/* context holder */}
      <SmsComposer
        open={openNewSms}
        close={() => setOpenNewSms(false)}
        onSend={() => setTrigger(trigger + 1)}
      />
      <SMSViewer
        open={smsViewerOpt.open}
        close={() => setSmsViewerOpt({ open: false, data: null })}
        sms={smsViewerOpt.data}
      />
    </>
  );
};

export default SMS;
