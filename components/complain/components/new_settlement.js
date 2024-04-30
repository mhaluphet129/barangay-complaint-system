import React, { useState } from "react";
import { Button, Input, Modal, Select } from "antd";

const NewSettlement = ({ open, close, onAdd }) => {
  const [status, setStatus] = useState(null);
  const [description, setDescription] = useState(null);

  const clearAll = () => {
    setStatus(null);
    setDescription(null);
    close();
  };

  return (
    <Modal
      open={open}
      onCancel={clearAll}
      closable={false}
      title="New Settlement"
      footer={null}
    >
      <Select
        placeholder="Settlement Status"
        value={status}
        style={{
          display: "block",
          marginBottom: 5,
        }}
        onSelect={setStatus}
        options={[
          "processed",
          "solved",
          "unsolved",
          "disregard",
          "dismissed",
        ].map((e) => {
          return {
            label: e.toLocaleUpperCase(),
            value: e,
          };
        })}
        allowClear
      />
      <Input.TextArea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        autoSize={{
          minRows: 3,
          maxRows: 7,
        }}
        style={{
          display: "block",
          marginBottom: 20,
        }}
        allowClear
        showCount
      />
      <Button
        type="primary"
        size="large"
        disabled={status == ""}
        onClick={() => {
          onAdd(status, description);
          clearAll();
        }}
        block
      >
        ADD NEW SETTLEMENT
      </Button>
    </Modal>
  );
};

export default NewSettlement;
