import { Collapse } from "antd";

import Footer from "@/components/landingpage/footer";
import Header from "@/components/landingpage/header";

const FAQ = () => (
  <div className="flex flex-col min-h-screen bg-[#d9f2fe]">
    <Header />
    <div className="flex-1 my-36">
      <span className="block mt-10 text-4xl font-black text-center">
        Frequently Asked Questions
      </span>
      <div className="my-10 mx-80">
        <Collapse
          items={[
            {
              q: "Mga pama agi sa pag reklamo ?",
              a: "Mo cater mi og taga lain lugar gawas sa north pero walk-in lang. Amoa target ani kay para sa mga katawhan sa barangay north.",
            },
            {
              q: "Biskan kinsa raba maka reklamo dri ?",
              a: "Ang kani nga sistema pwede ka maka reklamo gamit text, laptop/computer, og sa barangay mismo. Kung aha ka pabor, dira ka modoul.",
            },
            {
              q: "Unsa ang kailangan para maka gamit og maka file og complaint ?",
              a: "Dapat mag register ka sa north barangay office arun maka gamit ka ani nga sistem og serbisyo, mas safe og walay iwas tikas.",
            },
            {
              q: "Unsa nga numero ang gamiton para maka reklamo sa text ?",
              a: "Ang numero nga gamiton sa pag reklamo kay makuha ra kini.a paghuman nimo og register sa barangay.",
            },
            {
              q: "Maka file ba kami og reklamo sa text biskan walay load ?",
              a: "Dli, kailangan og load para maka text. Promo nga load pwede ra, mo sulod gyapon inyo reklamo ana.",
            },
          ].map((e, i) => ({
            key: i,
            showArrow: false,
            style: {
              marginTop: 20,
              minHeight: 80,
              paddingTop: i == 0 ? 10 : 0,
            },
            label: (
              <span className="font-sans text-3xl font-medium m-26">{e.q}</span>
            ),
            children: <span className="ml-4 text-2xl">{e.a}</span>,
          }))}
          bordered={false}
          destroyInactivePanel
          accordion
        />
      </div>
    </div>
    <Footer />
  </div>
);

export default FAQ;
