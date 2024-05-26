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
  DeleteOutlined,
} from "@ant-design/icons";

import SmsComposer from "../sms_composer";
import SMSService from "@/assets/utilities/sms";
import { getKeyword } from "@/assets/utilities/keyword_generator";
import SMSViewer from "./components/sms_viewer";
import axios from "axios";

const SMS = ({ sms_key }) => {
  const [openNewSms, setOpenNewSms] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [loading, setLoading] = useState("");
  const [sms, setSms] = useState([]);
  const [selectedTabs, setSelectedTabs] = useState("inbound");
  const [smsViewerOpt, setSmsViewerOpt] = useState({ open: false, data: null });

  const _ = new SMSService(sms_key);
  let currentUser = Cookies.get("currentUser");

  const handleDeleteSMS = async (_id) => {
    let { data } = await axios.get("/api/sms/delete-sms", {
      params: {
        _id,
      },
    });

    if (data.success) {
      message.success(data?.message ?? "Success");
      setTrigger(trigger + 1);
    }
  };

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
      dataIndex: "number",
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
      dataIndex: "createdAt",
      render: (_) => dayjs(_).format("MMM DD, YYYY hh:mma"),
    },
    {
      title: "Functions",
      align: "center",
      render: (_, row) => (
        <Popconfirm
          title="Are you sure you want to delete this sms ?"
          okButtonProps={{ danger: true }}
          okText="DELETE"
          onConfirm={() =>
            (async (_) => {
              let { data } = await _.get("/api/sms/delete-sms", {
                params: {
                  _id: row?._id,
                },
              });

              if (data?.success ?? false) {
                message.success("Successfully Delete SMS");
                setTrigger(trigger + 1);
              }
            })(axios)
          }
        >
          <Button icon={<DeleteOutlined />} type="primary" danger />
        </Popconfirm>
      ),
    },
  ];

  const columns2 = [
    {
      title: "Number",
      render: (_, row) =>
        row?.complainer ? row?.complainer?.respondentName : `+${row?.number}`,
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
      width: 100,
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
      dataIndex: "createdAt",
      render: (_) => dayjs(_).format("MMM DD, YYYY hh:mma"),
    },
    {
      title: "Functions",
      align: "center",
      render: (q, row) => (
        <Space>
          <Popconfirm
            title="Are you sure you want to delete this SMS ?"
            okType="primary"
            okText="DELETE"
            okButtonProps={{ danger: true }}
            onConfirm={(e) => {
              handleDeleteSMS(q._id);
              e.stopPropagation();
              e.preventDefault();
            }}
            onCancel={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <Button
              icon={<DeleteOutlined />}
              type="primary"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              danger
            ></Button>
          </Popconfirm>
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

  const fetchSms = (page, type) => {
    setLoading("fetch");
    (async (q) => {
      let res = await q.get("/api/sms/get-sms", {
        params: {
          type,
        },
      });
      if (res.data.success) {
        setSms(res.data.sms);
        setLoading("");
      } else {
        message.error(data?.message ?? "Error in the server.");
        setLoading("");
      }
    })(axios);
  };

  useEffect(() => {
    fetchSms(0, selectedTabs);
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
            label: "INGOING",
            key: "inbound",
            children: (
              <Table
                columns={columns2}
                style={{ borderRadius: 0 }}
                loading={loading == "fetch"}
                dataSource={sms}
                rowKey={(e) => e._id}
                onRow={(_) => {
                  return {
                    onClick: () => setSmsViewerOpt({ open: true, data: _ }),
                  };
                }}
              />
            ),
          },
          {
            label: "OUTGOING",
            key: "outbound",
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
        ]}
      />

      {/* context holder */}
      <SmsComposer
        open={openNewSms}
        close={() => setOpenNewSms(false)}
        onSend={() => setTrigger(trigger + 1)}
        smskey={sms_key}
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
