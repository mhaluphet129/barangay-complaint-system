import React, { useEffect, useRef } from "react";

import { LuMoveRight } from "react-icons/lu";
import { HiOutlineChevronDoubleDown } from "react-icons/hi2";
import { CiFileOn } from "react-icons/ci";
import { MdGroups2 } from "react-icons/md";
import { LiaSmsSolid } from "react-icons/lia";
import { TfiWrite } from "react-icons/tfi";

import "tailwindcss/tailwind.css";
import Link from "next/link";
import AOS from "aos";

import Footer from "@/components/landingpage/footer";

const Home = () => {
  const ref = useRef();
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 ">
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
                  className="px-2 flex items-center justify-center text-2xl font-medium w-28 text-center bg-[#c4dbeb] text-white hover:underline"
                >
                  Home
                </Link>
                <Link
                  href="/news"
                  className="px-3 flex items-center justify-center text-2xl font-medium nav-link w-76 text-center hover:underline"
                >
                  News and Announcement
                </Link>
                <Link
                  href="/complains"
                  className="px-3 flex items-center justify-center text-2xl font-medium nav-link w-76 text-center hover:underline"
                >
                  Complains
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="h-full flex flex-col overflow-scroll bg-[#d9f2fe] mx-20">
          <img className="landingpage-background-img" src="bg-pic1.jpg" />
          <div className="landingpage-main-info flex flex-col justify-center items-center bg-[#d9f2fe] w-1/2">
            <span
              className="text-5xl font-bold"
              style={{
                fontFamily: "abel",
              }}
            >
              Barangay Complaint System
            </span>
            <div className="mt-2">
              <span>
                Resolving Local Disputes with Efficiency and Fairness in North
                Poblacion Maramag
              </span>
            </div>
            <div className="flex gap-x-2 mt-10">
              <div
                className="view-more-btn border-solid border-slate-500 border rounded-lg px-10 py-3 text-2xl text-slate-600 cursor-pointer flex items-center"
                onClick={() =>
                  ref.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "center",
                  })
                }
              >
                View More{" "}
                <HiOutlineChevronDoubleDown className="view-more-icon ml-2" />
              </div>
              <Link
                href="/complain"
                className="view-more-btn border-solid border-slate-900 border rounded-lg bg-[#0275d8] px-10 py-3 text-2xl text-slate-600 cursor-pointer flex items-center text-white"
              >
                File a Complain <TfiWrite className="view-more-icon ml-2" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center mt-16 overflow-hidden">
            <span
              className="text-center text-5xl font-black"
              ref={ref}
              data-aos="fade-down"
              data-aos-offset="200"
              style={{
                fontFamily: "abel",
              }}
            >
              Barangay Complaint System Offers:
            </span>
            <div className="flex flex-col my-20 gap-10 w-3/5">
              <div
                data-aos="fade-right"
                data-aos-offset="200"
                className="flex flex-col"
              >
                <span
                  className="font-bold text-4xl"
                  style={{
                    fontFamily: "abel",
                  }}
                >
                  Streamlined Local Dispute Resolution
                </span>
                <span
                  className="text-1xl w-1/2"
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
                data-aos="fade-left"
                data-aos-offset="200"
                className="flex flex-col text-end items-end"
              >
                <span
                  className="font-bold text-4xl"
                  style={{
                    fontFamily: "abel",
                  }}
                >
                  Empowering Community Engagement
                </span>
                <span
                  className="text-1xl w-1/2 my-2"
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
                className="flex flex-col"
              >
                <span
                  className="font-bold text-4xl"
                  style={{
                    fontFamily: "abel",
                  }}
                >
                  Comprehensive Case Management
                </span>
                <span
                  className="text-1xl w-1/2"
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
                data-aos="fade-left"
                data-aos-offset="200"
                className="flex flex-col text-end items-end"
              >
                <span
                  className="font-bold text-4xl"
                  style={{
                    fontFamily: "abel",
                  }}
                >
                  Conflict Resolution Expertise
                </span>
                <span
                  className="text-1xl w-1/2"
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
                data-aos-offset="200"
                className="flex flex-col"
              >
                <span
                  className="font-bold text-4xl"
                  style={{
                    fontFamily: "abel",
                  }}
                >
                  Empowering Local Governance
                </span>
                <span
                  className="text-1xl w-1/2"
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

            <span
              className="text-center text-4xl font-black mb-10"
              data-aos="fade-up"
              data-aos-offset="200"
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
                data-aos-offset="200"
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
                data-aos-offset="200"
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
                data-aos-offset="200"
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
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
