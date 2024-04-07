import React, { useEffect, useState, useRef } from "react";
import { Image, Input, Tag, Typography, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";

const Home = () => {
  const [loader, setLoader] = useState([]);
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
            {c._id}
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

  return (
    <div className="relative min-h-screen bg-white flex flex-col">
      <nav className="bg-[#0885ff33]">
        <div className="max-w-7xl px-1 min-w-full">
          <div className="flex items-center justify-between h-14 min-w-full">
            <a href="#" className={"text-black py-2 text-lg font-medium ml-4"}>
              Complaints Center
            </a>
            <a
              href="/user/login"
              className={
                "text-black hover:underline text-center font-medium mr-4"
              }
              onClick={() =>
                message.open({
                  duration: 0,
                  type: "loading",
                  content: "Redirecting...",
                })
              }
            >
              Login
            </a>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="min-h-full flex flex-row text-base flex-grow">
        <div className="min-h-full min-w-24 px-2 flex spin relative">
          <div className="px-2 border-r border-slate-300">
            <Input.Search
              placeholder="Search..."
              className="my-2 min-w-40"
              onChange={(_) => runTimer(_.target.value)}
              loading={hasLoader("searching")}
            />
            <div className="flex flex-col">
              {complains.map((e, i) => (
                <span
                  className={`text-sm px-2 cursor-pointer hover:underline rounded ${
                    e._id == selectedComplain?._id
                      ? "bg-slate-700 text-white "
                      : ""
                  }`}
                  key={`case-{i}`}
                  onClick={() => setSelectedComplain(e)}
                >
                  Case id: {e._id.slice(-6)}
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
      {/* END OF CONTENT */}

      <div className="absolute bottom-0 h-16 min-w-full bg-[#0885ff33] flex items-center justify-center z-50 relative">
        <div className="flex flex-col">
          <span className="tracking-wide text-black mr-1">
            Created using NextJS, @2024 All Rights Reserved
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
