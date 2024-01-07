import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Tag,
  message,
  List,
  Steps,
  Card,
  Space,
  Tooltip,
} from "antd";
import { PlusOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import axios from "axios";

import NewComplain from "./components/new_complaint";
import CompainViewer from "./components/complain_viewer";

// TODO: added automatic sms every 15 days from complains created date for amec settlement

const Complain = () => {
  const [trigger, setTrigger] = useState(0);
  const [loading, setLoading] = useState("");
  const [complains, setComplains] = useState([]);
  const [openNewComplain, setOpenNewComplain] = useState(false);

  const columns = [
    {
      title: "Complain ID",
      render: (_, row) => row?._id.substr(-6),
    },
    {
      title: "Resident/Complainer",
      render: (_, row) => row.residentId?.name + " " + row.residentId?.lastname,
    },
    {
      title: "Responder",
      dataIndex: "respondentName",
    },
    {
      title: "Is Responded ?",
      render: (_, row) =>
        row?.isResponded ? (
          <CheckOutlined
            style={{
              color: "#0f0",
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
      title: "Status",
      render: (_, row) => {
        let type = row?.settlement?.at(-1).type;
        let color = "blue";

        if (["unsolved", "disregard", "dismissed"].includes(type))
          color = "red";
        else if (type == "solved") color = "green";

        return <Tag color={color}>{type?.toLocaleUpperCase()}</Tag>;
      },
    },
    {
      title: "Added Date",
      render: (_, row) => dayjs(row?.dateOfBirth).format("MMM DD, YYYY"),
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
        onClick={() => setOpenNewComplain(true)}
      >
        New Complain
      </Button>
    </div>
  );

  useEffect(() => {
    setLoading("fetch");
    (async (_) => {
      let { data } = await axios.get("/api/complain/get-complains");
      if (data.success) {
        setComplains(data.complain);
        setLoading("");
      } else {
        message.error(data?.message ?? "Error in the server.");
        setLoading("");
      }
    })(axios);
  }, [trigger]);
  return (
    <>
      <NewComplain
        open={openNewComplain}
        close={() => setOpenNewComplain(false)}
      />
      <CompainViewer />
      {/* end of context */}
      <Card
        bodyStyle={{
          padding: 20,
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={complains}
          renderItem={(item, index) => (
            <List.Item
              style={{
                padding: 0,
                paddingTop: 10,
              }}
            >
              <List.Item.Meta
                title={
                  <Space>
                    <Tooltip title="Complain ID">
                      {item?._id.substr(-6)}
                    </Tooltip>
                    {item?.isResponded ? (
                      <Tag color="green">Responded</Tag>
                    ) : (
                      <Tag color="red">Not Responded</Tag>
                    )}
                  </Space>
                }
                description={
                  <>
                    Complain by:{" "}
                    {`${item?.residentId?.name} ${item?.residentId?.lastname} `}
                    <br />
                    Respondent: {item?.respondentName}
                    <br />
                    <span style={{ marginTop: 25 }}>{item?.description}</span>
                  </>
                }
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* {(() => {
                  let type = item?.settlement?.at(-1).type;
                  let color = "blue";

                  if (["unsolved", "disregard", "dismissed"].includes(type))
                    color = "red";
                  else if (type == "solved") color = "green";

                  return <Tag color={color}>{type?.toLocaleUpperCase()}</Tag>;
                })()} */}

                <Steps
                  style={{
                    marginTop: 8,
                  }}
                  type="inline"
                  current={0}
                  items={[
                    {
                      title: "Step 1",
                      description: "This is a Step 1.",
                    },
                    {
                      title: "Step 2",
                      description: "This is a Step 2.",
                    },
                    {
                      title: "Step 3",
                      description: "This is a Step 3.",
                    },
                  ]}
                />
              </div>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default Complain;
