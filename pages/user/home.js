import React, { useState } from "react";
import { Layout } from "antd";
import { Sider, Header, Content } from "../layout";

import { VscGraph } from "react-icons/vsc";
import { GrGroup } from "react-icons/gr";
import { FaGears } from "react-icons/fa6";
import { CiFileOn } from "react-icons/ci";

const MyApp = ({ app_key }) => {
  const [selectedKey, setSelectedKey] = useState("home");

  return (
    <>
      <Layout>
        <Sider
          selectedIndex={(e) => setSelectedKey(e.key)}
          selectedKey={selectedKey}
          // image="/buksu-log.png"
          items={[
            { label: "Dashboard", key: "dashboard", icon: <VscGraph /> },
            {
              label: "Admin",
              key: "admin",
              icon: <GrGroup />,
            },
            { label: "Helpers", key: "helpers", icon: <FaGears /> },
            { label: "Residents", key: "residents", icon: <CiFileOn /> },
          ]}
        />
        <Layout>
          <Header app_key={app_key} />
          <Content
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
          ></Content>
        </Layout>
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  return { props: { app_key: process.env.FILESTACK_KEY } };
}

export default MyApp;
