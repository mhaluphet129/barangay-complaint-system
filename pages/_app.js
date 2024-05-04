import React from "react";
import "../styles/globals.css";
import "../styles/main.styles.css";
import { ConfigProvider } from "antd";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider>
      <Head>
        <link rel="shortcut icon" href="/web-logo.png" />
        <title>Barangay Complaint System</title>
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        ></link>
        <meta name="description" content="System for barangay complaints" />
      </Head>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

// push to deployment
