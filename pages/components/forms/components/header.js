import React from "react";
import { Input } from "antd";

const PrintHeader = () => {
  return (
    <>
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
      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div class="label-under">
            <Input
              className="input"
              style={{ width: 200, marginBottom: 10, textAlign: "center" }}
            />
            <label>complainant</label>
          </div>
          <div class="label-under">
            Case no.{" "}
            <Input
              className="input"
              style={{ width: 200, marginBottom: 10, textAlign: "center" }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginTop: 20,
          }}
        >
          <span style={{ width: 200, textAlign: "center" }}>- against -</span>
          <div class="label-under">
            For:{" "}
            <Input
              className="input"
              style={{ width: 200, marginBottom: 10, textAlign: "center" }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 20,
          }}
        >
          <div class="label-under">
            <Input
              className="input"
              style={{ width: 200, marginBottom: 10, textAlign: "center" }}
            />
            <label>Respondent</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintHeader;
