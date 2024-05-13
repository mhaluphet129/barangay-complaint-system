import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Empty,
  Input,
  Segmented,
  Spin,
  Tooltip,
  Typography,
  message,
} from "antd";
import { SendOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";
import Cookies from "js-cookie";
import SMS from "@/assets/utilities/sms";

const Conversation = ({
  open,
  close,
  residentId,
  complainerNumber,
  complainantName,
  complainantNumber,
  complainId,
  smskey,
}) => {
  const [chat, setChat] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [text, setText] = useState("");
  const [trigger, setTrigger] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Complainer");
  const [_complainantNumber, setComplainantNumber] = useState("");
  const [complainantOpt, setComplainantOpt] = useState(false);
  const [inputComplainantNumber, setInputComplainantNumber] = useState("");
  const [deviceId, setDeviceId] = useState("");

  const sms = new SMS(smskey);

  const getTitle = () => {
    if (selectedTab == "Complainer") {
      if (residentId) {
        return residentId?.name + " " + residentId?.lastname;
      } else return complainerNumber;
    } else {
      if (complainantName) return complainantName;
      else return complainantNumber;
    }
  };

  const handleEmptyChat = () => {
    if (selectedTab == "Complainee") {
      return !["", "Not Set"].includes(_complainantNumber) ? (
        <Typography.Title
          type="secondary"
          level={5}
          italic
          style={{ textAlign: "center" }}
        >
          You can now message the Complainee
        </Typography.Title>
      ) : complainantOpt ? (
        <div
          style={{
            display: "flex",
          }}
        >
          <Input
            placeholder="Enter Phone Number starts with 639"
            maxLength={12}
            onChange={(e) => setInputComplainantNumber(e.target.value)}
            addonAfter={
              <span
                style={{ cursor: "pointer" }}
                onClick={handleSetComplainantNumber}
              >
                SET
              </span>
            }
          />
        </div>
      ) : (
        <Empty
          description={
            <Typography.Text type="secondary" italic>
              Complainee Number is not set
            </Typography.Text>
          }
        >
          <Button type="primary" onClick={() => setComplainantOpt(true)}>
            Set Complainee Number to Begin Conversation
          </Button>
        </Empty>
      );
    } else return <></>;
  };

  const handleSetComplainantNumber = () => {
    if (!inputComplainantNumber.startsWith("639")) {
      message.warning("Phone Number should start in 639");
      return;
    }
    (async (_) => {
      let { data } = await _.post("/api/complain/update-complainant-number", {
        id: complainId,
        number: inputComplainantNumber,
      });

      if (data?.success) {
        message.success(data?.message ?? "Success");
        setComplainantNumber(inputComplainantNumber);
      } else {
        message.error(data?.message);
      }
    })(axios);
  };

  const handleSend = () => {
    setIsSending(true);
    (async (_) => {
      let res = await _.post("/api/sms/send-sms", {
        number:
          selectedTab == "Complainer" ? complainerNumber : _complainantNumber,
        message: text,
        originator: currentUser._id,
        ...(residentId ? { residentId } : {}),
        toComplain: true,
        type: "outbound",
        deviceId,
      });

      if (res.data.success) {
        setTrigger(trigger + 1);
        setText("");
        setIsSending(false);
      } else {
        message.error(res.data?.message ?? "Error in the server");
        setIsSending(false);
      }
    })(axios);
  };

  useEffect(() => {
    if (open) {
      (async (_) => {
        setFetching(true);

        let res = await _.get("/api/sms/get-sms-specific", {
          params:
            selectedTab == "Complainer" && residentId
              ? {
                  residentNumber: residentId.phoneNumber,
                  residentId: residentId._id,
                  adminId: currentUser._id,
                }
              : {
                  adminId: currentUser._id,
                  number:
                    selectedTab == "Complainer"
                      ? complainerNumber
                      : complainantNumber,
                },
        });

        if (res.data?.success ?? false) {
          setFetching(false);
          setChat(res.data?.sms ?? []);
        } else {
          setFetching(false);
        }
      })(axios);
    }

    setComplainantNumber(
      [null, undefined].includes(complainantNumber)
        ? "Not Set"
        : complainantNumber
    );
  }, [open, trigger, selectedTab]);

  useEffect(() => {
    setCurrentUser(JSON.parse(Cookies.get("currentUser")));
    (async (_) => {
      await _.getDevices().then((e) => {
        const device = e.data.filter((e) => e.online)[0];
        console.log(device);

        if (device) setDeviceId(device.unique);
        else message.warning("Device not detected");
      });
    })(sms);
  }, []);

  return (
    <Drawer
      open={open}
      onClose={close}
      width="35%"
      title={getTitle()}
      extra={
        <Segmented
          options={["Complainer", "Complainee"]}
          onChange={(e) => setSelectedTab(e)}
          style={{ padding: 5 }}
        />
      }
      styles={{
        body: {
          overflow: "hidden",
        },
      }}
    >
      <div
        style={{
          width: "100%",
          height: "95%",
          border: "1px solid #e1e1e1",
          borderRadius: 5,
          marginBottom: 10,
          padding: 10,
          // display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          overflow: "scroll",
        }}
      >
        {fetching ? (
          <Spin />
        ) : chat.length > 0 ? (
          chat.map((e) => (
            <ChatBubble type={e.type} message={e.message} date={e.createdAt} />
          ))
        ) : (
          handleEmptyChat()
        )}
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <Tooltip title={deviceId == "" ? "No current device detected" : ""}>
          <Input
            size="large"
            placeholder="Write something...."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={
              (chat.length == 0 &&
                selectedTab == "Complainee" &&
                [null, undefined, "Not Set"].includes(_complainantNumber)) ||
              false
            }
          />
        </Tooltip>
        <Tooltip title={deviceId == "" ? "No current device detected" : ""}>
          <Button
            size="large"
            style={{ marginLeft: 5, width: 70 }}
            icon={<SendOutlined />}
            type="primary"
            onClick={handleSend}
            disabled={
              ((text == "" || chat.length == 0) &&
                selectedTab == "Complainee" &&
                [null, undefined, "Not Set"].includes(_complainantNumber)) ||
              false
            }
            loading={isSending}
            ghost
          />
        </Tooltip>
      </div>
    </Drawer>
  );
};

const ChatBubble = ({ type, message, date }) => {
  return (
    <div
      style={{
        marginBottom: 10,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          borderRadius: 10,
          background: type == "inbound" ? "#fff" : "#2961e0",
          padding: 10,
          display: "inline-block",
          color: type == "inbound" ? "#777" : "#fff",
          border: "1px solid #eee",
          maxWidth: "50%",
          alignSelf: type == "inbound" ? "start" : "end",
        }}
      >
        {message}
      </div>
      <Typography.Text
        type="secondary"
        style={{
          textAlign: type == "inbound" ? "start" : "end",
          fontSize: "0.95em",
        }}
      >
        {dayjs(date).format("MMM DD 'YY hh:mma")}
      </Typography.Text>
    </div>
  );
};

export default Conversation;
