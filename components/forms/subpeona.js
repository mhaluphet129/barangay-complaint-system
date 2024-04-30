import React, { useRef } from "react";
import { Input } from "antd";

import PrintContainer from "./components/container";

const Subpoeona = () => {
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
        SUBPOENA
      </span>
      <div style={{ display: "flex" }}>
        TO:{" "}
        <div
          style={{
            width: "100%",
          }}
        >
          <div class="label-under">
            <Input
              className="input"
              style={{ marginRight: 50, textAlign: "center", width: "45%" }}
            />
          </div>
          <div class="label-under">
            <Input
              className="input"
              style={{ textAlign: "center", width: "45%" }}
            />
          </div>
          <div class="label-under">
            <Input
              className="input"
              style={{ marginRight: 50, textAlign: "center", width: "45%" }}
            />
          </div>
          <div class="label-under">
            <Input
              className="input"
              style={{ textAlign: "center", width: "45%" }}
            />
          </div>
        </div>
      </div>
      <span style={{ marginTop: 20, marginBottom: 20 }}>Witnesses</span>
      <div style={{ textAlign: "start", marginBottom: 20 }}>
        You are hereby commanded to appear before me on the{" "}
        <div class="label-under">
          <Input className="input" style={{ textAlign: "center", width: 40 }} />
        </div>
        day of{" "}
        <div class="label-under">
          <Input className="input" />
        </div>
        , {new Date().getFullYear()}, at{" "}
        <div class="label-under">
          <Input className="input" style={{ textAlign: "center", width: 80 }} />
        </div>{" "}
        o'clock in the morning/afternoon, then and there to testify in the
        hearing of the above-captioned case.
      </div>
      <div style={{ textAlign: "start", marginBottom: 25 }}>
        This{" "}
        <div class="label-under">
          <Input className="input" style={{ textAlign: "center", width: 40 }} />
        </div>
        day of{" "}
        <div class="label-under">
          <Input
            className="input"
            style={{ textAlign: "center", width: 100 }}
          />
        </div>
        , {new Date().getFullYear()}
      </div>
      <div class="label-under" style={{ textAlign: "start" }}>
        <Input className="input" style={{ textAlign: "center", width: 250 }} />
        <br />
        <p>
          Punong Barangay/Pangkat Chairman
          <br />
          (Cross out whichever one is not applicable.)
        </p>
      </div>
    </PrintContainer>
  );
};

export default Subpoeona;
