import Link from "next/link";
import React from "react";
import "tailwindcss/tailwind.css";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-24 mx-4 mt-4 ">
      <Link className="flex items-center mr-2 text-2xl font-bold " href="/">
        <img src="/web-logo.png" width={120} className="mr-2" />
      </Link>

      <div className="flex flex-col items-end">
        <Link className="text-5xl font-bold" href="/">
          Barangay Complaint System
        </Link>
        <Link className="flex items-center text-2xl font-bold" href="/">
          North Poblacion Maramag
        </Link>
      </div>
    </div>
  );
};

export default Header;
