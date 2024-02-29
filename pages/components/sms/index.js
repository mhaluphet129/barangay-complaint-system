import React, { useEffect, useState } from "react";
import { Table, Button, message, Tag, Tabs, Space, Tooltip } from "antd";
import dayjs from "dayjs";
import axios from "axios";

import { PlusOutlined, EyeOutlined } from "@ant-design/icons";

import SmsComposer from "../sms_composer";
import SMSService from "@/pages/assets/utilities/sms";

const SMS = ({ sms_key }) => {
  const [openNewSms, setOpenNewSms] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [loading, setLoading] = useState("");
  const [sms, setSms] = useState([]);
  const [inSms, setInSms] = useState([]);
  const [selectedTabs, setSelectedTabs] = useState("outgoing");
  const _ = new SMSService(sms_key);

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
      title: "Sender",
      render: (_, row) =>
        typeof row?.originator == "object"
          ? `${row?.originator?.name} ${row?.originator?.lastname}`
          : row?.originator,
    },
    {
      title: "Sent to",
      dataIndex: "number",
    },
    {
      title: "Keywords",
      render: (_, row) => topKeyword(row?.keywords),
    },
    {
      title: "Added Date",
      render: (_, row) => dayjs(row?.createdAt).format("MMM DD, YYYY"),
    },
    {
      title: "Functions",
      align: "center",
      render: (_, row) => (
        <Space>
          <Tooltip title="view full">
            <Button icon={<EyeOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const columns2 = [
    {
      title: "Number",
      dataIndex: "phone",
    },
    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title: "Date Received",
      dataIndex: "timestamp",
      render: (_) => dayjs.unix(_).format("MMM DD, YYYY - hh:mma"),
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

  const fetchOutgoingSMS = () => {
    setLoading("fetch");
    (async (_) => {
      let { data } = await axios.get("/api/sms/get-sms");
      if (data.success) {
        setSms(data.sms);
        setLoading("");
      } else {
        message.error(data?.message ?? "Error in the server.");
        setLoading("");
      }
    })(axios);
  };

  const fetchIngoingSMS = (page) => {
    setLoading("fetch");
    (async (q) => {
      let { success, data } = await q.getSms({ page });

      if (success) {
        setInSms(data);
        setLoading("");
      } else setLoading("");
    })(_);
  };

  useEffect(() => {
    if (selectedTabs == "outgoing") fetchOutgoingSMS();
    else fetchIngoingSMS(0);
  }, [trigger, selectedTabs]);

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
    </>
  );
};

export default SMS;
