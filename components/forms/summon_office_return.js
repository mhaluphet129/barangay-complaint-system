import React, { useRef } from "react";
import { Input } from "antd";

import PrintContainer from "./components/container";

const SummonOfficeReturn = () => {
  const ref = useRef(null);
  return (
    <PrintContainer forwardRef={ref} hideTitle={true}>
      <span
        style={{
          fontWeight: 700,
          textAlign: "center",
          fontSize: 25,
          marginTop: 35,
          marginBottom: 40,
        }}
      >
        OFFICER'S RETURN
      </span>
      <div style={{ textAlign: "start" }}>
        I served this summon upon respondent{" "}
        <div class="label-under">
          <Input
            className="input"
            style={{ textAlign: "center", width: 300 }}
          />
        </div>{" "}
        on the
        <br />
        <div class="label-under">
          <Input className="input" style={{ textAlign: "center", width: 70 }} />{" "}
          day of{" "}
          <div class="label-under">
            <Input
              className="input"
              style={{ textAlign: "center", width: 120 }}
            />
          </div>
          , {new Date().getFullYear()}, and upon respondent
          <br />
          <div class="label-under">
            <Input
              className="input"
              style={{ textAlign: "center", width: 250 }}
            />
          </div>{" "}
          on the day of{" "}
          <div class="label-under">
            <Input
              className="input"
              style={{ textAlign: "center", width: 150 }}
            />
          </div>
          , {new Date().getFullYear()}, by:
        </div>
      </div>
      <div style={{ textAlign: "start", marginTop: 20 }}>
        <span>
          (Write name/s of respondent/s before mode by which he/they was/were
          served.)
        </span>
        <br />
        <span>Respondent/s</span>
        <br />
        <div class="label-under">
          <Input
            className="input"
            style={{ textAlign: "center", width: 200 }}
          />{" "}
          1. handling to him/them said summons in person, or
        </div>
        <br />
        <div class="label-under">
          <Input
            className="input"
            style={{ textAlign: "center", width: 200 }}
          />{" "}
          2. handling to him/them said summons and he/they refused to receive
          it, or
        </div>
        <br />
        <div class="label-under">
          <Input
            className="input"
            style={{ textAlign: "center", width: 200 }}
          />{" "}
          3. leaving said summons at his/her dwelling with
          <div class="label-under">
            <Input
              className="input"
              style={{ textAlign: "center", width: 90 }}
            />{" "}
          </div>{" "}
          (name) a person of suitable age and discretion residing therein, or
        </div>
        <br />
        <div class="label-under">
          <Input
            className="input"
            style={{ textAlign: "center", width: 200 }}
          />{" "}
          4. leaving said summmons at his/their office/place of business with{" "}
          <div class="label-under">
            <Input
              className="input"
              style={{ textAlign: "center", width: 90 }}
            />
          </div>
          , (name) a competent person in charge thereof.
        </div>
        <div style={{ marginTop: 70 }}>
          <div class="label-under">
            <Input
              className="input"
              style={{ textAlign: "center", width: 150 }}
            />
            <label>Officer</label>
          </div>
        </div>
        <div style={{ marginTop: 50, marginBottom: 10 }}>
          Received by Respondent/s representative/s:
        </div>
        <div style={{ display: "flex" }}>
          <div class="label-under">
            <Input
              className="input"
              style={{ textAlign: "center", width: 150 }}
            />
            <label>Signature</label>
          </div>
          <div class="label-under" style={{ marginLeft: 10 }}>
            <Input
              className="input"
              style={{ textAlign: "center", width: 150 }}
            />
            <label>Date</label>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div class="label-under">
            <Input
              className="input"
              style={{ textAlign: "center", width: 150 }}
            />
            <label>Signature</label>
          </div>
          <div class="label-under" style={{ marginLeft: 10 }}>
            <Input
              className="input"
              style={{ textAlign: "center", width: 150 }}
            />
            <label>Date</label>
          </div>
        </div>
      </div>
    </PrintContainer>
  );
};

export default SummonOfficeReturn;
