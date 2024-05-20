import { Tooltip } from "antd";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialInstagram,
} from "react-icons/ti";

const Footer = () => {
  return (
    <footer
      className="px-10 text-white"
      style={{
        backgroundColor: "#2d2d2d",
      }}
    >
      <div
        className="flex items-start w-full"
        style={{
          paddingTop: "2.5em",
          paddingBottom: "2.5em",
          gap: "6rem",
          justifyContent: "end",
        }}
      >
        {/*  */}
        <div
          className="flex flex-col gap-2"
          style={{
            alignItems: "end",
          }}
        >
          <span className="text-2xl">Social Links</span>
          <div className="flex gap-2 mt-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              className="social-links"
            >
              <TiSocialFacebook style={{ fontSize: "2em" }} />
            </a>
            <a href="https://x.com" target="_blank" className="social-links">
              <TiSocialTwitter style={{ fontSize: "2em" }} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="social-links"
            >
              <TiSocialInstagram style={{ fontSize: "2em" }} />
            </a>
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col gap-2">
          <span className="text-2xl">Site Links</span>
          <a href="/complain" className="mt-4 hover:underline">
            File Complaint
          </a>
          <a href="/faq" className="hover:underline">
            Frequently Asked Questions
          </a>
          <a href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </a>
          <Tooltip title="WAY KAMO">
            <a href="#">About Us</a>
          </Tooltip>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-2xl">Contact Us</span>
          <a
            href="https://www.google.com/maps/place/Barangay+Hall+of+North+Poblacion/@7.7651134,125.0080075,17z/data=!3m1!4b1!4m6!3m5!1s0x32ff3b63041728cf:0xbecc7f5a714647b3!8m2!3d7.7651134!4d125.0080075!16s%2Fg%2F1tgldvs8?entry=ttu"
            target="_blank"
            className="flex flex-col hover:underline"
          >
            <span className="mt-4">Barangay Hall of North Poblacion</span>
            <span>Maramag, Bukidnon</span>
          </a>
          <a href="mailto: email@gmail.com" className="hover:underline">
            email@gmail.com
          </a>
          <a href="tel:639123456789" className="hover:underline">
            +(63) 912 345 6789
          </a>
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid #eee",
        }}
      />
      <div
        className="flex items-center w-full h-16"
        style={{
          justifyContent: "flex-end",
        }}
      >
        <span className="mr-10 text-center">
          All Right Reserved &#169; {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
