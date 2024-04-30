import React from "react";
import { Button } from "antd";
import { useReactToPrint } from "react-to-print";

import PrintHeader from "./header";

const PrintContainer = ({ forwardRef, hideTitle, children }) => {
  const handlePrint = useReactToPrint({
    content: () => forwardRef.current,
  });

  return (
    <>
      <div ref={forwardRef} style={{ marginTop: 20 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {hideTitle ? <></> : <PrintHeader />}
          {children}
        </div>
      </div>
      <Button style={{ float: "right", marginTop: 50 }} onClick={handlePrint}>
        PRINT
      </Button>
    </>
  );
};

export default PrintContainer;
