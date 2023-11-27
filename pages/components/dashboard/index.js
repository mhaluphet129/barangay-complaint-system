import React, { useState } from "react";

// icons
import { Card, Col, Row, Skeleton } from "antd";
import { IoChatbubblesSharp } from "react-icons/io5";
import { IoIosPersonAdd } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { FaFile } from "react-icons/fa";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Dashboard = () => {
  const loadingFlag = true;

  let dashboardData = [
    {
      title: "SMS",
      count: 100,
      color: "#00c0ef",
      icon: <IoChatbubblesSharp style={{ fontSize: 60, opacity: 0.4 }} />,
    },
    {
      title: "Complaints",
      count: 31,
      color: "#05a55a",
      icon: <FaFile style={{ fontSize: 60, opacity: 0.4 }} />,
    },
    {
      title: "Residents",
      count: 44,
      color: "#f39c13",
      icon: <IoIosPersonAdd style={{ fontSize: 60, opacity: 0.4 }} />,
    },
    {
      title: "Incharge",
      count: 6,
      color: "#db4b38",
      icon: <MdAdminPanelSettings style={{ fontSize: 60, opacity: 0.4 }} />,
    },
  ];
  return (
    <>
      <Row gutter={[16, 16]}>
        {dashboardData.map((e, i) => {
          const [hovered, setHovered] = useState(false);
          return (
            <Col span={6} key={i}>
              <Card
                bodyStyle={{ backgroundColor: e.color, padding: 0 }}
                hoverable
              >
                <Row style={{ margin: 10 }}>
                  <Col span={18}>
                    {loadingFlag ? (
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
                      {loadingFlag ? e.title : <Skeleton.Button active />}
                    </div>
                  </Col>

                  <Col
                    span={6}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {loadingFlag ? (
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
                  {loadingFlag ? (
                    <>
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
                          paddingLeft: 5,
                          paddingRight: 5,
                          marginLeft: 10,
                        }}
                      >
                        <FaArrowRight
                          size={10}
                          style={{ width: 10, height: 10 }}
                        />
                      </span>
                    </>
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
                    text: "SMS-Complaint status",
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
                  "SMS-disregarded",
                  "complaints_solved",
                  "complaints_unsolved",
                  "complaints_dismissed",
                  "complaints_processed",
                ],
                datasets: [
                  {
                    label: "count: ",
                    data: [1, 2, 3, 4],
                    backgroundColor: [
                      "rgba(136,28,29)",
                      "rgba(52,125,34)",
                      "rgba(214,34,29)",
                      "rgba(198,118,21)",
                    ],
                    borderColor: [
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
    </>
  );
};

export default Dashboard;
