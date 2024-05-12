import React, { useState, useEffect } from "react";
import {
  Modal,
  Checkbox,
  Select,
  Steps,
  Button,
  Input,
  Tooltip,
  message as msgApi,
} from "antd";
import axios from "axios";
import SMS from "@/assets/utilities/sms";

const SMSBulk = ({ open, close, smskey }) => {
  const [residents, setResidents] = useState([]);
  const [selectedResidents, setSelectedResidents] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [message, setMessage] = useState("");
  const [devices, setDevices] = useState([]);
  const [device, setDevice] = useState("");
  const [step, setStep] = useState(0);

  const sms = new SMS(smskey);

  const closeAll = () => {
    setStep(0);
    setCheckedAll(false);
    setSelectedResidents([]);
    setMessage("");
    close();
  };

  const send = async () => {
    let res = await sms.sendBulk(
      device.unique,
      selectedResidents.map((e) => e.key),
      message
    );

    if (res?.success ?? false) {
      msgApi.success("Send BULK SMS Successfully");
      closeAll();
    }
  };

  const fetchResidents = async () => {
    let { data } = await axios.get("/api/resident/get-residents");

    if (data?.success ?? false) {
      setResidents(data?.residents ?? []);
    }
  };

  useEffect(() => {
    fetchResidents();
    (async () => {
      await sms
        .getDevices()
        .then((e) => setDevices(e.data))
        .catch((e) => console.log(e));
    })();
  }, []);

  return (
    <Modal open={open} onCancel={closeAll} footer={null} closable={false}>
      <Steps
        current={step}
        items={[
          {
            title: "Select Residents",
          },
          {
            title: "Compose Message",
          },
        ]}
      />

      {step == 0 && (
        <>
          <span
            style={{
              marginTop: "1rem",
              display: "block",
            }}
          >
            Select Device
          </span>
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
              setDevice(devices.filter((__) => __.id == e.key)[0])
            }
          />
          <Select
            mode="multiple"
            size="large"
            placeholder="Select a residents"
            maxTagCount="responsive"
            onChange={(_, e) => {
              setSelectedResidents(e);
            }}
            value={selectedResidents.map((e) => e.value)}
            options={residents
              .filter((e) => !selectedResidents.includes(e.phoneNumber))
              .map((e) => ({
                label: e.name + " " + e.lastname,
                value: e.name + " " + e.lastname,
                key: e.phoneNumber,
              }))}
            style={{
              width: "100%",
              marginTop: 10,
            }}
            disabled={checkedAll}
            allowClear
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              cursor: "pointer",
              marginTop: 5,
            }}
            onClick={() => {
              if (!checkedAll) {
                setSelectedResidents(
                  residents.map((e) => ({
                    label: e.name + " " + e.lastname,
                    value: e.name + " " + e.lastname,
                    key: e.phoneNumber,
                  }))
                );
              }
              setCheckedAll(!checkedAll);
            }}
          >
            <Checkbox checked={checkedAll} />
            <label style={{ fontSize: "1.2em" }}>All</label>
          </div>
          <Tooltip
            title={
              selectedResidents.length == 0
                ? "Select atleast 1 Resident or Select Device"
                : ""
            }
          >
            <Button
              size="large"
              type="primary"
              style={{ marginTop: 10 }}
              onClick={() => {
                if (!device.online) {
                  msgApi.warning("Selected Device is offline.");
                  return;
                }
                setStep(1);
              }}
              disabled={selectedResidents.length == 0 || device == ""}
              block
            >
              Next
            </Button>
          </Tooltip>
        </>
      )}

      {step == 1 && (
        <div
          style={{
            marginTop: 25,
          }}
        >
          <span
            style={{
              fontSize: "1.5em",
            }}
          >
            Message
          </span>
          <Input.TextArea
            size="large"
            autoSize={{ minRows: 3 }}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Button
              size="large"
              style={{ width: 100 }}
              onClick={(e) => setStep(0)}
            >
              PREV
            </Button>
            <Button
              size="large"
              block
              type="primary"
              disabled={message == ""}
              onClick={send}
            >
              SEND BULK SMS
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SMSBulk;
