import React, { useRef } from "react";
import { Input } from "antd";

import PrintContainer from "./components/container";

const NoticeHearingFail = () => {
  const ref = useRef(null);
  return (
    <PrintContainer forwardRef={ref} hideTitle={true}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>Republic of the Philippines</span>
        <span>Province of Bukidnon</span>
        <span>Municipality of Maramag</span>
        <span>
          Barangay
          <div class="label-under">
            <Input
              className="input"
              style={{ width: 100, marginBottom: 10, textAlign: "center" }}
            />
          </div>
        </span>
      </div>
      <span style={{ marginTop: 35, fontSize: 20 }}>
        OFFICE OF THE LUPONG TAGAMAPAYAPA
      </span>
      <span
        style={{
          fontWeight: 500,
          textAlign: "center",
          fontSize: 18,
          marginTop: 35,
        }}
      >
        NOTICE OF HEARING
        <br />
        (Re: FAILURE TO APPEAR)
      </span>
      <div style={{ textAlign: "start", marginTop: 40, width: 300 }}>
        <p>TO: </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: 30,
          }}
        >
          <div class="label-under">
            <Input
              className="input"
              style={{ width: 250, marginBottom: 10, textAlign: "center" }}
            />
          </div>
          <div class="label-under">
            <Input
              className="input"
              style={{ width: 250, marginBottom: 10, textAlign: "center" }}
            />
            <label>Complainant/s</label>
          </div>
        </div>
      </div>
      <div
        className="first-line-margin"
        style={{ textAlign: "start", marginTop: 50 }}
      >
        You are hereby required to appear before me/the Pangkat on the{" "}
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 80, marginBottom: 10, textAlign: "center" }}
          />
        </div>{" "}
        day of{" "}
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 120, marginBottom: 10, textAlign: "center" }}
          />
        </div>{" "}
        {new Date().getFullYear()} at{" "}
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 80, marginBottom: 10, textAlign: "center" }}
          />
        </div>{" "}
        o'clock in the morning/afternoon to explain why you failed to appear for
        mediation/conciliation scheduled on{" "}
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 120, marginBottom: 10, textAlign: "center" }}
          />
        </div>
        , {new Date().getFullYear()} and why your complaint should not be
        dismissed, a certificate to bar the filling of your action on
        court/government office should not be issued, and contempt proceedings
        should not be initiated in court for willful failure or refusal to
        appear before the Punong Barangay/Pangkat ng Tagapagkasundo.
      </div>
      <div style={{ textAlign: "start", marginTop: 35 }}>
        This{" "}
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 80, marginBottom: 10, textAlign: "center" }}
          />
        </div>{" "}
        day of{" "}
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 180, marginBottom: 10, textAlign: "center" }}
          />
        </div>
        , {new Date().getFullYear()}.
      </div>
      <div style={{ textAlign: "start", marginTop: 50 }}>
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 300, marginBottom: 10, textAlign: "center" }}
          />
          <label>
            Punong Barangay/Pangkat Chairman
            <br />
            (Cross out whichever is not applicable)
          </label>
        </div>
      </div>
      <div style={{ textAlign: "start", marginTop: 70 }}>
        Notified this{" "}
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 80, marginBottom: 10, textAlign: "center" }}
          />
        </div>{" "}
        day of{" "}
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 150, marginBottom: 10, textAlign: "center" }}
          />
        </div>
        , {new Date().getFullYear()}.
      </div>
      <div style={{ marginTop: 30, textAlign: "start" }}>
        Complainant/s <br />
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 150, marginBottom: 10, textAlign: "center" }}
          />
        </div>
        <br />
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 150, marginBottom: 10, textAlign: "center" }}
          />
        </div>
      </div>
      <div style={{ marginTop: 20, textAlign: "start" }}>
        Respondent/s <br />
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 150, marginBottom: 10, textAlign: "center" }}
          />
        </div>
        <br />
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 150, marginBottom: 10, textAlign: "center" }}
          />
        </div>
      </div>
    </PrintContainer>
  );
};

export default NoticeHearingFail;
