import React, { useState, useRef, useEffect } from "react";
import {
  Form,
  AutoComplete,
  Input,
  Button,
  Image,
  message,
  Typography,
  InputNumber,
  Tooltip,
  Card,
} from "antd";
import axios from "axios";
import { PickerDropPane } from "filestack-react";
import SMS from "@/assets/utilities/sms";

const Complain = ({ appkey, smskey }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [residentId, setResidentId] = useState();
  const [residentName, setResidentName] = useState("");
  const timerRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [pin, setPin] = useState();
  const [pinConfirmed, setPinConfirmed] = useState(false);
  const [deviceId, setDeviceId] = useState("");

  const sms = new SMS(smskey);

  const searchName = async (keyword) => {
    if (keyword != "" && keyword != null) {
      let { data } = await axios.get("/api/resident/search-resident", {
        params: {
          searchKeyword: keyword,
        },
      });
      if (data.status == 200) {
        setSearchResult(data.searchData);
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

  const handleFinish = (val) => {
    // * send an sms to Responder

    if (!residentId) return message.error("Please select a resident first");
    if (!pinConfirmed)
      return message.error("Pin is invalid or blank. Please provide.");

    val.residentId = residentId;
    val.type = "web";
    val.images = photos;

    (async (_) => {
      let { data } = await _.post("/api/complain/new-complain", {
        ...val,
        template: "sms_to_respondent_1",
      });
      if (data?.success) {
        message.success(data?.message ?? "Successfully Created.");

        // reset
        form.resetFields();
        setPinConfirmed(false);
        setPin();
        setPhotos([]);
        setResidentId();
        setLoading(false);
      } else {
        message.error(data?.message ?? "Error in the Server.");
      }
    })(axios);
  };

  const sendPin = (id, number) => {
    (async (_) => {
      await _.post("/api/complain/send-a-pin", {
        id,
      }).then(({ data }) => {
        if (data?.success) {
          console.log(data.pin);
          (async (_) => {
            _.sendMessage(
              `+63${number}`,
              `Hello Ma'am/Sir ${residentName}, Your OTP Number is ${data.pin}. This is from Barangay Complain System`,
              deviceId
            );
          })(sms);

          message.success(
            data?.message ?? "Code is sent to resident phone number."
          );
        } else {
          message.error(data?.message ?? "Error in the server.");
        }
      });
    })(axios);
  };

  const confirmPin = () => {
    (async (_) => {
      await _.get("/api/complain/pin-confirm", {
        params: {
          residentId,
          pin,
        },
      }).then(({ data }) => {
        if (data?.success) {
          setPinConfirmed(true);
          message.success(data?.message ?? "Success");
        } else {
          message.error(data?.message ?? "Error in the server.");
        }
      });
    })(axios);
  };

  useEffect(() => {
    (async (_) => {
      await _.getDevices().then((e) => {
        const device = e.data.filter((e) => e.online)[0];
        console.log(device);
        setDeviceId(device.unique);
      });
    })(sms);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <Card
        bodyStyle={{
          padding: 0,
        }}
        hoverable
      >
        <Form
          form={form}
          onFinish={handleFinish}
          labelAlign="left"
          labelCol={{
            span: 8,
          }}
          colon={false}
          style={{
            padding: 25,
            width: 700,
            background: "#eee",
            borderRadius: 10,
          }}
        >
          <Typography.Title style={{ textAlign: "center" }}>
            Online Complaint Form
          </Typography.Title>
          <Form.Item
            label="Residente"
            name="resident"
            rules={[
              {
                required: true,
                message: "Name or Pin is blank. Please provide.",
              },
            ]}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Tooltip title="PIN code is send after selecting resident for confirmation.">
                <AutoComplete
                  popupClassName="certain-category-search-dropdown"
                  popupMatchSelectWidth={false}
                  size="large"
                  style={{
                    marginRight: 10,
                    width: 200,
                  }}
                  onChange={(e) => {
                    if (e != "") runTimer(e);
                    else setSearchResult([]);
                  }}
                  onSelect={(e, _) => {
                    let [id, phone, name] = _.key.split("%%");
                    setResidentId(id);
                    setResidentName(name);
                    sendPin(id, phone);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace") {
                      form.resetFields(["resident"]);
                    }
                  }}
                  options={searchResult.map((e) => {
                    return {
                      label: `${e?.name} ${
                        e?.middlename
                          ? `${e?.middlename[0].toLocaleUpperCase()}.`
                          : ""
                      } ${e?.lastname}`,
                      value: `${e?.name} ${
                        e?.middlename
                          ? `${e?.middlename[0].toLocaleUpperCase()}.`
                          : ""
                      } ${e?.lastname}`,
                      key: `${e?._id}%%${e.phoneNumber}%%${e.name} ${e.lastname}`,
                    };
                  })}
                />
              </Tooltip>
              <span style={{ marginRight: 10 }}> Code:</span>{" "}
              <InputNumber
                placeholder="Input 6 digit code sent from sms"
                maxLength={6}
                style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                controls={false}
                onChange={setPin}
                disabled={pinConfirmed}
                size="large"
              />
              <Button
                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                onClick={confirmPin}
                disabled={pinConfirmed}
                size="large"
              >
                SUBMIT
              </Button>
            </div>
          </Form.Item>
          <Form.Item
            name="respondentName"
            label="Pangalan sa Gireklamo"
            rules={[
              {
                required: true,
                message: "This field is blank. Please provide",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item name="respondentNumber" label="Number sa Gireklamo">
            <InputNumber
              addonBefore="+63"
              maxLength={10}
              size="large"
              controls={false}
              min={0}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item name="description" label="Isulat imong Reklamo">
            <Input.TextArea
              autoSize={{
                minRows: 8,
                maxRows: 15,
              }}
              placeholder="Detalye saimong reklamo"
            />
          </Form.Item>
          <Form.Item label="Ebidensya (Picture only)">
            <div
              style={{ width: 255, cursor: "pointer", marginBottom: 10 }}
              id="picker-container"
            >
              <PickerDropPane
                apikey={appkey}
                onUploadDone={(res) => {
                  setPhotos(res?.filesUploaded.map((_) => _.url));
                }}
                pickerOptions={{ container: "picker-container", maxFiles: 3 }}
              />
            </div>
            {photos.map((_, i) => (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    position: "relative",
                    width: 300,
                    marginBottom: 10,
                  }}
                >
                  <Image src={_} alt="random_photo" width="100%" />
                </div>
              </>
            ))}
          </Form.Item>
          <Form.Item noStyle>
            <Button
              onClick={() => form.validateFields().then(() => form.submit())}
              size="large"
              type="primary"
              block
            >
              CONFIRM
            </Button>
          </Form.Item>
          <Typography.Link
            style={{ textAlign: "center", display: "block", marginTop: 10 }}
            onClick={() => (window.location.href = "/")}
          >
            HOME
          </Typography.Link>
        </Form>
      </Card>
    </div>
  );
};

export async function getServerSideProps() {
  return {
    props: { appkey: process.env.FILESTACK_KEY, smskey: process.env.SMS_KEY },
  };
}

export default Complain;
