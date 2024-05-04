import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Carousel, Image, Spin } from "antd";
import "tailwindcss/tailwind.css";
import dayjs from "dayjs";
import { LuMoveRight } from "react-icons/lu";

import axios from "axios";

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
        <div className="flex-1">
          <div className="w-full flex justify-between items-center bg-[#eee] h-12">
            <div>{/* Intended to be empty */}</div>
            <div className="font-black flex items-center text-2xl">
              <span className="logo-small">
                <img src="/web-logo.png" width={50} className="mr-2" />
              </span>
              North Poblacion Maramag
            </div>
            <div>
              <a
                className="mr-5 hover:underline hover:text-[#31a107] flex items-center text-1xl"
                href="/complain"
              >
                File a complaint <LuMoveRight className="ml-2" />
              </a>
            </div>
          </div>
          <nav className="bg-[#2d2d2d] pl-4 text-[#31a107]">
            <div className="max-w-7xl px-1 sm:px-6 lg:px-1">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <a
                    href="/"
                    className="px-3 flex items-center justify-center text-2xl font-medium w-28 text-center hover:underline"
                  >
                    Home
                  </a>
                  <a
                    href="/news"
                    className="px-3 flex items-center justify-center text-2xl font-medium nav-link w-76 text-center hover:underline bg-[#31a107] text-white"
                  >
                    News and Announcement
                  </a>
                  <a
                    href="/complains"
                    className="px-3 flex items-center justify-center text-2xl font-medium nav-link w-76 text-center hover:underline"
                  >
                    Complains
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <div className="flex justify-center">
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
        <footer className="bg-[#2d2d2d] text-white w-full h-16 flex items-center justify-end">
          <span className="text-center mr-10">
            Copyright &#169; {new Date().getFullYear()}. Barangay Complain
            System. All Right Reserved.
          </span>
        </footer>
      </div>
    </Spin>
  );
}
