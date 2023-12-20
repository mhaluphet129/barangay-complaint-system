import React, { useRef } from "react";
import { Input } from "antd";

import PrintContainer from "./forms/components/container";

const CertificateFileAction = () => {
  const ref = useRef(null);
  return (
    <PrintContainer forwardRef={ref}>
      <span
        style={{
          fontWeight: 700,
          textAlign: "center",
          fontSize: 23,
          marginTop: 35,
        }}
      >
        CERTIFICATION TO FILE ACTION
      </span>
      <div style={{ textAlign: "start" }}>
        <span>This is to certify that:</span>
        <ol style={{ marginLeft: 40 }}>
          <li>
            There has been a personal confrontation between the parties before
            the Punong Barangay but mediation failed;
          </li>
          <li>
            The Pangkat ng Tagapagkasundo was constituted but the personal
            confrontation before the Pangkat likewise did not result into a
            settlement; and
          </li>
          <li>
            Therefore, the corresponding complaint for the dispute may now be
            filed in court/government office.
          </li>
        </ol>
      </div>
      <div style={{ textAlign: "start", marginTop: 50 }}>
        This{" "}
        <div class="label-under">
          <Input className="input" style={{ width: 100 }} />
        </div>{" "}
        day of{" "}
        <div class="label-under">
          <Input className="input" style={{ width: 130 }} />,{" "}
          {new Date().getFullYear()}.
        </div>
      </div>
      <div style={{ marginTop: 20, textAlign: "start" }}>
        <div class="label-under">
          <Input className="input" style={{ width: 180 }} />
          <label>Pangkat Secretary</label>
        </div>
      </div>
      <div style={{ marginTop: 50, textAlign: "start" }}>
        Attested by: <br />
        <div class="label-under" style={{ marginTop: 50, marginLeft: 30 }}>
          <Input className="input" style={{ width: 120 }} />
          <label>Pangkat Chairman</label>
        </div>
      </div>
    </PrintContainer>
  );
};

export default CertificateFileAction;
