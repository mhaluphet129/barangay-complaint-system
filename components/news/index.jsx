import React, { useEffect, useState } from "react";
import {
  Table,
  Popconfirm,
  Button,
  message,
  Space,
  Tooltip,
  Image,
  Modal,
} from "antd";
import dayjs from "dayjs";
import axios from "axios";

import NewNews from "./components/new_news";
import { DeleteOutlined, PlusOutlined, EyeOutlined } from "@ant-design/icons";

const News = ({ appKey }) => {
  const [trigger, setTrigger] = useState(0);
  const [loading, setLoading] = useState("");
  const [news, setNews] = useState([]);
  const [openNews, setOpenNews] = useState(false);

  const [imageViewer, setImageViewer] = useState({
    open: false,
    image: [],
    title: "",
  });
  const [contentViewer, setContentViewer] = useState({
    open: false,
    title: "",
    content: null,
  });

  const tableHeader = () => (
    <div>
      <Button
        icon={<PlusOutlined />}
        style={{
          backgroundColor: "green",
          color: "#fff",
          fontWeight: 400,
        }}
        onClick={() => setOpenNews(true)}
      >
        Publish News
      </Button>
    </div>
  );

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Slug Name",
      dataIndex: "slug_name",
    },
    {
      title: "Added Date",
      render: (_, row) => dayjs(row?.dateOfBirth).format("MMM DD, YYYY"),
    },

    {
      title: "Functions",
      width: 100,
      align: "center",
      render: (_, row) => (
        <Space>
          <Popconfirm
            title="Are you sure?"
            okText="Confirm"
            onCancel={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onConfirm={() => {
              (async (_) => {
                let { data } = await _.delete("/api/news", {
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
          <Tooltip title="View Images">
            <Button
              icon={<EyeOutlined />}
              onClick={() =>
                setImageViewer({
                  open: true,
                  image: row.imgs,
                  title: row.title,
                })
              }
            />
          </Tooltip>
          <Tooltip title="View Content">
            <Button
              icon={<EyeOutlined />}
              onClick={() =>
                setContentViewer({
                  open: true,
                  title: row.title,
                  content: row.description,
                })
              }
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleNewNews = (title, description, imgs) => {
    return (async (_) => {
      let { data } = await _.post("/api/news", { title, description, imgs });
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
      let { data } = await axios.get("/api/news");
      if (data.success) {
        setNews(data.news);
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
        dataSource={news}
      />
      {/* context */}
      <NewNews
        open={openNews}
        close={() => setOpenNews(false)}
        onSave={handleNewNews}
        appKey={appKey}
      />
      <ImageViewer
        open={imageViewer.open}
        close={() => setImageViewer({ open: false, image: [], title: "" })}
        title={imageViewer.title}
        images={imageViewer.image}
      />
      <ContentViewer
        open={contentViewer.open}
        close={() =>
          setContentViewer({ open: false, content: null, title: "" })
        }
        title={contentViewer.title}
        content={contentViewer.content}
      />
    </>
  );
};

const ImageViewer = ({ open, close, title, images }) => {
  return (
    <Modal
      open={open}
      onCancel={close}
      closable={false}
      footer={null}
      title={`${title}'s Images`}
    >
      <Image.PreviewGroup>
        {images.map((e) => (
          <Image src={e} />
        ))}
      </Image.PreviewGroup>
    </Modal>
  );
};

const ContentViewer = ({ open, close, title, content }) => {
  return (
    <Modal
      open={open}
      onCancel={close}
      closable={false}
      footer={null}
      title={`${title}'s Content`}
    >
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Modal>
  );
};

export default News;
