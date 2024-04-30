import React, { useRef } from "react";
import { Input } from "antd";
import PrintContainer from "./components/container";

const NoticeHearingConciliationProceeding = () => {
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
        OFFICE OF THE LUPONG TAGAPAMAYAPA
      </span>
      <span
        style={{
          fontWeight: 500,
          textAlign: "center",
          fontSize: 18,
          marginTop: 60,
        }}
      >
        NOTICE OF HEARING
        <br />
        (CONCILIATION PROCEEDING)
      </span>
      <div style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
        <p style={{ marginRight: 20 }}>TO:</p>
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
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
            <label>Respondent/s</label>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "start", marginTop: 50 }}>
        You are hereby required to appear before me on the{" "}
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
            style={{ width: 100, marginBottom: 10, textAlign: "center" }}
          />
        </div>
        , {new Date().getFullYear()}, at{" "}
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 80, marginBottom: 10, textAlign: "center" }}
          />
        </div>{" "}
        o'clock in the morning/afternoon for a hearing of above-entitled case.
      </div>
      <div style={{ textAlign: "start", marginTop: 30 }}>
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
            style={{ width: 80, marginBottom: 10, textAlign: "center" }}
          />
        </div>
        , {new Date().getFullYear()}
      </div>
      <div style={{ marginTop: 50, textAlign: "start" }}>
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 200, marginBottom: 10, textAlign: "center" }}
          />
          <label style={{ fontWeight: 700 }}>Pangkat Chairman</label>
        </div>
      </div>
      <div style={{ textAlign: "start", marginTop: 50 }}>
        Notified this{" "}
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 80, marginBottom: 10, textAlign: "center" }}
          />
        </div>
        day of{" "}
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 80, marginBottom: 10, textAlign: "center" }}
          />
        </div>
        , {new Date().getFullYear()}
      </div>

      <div
        style={{
          marginTop: 40,
          display: "flex",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: 30,
          }}
        >
          <div class="label-under" style={{ marginBottom: 20 }}>
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div class="label-under" style={{ marginBottom: 20 }}>
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
            <label>Respondent/s</label>
          </div>
        </div>
      </div>
    </PrintContainer>
  );
};

export default NoticeHearingConciliationProceeding;
