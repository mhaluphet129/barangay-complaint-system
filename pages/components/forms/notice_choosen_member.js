import React, { useRef } from "react";
import { Input } from "antd";

import PrintContainer from "./components/container";

const NoticeChoosenMember = () => {
  const ref = useRef(null);
  return (
    <PrintContainer forwardRef={ref}>
      <span
        style={{
          fontWeight: 500,
          textAlign: "center",
          fontSize: 18,
          marginTop: 35,
        }}
      >
        NOTICE TO CHOSEN PANGKAT MEMBER
        <br />
        (Re: FAILURE TO APPEAR)
      </span>
      <div style={{ alignSelf: "end" }}>
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 150, marginBottom: 10, textAlign: "center" }}
          />
          <label>date</label>
        </div>
      </div>
      <div
        style={{
          textAlign: "start",
          marginTop: 40,
          width: 300,
          display: "flex",
        }}
      >
        <p>TO: </p>
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 250, marginBottom: 10, textAlign: "center" }}
          />
        </div>
      </div>
      <div style={{ textAlign: "start", marginTop: 20 }}>
        Notice is hereby given that you have been chosen member of the Pangkat
        ng Tagapagkasundo to amicable conciliate the dispute between the parties
        in the above-entitled case.
      </div>

      <div style={{ textAlign: "start", marginTop: 30 }}>
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 230, marginBottom: 10, textAlign: "center" }}
          />
          <label>Punong Barangay/Lupon Secretary</label>
        </div>
      </div>
      <div style={{ textAlign: "start", marginTop: 70 }}>
        Received this{" "}
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
      <div style={{ textAlign: "start", marginTop: 50 }}>
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 150, marginBottom: 10, textAlign: "center" }}
          />
          <label>Pangkat Member</label>
        </div>
      </div>
    </PrintContainer>
  );
};

export default NoticeChoosenMember;
