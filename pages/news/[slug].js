import React, { useEffect, useState } from "react";
import { Carousel, Image, Spin } from "antd";
import { useRouter } from "next/router";

import axios from "axios";
import dayjs from "dayjs";

import Footer from "@/components/landingpage/footer";
import Header from "@/components/landingpage/header";

export default function Page() {
  const router = useRouter();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (router.query.slug)
      (async (_) => {
        setLoading(true);
        let res = await _.get("/api/news", {
          params: {
            slug_name: router.query.slug,
          },
        });
        if (res?.data?.success ?? false) {
          setNews(res?.data?.news[0] ?? null);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })(axios);
  }, [router.query.slug]);

  return (
    <Spin spinning={loading}>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 mx-20">
          <Header />
          <div
            className="flex justify-center overflow-scroll bg-[#d9f2fe]"
            style={{
              minHeight: "100vh",
            }}
          >
            <div className="w-9/12">
              <p className="text-4xl font-black mt-10">{news?.title}</p>
              <p className="text-xl font-black mt-4">Barangay Admin</p>
              <p className="text-base">
                {dayjs(news?.createdAt).format("MMMM DD, YYYY")}
              </p>
              <div className="flex justify-center mt-10">
                {news?.imgs?.length > 0 && (
                  <Carousel
                    style={{ width: 1200 }}
                    autoplaySpeed={5000}
                    autoplay
                  >
                    {news.imgs.map((e, i) => (
                      <Image
                        key={`img-${i}`}
                        src={e}
                        width={1200}
                        height={500}
                      />
                    ))}
                  </Carousel>
                )}
              </div>
              <div
                style={{
                  marginTop: "2em",
                  marginBottom: "2em",
                }}
                dangerouslySetInnerHTML={{ __html: news?.description }}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Spin>
  );
}
