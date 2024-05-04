import React, { useEffect, useRef } from "react";

import { LuMoveRight } from "react-icons/lu";
import { HiOutlineChevronDoubleDown } from "react-icons/hi2";

import "tailwindcss/tailwind.css";
import Link from "next/link";
import AOS from "aos";
import { Tooltip } from "antd";

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
        <div className="h-full flex flex-col overflow-scroll mx-20  bg-[#d9f2fe]">
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
                className="view-more-btn border-solid border-slate-500 border-2 rounded-lg px-10 py-3 text-2xl text-slate-600 cursor-pointer flex items-center"
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
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col my-20 gap-10 w-3/5">
              <div
                data-aos="fade-right"
                data-aos-offset="200"
                className="flex flex-col"
                ref={ref}
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
                  className="text-1xl w-1/3"
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
                  className="text-1xl w-1/3"
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
                  className="text-1xl w-1/3"
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
                  className="text-1xl w-1/3"
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
          </div>
        </div>
      </div>

      <footer className="bg-[#2d2d2d] text-white px-10">
        <div className="w-full h-34 flex items-start justify-end my-10 gap-24">
          <div className="flex flex-col gap-2">
            <span className="text-2xl">Site Links</span>
            <a href="/complain" className="mt-5 hover:underline">
              File Complaint
            </a>
            <a href="/user/login" className="hover:underline">
              Administrative Area
            </a>
            <Tooltip title="Way kamo">
              <a href="#">About Us</a>
            </Tooltip>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl">Contact Us</span>
            <div className="flex flex-col">
              <span className="mt-5">Barangay Hall of North Poblacion</span>
              <span>Maramag, Bukidnon</span>
            </div>
            <span>email@gmail.com</span>
            <span>+(63) 912 345 6789</span>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid #eee",
          }}
        />
        <div className="w-full h-16 flex items-center justify-end">
          <span className="text-center mr-10">
            All Right Reserved &#169; {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
