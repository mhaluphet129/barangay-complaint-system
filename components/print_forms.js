import React, { useState } from "react";
import { Button, Col, Modal, Row, Space, Typography } from "antd";

import Subpoeona from "./forms/subpeona";
import SubpeonaProceed from "./forms/subpeona_minutes_proceed";
import Summon from "./forms/summon";
import SummonProceed from "./forms/summon_minutes_proceed";
import SummonOfficeReturn from "./forms/summon_office_return";
import AmicableSettlement from "./forms/amicable_settlement";
import CertificateFileAction from "./certificate_file_action";
import Complaints from "./forms/complaints";
import KPFNO20A from "./forms/kpfno.20-a";
import KPFNO20 from "./forms/kpfno.20";
import NoticeConstitutionPangkat from "./forms/notice_constitution_pangkat";
import NoticeHearing from "./forms/notice_hearing";
import NoticeHearingConciliationProceeding from "./forms/notice_hearing_conciliation_proceeding";
import NoticeHearingFail from "./forms/notice_hearing_fail";
import NoticeChoosenMember from "./forms/notice_choosen_member";
import Order from "./forms/order";

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
    {
      value: "amicable_settlement",
      component: <AmicableSettlement />,
    },
    {
      value: "certificate_file_action",
      component: <CertificateFileAction />,
    },
    {
      value: "complaints",
      component: <Complaints />,
    },
    {
      value: "kpfno_20",
      component: <KPFNO20 />,
    },
    {
      value: "kpfno_20_a",
      component: <KPFNO20A />,
    },
    {
      value: "notice_constitution_pangkat",
      component: <NoticeConstitutionPangkat />,
    },
    {
      value: "notice_hearing",
      component: <NoticeHearing />,
    },
    {
      value: "notice_hearing_conciliation_proceeding",
      component: <NoticeHearingConciliationProceeding />,
    },
    {
      value: "notice_hearing_fail",
      component: <NoticeHearingFail />,
    },
    {
      value: "notice_choosen_member",
      component: <NoticeChoosenMember />,
    },
    {
      value: "order",
      component: <Order />,
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
              <Button onClick={() => openForm("amicable_settlement")}>
                Amicable Settlement
              </Button>
              <Button onClick={() => openForm("certificate_file_action")}>
                Certification to File Action
              </Button>
              <Button onClick={() => openForm("complaints")}>Complaints</Button>
              <Button onClick={() => openForm("kpfno_20")}>KPFNO.20</Button>
              <Button onClick={() => openForm("kpfno_20_a")}>KPFNO.20-A</Button>
              <Button onClick={() => openForm("notice_constitution_pangkat")}>
                Notice for Constitution of Pangkat
              </Button>
              <Button onClick={() => openForm("notice_hearing")}>
                Notice of Hearing
              </Button>
              <Button
                onClick={() =>
                  openForm("notice_hearing_conciliation_proceeding")
                }
              >
                Notice of Hearing Conciliation Proceeding
              </Button>
              <Button onClick={() => openForm("notice_hearing_fail")}>
                Notice of Hearing - Failure to Appear
              </Button>
              <Button onClick={() => openForm("notice_choosen_member")}>
                Notice to Chosen Pangkat Member
              </Button>
              <Button onClick={() => openForm("order")}>Order</Button>
            </Space>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default PrintForms;
