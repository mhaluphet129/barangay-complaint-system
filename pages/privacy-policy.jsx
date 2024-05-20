import { Collapse } from "antd";

import Footer from "@/components/landingpage/footer";
import Header from "@/components/landingpage/header";

const FAQ = () => (
  <div className="flex flex-col min-h-screen bg-[#d9f2fe]">
    <Header />
    <div className="flex-1 my-36">
      <div className="my-10 leading-6 mx-80 privacy-policy">
        <span className="block mt-10 mb-4 text-4xl font-black">
          Privacy Policy
        </span>
        <p>
          <strong>Effective Date:</strong> May 21, 2024
        </p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to Barangay Complain System (the "Site"). We respect your
          privacy and are committed to protecting the personal information you
          share with us. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you visit our website
          [yourwebsite.com], including any other media form, media channel or
          mobile website or connected thereto (collectively, the "Site").
        </p>

        <h2>2. Information We Collect</h2>
        <p>
          We may collect information about you in a variety of ways. The
          information we may collect on the Site includes:
        </p>

        <p>
          <strong>Personal Data</strong>
        </p>
        <p>
          Personally identifiable information, such as your name, email address,
          and telephone number, and demographic information, such as your age,
          gender and hometown, that you voluntarily give to us when you register
          with the Site or when you choose to participate in various activities
          related to the Site, such as walk-in or sms.
        </p>

        <h2>3. Use of Your Information</h2>
        <p>
          Having accurate information about you permits us to provide you with a
          smooth, efficient, and customized experience. Specifically, we may use
          information collected about you via the Site to:
        </p>
        <ul>
          <li>Create and manage your account.</li>
          <li>Improve our Site and your overall user experience.</li>
          <li>
            Monitor and analyze usage and trends to improve your experience with
            the Site.
          </li>
          <li>Respond to your inquiries and offer resident support.</li>
          <li>Perform other service activities as needed.</li>
        </ul>

        <h2>4. Disclosure of Your Information</h2>
        <p>
          We may share information we have collected about you in certain
          situations. Your information may be disclosed as follows:
        </p>

        <p>
          <strong>By Law or to Protect Rights</strong>
        </p>
        <p>
          If we believe the release of information about you is necessary to
          respond to legal process, to investigate or remedy potential
          violations of our policies, or to protect the rights, property, and
          safety of others, we may share your information as permitted or
          required by any applicable law, rule, or regulation.
        </p>

        <p>
          <strong>Third-Party Service Providers</strong>
        </p>
        <p>
          We may share your information with third parties that perform services
          for us or on our behalf, SMS Gateway Service, data analysis and
          hosting services.
        </p>

        <p>
          <strong>Marketing Communications</strong>
        </p>
        <p>
          With your consent, or with an opportunity for you to withdraw consent,
          we may share your information with third parties for marketing
          purposes, as permitted by law.
        </p>

        <h2>5. Security of Your Information</h2>
        <p>
          We use administrative, technical, and physical security measures to
          help protect your personal information. While we have taken reasonable
          steps to secure the personal information you provide to us, please be
          aware that despite our efforts, no security measures are perfect or
          impenetrable, and no method of data transmission can be guaranteed
          against any interception or other types of misuse.
        </p>

        <h2>6. Policy for Children</h2>
        <p>
          We do not knowingly solicit information from or market to children
          under the age of 13. If we learn that we have collected personal
          information from a child under age 13 without verification of parental
          consent, we will delete that information as quickly as possible.
        </p>

        <h2>7. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time in order to
          reflect changes to our practices or for other operational, legal, or
          regulatory reasons. We will notify you of any changes by posting the
          new Privacy Policy on our Site. You are advised to review this Privacy
          Policy periodically for any changes.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          If you have questions or comments about this Privacy Policy, please
          contact us at:
        </p>

        <div class="contact-info">
          <p>email@gmail.com</p>
          <p>+(63) 912 345 6789</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default FAQ;
