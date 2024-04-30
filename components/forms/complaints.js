import React, { useRef } from "react";
import { Input } from "antd";

import PrintContainer from "./components/container";

const Complaints = () => {
  const ref = useRef(null);
  return (
    <PrintContainer forwardRef={ref}>
      <span
        style={{
          fontWeight: 700,
          textAlign: "center",
          fontSize: 25,
          marginTop: 35,
          letterSpacing: 5,
        }}
      >
        COMPLAINTS
      </span>
      <div style={{ textAlign: "start", marginTop: 20 }}>
        I/WE hereby complain against above names respondent(s) for violating
        my/our rights and interests in the following manner:
      </div>
      {Array(5)
        .fill(0)
        .map((e, i) => (
          <div class="label-under">
            <Input
              className="input custom-textarea"
              style={{ width: "100%", padding: 0 }}
              onChange={(e) => {
                let input = document.querySelectorAll(".custom-textarea");
                if (e.target.value.length >= 75 && i + 1 < (input?.length ?? 0))
                  input[i + 1].focus();
              }}
              onPressEnter={() => {
                let input = document.querySelectorAll(".custom-textarea");
                if (i + 1 < (input?.length ?? 0)) input[i + 1].focus();
              }}
            />
          </div>
        ))}
      <div style={{ textAlign: "start", marginTop: 20 }}>
        THEREFORE, I/WE pray that the following relief/s be granted to me/us in
        accordance with law and/or equity:
      </div>
      {Array(5)
        .fill(0)
        .map((e, i) => (
          <div class="label-under">
            <Input
              className="input custom-textarea"
              style={{ width: "100%", padding: 0 }}
              onChange={(e) => {
                let input = document.querySelectorAll(".custom-textarea");
                if (e.target.value.length >= 75 && i + 1 < (input?.length ?? 0))
                  input[i + 1].focus();
              }}
              onPressEnter={() => {
                let input = document.querySelectorAll(".custom-textarea");
                if (i + 1 < (input?.length ?? 0)) input[i + 1].focus();
              }}
            />
          </div>
        ))}
      <div style={{ textAlign: "start", marginTop: 20 }}>
        Made this{" "}
        <div class="label-under">
          <Input className="input" style={{ width: 80 }} />
        </div>
        day of{" "}
        <div class="label-under">
          <Input className="input" style={{ width: 80 }} />,{" "}
          {new Date().getFullYear()}.
        </div>
      </div>
      <div style={{ textAlign: "start", marginTop: 25 }}>
        <div class="label-under">
          <Input className="input" style={{ width: 200 }} />
          <label>Complaint</label>
        </div>
      </div>
      <div style={{ marginTop: 50, textAlign: "start" }}>
        Received and filed this{" "}
        <div class="label-under">
          <Input className="input" style={{ width: 70 }} />
        </div>{" "}
        day of{" "}
        <div class="label-under">
          <Input className="input" style={{ width: 100 }} />,{" "}
          {new Date().getFullYear()}.
        </div>
      </div>
      <div style={{ marginTop: 30, textAlign: "start" }}>
        <div class="label-under">
          <Input className="input" style={{ width: 230 }} />
          <label>Punong Barangay/Lupon Chairman</label>
        </div>
      </div>
    </PrintContainer>
  );
};

export default Complaints;
