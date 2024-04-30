import React, { useEffect, useState } from "react";
import { Table, Popconfirm, Button, message } from "antd";
import dayjs from "dayjs";
import axios from "axios";

import NewAdmin from "./new_admin";

import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const Admins = () => {
  const [trigger, setTrigger] = useState(0);
  const [loading, setLoading] = useState("");
  const [admins, setAdmins] = useState([]);
  const [openNewAdmin, setOpenNewAmin] = useState(false);

  const tableHeader = () => (
    <div>
      <Button
        icon={<PlusOutlined />}
        style={{
          backgroundColor: "green",
          color: "#fff",
          fontWeight: 400,
        }}
        onClick={() => setOpenNewAmin(true)}
      >
        New Admin
      </Button>
    </div>
  );

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

  const handleNewAdmin = (val) => {
    return (async (_) => {
      let { data } = await _.post("/api/admin/new-admin", val);

      if (data.success) {
        message.success(data?.message ?? "Success");
        setTrigger(trigger + 1);
        return true;
      } else {
        message.error(data?.message ?? "Error");
        return false;
      }
    })(axios);
  };

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
        title={tableHeader}
        columns={columns}
        style={{ borderRadius: 0 }}
        loading={loading == "fetch"}
        dataSource={admins}
      />
      {/* context */}
      <NewAdmin
        open={openNewAdmin}
        close={() => setOpenNewAmin(false)}
        handleFinish={handleNewAdmin}
      />
    </>
  );
};

export default Admins;
