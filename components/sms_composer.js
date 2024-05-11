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

import SMS from "@/assets/utilities/sms";

// TODO: admin username should not be editable on edit profile

const SmsComposer = ({ open, close, onSend, smskey }) => {
  const [mode, setMode] = useState("Residents");
  const [mobilenum, setMobileNumer] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [residents, setResidents] = useState([]);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const timerRef = useRef(null);

  const sms = new SMS(smskey);

  //* flags
  const [loader, setLoader] = useState("");
  const [messageFlags, setMessageFlags] = useState([]);
  const [loading, setLoading] = useState(false);

  // utils
  function processPhoneNumber(input) {
    if (input.startsWith("639")) {
      return "63" + input.substring(2);
    } else if (input.startsWith("+639")) {
      return "63" + input.substring(3);
    } else if (input.startsWith("9")) {
      return "63" + input;
    } else {
      return input;
    }
  }

  const sendSmsRequest = async (index) => {
    const _number = mobilenum[index];
    setMessageFlags((_) => {
      _[index] = "1";
      return _;
    });
    return new Promise((resolve, reject) => {
      if (
        mode == "Residents" &&
        !(
          _number.startsWith("09") ||
          _number.startsWith("+639") ||
          _number.startsWith("639") ||
          _number.startsWith("9")
        )
      ) {
        reject({
          message: "Resident Number is invalid",
        });
      } else {
        const number = processPhoneNumber(_number);

        (async (_) => {
          let { data } = await axios.post("/api/sms/send-sms", {
            number,
            message: inputMsg,
            originator: currentUser._id,
            device: selectedDevice.unique,
          });

          if (data.success) resolve(true);
          else reject(data.message);
        })(axios);
      }
    });
  };

  const onSubmit = () => {
    if (!selectedDevice.online) {
      message.error("Selected device is offline. Please Choose another one.");
      return;
    }

    if (mode == "Residents") {
      if (mobilenum.length == 0) {
        message.error("You didn't select a resident to sent");
        return;
      }
    }

    setMessageFlags(Array(mobilenum.length).fill(null));

    return Promise.all(
      mobilenum.map(
        async (e, i) =>
          await sendSmsRequest(i).catch((e) => {
            return {
              error: true,
              message: e,
            };
          })
      )
    ).then((e) => {
      setLoader("submit");

      (async () => {
        for (const request of e) {
          if (typeof request == "object") {
            if (request.error) {
              setLoader("");
              message.error(request.message);
              return;
            }
          }

          let index = e.indexOf(request);
          setMessageFlags((_) => {
            _[index] = e;
            return _;
          });
        }

        if (messageFlags.filter((_) => _ == null || _ == false).length == 0) {
          setLoader("");
          message.success("SMS requests done");
          setMobileNumer([]);
          setResidents([]);
          close();
        } else {
          message.error("There are some number that cannot be sent");
        }
      })();

      if (onSend != null) {
        onSend();
      }
    });
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
    (async () => {
      await sms
        .getDevices()
        .then((e) => setDevices(e.data))
        .catch((e) => console.log(e));
    })();
  }, []);

  return (
    <Modal
      open={open}
      onCancel={() => {
        setResidents([]);
        setMessageFlags([]);
        setMobileNumer([]);
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
          setMobileNumer([]);
        }}
        value={mode}
        style={{
          marginBottom: 15,
          padding: 5,
        }}
        disabled={loader == "submit"}
      />
      Select Device <br />
      <Select
        style={{
          width: 300,
        }}
        options={devices.map((e) => ({
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {e.name}
              <span
                style={{
                  color: e.online ? "green" : "red",
                }}
              >
                {e.online ? "ONLINE" : "OFFLINE"}
              </span>
            </div>
          ),
          value: e.name,
          key: e.id,
        }))}
        onSelect={(_, e) =>
          setSelectedDevice(devices.filter((__) => __.id == e.key)[0])
        }
      />
      <br />
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
          <Tooltip title="You can put multiple number by pressing 'enter'">
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
      {mobilenum.length > 0 ? (
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
              ) : messageFlags[i] == "1" ? (
                <Spin />
              ) : (
                <></>
              )}
            </List.Item>
          )}
        />
      ) : null}
      <Button
        style={{ marginTop: 5 }}
        type="primary"
        // onClick={
        //   mobilenum?.length > 0 && inputMsg != ""
        //     ? onSubmit
        //     : () => message.warning("No number/message added")
        // }
        onClick={onSubmit}
        // loading={loader == "submit"}
      >
        SEND
      </Button>
    </Modal>
  );
};

export default SmsComposer;
