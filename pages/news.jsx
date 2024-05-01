import React, { useEffect, useState } from "react";
import { Col, Row, Spin, Typography } from "antd";
import Link from "next/link";
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
        {news.length > 0 && (
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
                  className="img-label"
                  style={{
                    position: "absolute",
                    bottom: 25,
                    left: 25,
                    color: "#fff",
                    zIndex: 2,
                  }}
                >
                  <Typography.Paragraph
                    style={{
                      maxWidth: "25vw",
                      color: "#fff",
                      fontSize: "1.5em",
                      margin: 0,
                    }}
                    ellipsis
                  >
                    {news[0]?.title}
                  </Typography.Paragraph>{" "}
                  <span>
                    Barangay Admin -{" "}
                    <span className="italic">
                      {dayjs(news[0]?.createdAt).format("MMMM DD, YYYY")}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ width: "80vw", marginTop: 25, marginBottom: 25 }}>
          <Row gutter={[16, 16]}>
            <Col span={18}>
              <span className="text-2xl font-bold">Recent News &#9734;</span>
              {news.length > 0 ? (
                <Row gutter={[32, 32]}>
                  <div
                    style={{
                      display: "flex",
                      marginTop: 10,
                    }}
                  >
                    {news.map((e, i) => (
                      <Col span={12}>
                        <Link
                          className="text-xl cursor-pointer text-black hover:underline remove-focus"
                          style={{ fontFamily: "abel" }}
                          href="/news/[slug]"
                          as={`/news/${e.slug_name}`}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginTop: 25,
                            }}
                          >
                            <div className="news-container">
                              <div className="img-container more-news">
                                <img
                                  src={
                                    e?.imgs?.length > 0
                                      ? e?.imgs[0]
                                      : "https://placehold.co/600x400"
                                  }
                                  style={{
                                    width: "28vw",
                                    borderRadius: 10,
                                    height: "15em",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                  }}
                                  alt="image"
                                />
                                <div
                                  className="img-label"
                                  style={{
                                    position: "absolute",
                                    bottom: 25,
                                    left: 25,
                                    color: "#fff",
                                    zIndex: 2,
                                  }}
                                >
                                  <Typography.Paragraph
                                    style={{
                                      maxWidth: "25vw",
                                      color: "#fff",
                                      fontSize: "1em",
                                      margin: 0,
                                    }}
                                    ellipsis
                                  >
                                    {e?.title}
                                  </Typography.Paragraph>{" "}
                                  <span>
                                    Barangay Admin -{" "}
                                    <span className="italic">
                                      {dayjs(e?.createdAt).format(
                                        "MMMM DD, YYYY"
                                      )}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </Col>
                    ))}
                  </div>
                </Row>
              ) : (
                <Typography.Text type="secondary" style={{ display: "block" }}>
                  No News Posted
                </Typography.Text>
              )}
            </Col>
          </Row>
        </div>
        <div style={{ width: "80vw", marginTop: 25, marginBottom: 25 }}>
          <span className="text-2xl font-bold">Announcement &#128227;</span>
          <br />
          <Typography.Text type="secondary">
            No Announcement Posted
          </Typography.Text>
        </div>
      </div>
    </Spin>
  );
};

export default News;
