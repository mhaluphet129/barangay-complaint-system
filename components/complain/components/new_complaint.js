import React, { useState, useRef, useEffect } from "react";
import { Modal, Form, AutoComplete, Input, Button, Image, Select } from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import { PickerDropPane } from "filestack-react";
import { LoadingOutlined } from "@ant-design/icons";

import jason from "@/assets/json/constant.json";

const NewComplain = ({ open, close, appkey, data, handleFinish, isEdit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [residentId, setResidentId] = useState("");
  const timerRef = useRef(null);
  const [photos, setPhotos] = useState([]);

  let currentUser = Cookies.get("currentUser");

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

  useEffect(() => {
    currentUser = JSON.parse(currentUser);
  }, [currentUser]);

  useEffect(() => {
    if (data) {
      if (typeof data?.residentId == "object")
        data.residentId = data.residentId._id;
      form.setFieldsValue(data);
    }
  }, [data]);

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields();
        close();
      }}
      closable={false}
      footer={null}
      title={isEdit ? "Edit Complain" : "New Complain"}
      centered
    >
      <Form
        form={form}
        onFinish={(val) => {
          if (isEdit) {
            if (data.residentId) {
              if (typeof data.residentId == "string")
                val.residentId = data.residentId;
              else val.residentId = data.residentId._id;
            } else val.residentId = residentId;
          } else val.residentId = residentId;

          if (data) val._id = data._id;
          handleFinish(val);
        }}
        labelAlign="left"
        labelCol={{
          span: 8,
        }}
        style={{ marginTop: 25 }}
      >
        {!data?.residentId && (
          <Form.Item
            label="Resident"
            name="resident"
            rules={[
              {
                required: true,
                message: "This field is blank. Please provide",
              },
            ]}
          >
            <AutoComplete
              popupClassName="certain-category-search-dropdown"
              popupMatchSelectWidth={350}
              onChange={(e) => {
                if (e != "") runTimer(e);
                else setSearchResult([]);
              }}
              onSelect={(e, _) => {
                form.setFieldValue("resident", _.value);
                setResidentId(_.key);
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  form.resetFields(["resident"]);
                }
              }}
              suffixIcon={loading ? <LoadingOutlined /> : null}
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
        )}

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
                const reg = /^(09\d{9})|(\d{12})$/;
                const number = getFieldValue("respondentNumber");
                if (/^09/.test(number) && number.length > 11) {
                  return Promise.reject(
                    "Number should have a maximum length of 11"
                  );
                } else if (/^639/.test(number) && number.length > 13) {
                  return Promise.reject(
                    "Number should have a maximum length of 12"
                  );
                } else if (reg.test(number)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(
                    "Invalid number. It should be start in 09 or 639, no alpha character, maximum of 11 digits."
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
        <Form.Item name="northBarangay" label="Barangay North">
          <Select
            options={jason.barangay.map((e) => {
              return {
                label: e,
                value: e,
              };
            })}
          />
        </Form.Item>
        {appkey && (
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
        )}

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
      </Form>
    </Modal>
  );
};

export default NewComplain;
