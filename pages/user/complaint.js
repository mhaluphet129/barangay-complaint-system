import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Form,
  AutoComplete,
  Input,
  Button,
  Image,
  message,
  Typography,
} from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import { PickerDropPane } from "filestack-react";

const Complain = ({ appkey }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [residentId, setResidentId] = useState();
  const timerRef = useRef(null);
  const [photos, setPhotos] = useState([]);

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

    if (!residentId) {
      return message.error("Please select a resident first");
    }
    val.residentId = residentId;
    // val.inchargeId = currentUser._id;
    val.images = photos;

    (async (_) => {
      let { data } = await _.post("/api/complain/new-complain", val);
      if (data?.success) {
        message.success(data?.message ?? "Successfully Created.");
        close();
      } else {
        message.error(data?.message ?? "Error in the Server.");
      }
    })(axios);
  };

  //   useEffect(() => {
  //     currentUser = JSON.parse(currentUser);
  //   }, [currentUser]);

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
      <Typography.Title level={2}>ONLINE COMPLAINT FORM</Typography.Title>
      <Form
        form={form}
        onFinish={handleFinish}
        labelAlign="left"
        labelCol={{
          span: 8,
        }}
        style={{
          padding: 25,
          width: 700,
          background: "#eee",
          borderRadius: 10,
        }}
      >
        <Form.Item
          label="Resident"
          name="resident"
          rules={[
            { required: true, message: "This field is blank. Please provide" },
          ]}
        >
          <AutoComplete
            popupClassName="certain-category-search-dropdown"
            popupMatchSelectWidth={350}
            onChange={(e) => {
              if (e != "") runTimer(e);
              else setSearchResult([]);
            }}
            onSelect={(e, _) => setResidentId(_.key)}
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
                key: e?._id,
              };
            })}
          />
        </Form.Item>
        <Form.Item
          name="respondentName"
          label="Respondent Name"
          rules={[
            { required: true, message: "This field is blank. Please provide" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="respondentNumber"
          label="Respondent Number"
          rules={[
            { required: true, message: "This field is blank. Please provide" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const reg = /^(09\d{9})|\+(\d{12})$/;
                const number = getFieldValue("respondentNumber");
                if (/^09/.test(number) && number.length > 11) {
                  return Promise.reject(
                    "Number should have a maximum length of 11"
                  );
                } else if (/^\+639/.test(number) && number.length > 13) {
                  return Promise.reject(
                    "Number should have a maximum length of 12"
                  );
                } else if (reg.test(number)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(
                    "Invalid number. It should be start in 09 or +639, no alpha character, maximum of 11 digits."
                  );
                }
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea
            autoSize={{
              minRows: 8,
              maxRows: 15,
            }}
            placeholder="This is optional"
          />
        </Form.Item>
        <Form.Item label="Images">
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
          style={{ textAlign: "center", display: "block" }}
          onClick={() => (window.location.href = "/")}
        >
          or go back to login
        </Typography.Link>
      </Form>
    </div>
  );
};

export async function getServerSideProps() {
  return { props: { appkey: process.env.FILESTACK_KEY } };
}

export default Complain;
