import React, { useEffect, useState } from "react";
import { Table, Space, Popconfirm, Button, message } from "antd";
import dayjs from "dayjs";
import axios from "axios";

import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ResidentForm from "./components/resident_form";

const Residents = () => {
  const [openNewResident, setOpenNewResident] = useState({
    open: false,
    mode: "",
    data: {},
  });
  const [trigger, setTrigger] = useState(0);
  const [loading, setLoading] = useState("");
  const [residents, setResidents] = useState([]);

  const columns = [
    {
      title: "Id",
      render: (_, row) => row._id.substr(row._id.length - 6),
    },
    {
      title: "Name",
      render: (_, row) => row.name + " " + row.lastname,
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile #",
      dataIndex: "phoneNumber",
    },
    {
      title: "Birthdate",
      render: (_, row) => dayjs(row?.dateOfBirth).format("MMM DD, YYYY"),
    },
    {
      title: "Functions",
      render: (_, row) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() =>
              setOpenNewResident({
                open: true,
                mode: "edit",
                data: row,
              })
            }
          />
          <Popconfirm
            title="Are you sure?"
            okText="Confirm"
            onCancel={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onConfirm={() => {
              (async (_) => {
                let { data } = await _.delete("/api/resident/delete-resident", {
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
        onClick={() =>
          setOpenNewResident({
            open: true,
            mode: "new",
            data: {},
          })
        }
      >
        New
      </Button>
    </div>
  );

  useEffect(() => {
    setLoading("fetch");
    (async (_) => {
      let { data } = await axios.get("/api/resident/get-residents");
      if (data.success) {
        setResidents(data.residents);
        setLoading("");
      } else {
        message.error(data?.message ?? "Error in the server.");
        setLoading("");
      }
    })(axios);
  }, [trigger]);
  return (
    <>
      <ResidentForm
        {...openNewResident}
        close={() => setOpenNewResident({ open: false, mode: "", data: {} })}
        refresh={() => setTrigger(trigger + 1)}
      />
      <Table
        title={tableHeader}
        columns={columns}
        style={{ borderRadius: 0 }}
        loading={loading == "fetch"}
        dataSource={residents}
      />
    </>
  );
};

export default Residents;
