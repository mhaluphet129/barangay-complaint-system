import { Modal, Typography } from "antd";
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
      <Typography.Text>{sms?.message}</Typography.Text>
    </Modal>
  );
};

export default SMSViewer;
