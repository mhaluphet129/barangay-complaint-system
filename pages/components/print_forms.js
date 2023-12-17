import React, { useState } from "react";
import { Button, Col, Modal, Row, Space, Typography } from "antd";

import Subpoeona from "./forms/subpeona";
import SubpeonaProceed from "./forms/subpeona_minutes_proceed";
import Summon from "./forms/summon";
import SummonProceed from "./forms/summon_minutes_proceed";
import SummonOfficeReturn from "./forms/summon_office_return";

const PrintForms = ({ open, close, funcOpen }) => {
  const [formConfig, setFormConfig] = useState({
    open: false,
    selectedComponent: "",
  });

  const openForm = (key) => {
    setFormConfig({ open: true, selectedComponent: key });
    close();
  };

  const forms = [
    {
      value: "subpoena",
      component: <Subpoeona />,
    },
    {
      value: "subpoena_proceed",
      component: <SubpeonaProceed />,
    },
    {
      value: "summon",
      component: <Summon />,
    },
    {
      value: "summon_proceed",
      component: <SummonProceed />,
    },
    {
      value: "summon_office_return",
      component: <SummonOfficeReturn />,
    },
  ];

  return (
    <>
      {/* Opened selected form */}
      <Modal
        open={formConfig.open}
        onCancel={() => {
          setFormConfig({ open: false, selectedComponent: "" });
          funcOpen();
        }}
        closable={false}
        footer={null}
        width={1000}
        styles={{
          body: {
            overflowY: "scroll",
          },
        }}
        centered
      >
        {forms.filter((e) => e.value == formConfig.selectedComponent)[0]
          ?.component ?? <></>}
      </Modal>
      {/* end */}
      <Modal
        open={open}
        onCancel={close}
        footer={null}
        closable={false}
        title="PRINTABLE FORMS"
        width={750}
      >
        <Row gutter={[64, 64]}>
          <Col span={12}>
            <Typography.Title level={5}>Summon</Typography.Title>
            <Space direction="vertical">
              <Button onClick={() => openForm("subpoena")}>Subpoena</Button>
              <Button onClick={() => openForm("subpoena_proceed")}>
                Subpoena Minutes of Proceeding
              </Button>
              <Button onClick={() => openForm("summon")}>Summon</Button>
              <Button onClick={() => openForm("summon_proceed")}>
                Summon - Minutes of Proceeding
              </Button>
              <Button onClick={() => openForm("summon_office_return")}>
                Summon - Office Return
              </Button>
            </Space>
          </Col>
          <Col span={12}>
            <Typography.Title level={5}>Others</Typography.Title>
            <Space direction="vertical">
              <Button>Amicable Settlement</Button>
              <Button>Certification to File Action</Button>
              <Button>Complaints</Button>
              <Button>KPFNO.20-A</Button>
              <Button>KPFNO.20-B</Button>
              <Button>Notice for Constitution of Pangkat</Button>
              <Button>Notice of Hearing</Button>
              <Button>Notice of Hearing Conciliation Proceeding</Button>
              <Button>Notice of Hearing - Failure to Appear</Button>
              <Button>Notice to Chosen Pangkat Member</Button>
              <Button>Order</Button>
            </Space>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default PrintForms;
