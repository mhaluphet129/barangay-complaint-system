import React, { useEffect, useRef, useState } from "react";
import { Typography } from "antd";
import axios from "axios";
import dayjs from "dayjs";

import { LuMoveRight } from "react-icons/lu";
import { HiOutlineChevronDoubleDown } from "react-icons/hi2";
import { CiFileOn } from "react-icons/ci";
import { MdGroups2 } from "react-icons/md";
import { LiaSmsSolid } from "react-icons/lia";
import { TfiWrite } from "react-icons/tfi";

import Link from "next/link";
import AOS from "aos";

import Footer from "@/components/landingpage/footer";
import Header from "@/components/landingpage/header";

const Home = () => {
  const ref = useRef();

  const [loading, setLoading] = useState("");
  const [news, setNews] = useState([]);

  useEffect(() => {
    setLoading("fetch");
    (async (_) => {
      let { data } = await axios.get("/api/news");
      if (data.success) {
        if (data.news.length > 3) setNews(data.news?.slice(0, 3));
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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 mx-20">
        <Header />

        <div className="flex mt-6 border rounded-lg border-slate-300 bg-[#6096fe] shadow-lg">
          <div className="px-10 py-20 w-full flex flex-col justify-between">
            <div className="flex flex-col">
              <span className="text-5xl font-bold">
                Barangay Complaint System
              </span>
              <span className="text-1xl font-bold">
                Resolving Local Disputes with Efficiency and Fairness in North
                Poblacion Maramag
              </span>
              <span className="text-[#101647] mt-10">
                The North Poblacion Maramag barangay officials aim to resolve
                local disputes quickly and amicably through counseling,
                understanding different perspectives, and sometimes referencing
                religious texts to help parties reconcile, rather than resorting
                to formal litigation
              </span>
            </div>
            <div className="flex gap-x-2">
              <div
                className="rounded-full text-1xl cursor-pointer bg-white flex items-center px-8 py-2 font-semibold hover:underline"
                onClick={() =>
                  ref.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "center",
                  })
                }
              >
                View More
              </div>
              <Link
                href="/complain"
                className="rounded-full text-1xl cursor-pointer flex items-center px-8 py-2 font-light bg-[#6096fe] border border-white text-white hover:underline"
              >
                File a Complaint
              </Link>
            </div>
          </div>
          <img
            className="landingpage-background-img p-4 rounded-3xl"
            src="bg-pic1.jpg"
          />
        </div>
        <div className="h-full flex flex-col overflow-scroll">
          <div className="flex flex-col mt-10 overflow-hidden">
            <div className="my-10">
              <span
                className="text-4xl font-black"
                ref={ref}
                style={{
                  fontFamily: "abel",
                }}
              >
                News and Annoucement
              </span>
              <div className="flex flex-wrap gap-x-4">
                {news.length > 0 ? (
                  news.map((e) => (
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
                          <div className="img-container more-news">
                            <img
                              src={
                                e?.imgs?.length > 0
                                  ? e?.imgs[0]
                                  : "/placeholder.jpg"
                              }
                              style={{
                                width: "21vw",
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
                      </Link>
                    </div>
                  ))
                ) : (
                  <>No News/Announcement Posted</>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 25,
                  }}
                >
                  <Link href="/news">
                    <div className="news-container">
                      <div className="news-more">
                        <img
                          src="/placeholder.jpg"
                          style={{
                            width: "21vw",
                            borderRadius: 10,
                            height: "15em",
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
            </div>
            <span className="text-4xl font-medium mb-4" data-aos="fade-right">
              Barangay Complaint System Offers
            </span>
            <div className="flex flex-wrap my-4 gap-10">
              <div
                data-aos="fade-right"
                data-aos-offset="200"
                data-aos-delay="200"
                className="flex flex-col w-1/4 p-6 border border-slate-400 rounded-lg"
              >
                <span className="font-bold text-2xl font-black">
                  Streamlined Local Dispute Resolution
                </span>
                <span
                  className="text-base mt-4"
                  style={{
                    fontFamily: "abel",
                  }}
                >
                  Our Barangay Complaint System provides a efficient and
                  accessible platform for residents to address local disputes
                  and concerns. Leveraging the expertise of community leaders,
                  we facilitate the resolution of issues ranging from
                  neighborhood conflicts to public service complaints.
                </span>
              </div>

              <div
                data-aos="fade-right"
                data-aos-offset="200"
                data-aos-delay="400"
                className="flex flex-col w-1/4 p-6 border border-slate-400 rounded-lg"
              >
                <span className="font-bold text-2xl font-black">
                  Empowering Community Engagement
                </span>
                <span
                  className="text-base mt-4"
                  style={{
                    fontFamily: "abel",
                  }}
                >
                  By enabling direct communication between citizens and local
                  authorities, our system fosters greater transparency and
                  accountability. Residents can easily submit complaints, track
                  their progress, and participate in the decision-making
                  process, strengthening the bond between the community and its
                  governing bodies.
                </span>
              </div>

              <div
                data-aos="fade-right"
                data-aos-offset="200"
                data-aos-delay="600"
                className="flex flex-col w-1/4 p-6 border border-slate-400 rounded-lg"
              >
                <span className="font-bold text-2xl font-black">
                  Comprehensive Case Management
                </span>
                <span
                  className="text-base mt-4"
                  style={{
                    fontFamily: "abel",
                  }}
                >
                  Our robust case management system ensures that every complaint
                  is thoroughly investigated and addressed in a timely manner.
                  From initial intake to final resolution, we maintain detailed
                  records and provide regular updates to all parties involved,
                  ensuring a fair and transparent process.
                </span>
              </div>

              <div
                data-aos="fade-right"
                data-aos-delay="800"
                className="flex flex-col w-1/4 p-6 border border-slate-400 rounded-lg"
              >
                <span className="font-bold text-2xl font-black">
                  Conflict Resolution Expertise
                </span>
                <span
                  className="text-base mt-4"
                  style={{
                    fontFamily: "abel",
                  }}
                >
                  Our team of experienced mediators and conflict resolution
                  specialists are dedicated to finding amicable solutions that
                  satisfy all stakeholders. By leveraging their expertise in
                  negotiation, mediation, and community-based problem-solving,
                  we strive to resolve disputes efficiently and effectively.
                </span>
              </div>

              <div
                data-aos="fade-right"
                data-aos-delay="1000"
                className="flex flex-col w-1/4 p-6 border border-slate-400 rounded-lg"
              >
                <span className="font-bold text-2xl font-black">
                  Empowering Local Governance
                </span>
                <span
                  className="text-base mt-4"
                  style={{
                    fontFamily: "abel",
                  }}
                >
                  By providing a centralized platform for citizen engagement,
                  our Barangay Complaint System for North Poblacion Maramag
                  empowers local governments to better understand and address
                  the needs of their constituents. This data-driven approach
                  enables more informed decision-making and the implementation
                  of targeted solutions to improve the overall quality of life
                  in the community.
                </span>
              </div>
            </div>

            {/* <span
              className="text-center text-4xl font-black mb-10"
              data-aos="fade-up"
              data-aos-offset={news.length == 0 ? "200" : "1500"}
              style={{
                fontFamily: "abel",
              }}
            >
              As of {new Date().getFullYear()}, we already assist and gathered
            </span>
            <div className="flex justify-between  w-3/4 p-2 mb-20">
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
                  <span className="text-3xl text-white mt-2">30,000+</span>
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
                  <span className="text-3xl text-white mt-2">30,000+</span>
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
                  <span className="text-3xl text-white mt-2">30,000+</span>
                  <span className="text-lg text-white">SMS RECEIVED</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
