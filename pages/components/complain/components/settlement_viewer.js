import React, { useEffect, useState } from "react";
import { Button, Drawer, Timeline, Tooltip, message } from "antd";
import dayjs from "dayjs";
import NewSettlement from "./new_settlement";
import axios from "axios";

const SettlementViewer = ({ open, close, settlement, id }) => {
  const [newSettlement, setNewSettlement] = useState(false);
  const [_settlement, setSettlement] = useState([]);

  const getColorByStatus = (status) => {
    switch (status) {
      case "processed": {
        return "#87CEEB";
      }
      case "solved": {
        return "#28a745";
      }
      case "unsolved": {
        return "#8B8589";
      }
      case "disregard": {
        return "#708090";
      }
      case "dismissed": {
        return "#800000";
      }
    }
  };

  const handleNewSettlement = (type, description) => {
    (async (_) => {
      let { data } = await _.post("/api/complain/new-settlement", {
        id,
        newSettlement: { type, description },
      });

      if (data?.success) {
        message.success(data?.message ?? "Success");
        setSettlement(data.data);
      }
    })(axios);
  };

  useEffect(() => {
    setSettlement(settlement);
  }, [settlement]);

  return (
    <>
      <Drawer
        open={open}
        onClose={close}
        width="40%"
        title="Settlement Viewer"
        extra={[
          <Tooltip
            key="new-settlement-btn"
            title={
              settlement?.at(-1).type == "solved" ? "Case already Settled" : ""
            }
          >
            <Button
              type="primary"
              onClick={() => setNewSettlement(true)}
              disabled={settlement?.at(-1).type == "solved"}
            >
              NEW SETTLEMENT
            </Button>
          </Tooltip>,
        ]}
      >
        <Timeline
          mode="left"
          items={_settlement?.map((e) => {
            return {
              color: getColorByStatus(e.type),
              label: dayjs(e.createdAt).format("MMM DD 'YY"),
              children: e.description == "" ? "No Description" : e.description,
            };
          })}
        />
      </Drawer>

      {/* context */}
      <NewSettlement
        open={newSettlement}
        close={() => setNewSettlement(false)}
        onAdd={handleNewSettlement}
      />
    </>
  );
};

export default SettlementViewer;
