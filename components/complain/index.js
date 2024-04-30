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
  Skeleton,
  Divider,
  Select,
  Row,
  Col,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import NewComplain from "./components/new_complaint";
import CompainViewer from "./components/complain_viewer";

const Complain = ({ appKey }) => {
  const [complains, setComplains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [openNewComplain, setOpenNewComplain] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [viewerOpts, setViewerOpts] = useState({ open: false, data: null });
  const [listOptions, setListOptions] = useState({
    total: 0,
    index: 0,
    loading: false,
  });

  const timerRef = useRef(null);

  const loadMoreData = (searchKey, clear, filter = {}) => {
    if (listOptions.loading) {
      return;
    }

    setListOptions({ ...listOptions, loading: true });
    (async (_) => {
      let { data } = await _.get("/api/complain/get-complains", {
        params: {
          page: 5,
          index: clear ? 0 : listOptions.index,
          ...(filter.type ? { type: filter.type } : {}),
          searchKey,
        },
      });
      if (data?.success) {
        if (clear) setComplains(data?.complain);
        else setComplains([...complains, ...data?.complain]);
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
      loadMoreData(searchKeyword, true);
    }, 500);
  };

  useEffect(() => {
    setLoading(true);
    loadMoreData();
  }, []);

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
          val.residentId = residentId;
          val.inchargeId = currentUser._id;
          val.images = photos;

          (async (_) => {
            let { data } = await _.post("/api/complain/new-complain", {
              ...val,
              template: "sms_to_respondent_1",
            });
            if (data?.success) {
              message.success(data?.message ?? "Successfully Created.");
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
        refresh={() => loadMoreData("", true)}
        setData={(data) => setViewerOpts({ ...viewerOpts, data })}
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
              else loadMoreData(e, true);
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
              onChange={(e) => loadMoreData(searchWord, true, { type: e })}
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
        <div id="scrollableDiv" style={{ height: "75vh", overflow: "scroll" }}>
          <InfiniteScroll
            dataLength={complains.length}
            next={loadMoreData}
            hasMore={listOptions.total > complains.length}
            loader={
              <Skeleton
                paragraph={{
                  rows: 1,
                }}
                active
              />
            }
            endMessage={
              complains.length != 0 ? (
                <Divider plain>
                  <Typography.Text type="secondary" italic>
                    No more complains to be loaded
                  </Typography.Text>
                </Divider>
              ) : null
            }
            scrollableTarget="scrollableDiv"
          >
            <List
              itemLayout="horizontal"
              dataSource={complains}
              loading={loading}
              renderItem={(item, index) => (
                <List.Item
                  style={{
                    marginLeft: 20,
                    cursor: "pointer",
                  }}
                  onClick={() => setViewerOpts({ open: true, data: item })}
                >
                  <List.Item.Meta
                    title={<span>Complain ID: {item?._id?.substr(-6)}</span>}
                    description={
                      <Row>
                        <Col span={8}>
                          Complain by:{" "}
                          {item?.residentId ? (
                            `${item?.residentId?.name} ${item?.residentId?.lastname}`
                          ) : (
                            <Typography.Text type="secondary" strong>
                              N/A
                            </Typography.Text>
                          )}
                          <br />
                          Type:{" "}
                          {item?.type && (
                            <Tag>{item?.type.toLocaleUpperCase()}</Tag>
                          )}
                          <br />
                          Respondent: {item?.respondentName}
                          <br />
                          Responded:{" "}
                          {item?.isResponded ? (
                            <Tag color="green">YES</Tag>
                          ) : (
                            <Tag color="red">NO</Tag>
                          )}
                        </Col>
                        <Col span={8}>
                          <strong style={{ color: "#000" }}>
                            Description:
                          </strong>
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
          </InfiniteScroll>
        </div>
      </Card>
    </>
  );
};

export default Complain;
