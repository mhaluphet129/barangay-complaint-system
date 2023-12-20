import React, { useRef } from "react";
import { Input } from "antd";

import PrintContainer from "./components/container";

const AmicableSettlement = () => {
  const ref = useRef(null);
  return (
    <PrintContainer forwardRef={ref}>
      <span
        style={{
          fontWeight: 700,
          textAlign: "center",
          fontSize: 25,
          letterSpacing: 3,
          marginTop: 35,
        }}
      >
        AMICABLE SETTLEMENT
      </span>
      <div style={{ textAlign: "start", marginTop: 40 }}>
        We, complainant/s and respondent/s in the above-captioned case, do
        hereby agree to settle our dispute as follows
      </div>
      {Array(3)
        .fill(0)
        .map((e, i) => (
          <div class="label-under" style={{ marginTop: i == 0 ? 20 : 0 }}>
            <Input
              className="input custom-textarea"
              style={{ width: "100%" }}
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
      <div style={{ textAlign: "start" }}>
        and bind ourselves to comply honestly and faithfully with the above
        terms of settlement.
      </div>
      <div style={{ textAlign: "start", marginTop: 20 }}>
        Entered into this{" "}
        <div class="label-under">
          <Input className="input" style={{ width: 50 }} />
        </div>{" "}
        day of{" "}
        <div class="label-under">
          <Input className="input" style={{ width: 80 }} />
        </div>
        , {new Date().getFullYear()}
      </div>
      <div
        style={{
          marginTop: 30,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div>
          Complainant/s
          <br />
          <div class="label-under">
            <Input className="input" style={{ width: 200 }} />
          </div>
          <br />
          <div class="label-under">
            <Input className="input" style={{ width: 200 }} />
          </div>
        </div>
        <div>
          Respondent/s
          <br />
          <div class="label-under">
            <Input className="input" style={{ width: 200 }} />
          </div>
          <br />
          <div class="label-under">
            <Input className="input" style={{ width: 200 }} />
          </div>
        </div>
      </div>
      <div style={{ marginTop: 30 }}>
        <span style={{ textAlign: "center" }}>ATTESTATION</span>
        <p style={{ textAlign: "start" }}>
          I hereby certify that the foregoing amicable settlement was entered
          into by the parties freely and voluntarily, after I had explained to
          them the nature and consequence of such settlement.
        </p>
      </div>
      <div style={{ marginTop: 30, display: "flex", justifyContent: "end" }}>
        <div class="label-under">
          <Input className="input" style={{ width: 200 }} />
          <label>Pangkat Chairman</label>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>Republic of the Philippines</div>
    </PrintContainer>
  );
};

export default AmicableSettlement;
