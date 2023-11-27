import React, { useEffect, useState } from "react";
import { Table, Popconfirm, Button, message } from "antd";
import dayjs from "dayjs";
import axios from "axios";

import { DeleteOutlined } from "@ant-design/icons";

const Admins = () => {
  const [trigger, setTrigger] = useState(0);
  const [loading, setLoading] = useState("");
  const [admins, setAdmins] = useState([]);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Name",
      render: (_, row) => row.name + " " + row.lastname,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Added Date",
      render: (_, row) => dayjs(row?.dateOfBirth).format("MMM DD, YYYY"),
    },
    {
      title: "Functions",
      render: (_, row) => (
        <Popconfirm
          title="Are you sure?"
          okText="Confirm"
          onCancel={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onConfirm={() => {
            (async (_) => {
              let { data } = await _.delete("/api/admin/delete-admin", {
                params: {
                  id: row?._id,
                },
              });

              if (data.success) {
                setTrigger(trigger + 1);
                message.success(data.message ?? "Success");
              } else {
                message.error(message?.error ?? "Server Error");
              }
            })(axios);
          }}
        >
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          />
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    setLoading("fetch");
    (async (_) => {
      let { data } = await axios.get("/api/admin/get-admins");
      if (data.success) {
        setAdmins(data.admins);
        setLoading("");
      } else {
        message.error(data?.message ?? "Error in the server.");
        setLoading("");
      }
    })(axios);
  }, [trigger]);
  return (
    <>
      <Table
        columns={columns}
        style={{ borderRadius: 0 }}
        loading={loading == "fetch"}
        dataSource={admins}
      />
    </>
  );
};

export default Admins;
