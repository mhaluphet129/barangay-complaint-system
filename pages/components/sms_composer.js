import React, { useEffect, useState, useRef } from "react";
import {
  AutoComplete,
  Button,
  Input,
  List,
  Modal,
  Segmented,
  Select,
  Spin,
  Tooltip,
  Typography,
  message,
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";

import {
  CheckOutlined,
  CloseOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const SmsComposer = ({ open, close, onSend }) => {
  const [mode, setMode] = useState("Residents");
  const [mobilenum, setMobileNumer] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [residents, setResidents] = useState([]);
  const timerRef = useRef(null);

  //* flags
  const [loader, setLoader] = useState("");
  const [messageFlags, setMessageFlags] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoader("submit");
    setSubmitted(true);
    setMessageFlags(mobilenum.map(() => null));

    const sendSmsRequest = async (index) => {
      return new Promise((resolve) => {
        (async (_) => {
          let { data } = await axios.post("/api/sms/send-sms", {
            number: mobilenum[index],
            message: inputMsg,
            originator: currentUser.name + " " + currentUser.lastname,
            status: "processed",
          });

          if (data.success) resolve(true);
          else resolve(false);
        })(axios);
      });
    };

    let requests = mobilenum.map((e, i) => () => sendSmsRequest(i));
    (async () => {
      for (const request of requests) {
        let index = requests.indexOf(request);

        await request().then((e) => {
          setMessageFlags((_) => {
            _[index] = e;
            return _;
          });
        });
        if (index == requests.length - 1) {
          setLoader("");
          message.success("SMS requests done");
        }
      }
    })();
    if (onSend != null) {
      onSend();
    }
  };

  const searchName = async (keyword) => {
    if (keyword != "" && keyword != null) {
      let { data } = await axios.get("/api/resident/search-resident", {
        params: {
          searchKeyword: keyword,
        },
      });
      if (data.status == 200) {
        setResidents(data.searchData);
        setLoading(false);
      }
    }
  };

  const runTimer = (key) => {
    setLoading(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(function () {
      searchName(key);
    }, 500);
  };

  useEffect(() => {
    setCurrentUser(JSON.parse(Cookies.get("currentUser")));
  }, []);

  return (
    <Modal
      open={open}
      onCancel={() => {
        setResidents([]);
        close();
      }}
      title="SMS Composer"
      footer={null}
      destroyOnClose
    >
      <Segmented
        block
        options={["Residents", "Number Only"]}
        onChange={(e) => {
          setMode(e);
          setSubmitted(false);
          setMobileNumer([]);
        }}
        value={mode}
        style={{
          marginBottom: 15,
          padding: 5,
        }}
        disabled={loader == "submit"}
      />
      {mode == "Residents" && (
        <>
          Search{" "}
          <Tooltip title="You can put search by name or number">
            <QuestionCircleOutlined />
          </Tooltip>
          <br />
          <AutoComplete
            style={{
              width: 300,
            }}
            loading={loading}
            filterOption={(inputValue, option) =>
              option.value?.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            onChange={(_) => {
              runTimer(_);
            }}
            options={residents.map((e) => {
              return {
                label: `${e.name} ${e.lastname} (${e.phoneNumber})`,
                value: `${e.name} ${e.lastname}`,
              };
            })}
            onSelect={(e) =>
              setMobileNumer([
                residents.filter((_) => _.name + " " + _.lastname == e)[0]
                  .phoneNumber,
              ])
            }
            autoFocus
            allowClear
          />
          <br />
          Message
          <br />
          <Input.TextArea
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
            disabled={loader == "submit"}
            onChange={(e) => setInputMsg(e.target.value)}
          />
        </>
      )}
      {mode == "Number Only" && (
        <>
          Specific Number{" "}
          <Tooltip title="You can put multiple number by pressing 'enter'.">
            <QuestionCircleOutlined />
          </Tooltip>
          <br />
          <Select
            disabled={loader == "submit"}
            style={{ width: 350 }}
            maxLength={10}
            min={0}
            value={mobilenum}
            mode="tags"
            onChange={(e) => {
              const reg = /^(09\d{9})|\+(\d{12})$/;
              const number = e[e.length - 1];
              if (
                mobilenum
                  .map((e) => e.replace(/^0|(\+63)/, ""))
                  .includes(number.replace(/^0|(\+63)/, ""))
              ) {
                message.warning("Number already added");
              } else if (reg.test(number)) {
                setMobileNumer(e);
              } else {
                message.error(
                  "Invalid number. It should be start in 09 or +639, no alpha character, maximum of 11 digits."
                );
              }
            }}
          />
          <br />
          Message
          <br />
          <Input.TextArea
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
            disabled={loader == "submit"}
            onChange={(e) => setInputMsg(e.target.value)}
          />
        </>
      )}
      {submitted ? (
        <List
          size="small"
          dataSource={mobilenum}
          renderItem={(item, i) => (
            <List.Item
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>{item}</span>
              {messageFlags[i] == true ? (
                <Tooltip title="Message is sent">
                  <Typography.Text type="success">
                    <CheckOutlined />
                  </Typography.Text>
                </Tooltip>
              ) : messageFlags[i] == false ? (
                <Tooltip title="Message not sent">
                  <Typography.Text type="danger">
                    <CloseOutlined />
                  </Typography.Text>
                </Tooltip>
              ) : (
                <Spin />
              )}
            </List.Item>
          )}
        />
      ) : null}
      <Button
        style={{ marginTop: 5 }}
        type="primary"
        onClick={
          mobilenum?.length > 0 && inputMsg != ""
            ? onSubmit
            : () => message.warning("No number/message added")
        }
        // loading={loader == "submit"}
      >
        SEND
      </Button>
    </Modal>
  );
};

export default SmsComposer;