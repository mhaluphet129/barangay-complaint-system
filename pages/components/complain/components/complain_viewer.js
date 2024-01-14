import React, { useEffect, useState } from "react";
import {
  Button,
  Calendar,
  Col,
  Divider,
  Drawer,
  Image,
  Modal,
  Row,
  Space,
  Steps,
  Table,
  Tag,
  Tooltip,
  Typography,
  message,
} from "antd";
import dayjs from "dayjs";
import axios from "axios";

const CompainViewer = ({ open, close, data, setData, refresh }) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  let _modal = null;

  return (
    <>
      {/* context */}
      {contextHolder}
      <Drawer
        open={openCalendar}
        onClose={() => setOpenCalendar(false)}
        placement="bottom"
        width="100%"
        height="95%"
        title="Barangay Calendar"
        zIndex={1}
      >
        <Calendar
          onChange={(e) => {
            _modal = modal.confirm({
              title: "Date Confirmation",
              content: `Are you sure you want to set the schedule in ${e.format(
                "MMMM DD, YYYY"
              )}`,
              width: 370,
              centered: true,
              maskClosable: true,
              zIndex: 2,
              footer: [
                <Space
                  style={{
                    marginTop: 10,
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Button onClick={() => _modal.destroy()}>CANCEL</Button>
                  <Button type="primary" onClick={() => {}}>
                    CONFIRM
                  </Button>
                </Space>,
              ],
            });
          }}
        />
      </Drawer>

      {/* end of context */}
      <Modal
        open={open}
        footer={null}
        closable={false}
        width="100%"
        onCancel={close}
        zIndex={1}
        centered
      >
        <Row gutter={[32, 32]}>
          <Col span={7}>
            <Space direction="vertical">
              <Divider>
                <Typography.Title level={3} style={{ margin: 0, padding: 0 }}>
                  Complainant
                </Typography.Title>
              </Divider>
              <Tooltip title="complete complain id">
                <Typography.Link
                  onClick={() => {
                    navigator.clipboard.writeText(data?._id);
                    message.success("Text Copied");
                  }}
                >
                  {data?._id}
                </Typography.Link>
              </Tooltip>
              <div>
                Complainant Name:{" "}
                <strong>
                  {`${data?.residentId?.name} ${data?.residentId?.lastname}`}
                </strong>
              </div>
              <span>
                Complain date:
                <strong>
                  {dayjs(data?.createdAt).format("MMMM DD, YYYY")}
                </strong>
              </span>
              <span>
                Type of Complain:{" "}
                <strong>{data?.type.toLocaleUpperCase()}</strong>
              </span>
              <span>
                Amic Settlement: <strong>{data?.amicSettlement} phase</strong>
              </span>
              <span>
                Settlement Status:{" "}
                <strong>
                  {data?.settlement.at(-1).type.toLocaleUpperCase()}
                </strong>
              </span>
              <span>Description: </span>
              <span style={{ marginLeft: 50 }}>{data?.description}</span>
              <span>Images:</span>
              <div
                style={{
                  maxHeight: 200,
                  overflow: "scroll",
                }}
              >
                <Image.PreviewGroup>
                  {data?.images.map((e, i) => (
                    <Image
                      src={e}
                      key={`image-${i}`}
                      width={150}
                      style={{
                        paddingRight: 5,
                        paddingBottom: 5,
                        border: "1px solid #eee",
                        borderRadius: 10,
                      }}
                    />
                  ))}
                </Image.PreviewGroup>
              </div>
            </Space>
          </Col>
          <Col span={11}>
            <div>
              <Divider>
                <Typography.Title
                  level={3}
                  style={{
                    padding: 0,
                    margin: 0,
                  }}
                >
                  Respondent
                </Typography.Title>
              </Divider>
              <Typography.Title
                level={4}
                style={{
                  padding: 0,
                  margin: 0,
                }}
              >
                {data?.respondentName}
              </Typography.Title>
              <Typography.Text type="secondary">
                {data?.respondentNumber}
              </Typography.Text>
            </div>
            <span>
              Responded:{" "}
              <strong>{data?.isResponded ? "Responded" : "Not yet"}</strong>
            </span>

            <Divider>
              <Typography.Title
                level={3}
                style={{
                  padding: 0,
                  margin: 0,
                }}
              >
                SMS
              </Typography.Title>
            </Divider>
            <Table
              style={{ height: "100%" }}
              dataSource={data?.smsId}
              pagination={false}
              scroll={{
                y: 200,
              }}
              columns={[
                {
                  title: "Message Content",
                  width: 200,
                  render: (_, row) => (
                    <Typography.Paragraph
                      ellipsis={{
                        rows: 2,
                        expandable: true,
                        symbol: "more",
                      }}
                    >
                      {row?.message}
                    </Typography.Paragraph>
                  ),
                },
                {
                  title: "type",
                  align: "center",
                  width: 120,
                  render: (_, row) => <Tag color="blue">OUTBOUND</Tag>,
                },
                {
                  title: "Created At",
                  render: (_, row) =>
                    dayjs(row?.createdAt).format("MMM DD, YYYY - hh:mm a"),
                },
              ]}
            />
          </Col>
          <Col
            span={6}
            style={{
              background: "#eee",
              borderRadius: 5,
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
              paddingLeft: 15,
              paddingRight: 15,
            }}
          >
            <Divider>Functions</Divider>
            {!data?.isResponded && (
              <Button
                style={{
                  background: "green",
                  color: "#fff",
                }}
                size="large"
                onClick={() => {
                  _modal = modal.confirm({
                    title: "Confimation",
                    content:
                      "Are you sure you want to mark this as responded ?",
                    width: 370,
                    centered: true,
                    maskClosable: true,
                    zIndex: 2,
                    footer: [
                      <Space
                        style={{
                          marginTop: 10,
                          display: "flex",
                          justifyContent: "end",
                        }}
                      >
                        <Button onClick={() => _modal.destroy()}>CANCEL</Button>
                        <Button
                          type="primary"
                          onClick={() => {
                            (async (_) => {
                              let res = await _.get(
                                "/api/complain/mark-responded",
                                {
                                  params: {
                                    _id: data?._id,
                                  },
                                }
                              );

                              if (res?.data?.success) {
                                _modal.destroy();
                                refresh();

                                // update current cache
                                setData({ ...data, isResponded: true });
                                message.success("Updated Successfully");
                              }
                            })(axios);
                          }}
                        >
                          CONFIRM
                        </Button>
                      </Space>,
                    ],
                  });
                }}
                block
              >
                Mark Responded
              </Button>
            )}
            <Button style={{ marginTop: 10 }} size="large" block>
              View Settlement
            </Button>
            <Button
              style={{ marginTop: 10 }}
              size="large"
              onClick={() => setOpenCalendar(true)}
              disabled
              block
            >
              Set Calendar
            </Button>
          </Col>
        </Row>
        {/* <Steps
      type="navigation"
      size="small"
      //   current={current}
      //   onChange={onChange}
      items={[
        {
          status: "finish",
          title: "finish 1",
        },
        {
          status: "finish",
          title: "finish 2",
        },
        {
          status: "process",
          title: "current process",
        },
        {
          status: "wait",
          title: "wait",
        },
      ]}
    /> */}
      </Modal>
    </>
  );
};

export default CompainViewer;
