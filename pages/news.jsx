import React, { useEffect, useState } from "react";
import { Col, Row, Typography } from "antd";
import Link from "next/link";
import axios from "axios";
import dayjs from "dayjs";
import { LuMoveRight } from "react-icons/lu";

import "tailwindcss/tailwind.css";

import Footer from "@/components/landingpage/footer";

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
    <>
      <div className="flex-1">
        <div className="header w-full flex justify-between items-center bg-[#eee] h-12 relative">
          <div>{/* Intended to be empty */}</div>
          <div className="font-black flex items-center text-2xl">
            <span className="logo-small">
              <img src="/web-logo.png" width={50} className="mr-2" />
            </span>
            North Poblacion Maramag
          </div>
          <div>
            <a
              className="mr-5 hover:underline hover:text-[#31a107] flex items-center text-2xl"
              href="/complain"
            >
              File a complaint <LuMoveRight className="ml-2" />
            </a>
          </div>
        </div>
        <nav className="main-nav bg-[#2d2d2d] pl-20 text-[#c4dbeb] relative">
          <div className="max-w-7xl">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link
                  href="/"
                  className="px-2 flex items-center justify-center text-2xl font-medium w-28 text-center text-white hover:underline"
                >
                  Home
                </Link>
                <Link
                  href="/news"
                  className="px-3 flex items-center justify-center text-2xl font-medium text-center bg-[#c4dbeb] text-white hover:underline"
                >
                  News and Announcement
                </Link>
                <Link
                  href="/complains"
                  className="px-3 flex items-center justify-center text-2xl font-medium text-center hover:underline"
                >
                  Complains
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="class-container h-full flex flex-col overflow-scroll mx-20 bg-[#d9f2fe]">
          {news.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 25,
              }}
            >
              <Link
                href="/news/[slug]"
                as={`/news/${news[news.length - 1]?.slug_name}`}
              >
                <div className="news-container">
                  <div className="img-container">
                    <img
                      src={
                        news[news.length - 1]?.imgs?.length > 0
                          ? news[news.length - 1]?.imgs[0]
                          : "/placeholder.jpg"
                      }
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
                          maxWidth: "80vw",
                          color: "#fff",
                          fontSize: "1.5em",
                          margin: 0,
                        }}
                        ellipsis
                      >
                        {news[news.length - 1]?.title}
                      </Typography.Paragraph>{" "}
                      <span>
                        Barangay Admin -{" "}
                        <span className="italic">
                          {dayjs(news[news.length - 1]?.createdAt).format(
                            "MMMM DD, YYYY"
                          )}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          <div style={{ width: "80vw", marginTop: 25, marginBottom: 25 }}>
            <Row gutter={[16, 16]}>
              <Col span={18}>
                <span className="text-2xl font-bold">Recent News &#9734;</span>
                {news.length > 0 ? (
                  <Row
                    gutter={[32, 32]}
                    style={{
                      display: "flex",
                      marginTop: 10,
                      width: "80vw",
                    }}
                  >
                    {news.map((e, i) => (
                      <Col span={8}>
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
                                      : "/placeholder.jpg"
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
                  </Row>
                ) : (
                  <Typography.Text
                    type="secondary"
                    style={{ display: "block" }}
                  >
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
      </div>

      <Footer />
    </>
  );
};

export default News;