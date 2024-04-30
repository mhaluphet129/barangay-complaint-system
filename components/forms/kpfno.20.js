import React, { useRef } from "react";
import { Input } from "antd";
import PrintContainer from "./components/container";

const KPFNO20 = () => {
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
      <div
        style={{
          marginTop: 40,
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div class="label-under">
              <Input
                className="input"
                style={{
                  width: 255,
                  textAlign: "center",
                  padding: 0,
                }}
              />
            </div>
            <div class="label-under">
              <Input
                className="input"
                style={{
                  width: 255,
                  textAlign: "center",
                  padding: 0,
                }}
              />
              <label>[Mga] Nagsumbong</label>
            </div>
          </div>
          <div>
            Kaso sa Barangay Numero{" "}
            <div class="label-under">
              <Input
                className="input"
                style={{
                  width: 80,
                  textAlign: "center",
                  padding: 0,
                }}
              />
            </div>
            <br />
            Mahitungod sa{" "}
            <div class="label-under">
              <Input
                className="input label-textarea"
                style={{
                  width: 155,
                  textAlign: "center",
                  padding: 0,
                }}
                onChange={(e) => {
                  let input = document.querySelectorAll(".label-textarea");
                  if (e.target.value.length >= 19) input[1].focus();
                }}
                onPressEnter={() => {
                  let input = document.querySelectorAll(".label-textarea");
                  input[1].focus();
                }}
              />
            </div>
            <br />
            <div class="label-under">
              <Input
                className="input label-textarea"
                style={{ width: 255, padding: 0 }}
                onChange={(e) => {
                  let input = document.querySelectorAll(".label-textarea");
                  if (e.target.value.length >= 31) input[2].focus();
                }}
                onPressEnter={() => {
                  let input = document.querySelectorAll(".label-textarea");
                  input[2].focus();
                }}
              />
            </div>
            <br />
            <div class="label-under">
              <Input
                className="input label-textarea"
                style={{ width: 255, padding: 0 }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            marginTop: 20,
          }}
        >
          <span style={{ width: 200, textAlign: "center" }}>- against -</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "start",
            marginTop: 30,
          }}
        >
          <div class="label-under">
            <Input
              className="input"
              style={{
                width: 255,
                textAlign: "center",
                padding: 0,
              }}
            />
          </div>
          <div class="label-under">
            <Input
              className="input"
              style={{
                width: 255,
                textAlign: "center",
                padding: 0,
              }}
            />
            <label>[Mga] Sinumbong</label>
          </div>
        </div>
      </div>
      <span
        style={{
          fontWeight: 600,
          textAlign: "center",
          fontSize: 20,
          marginTop: 60,
        }}
      >
        SERTIPIKASYON SA PAGPASAKA UG AKSIYON DIHA SA <br />
        HUKMANAN
        <br />
        <span style={{ textAlign: "center", fontSize: 15, fontWeight: 300 }}>
          [Certification to File Action]
        </span>
      </span>
      <div style={{ textAlign: "start" }}>
        <span>Kini nagmatuod:</span>
        <ol style={{ marginLeft: 50, marginTop: 15 }}>
          <li>
            Adunay personal nga pag-inatubangay tali sa mga masigkabahin
            atubangan sa Punong Baranga / Pangkat ng Tagapagkasundo.
          </li>
          <li>Adunay Malinawon nga Kasabotan nga nakab-ot.</li>
          <li>
            Ang Malinawon nga Kasabotan gibale-wala sigon sa pamahayag atubangan
            sa Punong barangay nga gipanumpaan ni{" "}
            <div class="label-under">
              <Input className="input" style={{ width: 120 }} />
            </div>{" "}
            tungod sa hinungdan nga{" "}
            <div class="label-under">
              <Input className="input" style={{ width: 280 }} />
            </div>{" "}
            ;
          </li>
          <li>
            Busa, ang angay nga sumbong mahitungod sa gikasamokan mahimo na nga
            karong ipasaka sa hukaman / buhatan sa kagamhanan.
          </li>
        </ol>
      </div>
      <div style={{ textAlign: "start", marginTop: 30 }}>
        Niining ika{" "}
        <div class="label-under">
          <Input className="input" style={{ width: 80 }} />
        </div>{" "}
        nga adlaw sa
        <div class="label-under">
          <Input className="input" style={{ width: 150 }} />
        </div>
        , 20
        <div class="label-under">
          <Input className="input" style={{ width: 50 }} />
        </div>
        .
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginRight: 200,
          marginTop: 30,
        }}
      >
        <div class="label-under">
          <Input className="input" style={{ width: 180 }} />
          <label>Kalimhim sa Pangkat</label>
        </div>
      </div>
      <div style={{ textAlign: "start" }}>
        Gipamatud-an ni:
        <br />
        <div class="label-under" style={{ marginTop: 20 }}>
          <Input className="input" style={{ width: 180 }} />
          <label>Pangkat Tsirman</label>
        </div>
      </div>
      <div
        style={{
          marginTop: 100,
          fontSize: 19,
          fontWeight: 600,
          textAlign: "start",
        }}
      >
        <span>PAHIBALO:</span>
        <br />
        <br />
        <span>
          GAMITON KINI NGA PORMA KON WALAY MALINAWON NGA KASABOTAN GIBALE-WALA
          SA SINUMBONG [ O SA NAGSUMBONG ] SA HINUNGDAN NGA ANG IYANG /ILANG
          PAG-UYON NIINI NASAGULAN UG PANLIMBONG O PAKUSOG 0 PANGHULGA
        </span>
      </div>
    </PrintContainer>
  );
};

export default KPFNO20;
