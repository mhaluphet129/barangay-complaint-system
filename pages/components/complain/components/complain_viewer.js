import React, { useState } from "react";
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
  Tooltip,
  Typography,
  message,
} from "antd";
import dayjs from "dayjs";
import axios from "axios";

import Conversation from "./conversation";
import NewComplain from "./new_complaint";
import SettlementViewer from "./settlement_viewer";

// ! complain form outside should send a pin and starter sms based on format given

const ComplainViewer = ({ open, close, data, setData, refresh }) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const [chatOpt, setChatOpt] = useState({ open: false });
  const [complainOpt, setComplainOpt] = useState({ open: false, data: null });
  const [settlementOpt, setSettlementOpt] = useState({
    open: false,
    data: null,
    id: null,
  });
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
        zIndex={999}
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
              <Tooltip title="Complain ID">
                <span style={{ marginRight: 5 }}>id:</span>
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
                {data?.residentId ? (
                  <strong>
                    {`${data?.residentId?.name} ${data?.residentId?.lastname}`}
                  </strong>
                ) : (
                  <Typography.Text type="secondary" italic>
                    Not Yet
                  </Typography.Text>
                )}
              </div>
              <span>
                Complain date:{" "}
                <strong>{dayjs(data?.createdAt).format("MMMM DD 'YY")}</strong>
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
                level={5}
                style={{
                  padding: 0,
                  margin: 0,
                }}
              >
                Respondent Name:{" "}
                {data?.respondentName ?? (
                  <Typography.Text type="secondary" italic>
                    Not Yet
                  </Typography.Text>
                )}
              </Typography.Title>

              <Typography.Title
                level={5}
                style={{
                  padding: 0,
                  margin: 0,
                }}
              >
                Respondent Number:{" "}
                {data?.respondentNumber ?? (
                  <Typography.Text type="secondary" italic>
                    Not Yet
                  </Typography.Text>
                )}
              </Typography.Title>
            </div>
            <span>
              Responded:{" "}
              {data?.isResponded ? (
                <strong> Responded </strong>
              ) : (
                <Typography.Text type="secondary" italic>
                  Not yet
                </Typography.Text>
              )}
            </span>
            <Divider>
              <Typography.Title
                level={3}
                style={{
                  padding: 0,
                  margin: 0,
                }}
              >
                Others
              </Typography.Title>
            </Divider>
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
                    zIndex: 9999,
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
            <Button
              style={{ marginTop: 10 }}
              size="large"
              onClick={() =>
                setSettlementOpt({
                  open: true,
                  data: data.settlement,
                  id: data._id,
                })
              }
              block
            >
              View Settlement
            </Button>
            <Button
              style={{ marginTop: 10 }}
              size="large"
              block
              onClick={() => setChatOpt({ open: true })}
            >
              Conversation
            </Button>
            {data?.type && data?.type == "sms" && (
              <Button
                style={{ marginTop: 10 }}
                size="large"
                onClick={() => setComplainOpt({ open: true, data })}
                block
              >
                UPDATE
              </Button>
            )}
            {/* <Button
              style={{ marginTop: 10 }}
              size="large"
              onClick={() => setOpenCalendar(true)}
              disabled
              block
            >
              Set Calendar
            </Button> */}
          </Col>
        </Row>
      </Modal>

      {/* context */}
      <Conversation
        open={chatOpt.open}
        close={() => setChatOpt(false)}
        residentId={data?.residentId}
        complainerNumber={
          typeof data?.residentId == "object"
            ? data?.residentId?.phoneNumber
            : data?.complainerNumber
        }
        complainantName={data?.respondentName}
        complainantNumber={data?.respondentNumber}
        complainId={data?._id}
      />
      <NewComplain
        {...complainOpt}
        isEdit
        close={() => setComplainOpt({ open: false, data: null })}
        Respondent={true}
        handleFinish={(val) => {
          (async (_) => {
            let res = await _.post("/api/complain/update-complain", {
              ...val,
              numberToBeReplaced:
                typeof data?.residentId == "object"
                  ? data?.residentId?.phoneNumber
                  : data?.complainerNumber,
            });

            if (res.data?.success) {
              setComplainOpt({ open: false, data: null });
              message.success(res.data?.message ?? "Success");
              refresh();
              close();
            }
          })(axios);
        }}
      />
      <SettlementViewer
        open={settlementOpt.open}
        close={() => setSettlementOpt({ open: false, data: null, id: null })}
        settlement={settlementOpt.data}
        id={settlementOpt.id}
      />
    </>
  );
};

export default ComplainViewer;
