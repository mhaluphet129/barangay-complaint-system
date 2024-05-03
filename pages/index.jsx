import React from "react";

import { CiFileOn } from "react-icons/ci";
import { LiaSmsSolid } from "react-icons/lia";
import { MdGroups2 } from "react-icons/md";

import "tailwindcss/tailwind.css";
import Link from "next/link";

const Home = () => {
  // useEffect(() => {
  //   AOS.init({
  //     once: true,
  //     duration: 1000,
  //     easing: "ease-out-cubic",
  //   });
  // }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="w-full flex justify-center bg-[#eee]">
          File a complaint?{" "}
          <a
            className="ml-2 hover:underline hover:text-[#31a107]"
            href="/complain"
          >
            click here
          </a>
        </div>
        <nav className="bg-[#2d2d2d] pl-4 text-[#31a107]">
          <div className="max-w-7xl px-1 sm:px-6 lg:px-1">
            <div className="flex justify-between h-12">
              <div className="flex">
                <Link
                  href="/"
                  className="px-3 py-2 text-lg font-medium w-28 text-center bg-[#31a107] text-white hover:underline"
                >
                  Home
                </Link>
                <Link
                  href="/news"
                  className="px-3 py-2 text-lg font-medium nav-link w-76 text-center hover:underline"
                >
                  News and Announcement
                </Link>
                <Link
                  href="/complains"
                  className="px-3 py-2 text-lg font-medium nav-link w-76 text-center hover:underline"
                >
                  Complains
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="w-full flex flex-col items-center justify-center mt-10">
          <img className="logo-inside-main" src="/web-logo.png" />
          <div className="text-center text-4xl font-black h-40">
            BARANGAY COMPLAIN SYSTEM <br />
            North Maramag
          </div>
          <div className="w-3/4">
            <span className="ml-10">Lorem</span> ipsum dolor sit amet,
            consectetur adipiscing elit. Vestibulum convallis velit viverra,
            semper eros at, rhoncus nisi. Maecenas id libero ultrices, dictum
            orci fringilla, finibus risus. Proin at pulvinar elit. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Praesent pretium,
            tortor at finibus accumsan, massa elit placerat lectus, ut bibendum
            lorem lacus non ante. In sed lorem porttitor, pretium nibh non,
            ultricies nisl. Ut malesuada vestibulum felis ullamcorper
            sollicitudin. Pellentesque eget ultricies elit, consectetur eleifend
            ligula. Fusce non quam vitae nunc bibendum auctor. Suspendisse quis
            ligula a magna suscipit maximus. Nulla finibus faucibus nibh at
            porta. Nunc nec urna in augue malesuada ullamcorper. Mauris eros
            elit, elementum non mi quis, fringilla rhoncus libero. Interdum et
            malesuada fames ac ante ipsum primis in faucibus. Donec varius
            placerat urna, quis fringilla quam. Maecenas commodo dolor id libero
            eleifend pretium. <br />
            <span className="ml-10">Praesent</span> auctor id orci sed pharetra.
            Vestibulum eleifend, erat vitae pharetra ultricies, libero magna
            vehicula felis, sed porttitor nibh nulla ultricies risus. Duis nisl
            neque, bibendum vel felis vel, pellentesque pulvinar lectus. Sed
            sodales vel velit at vehicula. Morbi vestibulum tincidunt lorem eget
            egestas. Phasellus eu aliquet eros. Cras luctus mauris vitae tortor
            pharetra tincidunt. Vivamus tincidunt ligula purus, sit amet
            volutpat justo vehicula vitae. Nullam nunc leo, vestibulum ut
            euismod vel, porta in lacus. Nunc mollis accumsan diam, eget
            porttitor enim dignissim eu.
            <br />
            <span className="ml-10">In</span> tellus arcu, pretium id diam at,
            sagittis tempus dolor. Nulla semper tincidunt eros, non convallis
            nunc sollicitudin id. Vestibulum aliquet imperdiet rhoncus.
            Curabitur sollicitudin, eros ut luctus tincidunt, ante dolor viverra
            turpis, eu rhoncus massa diam finibus est. Etiam sit amet eleifend
            ipsum. Cras tincidunt scelerisque mattis. Aenean euismod, libero a
            cursus porttitor, urna nulla dapibus neque, nec porttitor nisi ex
            vitae ipsum. Pellentesque eu odio nunc. Pellentesque luctus risus
            purus, eu ullamcorper metus efficitur vestibulum. Donec vel dolor
            sit amet lectus pretium rhoncus ut eu lectus. Donec faucibus dui at
            neque pellentesque, sit amet consectetur magna ornare. Curabitur in
            sem ac leo laoreet consequat non sed lacus. Aenean sed mi non elit
            tempor pulvinar. Fusce vitae sapien nunc. Phasellus laoreet sed nisi
            non varius. Curabitur aliquet augue a condimentum fermentum.
          </div>

          <div className="mt-8 w-10/12 flex items-center justify-around">
            <div className="sukarap flex bg-[#31a107] p-6 rounded gap-1">
              <CiFileOn
                style={{
                  fontSize: "4.5em",
                  color: "#fff",
                }}
              />
              <div className="flex flex-col justify-center ml-2">
                <span className="text-3xl text-white mt-2">30,000+</span>
                <span className="text-lg text-white">COMPLAINS RECEIVED</span>
              </div>
            </div>
            <div className="flex bg-[#31a107] p-6 rounded gap-1">
              <MdGroups2
                style={{
                  fontSize: "4.5em",
                  color: "#fff",
                }}
              />
              <div className="flex flex-col ml-2">
                <span className="text-3xl text-white mt-2">30,000+</span>
                <span className="text-lg text-white">RESIDENT REGISTERED</span>
              </div>
            </div>
            <div className="flex bg-[#31a107] p-6 rounded gap-1">
              <LiaSmsSolid
                style={{
                  fontSize: "4.5em",
                  color: "#fff",
                }}
              />
              <div className="flex flex-col ml-2">
                <span className="text-3xl text-white mt-2">30,000+</span>
                <span className="text-lg text-white">SMS RECEIVED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#2d2d2d] text-white w-full h-16 flex items-center justify-end">
        <span className="text-center mr-10">
          Copyright &#169; {new Date().getFullYear()}. Barangay Complain System.
          All Right Reserved.
        </span>
      </footer>
    </div>
  );
};

export default Home;
