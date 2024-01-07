import React from "react";
import { Modal, Steps } from "antd";

const CompainViewer = ({ open, close }) => {
  return (
    <Modal open={false} footer={null} closable={false} width={1000} centered>
      <Steps
        type="navigation"
        size="small"
        //   current={current}
        //   onChange={onChange}
        items={[
          {
            status: "finish",
            title: "finish 1",
          },
          {
            status: "finish",
            title: "finish 2",
          },
          {
            status: "process",
            title: "current process",
          },
          {
            status: "wait",
            title: "wait",
          },
        ]}
      />
    </Modal>
  );
};

export default CompainViewer;
