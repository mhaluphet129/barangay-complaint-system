import { Modal, Tag, Typography } from "antd";
import dayjs from "dayjs";
import React from "react";

const SMSViewer = ({ open, close, sms }) => {
  return (
    <Modal open={open} onCancel={close} title={sms?.phone} footer={null}>
      <Typography.Text type="secondary">
        Received at{" "}
        {dayjs(new Date(sms?.createdAt)).format("MMMM DD 'YY - hh:mma")}
      </Typography.Text>
      <br />
      <br />
      <div>
        <span>Keywords: </span>{" "}
        {sms?.keywords.map((e) => (
          <Tag>{e}</Tag>
        ))}
      </div>
      <div
        style={{
          padding: 15,
          borderRadius: 10,
          backgroundColor: "#eee",
          marginTop: 10,
        }}
      >
        <Typography.Text>{sms?.message}</Typography.Text>
      </div>
    </Modal>
  );
};

export default SMSViewer;
