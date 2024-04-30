import React, { useState } from "react";
import { Input, Modal, Image, message, Typography } from "antd";
import { PickerDropPane } from "filestack-react";
import sanitizeHtml from "sanitize-html";

import WYSIWYG from "./wysiwyg";

const NewNews = ({ open, close, onSave, appKey }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);

  const clearAll = () => {
    setTitle("");
    setDescription("");
    setPhotos([]);
    close();
  };

  const handlePublish = async () => {
    if (title == "") {
      message.error("Title is empty. Please Provide");
      return;
    }

    if (description == "") {
      message.error("News Content is Empty. Please Provide");
      return;
    }
    let a = await onSave(title, sanitizeHtml(description), photos);
    if (a) clearAll();
  };

  return (
    <Modal
      open={open}
      onCancel={clearAll}
      closable={false}
      title={
        <Typography.Title level={4}>New News/Announcement</Typography.Title>
      }
      width={1200}
      okText="PUBLISH NEWS"
      onOk={handlePublish}
      okButtonProps={{
        size: "large",
      }}
      cancelButtonProps={{
        size: "large",
      }}
      destroyOnClose
    >
      <Input
        size="large"
        placeholder="Title"
        style={{
          marginBottom: 10,
        }}
        onChange={(e) => setTitle(e.target.value)}
      />
      <WYSIWYG onChange={setDescription} />
      <div
        style={{ display: "block", cursor: "pointer", marginBottom: 10 }}
        id="picker-container"
      >
        <PickerDropPane
          apikey={appKey}
          onUploadDone={(res) => {
            setPhotos(res?.filesUploaded.map((_) => _.url));
          }}
          pickerOptions={{
            container: "picker-container",
            maxFiles: 3,
            accept: "image/*",
          }}
        />
      </div>
      {photos.map((_, i) => (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              position: "relative",
              width: 300,
              marginBottom: 10,
            }}
          >
            <Image src={_} alt="random_photo" width="100%" />
          </div>
        </>
      ))}
    </Modal>
  );
};

export default NewNews;
