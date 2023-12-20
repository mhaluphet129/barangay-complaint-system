import React, { useRef } from "react";
import { Input } from "antd";

import PrintContainer from "./components/container";

const Order = () => {
  const ref = useRef(null);
  return (
    <PrintContainer forwardRef={ref}>
      <span
        style={{
          fontWeight: 700,
          textAlign: "center",
          fontSize: 18,
          marginTop: 35,
          letterSpacing: 4,
        }}
      >
        ORDER
      </span>

      <div
        className="first-line-margin"
        style={{ textAlign: "start", marginTop: 20 }}
      >
        When this case was set for hearing, the respondent appeared. Complainant
        and his/her witnesses failed to appear despite due notice. The failure
        of the complainant and that of her witnesses to appear despite due
        notice is an indication that ther are no longer insterested to pursue
        the case. Hence, this case is hereby ordered DISMISSED.
      </div>
      <div style={{ textAlign: "start", marginLeft: 40, marginTop: 20 }}>
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 150, marginBottom: 10, textAlign: "center" }}
          />
        </div>
        , {new Date().getFullYear()}
      </div>
      <div style={{ marginTop: 40, alignSelf: "end" }}>
        <div class="label-under">
          <Input
            className="input"
            style={{ width: 200, marginBottom: 10, textAlign: "center" }}
          />
          <label>Pangkat Chairman</label>
        </div>
      </div>
    </PrintContainer>
  );
};

export default Order;
