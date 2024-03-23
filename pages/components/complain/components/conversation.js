import React, { useEffect, useState } from "react";
import { Button, Drawer, Input, Spin, Typography, message } from "antd";
import { SendOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";
import Cookies from "js-cookie";

const Conversation = ({ open, close, residentId, number }) => {
  const [chat, setChat] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [currentNumber, setCurrentNumber] = useState("");
  const [text, setText] = useState("");
  const [trigger, setTrigger] = useState(0);

  const handleSend = () => {
    (async (_) => {
      let res = await _.post("/api/sms/send-sms", {
        number: currentNumber,
        message: text,
        originator: currentUser._id,
        ...(residentId ? { residentId } : {}),
        toComplain: true,
        type: "outbound",
      });

      if (res.data.success) {
        setTrigger(trigger + 1);
      } else {
        message.error(res.data?.message ?? "Error in the server");
      }
    })(axios);
  };

  useEffect(() => {
    if (open) {
      if (residentId) {
      } else setCurrentNumber(number);

      (async (_) => {
        setFetching(true);

        let res = await _.get("/api/sms/get-sms-specific", {
          params: residentId
            ? {
                residentId,
                adminId: currentUser._id,
              }
            : {
                adminId: currentUser._id,
                number,
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
  }, [open, trigger]);

  useEffect(() => {
    setCurrentUser(JSON.parse(Cookies.get("currentUser")));
  }, []);

  return (
    <Drawer open={open} onClose={close} width="35%" title={currentNumber}>
      <div
        style={{
          width: "100%",
          height: "95%",
          border: "1px solid #e1e1e1",
          borderRadius: 5,
          marginBottom: 10,
          padding: 10,
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        {fetching ? (
          <Spin />
        ) : chat.length > 0 ? (
          chat.map((e) => (
            <ChatBubble type={e.type} message={e.message} date={e.createdAt} />
          ))
        ) : (
          "No Message"
        )}
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <Input
          size="large"
          placeholder="Write something...."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          size="large"
          style={{ marginLeft: 5, width: 70 }}
          icon={<SendOutlined />}
          type="primary"
          onClick={handleSend}
          disabled={text == ""}
          ghost
        />
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
        {dayjs(date).format("MMM DD YYYY hh:mma")}
      </Typography.Text>
    </div>
  );
};

export default Conversation;
