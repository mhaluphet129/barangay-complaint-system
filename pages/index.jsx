import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import axios from "axios";
import dayjs from "dayjs";

import { LuMoveRight } from "react-icons/lu";
import { HiOutlineChevronDoubleDown } from "react-icons/hi2";
import { CiFileOn } from "react-icons/ci";
import { MdGroups2 } from "react-icons/md";
import { LiaSmsSolid } from "react-icons/lia";
import { TfiWrite } from "react-icons/tfi";
import { FaChevronDown } from "react-icons/fa6";

import Link from "next/link";
import AOS from "aos";

import Footer from "@/components/landingpage/footer";
import Header from "@/components/landingpage/header";

const Home = () => {
  const [loading, setLoading] = useState("");
  const [news, setNews] = useState([]);

  useEffect(() => {
    setLoading("fetch");
    (async (_) => {
      let { data } = await axios.get("/api/news");
      if (data.success) {
        if (data.news.length > 2) setNews(data.news?.slice(0, 2));
        else setNews(data.news);
        setLoading("");
      } else {
        message.error(data?.message ?? "Error in the server.");
        setLoading("");
      }
    })(axios);
  }, []);

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
      easing: "ease-out-cubic",
    });
  }, []);

  // 4874dc primary
  // 6a96fe
  return (
    <div className="flex flex-col min-h-screen bg-[#d9f2fe]">
      <div className="flex-1 main-body">
        <Header />
        <div className="flex mx-20 rounded-lg">
          <div className="flex flex-col justify-end w-full">
            <div className="flex flex-col justify-end px-10 mb-24">
              {/* <span className="text-5xl font-bold text-white">
                Barangay Complaint System
              </span> */}
              {/* <span className="text-2xl font-bold">
                Resolving Local Disputes with Efficiency and Fairness in North
                Poblacion Maramag
              </span> */}
              <div
                className="mt-10 text-3xl text-slate-200"
                style={{
                  fontFamily: "sans-serif",
                }}
              >
                <div className="text-5xl text-[#0fff80] font-black block">
                  Pag REGISTER na!
                </div>
                <div className="mt-4">
                  Anha lang kamo sa North Poblacian Maramag Barangay Hall aron
                  ma-rehistro ug pwede na maka{" "}
                  <span className="font-black cursor-pointer hover:underline">
                    FILE UG COMPLAIN
                  </span>
                </div>
              </div>
              <Link
                href="/complain"
                className="flex justify-center w-56 py-4 mt-10 mb-24 text-2xl font-semibold bg-white rounded-full cursor-pointer hover:bg-[#6a96fe] border-2 border-white hover:text-white"
                style={{
                  fontFamily: "abel",
                }}
              >
                File a Complaint
              </Link>
              {news.length > 0 && (
                <>
                  <span className="block mb-4 font-sans text-3xl font-semibold text-white">
                    Balita ug Anunsiyo &#9733;
                  </span>
                  <div className="flex gap-x-2">
                    <Link
                      href="/news/[slug]"
                      as={`/news/${news[0]?.slug_name}`}
                    >
                      <div className="news-container">
                        <div className="img-container more-news">
                          <img
                            src={
                              news[0]?.imgs?.length > 0
                                ? e?.imgs[0]
                                : "/placeholder.jpg"
                            }
                            style={{
                              width: "15vw",
                              borderRadius: 10,
                              height: "12em",
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                            alt="image"
                          />
                          <div
                            className="img-label"
                            style={{
                              position: "absolute",
                              bottom: 15,
                              left: 20,
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
                                fontWeight: 600,
                              }}
                              ellipsis
                            >
                              {news[0]?.title}
                            </Typography.Paragraph>{" "}
                            <span>
                              Barangay Admin -{" "}
                              <span className="italic">
                                {dayjs(news[0]?.createdAt).format(
                                  "MMMM DD, YYYY"
                                )}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    {news.length > 1 && (
                      <Link
                        href="/news/[slug]"
                        as={`/news/${news[1]?.slug_name}`}
                      >
                        <div className="news-container">
                          <div className="img-container more-news">
                            <img
                              src={
                                news[0]?.imgs?.length > 0
                                  ? e?.imgs[0]
                                  : "/placeholder.jpg"
                              }
                              style={{
                                width: "15vw",
                                borderRadius: 10,
                                height: "12em",
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                              alt="image"
                            />
                            <div
                              className="img-label"
                              style={{
                                position: "absolute",
                                bottom: 15,
                                left: 20,
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
                                  fontWeight: 600,
                                }}
                                ellipsis
                              >
                                {news[0]?.title}
                              </Typography.Paragraph>{" "}
                              <span>
                                Barangay Admin -{" "}
                                <span className="italic">
                                  {dayjs(news[0]?.createdAt).format(
                                    "MMMM DD, YYYY"
                                  )}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Link href="/news">
                        <div className="news-container">
                          <div className="img-container news-more">
                            <img
                              src="/placeholder.jpg"
                              style={{
                                width: "15vw",
                                borderRadius: 10,
                                height: "12em",
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                              alt="image"
                            />
                            <span className="see-more">See More</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <img
            className="p-4 landingpage-background-img rounded-3xl"
            src="bg-pic1.png"
          />
        </div>
      </div>

      <div>
        {/* <span
              className="mb-10 text-4xl font-black text-center"
              data-aos="fade-up"
              data-aos-offset={news.length == 0 ? "200" : "1500"}
              style={{
                fontFamily: "abel",
              }}
            >
              As of {new Date().getFullYear()}, we already assist and gathered
            </span>
            <div className="flex justify-between w-3/4 p-2 mb-20">
              <div
                className="sukarap flex bg-[#31a107] p-6 rounded gap-1"
                data-aos="fade-up"
                data-aos-offset={news.length == 0 ? "200" : "1500"}
              >
                <CiFileOn
                  style={{
                    fontSize: "4.5em",
                    color: "#fff",
                  }}
                />
                <div className="flex flex-col justify-center ml-2">
                  <span className="mt-2 text-3xl text-white">30,000+</span>
                  <span className="text-lg text-white">COMPLAINS RECEIVED</span>
                </div>
              </div>
              <div
                className="flex bg-[#31a107] p-6 rounded gap-1"
                data-aos="fade-up"
                data-aos-offset={news.length == 0 ? "200" : "1500"}
              >
                <MdGroups2
                  style={{
                    fontSize: "4.5em",
                    color: "#fff",
                  }}
                />
                <div className="flex flex-col ml-2">
                  <span className="mt-2 text-3xl text-white">30,000+</span>
                  <span className="text-lg text-white">
                    RESIDENT REGISTERED
                  </span>
                </div>
              </div>
              <div
                className="flex bg-[#31a107] p-6 rounded gap-1"
                data-aos="fade-up"
                data-aos-offset={news.length == 0 ? "200" : "1500"}
              >
                <LiaSmsSolid
                  style={{
                    fontSize: "4.5em",
                    color: "#fff",
                  }}
                />
                <div className="flex flex-col ml-2">
                  <span className="mt-2 text-3xl text-white">30,000+</span>
                  <span className="text-lg text-white">SMS RECEIVED</span>
                </div>
              </div>
            </div> */}
      </div>

      <div
        className="flex justify-center flex-1 px-10 pb-10 main-body-2"
        style={{
          height: "50rem",
        }}
      >
        <div className="mt-24 mb-10 rounded-lg">
          <span className="block py-4 text-5xl font-medium text-center">
            Barangay Complaint System Offers
          </span>
          <div className="flex flex-wrap justify-center gap-10 my-24 offer-1">
            <div className="flex flex-col w-1/4 p-6 text-center border rounded-lg offer-box border-slate-400 bg-slate-200">
              <span className="text-2xl font-bold">
                Mas Mapaspas na ang Pagresponde sa usa ka Reklamo
              </span>
              <span
                className="mt-4 text-lg"
                style={{
                  fontFamily: "abel",
                }}
              >
                Mas pinapaspas na ang pag responde kay aduna nay bag-ong sistema
                na pwede na ma hatag ug dugang serbisyo para sa mga mag reklamo
                pinaagi sa atong Website, Text or mga Walk-In complaint.
              </span>
            </div>
            <div className="flex flex-col w-1/4 p-6 text-center border rounded-lg offer-box border-slate-400 bg-slate-200">
              <span className="text-2xl font-bold">
                Dalian na Reklamo gamit lang imong Cellphone, Computer og
                Internet
              </span>
              <span
                className="mt-4 text-lg"
                style={{
                  fontFamily: "abel",
                }}
              >
                Ang amoa systema kay motabang mapasayon ang atoang pag file og
                reklamo sa barangay gamit lang ang inyong gadgets og internet.
                Pwede pud maka text kung walay internet, kini para ma atiman
                tanan gusto naay reklamo sa barangay
              </span>
            </div>
            <div className="flex flex-col w-1/4 p-6 text-center border rounded-lg offer-box border-slate-400 bg-slate-200">
              <span className="text-2xl font-bold">
                Mga Bag-ong Balita ug Anunsiyo sa lokal
              </span>
              <span
                className="mt-4 text-lg"
                style={{
                  fontFamily: "abel",
                }}
              >
                Ang mga Barangay Opisyal kanunay na mag post ug mga bag-ong
                balita ug Anunsiyo nahitungod sa mga nangahitabo sa na nasayrang
                lugar. Tungod niini, makabalo ang tanang lokal sa mga balita ug
                mga paabutong panghitabo.
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
