import React, { useEffect, useState } from "react";
import { Col, Divider, Row, Spin } from "antd";
import axios from "axios";
import dayjs from "dayjs";

const News = () => {
  const [loading, setLoading] = useState("");
  const [news, setNews] = useState([]);

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
  }, []);

  return (
    <Spin spinning={loading == "fetch"}>
      <div className="class-container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 25,
          }}
        >
          <div className="news-container">
            <div className="img-container">
              <img
                src={news[0]?.imgs[0]}
                style={{
                  width: "80vw",
                  borderRadius: 10,
                  maxHeight: "25em",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                alt="image"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 25,
                  left: 25,
                  color: "#fff",
                  zIndex: 2,
                }}
              >
                <strong>Barangay Admin</strong> <br />
                {dayjs(news[0]?.createdAt).format("MMMM DD, YYYY")}
              </div>
            </div>
            <div className="news-title">{news[0]?.title}</div>
          </div>
        </div>
        <div style={{ width: "80vw", marginTop: 25 }}>
          <Row gutter={[16, 16]}>
            <Col span={18}>
              <span style={{ fontSize: "1.4em", textAlign: "start" }}>
                Recent News &#9734;
              </span>
            </Col>
            <Col
              span={6}
              style={{
                borderLeft: "1px solid #aaa",
              }}
            >
              2
            </Col>
          </Row>
        </div>
      </div>
    </Spin>
  );
};

export default News;
