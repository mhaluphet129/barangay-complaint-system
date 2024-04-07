import React, { useEffect, useState } from "react";

// icons
import { Card, Col, Row, Skeleton } from "antd";
import { IoChatbubblesSharp } from "react-icons/io5";
import { IoIosPersonAdd } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { FaFile } from "react-icons/fa";

import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import jason from "../../../assets/json/constant.json";
import axios from "axios";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement
);

const Dashboard = ({ setSelectedKey }) => {
  const [dashboardData, setDashboardData] = useState({
    smsCount: 0,
    complainCount: 0,
    residentsCount: 0,
    adminCount: 0,
  });
  const [notLoading, setNotLoading] = useState(true);
  const [pieData, setPieData] = useState([]);
  const [graphData, setGraphData] = useState([]);

  let dashboardDataValue = [
    {
      title: "SMS",
      count: dashboardData.smsCount,
      color: "#00c0ef",
      icon: <IoChatbubblesSharp style={{ fontSize: 60, opacity: 0.4 }} />,
      onClick: () => setSelectedKey("sms"),
    },
    {
      title: "Complaints",
      count: dashboardData.complainCount,
      color: "#05a55a",
      icon: <FaFile style={{ fontSize: 60, opacity: 0.4 }} />,
      onClick: () => setSelectedKey("complain"),
    },
    {
      title: "Residents",
      count: dashboardData.residentsCount,
      color: "#f39c13",
      icon: <IoIosPersonAdd style={{ fontSize: 60, opacity: 0.4 }} />,
      onClick: () => setSelectedKey("residents"),
    },
    {
      title: "Incharge",
      count: dashboardData.adminCount,
      color: "#db4b38",
      icon: <MdAdminPanelSettings style={{ fontSize: 60, opacity: 0.4 }} />,
      onClick: () => setSelectedKey("admin"),
    },
  ];

  const parsedPieData = () => {
    let process = pieData?.filter((e) => e._id == "processed")[0]?.count ?? 0;
    let solve = pieData?.filter((e) => e._id == "solved")[0]?.count ?? 0;
    let unsolve = pieData?.filter((e) => e._id == "unsolved")[0]?.count ?? 0;
    let disregard = pieData?.filter((e) => e._id == "disregard")[0]?.count ?? 0;
    let dismissed = pieData?.filter((e) => e._id == "dismissed")[0]?.count ?? 0;

    return [process, solve, unsolve, disregard, dismissed];
  };

  useEffect(() => {
    (async (_) => {
      setNotLoading(false);
      let { data } = await _.get("/api/admin/dashboard-data");

      if (data.success) {
        setNotLoading(true);
        setDashboardData(data.data);
        setPieData(data.data.pieData);
        setGraphData(data.data.graphData);
      } else {
        setNotLoading(true);
      }
    })(axios);
  }, []);

  return (
    <>
      <Row gutter={[16, 16]}>
        {dashboardDataValue.map((e, i) => {
          const [hovered, setHovered] = useState(false);
          return (
            <Col span={6} key={i}>
              <Card
                bodyStyle={{ backgroundColor: e.color, padding: 0 }}
                hoverable
              >
                <Row style={{ margin: 10 }}>
                  <Col span={18}>
                    {notLoading ? (
                      <div
                        style={{
                          display: "block",
                          fontSize: 25,
                          fontWeight: 700,
                          color: "#fff",
                        }}
                      >
                        {e.count}
                      </div>
                    ) : (
                      <Skeleton.Button active />
                    )}

                    <div
                      style={{
                        marginTop: 10,
                        marginBottom: 10,
                        color: "#fff",
                      }}
                    >
                      {notLoading ? e.title : <Skeleton.Button active />}
                    </div>
                  </Col>

                  <Col
                    span={6}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {notLoading ? (
                      e.icon
                    ) : (
                      <Skeleton.Node style={{ height: 65, width: 65 }} active />
                    )}
                  </Col>
                </Row>
                <div
                  style={{
                    backgroundColor: "rgba(0,0,0,0.2)",
                    width: "100%",
                    borderRadius: "0 0 10px 10px",
                    padding: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  {notLoading ? (
                    <div
                      onClick={e.onClick}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          color: "#fff",
                          fontSize: 12,
                          textDecoration: hovered ? "underline" : "none",
                        }}
                      >
                        More Info
                      </span>
                      <span
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: "100%",
                          display: "inline-block",
                          padding: 5,
                          marginLeft: 10,
                        }}
                      >
                        <FaArrowRight
                          size={10}
                          style={{ width: 10, height: 10 }}
                        />
                      </span>
                    </div>
                  ) : (
                    <Skeleton.Input active />
                  )}
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

      <div style={{ marginTop: 10 }}>
        <Card
          bodyStyle={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          hoverable
        >
          <div style={{ width: "30vw" }}>
            <Pie
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Complaint Status",
                    position: "top",
                    font: {
                      size: 20,
                    },
                  },
                  legend: {
                    position: "bottom",
                    align: "center",
                    // display: false,
                  },
                },
              }}
              data={{
                labels: [
                  "Processed",
                  "Solved",
                  "Unsolved",
                  "Disregard",
                  "Dismissed",
                ],
                datasets: [
                  {
                    label: "count: ",
                    data: parsedPieData(),
                    backgroundColor: [
                      "rgba(52,152,219)",
                      "rgba(46,204,113)",
                      "rgba(231,76,60)",
                      "rgba(85,85,85)",
                      "rgba(41,50,65)",
                    ],
                    borderColor: [
                      "rgba(0,0,0, 0.5)",
                      "rgba(0,0,0, 0.5)",
                      "rgba(0,0,0, 0.5)",
                      "rgba(0,0,0, 0.5)",
                      "rgba(0,0,0, 0.5)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        </Card>
      </div>

      {Object.keys(graphData).length != 0 && (
        <div style={{ marginTop: 10 }}>
          <Card
            bodyStyle={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            hoverable
          >
            <div style={{ width: "70vw" }}>
              <Bar
                data={{
                  labels: jason.months,
                  datasets: graphData.map((e) => {
                    return {
                      label: e.label,
                      data: e.data,
                      backgroundColor: `#${Math.floor(
                        Math.random() * 16777215
                      ).toString(16)}`,
                      type: "bar",
                    };
                  }),
                }}
                options={{
                  responsive: true,
                  hover: {
                    mode: "point",
                  },
                  // interaction: {
                  //   mode: "index",
                  //   intersect: false,
                  // },
                  animations: {
                    y: {
                      easing: "easeInOutElastic",
                      from: (ctx) => {
                        if (ctx.type === "data") {
                          if (ctx.mode === "default" && !ctx.dropped) {
                            ctx.dropped = true;
                            return 0;
                          }
                        }
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "SMS Complaints by Sitio",
                      font: {
                        size: 20,
                      },
                    },
                  },
                  scales: {
                    y: {
                      min: 0,
                      stacked: false,
                      title: {
                        display: true,
                        text: "Number of Complaints",
                      },
                      ticks: {
                        stepSize: 2,
                      },
                    },
                    x: {
                      title: {
                        display: true,
                        text: "SMS Complaints by Sitio",
                      },
                      grid: {
                        display: false,
                      },
                    },
                  },
                  onHover: function (event, chartElement) {},
                }}
                plugins={[
                  {
                    id: "intersectDataVerticalLine",
                    beforeDraw: (chart) => {
                      if (chart.getActiveElements().length) {
                        const activePoint = chart.getActiveElements()[0];
                        const chartArea = chart.chartArea;
                        const ctx = chart.ctx;
                        ctx.save();
                        // grey vertical hover line - full chart height
                        ctx.beginPath();
                        ctx.moveTo(activePoint.element.x, chartArea.top);
                        ctx.lineTo(activePoint.element.x, chartArea.bottom);
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = "rgba(0,0,0, 0.1)";
                        ctx.stroke();
                        ctx.restore();

                        // colored vertical hover line - ['data point' to chart bottom] - only for charts 1 dataset
                        if (chart.data.datasets.length === 1) {
                          ctx.beginPath();
                          ctx.moveTo(
                            activePoint.element.x,
                            activePoint.element.y
                          );
                          ctx.lineTo(activePoint.element.x, chartArea.bottom);
                          ctx.lineWidth = 2;
                          ctx.strokeStyle = chart.data.datasets[0].borderColor;
                          ctx.stroke();
                          ctx.restore();
                        }
                      }
                    },
                  },
                ]}
              />
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default Dashboard;
