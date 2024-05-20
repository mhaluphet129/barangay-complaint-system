import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Tag,
  message,
  List,
  Card,
  Space,
  Typography,
  Input,
  Select,
  Row,
  Col,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";

import axios from "axios";

import NewComplain from "./components/new_complaint";
import CompainViewer from "./components/complain_viewer";
import dayjs from "dayjs";

const Complain = ({ appKey, smskey }) => {
  const [complains, setComplains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [openNewComplain, setOpenNewComplain] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [viewerOpts, setViewerOpts] = useState({ open: false, data: null });
  const [currentUser, setCurrentUser] = useState({});
  const [trigger, setTrigger] = useState(0);
  const [type, setType] = useState(null);
  const [listOptions, setListOptions] = useState({
    total: 0,
    index: 0,
    loading: false,
  });

  const timerRef = useRef(null);

  const loadMoreData = (searchKey, filter = {}, page = 1, pageSize) => {
    if (!pageSize) pageSize = 10;
    if (listOptions.loading) {
      return;
    }

    setListOptions({ ...listOptions, loading: true });
    (async (_) => {
      let { data } = await _.get("/api/complain/get-complains", {
        params: {
          page: 5,
          ...(filter.type ? { type: filter.type } : {}),
          searchKey,
          page,
          pageSize,
        },
      });
      if (data?.success) {
        setComplains(data?.complain);
        setLoading(false);
        setSearching(false);
        setListOptions({
          ...listOptions,
          index: listOptions.index + 1,
          loading: false,
          total: data.total,
        });
      } else {
        message.error(data?.message ?? "Error in the server.");
        setListOptions({
          ...listOptions,
          loading: false,
        });
        setSearching(false);
        setLoading(false);
      }
    })(axios);
  };

  const runTimer = (searchKeyword) => {
    setSearching(true);
    setListOptions({ total: 0, index: 0, loading: false });
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(function () {
      loadMoreData(searchKeyword, { type }, 1);
    }, 500);
  };

  useEffect(() => {
    setLoading(true);
    loadMoreData(searchWord, { type }, 1);
    setCurrentUser(JSON.parse(Cookies.get("currentUser")));
  }, [trigger, type]);

  return (
    <>
      <NewComplain
        open={openNewComplain}
        close={() => setOpenNewComplain(false)}
        appkey={appKey}
        handleFinish={(val) => {
          // * send an sms to Responder

          if ([null, undefined, ""].includes(val.residentId)) {
            message.warning("Please select a resident before adding complain");
            return;
          }

          val.inchargeId = currentUser._id;
          (async (_) => {
            let { data } = await _.post("/api/complain/new-complain", {
              ...val,
              template: "sms_to_respondent_1",
              type: "walk-in",
            });
            if (data?.success) {
              message.success(data?.message ?? "Successfully Created.");
              setOpenNewComplain(false);
              setTrigger(trigger + 1);
              close();
            } else {
              message.error(data?.message ?? "Error in the Server.");
            }
          })(axios);
        }}
      />
      <CompainViewer
        {...viewerOpts}
        close={() => setViewerOpts({ open: false, data: null })}
        refresh={() => loadMoreData("", {}, 1)}
        setData={(data) => setViewerOpts({ ...viewerOpts, data })}
        smskey={smskey}
      />
      {/* end of context */}
      {/* utility function above List */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Space>
          <Input.Search
            placeholder="Search via ID, respondent name, responder name"
            style={{ width: 400 }}
            loading={searching}
            onChange={(e) => {
              setSearchWord(e.target.value);
              if (e.target.value != "") runTimer(e.target.value);
              else loadMoreData(e, { type }, 1);
            }}
            allowClear
          />
          <>
            TYPE:
            <Select
              style={{
                width: 100,
              }}
              defaultValue={null}
              options={[
                {
                  label: "All",
                  value: null,
                },
                {
                  label: "Walk-in",
                  value: "walk-in",
                },
                {
                  label: "Website",
                  value: "web",
                },
                {
                  label: "SMS",
                  value: "sms",
                },
              ]}
              onChange={(e) => setType(e)}
            />
          </>
        </Space>
        <Space>
          {/* <Tooltip title="Filter Option">
            <Button icon={<SettingOutlined />} />
          </Tooltip> */}
          <Button
            icon={<PlusOutlined />}
            style={{
              backgroundColor: "green",
              color: "#fff",
              fontWeight: 400,
            }}
            onClick={() => setOpenNewComplain(true)}
          >
            New Complain
          </Button>
        </Space>
      </div>
      <Card
        style={{
          marginTop: 10,
        }}
        bodyStyle={{
          padding: 10,
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={complains}
          loading={loading}
          pagination={{
            defaultPageSize: 10,
            total: listOptions.total,
            onChange: (page, pageSize) =>
              loadMoreData(searchWord, { type }, page, pageSize),
          }}
          renderItem={(item, index) => (
            <List.Item
              style={{
                marginLeft: 20,
                cursor: "pointer",
                fontFamily: "abel",
              }}
              onClick={() => setViewerOpts({ open: true, data: item })}
            >
              <List.Item.Meta
                title={
                  <span>
                    Case #{index + 1}:{" "}
                    <Typography.Text type="secondary" italic>
                      ({item?._id?.substr(-6)})
                    </Typography.Text>
                  </span>
                }
                description={
                  <Row>
                    <Col span={3}>
                      Complainer: <br />
                      Respondent:
                      <br />
                      Type:
                      <br />
                      <br />
                      Creation Date:
                    </Col>
                    <Col span={4}>
                      {item?.residentId && item?.residentId?.name ? (
                        <Typography.Text
                          style={{ fontWeight: 700 }}
                        >{`${item?.residentId?.name[0].toLocaleUpperCase()}${item?.residentId?.name.slice(
                          1
                        )} ${item?.residentId?.lastname[0].toLocaleUpperCase()}${item?.residentId?.lastname.slice(
                          1
                        )}`}</Typography.Text>
                      ) : (
                        <Typography.Text type="secondary" strong>
                          N/A
                        </Typography.Text>
                      )}
                      <br />
                      <Typography.Text style={{ fontWeight: 700 }}>
                        {item?.respondentName}
                      </Typography.Text>
                      <br />
                      {item?.type && (
                        <Tag
                          color={
                            item?.type == "walk-in"
                              ? "green"
                              : item?.type == "web"
                              ? "cyan"
                              : "blue"
                          }
                        >
                          {item?.type.toLocaleUpperCase()}
                        </Tag>
                      )}
                      <br />
                      <br />
                      {dayjs(item.createdAt).format("MMMM DD, YYYY HH:mma")}
                    </Col>
                    <Col span={5}>
                      <strong style={{ color: "#000" }}>Description:</strong>
                      <br />
                      <Typography.Paragraph>
                        {item?.description}
                      </Typography.Paragraph>
                    </Col>
                    {/* <Col span={8}>Nothing goes from here</Col> */}
                  </Row>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default Complain;
