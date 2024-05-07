import Link from "next/link";
import React from "react";
import "tailwindcss/tailwind.css";

const Header = () => {
  return (
    <div className="flex justify-between items-center mt-4">
      <Link className="font-bold flex items-center text-3xl" href="/">
        <img src="/web-logo.png" width={100} className="mr-2" />
      </Link>
      <Link className="font-bold flex items-center text-3xl" href="/">
        North Poblacion Maramag
      </Link>
      <a
        className="complain-btn flex items-center text-md bg-[#6096fe] text-white py-2 px-4 rounded-full"
        href="/complain"
      >
        File a complaint
      </a>
    </div>
  );
};

export default Header;
