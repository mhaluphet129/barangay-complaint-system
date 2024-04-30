import React, { useRef } from "react";
import { Input } from "antd";

import PrintContainer from "./components/container";

const Summon = () => {
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
        SUMMONS
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
            <label>Respondents</label>
          </div>
          <div class="label-under">
            <Input
              className="input"
              style={{ textAlign: "center", width: "45%" }}
            />
          </div>
        </div>
      </div>
      <div style={{ textAlign: "start", marginTop: 40 }}>
        You are hereby summoned to appear before me in person, together with
        your witness, on{" "}
        <div class="label-under">
          <Input className="input" style={{ textAlign: "center", width: 70 }} />
        </div>{" "}
        day of{" "}
        <div class="label-under">
          <Input className="input" style={{ textAlign: "center", width: 80 }} />
        </div>{" "}
        {new Date().getFullYear()} at{" "}
        <div class="label-under">
          <Input className="input" style={{ textAlign: "center", width: 60 }} />
        </div>{" "}
        o'clock in the morning/afternoon, then and there answer to a complaint
        made before me, copy of which is attachehd hereto, for mediation of your
        dispute with complainant/s.
      </div>
      <div style={{ textAlign: "start", marginTop: 30 }}>
        You are hereby warned that if you refuse or wilfully fail to appear in
        obedience to this summons, you may be barred from filing any
        counterclaim arising from said complaint.
      </div>
      <div style={{ textAlign: "start", marginTop: 30 }}>
        FAIL NOT or else face punishment as for contempt of court.
      </div>
      <div style={{ textAlign: "start", marginTop: 30 }}>
        This{" "}
        <div class="label-under">
          <Input className="input" style={{ textAlign: "center", width: 60 }} />
        </div>{" "}
        day of{" "}
        <div class="label-under">
          <Input
            className="input"
            style={{ textAlign: "center", width: 120 }}
          />
        </div>
        , {new Date().getFullYear()}.
      </div>
      <div style={{ marginTop: 120, textAlign: "start" }}>
        <div class="label-under">
          <Input className="input" style={{ width: 230 }} />
          <label>Punong Barangay/Lupon Chairman</label>
        </div>
      </div>
    </PrintContainer>
  );
};

export default Summon;
