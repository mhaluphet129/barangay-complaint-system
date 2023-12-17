import React, { useRef } from "react";
import { Input } from "antd";

import PrintContainer from "./components/container";

const SummonProceed = () => {
  const ref = useRef(null);

  return (
    <PrintContainer forwardRef={ref}>
      <span
        style={{
          fontWeight: 700,
          textAlign: "center",
          fontSize: 25,
          marginTop: 35,
        }}
      >
        MINUTES OF PROCEEDINGS
      </span>
      <span>(Mediation)</span>
      <div
        style={{
          textAlign: "start",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>Attendance: </span>
        <span style={{ marginLeft: 50, marginTop: 10 }}>Name</span>
        <div>
          <div class="label-under">
            <Input
              className="input"
              style={{ marginRight: 50, textAlign: "center", width: "40%" }}
            />
          </div>
          <div class="label-under">
            <Input
              className="input"
              style={{ marginRight: 50, textAlign: "center", width: "40%" }}
            />
          </div>
        </div>
        <div>
          <div class="label-under">
            <Input
              className="input"
              style={{ marginRight: 50, textAlign: "center", width: "40%" }}
            />
          </div>
          <div class="label-under">
            <Input
              className="input"
              style={{ marginRight: 50, textAlign: "center", width: "40%" }}
            />
          </div>
        </div>
        {Array(37)
          .fill(0)
          .map((e, i) => (
            <div class="label-under" style={{ marginTop: i == 0 ? 20 : 0 }}>
              <Input
                className="input custom-textarea"
                style={{ width: "100%" }}
                onChange={(e) => {
                  let input = document.querySelectorAll(".custom-textarea");
                  if (
                    e.target.value.length >= 75 &&
                    i + 1 < (input?.length ?? 0)
                  )
                    input[i + 1].focus();
                }}
                onPressEnter={() => {
                  let input = document.querySelectorAll(".custom-textarea");
                  if (i + 1 < (input?.length ?? 0)) input[i + 1].focus();
                }}
              />
            </div>
          ))}

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <div class="label-under">
            <Input className="input" style={{ width: 200 }} />
            <label>Signature over printed name</label>
          </div>
          <div class="label-under">
            <Input className="input" style={{ width: 200 }} />
            <label>Signature over printed name</label>
          </div>
        </div>
        <div
          style={{
            marginTop: 100,
            display: "flex",
            justifyContent: "space-between",
            marginRight: 50,
            marginLeft: 50,
          }}
        >
          <div>
            <span>Prepared By:</span>
            <br />
            <div class="label-under">
              <Input className="input" style={{ width: 200 }} />
              <label>Pangkat Secretary</label>
            </div>
          </div>
          <div>
            <span>Noted By:</span>
            <br />
            <div class="label-under">
              <Input className="input" style={{ width: 200 }} />
              <label>Pangkat Chairman</label>
            </div>
          </div>
        </div>
      </div>
    </PrintContainer>
  );
};

export default SummonProceed;
