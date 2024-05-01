import React, { useEffect, useState, useRef } from "react";
import { Image, Input, Tag, Typography, message } from "antd";
import { CiFileOn } from "react-icons/ci";
import { LiaSmsSolid } from "react-icons/lia";
import { MdGroups2 } from "react-icons/md";
import axios from "axios";
import dayjs from "dayjs";
import AOS from "aos";

import "tailwindcss/tailwind.css";

import News from "./news";

const Home = () => {
  const [loader, setLoader] = useState([]);
  const [active, setActive] = useState("home");
  const [complains, setComplains] = useState([]);
  const [selectedComplain, setSelectedComplain] = useState();
  const timerRef = useRef(null);

  const pushLoader = (str) =>
    loader.includes(str) ? null : setLoader([...loader, str]);
  const popLoader = (str) => setLoader(loader.filter((e) => e != str));
  const hasLoader = (str) => loader.includes(str);

  const runTimer = (key) => {
    pushLoader("searching");
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(function () {
      searchName(key);
    }, 500);
  };

  const searchName = async (keyword) => {
    if (keyword != null) {
      let { data } = await axios.get("/api/complain/get-complains", {
        params: {
          searchKey: keyword == "" ? null : keyword,
        },
      });

      if (data.success) {
        setComplains(data.complain);
        popLoader("searching");
      } else popLoader("searching");
    }
  };

  const complainDetails = (c) => {
    const getColorByStatus = (status) => {
      switch (status) {
        case "processed": {
          return "#87CEEB";
        }
        case "solved": {
          return "#28a745";
        }
        case "unsolved": {
          return "#8B8589";
        }
        case "disregard": {
          return "#708090";
        }
        case "dismissed": {
          return "#800000";
        }
      }
    };
    if (c)
      return (
        <div className="p-6 flex flex-col">
          <Typography.Title
            level={3}
            className="flex items-center"
            style={{ marginBottom: 0 }}
          >
            <span className="mr-2">
              {c.residentId
                ? c.residentId.name + " " + c.residentId.name
                : c.complainerNumber}
            </span>
            <Tag color={getColorByStatus(c.settlement.at(-1).type)}>
              {c.settlement.at(-1).type}
            </Tag>
            <Tag>{c.type.toLocaleUpperCase()}</Tag>
          </Typography.Title>
          <Typography.Text type="secondary" italic>
            complete id: {c._id}
          </Typography.Text>
          <Typography.Text className="mt-2">
            Incharge Admin: {c.inchargeId?.name} {c.inchargeId?.lastname}
          </Typography.Text>
          <Typography.Text className="mt-2">
            Respondent Name:{" "}
            {c.respondentName ? (
              c.respondentName
            ) : (
              <Typography.Text type="secondary" italic>
                Not set
              </Typography.Text>
            )}
            <Tag color={c.isResponded ? "green" : "red"} className="ml-2">
              {c.isResponded ? "RESPONDED" : "NOT RESPONDED"}
            </Tag>
          </Typography.Text>
          <Typography.Text>
            Respondent Number:{" "}
            {c.respondentNumber ? (
              `09${c.respondentNumber.slice(3, 5)} * * * * * * *`
            ) : (
              <Typography.Text type="secondary" italic>
                Not set
              </Typography.Text>
            )}
          </Typography.Text>
          <Typography.Text>
            Address:{" "}
            {c.northBarangay ? (
              c.northBarangay
            ) : (
              <Typography.Text type="secondary" italic>
                {c.northBarangay}
              </Typography.Text>
            )}
          </Typography.Text>
          <Typography.Text>
            Amic Settlement:{""} <strong>{c.amicSettlement} PHASE</strong>
          </Typography.Text>
          <Typography.Text>
            Amic Settlement Last Update:{" "}
            {dayjs(c?.amicSettlementLastUpdate).format("MMMM DD, YYYY hh:mma")}
          </Typography.Text>

          <Typography.Text className="mt-4">
            Description:{" "}
            <Typography.Paragraph>{c.description}</Typography.Paragraph>
          </Typography.Text>
          {c.images.length > 0 && (
            <Typography.Text className="mt-4">
              Images:
              <Image.PreviewGroup>
                {c.image.map((e) => (
                  <Image width={200} src={e} />
                ))}
              </Image.PreviewGroup>
            </Typography.Text>
          )}
        </div>
      );
    else return <></>;
  };

  useEffect(() => {
    pushLoader("fetch-case");

    (async (_) => {
      let { data } = await _.get("/api/complain/get-complains");

      if (data.success) {
        setComplains(data.complain);
        popLoader("fetch-case");
      } else popLoader("fetch-case");
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
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="w-full flex justify-center bg-white">
          File a complaint?{" "}
          <a
            className="ml-2 hover:underline hover:text-[#31a107]"
            href="/complain"
          >
            click here
          </a>
        </div>
        <nav className="bg-[#2d2d2d] pl-4 text-[#31a107]">
          <div className="max-w-7xl px-1 sm:px-6 lg:px-1">
            <div className="flex justify-between h-12">
              <div className="flex">
                <a
                  href="#"
                  onClick={() => {
                    setActive("home");
                    setSelectedComplain(null);
                  }}
                  className={`px-3 py-2 text-lg font-medium w-28 text-center hover:underline ${
                    active == "home" ? "bg-[#31a107] text-white" : ""
                  }`}
                >
                  Home
                </a>
                <a
                  href="#"
                  onClick={() => {
                    setActive("news");
                    setSelectedComplain(null);
                  }}
                  className={`px-3 py-2 text-lg font-medium nav-link w-76 text-center hover:underline ${
                    active == "news" ? "bg-[#31a107] text-white" : ""
                  }`}
                >
                  News and Announcement
                </a>
                <a
                  href="#"
                  onClick={() => {
                    setActive("complain");
                    setSelectedComplain(null);
                  }}
                  className={`px-3 py-2 text-lg font-medium nav-link w-76 text-center hover:underline ${
                    active == "complain" ? "bg-[#31a107] text-white" : ""
                  }`}
                >
                  Complains
                </a>
              </div>
            </div>
          </div>
        </nav>

        {active == "home" && (
          <div className="w-full flex flex-col items-center justify-center mt-10">
            <div className="text-center text-4xl font-black h-40">
              BARANGAY COMPLAIN SYSTEM <br />
              North Maramag
            </div>
            <div className="w-3/4">
              <span className="ml-10">Lorem</span> ipsum dolor sit amet,
              consectetur adipiscing elit. Vestibulum convallis velit viverra,
              semper eros at, rhoncus nisi. Maecenas id libero ultrices, dictum
              orci fringilla, finibus risus. Proin at pulvinar elit. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Praesent pretium,
              tortor at finibus accumsan, massa elit placerat lectus, ut
              bibendum lorem lacus non ante. In sed lorem porttitor, pretium
              nibh non, ultricies nisl. Ut malesuada vestibulum felis
              ullamcorper sollicitudin. Pellentesque eget ultricies elit,
              consectetur eleifend ligula. Fusce non quam vitae nunc bibendum
              auctor. Suspendisse quis ligula a magna suscipit maximus. Nulla
              finibus faucibus nibh at porta. Nunc nec urna in augue malesuada
              ullamcorper. Mauris eros elit, elementum non mi quis, fringilla
              rhoncus libero. Interdum et malesuada fames ac ante ipsum primis
              in faucibus. Donec varius placerat urna, quis fringilla quam.
              Maecenas commodo dolor id libero eleifend pretium. <br />
              <span className="ml-10">Praesent</span> auctor id orci sed
              pharetra. Vestibulum eleifend, erat vitae pharetra ultricies,
              libero magna vehicula felis, sed porttitor nibh nulla ultricies
              risus. Duis nisl neque, bibendum vel felis vel, pellentesque
              pulvinar lectus. Sed sodales vel velit at vehicula. Morbi
              vestibulum tincidunt lorem eget egestas. Phasellus eu aliquet
              eros. Cras luctus mauris vitae tortor pharetra tincidunt. Vivamus
              tincidunt ligula purus, sit amet volutpat justo vehicula vitae.
              Nullam nunc leo, vestibulum ut euismod vel, porta in lacus. Nunc
              mollis accumsan diam, eget porttitor enim dignissim eu.
              <br />
              <span className="ml-10">In</span> tellus arcu, pretium id diam at,
              sagittis tempus dolor. Nulla semper tincidunt eros, non convallis
              nunc sollicitudin id. Vestibulum aliquet imperdiet rhoncus.
              Curabitur sollicitudin, eros ut luctus tincidunt, ante dolor
              viverra turpis, eu rhoncus massa diam finibus est. Etiam sit amet
              eleifend ipsum. Cras tincidunt scelerisque mattis. Aenean euismod,
              libero a cursus porttitor, urna nulla dapibus neque, nec porttitor
              nisi ex vitae ipsum. Pellentesque eu odio nunc. Pellentesque
              luctus risus purus, eu ullamcorper metus efficitur vestibulum.
              Donec vel dolor sit amet lectus pretium rhoncus ut eu lectus.
              Donec faucibus dui at neque pellentesque, sit amet consectetur
              magna ornare. Curabitur in sem ac leo laoreet consequat non sed
              lacus. Aenean sed mi non elit tempor pulvinar. Fusce vitae sapien
              nunc. Phasellus laoreet sed nisi non varius. Curabitur aliquet
              augue a condimentum fermentum.
            </div>

            <div className="mt-8 w-10/12 flex items-center justify-around">
              <div className="sukarap flex bg-[#31a107] p-6 rounded gap-1">
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
              <div className="flex bg-[#31a107] p-6 rounded gap-1">
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
              <div className="flex bg-[#31a107] p-6 rounded gap-1">
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
        )}

        {active == "complain" && (
          <>
            {/* CONTENT */}
            <div className="h-[85vh] flex flex-row text-base flex-grow">
              <div className="min-h-full min-w-24 px-2 flex spin relative">
                <div className="px-2 border-r border-slate-300 h-full">
                  <Input.Search
                    placeholder="Search..."
                    className="my-2 min-w-40"
                    onChange={(_) => runTimer(_.target.value)}
                    loading={hasLoader("searching")}
                  />
                  <div className="flex flex-col h-full">
                    {complains.map((e, i) => (
                      <span
                        className={`text-sm p-2 cursor-pointer rounded ${
                          e._id == selectedComplain?._id
                            ? "bg-[#31a107] text-white "
                            : ""
                        }`}
                        key={`case-${i}`}
                        onClick={() => setSelectedComplain(e)}
                      >
                        Case : {e._id.slice(-6)}
                      </span>
                    ))}
                  </div>
                </div>
                {/* loader */}
                <div
                  className={`loader-body absolute inset-0 flex items-center justify-center bg-gray-200 opacity-75 z-50 ${
                    hasLoader("fetch-case") ? "show" : ""
                  }`}
                >
                  <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-400 h-12 w-12"></div>
                </div>
              </div>
              {complainDetails(selectedComplain)}
            </div>
          </>
        )}

        {active == "news" && <News />}
      </div>

      <footer className="bg-[#2d2d2d] text-white w-full h-16 flex items-center justify-end">
        <span className="text-center mr-10">
          Copyright &#169; {new Date().getFullYear()}. Barangay Complain System.
          All Right Reserved.
        </span>
      </footer>
    </div>
  );
};

export default Home;
