import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import Link from "next/link";
import axios from "axios";
import dayjs from "dayjs";

import Footer from "@/components/landingpage/footer";
import Header from "@/components/landingpage/header";

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
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 mx-20">
        <Header />
        <div className="class-container">
          {news.length > 0 && (
            <Link
              className="mt-10 flex justify-center items-center"
              style={{ fontFamily: "abel" }}
              href="/news/[slug]"
              as={`/news/${news[0].slug_name}`}
            >
              <div className="news-container">
                <div className="img-container">
                  <img
                    src={
                      news[0]?.imgs?.length > 0
                        ? news[0]?.imgs[0]
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
            </Link>
          )}

          <div style={{ width: "80vw", marginTop: 25, marginBottom: 25 }}>
            <span className="text-2xl font-bold">Recent News &#9734;</span>
            {news.length > 0 ? (
              <div className="flex mt-4 flex-wrap gap-x-4">
                {news.map((e, i) => (
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
                              width: "19vw",
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
                                {dayjs(e?.createdAt).format("MMMM DD, YYYY")}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <Typography.Text type="secondary" style={{ display: "block" }}>
                No News Posted
              </Typography.Text>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default News;
