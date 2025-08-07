import PageBanner from "@/components/BannerSection/PageBanner";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import React from "react";
import Head from "next/head";

const TermsOfUse = () => {
  return (
    <Layout pageTitle="SYTIS | Terms of Use">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYTIS | Terms of Use</title>
        <meta
          name="description"
          content="Terms of Use for SYTIS website - legally binding terms under which you may access and interact with our Website."
        />
        <meta
          property="og:description"
          content="Terms of Use for SYTIS website - legally binding terms under which you may access and interact with our Website."
        />
        <meta property="og:title" content="SYTIS | Terms of Use" />
      </Head>
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="Terms of Use" parent="" parentHref="" />
      
      {/* Terms of Use Content */}
      <section className="terms-of-use-section" style={{ padding: "80px 0", backgroundColor: "#f8f9fa" }}>
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-10 col-md-12 mx-auto">
              
              {/* Header Information */}
              <div className="policy-header" style={{ 
                textAlign: "center", 
                marginBottom: "50px",
                padding: "30px",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
              }}>

                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  flexWrap: "wrap",
                  gap: "20px",
                  marginBottom: "20px"
                }}>
                  <div>
                    <strong>Effective Date:</strong> June 5, 2025
                  </div>
                  <div>
                    <strong>Version:</strong> 1.0.0
                  </div>
                </div>
                <div style={{ 
                  borderTop: "2px solid #e74c3c", 
                  paddingTop: "20px",
                  fontSize: "1.1rem",
                  lineHeight: "1.6"
                }}>
                  <strong>SYTIS</strong><br />
                  3474 Empresa Dr. 150,<br />
                  San Luis Obispo, California 93401, USA
                </div>
              </div>

              {/* Main Content */}
              <div className="policy-content" style={{ 
                backgroundColor: "white",
                padding: "40px",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                lineHeight: "1.8",
                fontSize: "16px"
              }}>

                {/* Introduction */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <p style={{ marginBottom: "20px", fontSize: "1.1rem" }}>
                    By accessing any part or section of this Website, the User agrees to be legally bound by the following terms of use.
                  </p>
                </div>

                {/* Definitions */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    1. Definitions
                  </h3>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "25px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #e74c3c"
                  }}>
                    <div style={{ marginBottom: "15px" }}>
                      <strong>1.1 "SYTIS," "Company," "we," "us," "our"</strong> means the business previously operating under the name "IIS Infrared Inspection Systems LLC", a California Limited Liability Company, located at 3474 Empresa Dr. 150, San Luis Obispo, California 93401.
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong>1.2 "Website"</strong> means the SYTIS website located at, <strong>https://www.sytis.com/</strong>, and all of its subdomains, managed by the same or its providers.
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong>1.3 "Content"</strong> means trademarks, service marks, text, graphics, logos, images, and software owned by SYTIS or its licensors, including all source code, databases, functionality, software, website designs, audio, video, text, and photographs.
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong>1.4 "User", "You", or "Your"</strong> means any visitor to or user of the website.
                    </div>
                    <div>
                      <strong>1.5 "Contributions"</strong> means personal data that you provide and your choices (including settings).
                    </div>
                  </div>
                </div>

                {/* Introduction */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    2. Introduction
                  </h3>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "25px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #e74c3c"
                  }}>
                    <p>
                      SYTIS ("Company," "we," "us," or "our") provides this Website located at, <strong>https://www.sytis.com/</strong>. We operate the Website as well as any other related products and services that refer or link to these Terms of Use. By accessing, browsing, or using any part of this Website, you agree to be bound by these Terms of Use. If you do not agree to these Terms of Use, you are expressly prohibited from accessing, using, or browsing the Website.
                    </p>
                  </div>
                </div>

                {/* Acceptance of Terms */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    3. Acceptance of Terms
                  </h3>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "25px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #e74c3c"
                  }}>
                    <p>
                      By using this Website you represent and warrant that you are at least 18 years old and may legally enter into binding contracts. Persons under 18 are expressly prohibited from using the Website. By using the Website, you agree that you have read, understood, and accept all Terms of Use herein.
                    </p>
                  </div>
                </div>

                {/* Changes to Terms */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    4. Changes to Terms
                  </h3>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "25px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #e74c3c"
                  }}>
                    <p>
                      We reserve the right to modify or update these Terms of Use at any time without prior notice. We will post the revised Terms of Use on this page with a new "Last Updated" date. Your continued use after such updates constitutes acceptance of the revised Terms of Use.
                    </p>
                  </div>
                </div>

                {/* Use of the Website */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    5. Use of the Website
                  </h3>
                  
                  <div style={{ marginBottom: "25px" }}>
                    <h4 style={{ 
                      color: "#e74c3c", 
                      fontSize: "1.2rem", 
                      marginBottom: "15px",
                      fontWeight: "600"
                    }}>
                      5.1. Permitted Use
                    </h4>
                    <div style={{ 
                      backgroundColor: "#fff5f5", 
                      padding: "20px", 
                      borderRadius: "8px",
                      border: "1px solid #fed7d7"
                    }}>
                      <p>
                        You may (a) access and view publicly available Website Content; (b) register for accounts, or newsletters; (c) browse our product catalog, solutions, applications, articles, resources, and use the "Contact us for Pricing" sections to inquire about products.
                      </p>
                    </div>
                  </div>

                  <div style={{ marginBottom: "25px" }}>
                    <h4 style={{ 
                      color: "#e74c3c", 
                      fontSize: "1.2rem", 
                      marginBottom: "15px",
                      fontWeight: "600"
                    }}>
                      5.2. Prohibited Conduct
                    </h4>
                    <div style={{ 
                      backgroundColor: "#fff5f5", 
                      padding: "20px", 
                      borderRadius: "8px",
                      border: "1px solid #fed7d7"
                    }}>
                      <p style={{ marginBottom: "15px" }}>
                        By using the Website, you agree not to:
                      </p>
                      <ul style={{ paddingLeft: "20px" }}>
                        <li style={{ marginBottom: "8px" }}>
                          <strong>a)</strong> Violate any applicable law or regulation, or use the Website in a manner inconsistent with any applicable law or regulation, including the Computer Fraud and Abuse Act (18 U.S.C. § 1030).
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          <strong>b)</strong> Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Website.
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          <strong>c)</strong> Systematically retrieve data or other content from the Website to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          <strong>d)</strong> Impersonate any person or entity or misrepresent your affiliation.
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          <strong>e)</strong> Harvest or collect any information about other users of the Website.
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          <strong>f)</strong> Introduce, upload, or transmit (or attempt to introduce, upload, or transmit) viruses, Trojan horses, or other material, that interferes with any party's uninterrupted use and enjoyment of the Website or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Website.
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          <strong>g)</strong> Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats ("gifs"), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as "spyware" or "passive collection mechanisms" or "pcms").
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          <strong>h)</strong> Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          <strong>i)</strong> Circumvent, disable, or otherwise interfere with security-related features of the Website, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Website and/or the Content contained therein. Also, copying or adapting the Website's software including but not limited to Flash, PHP, HTML, JavaScript, or other code.
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          <strong>j)</strong> Use the Website to solicit personal information under false pretenses including but not limited to phishing or social engineering.
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          <strong>k)</strong> Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Website.
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          <strong>l)</strong> Use any information obtained from the Website in order to harass, abuse, or harm another person.
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          <strong>m)</strong> Make improper use of our support services or submit false reports of abuse or misconduct.
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          <strong>n)</strong> Engage in unauthorized framing of or linking to the Website.
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          <strong>o)</strong> Delete the copyright or other proprietary rights notice from any Content.
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          <strong>p)</strong> Interfere with, disrupt, or create an undue burden on the Website or the networks or services connected to the Website.
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          <strong>q)</strong> Attempt to bypass any measures of the Website designed to prevent or restrict access to the Website, or any portion of the Website.
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          <strong>r)</strong> Make any unauthorized use of the Website, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          <strong>s)</strong> Use the Website as part of any effort to compete with us or otherwise use the Website and/or the Content for any revenue-generating endeavor or commercial enterprise.
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                          <strong>t)</strong> Use the Website to advertise or offer to sell goods and services.
                        </li>
                        <li>
                          <strong>u)</strong> Sell or otherwise transfer your profile.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* User Representations */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    6. User Representations
                  </h3>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "25px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #e74c3c"
                  }}>
                    <p style={{ marginBottom: "15px" }}>
                      By using the Website, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Use; (4) you are not under the age of consent in the jurisdiction in which you reside; (5) you will not access the Website through automated or non-human means, whether through a bot, script or otherwise; (6) you will not use the Website for any illegal or unauthorized purpose; and (7) your use of the Website will not violate any applicable law or regulation.
                    </p>
                    <p>
                      If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Website (or any portion thereof).
                    </p>
                  </div>
                </div>

                {/* User Registration */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    7. User Registration
                  </h3>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "25px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #e74c3c"
                  }}>
                    <p>
                      You may be required to register to use the Website. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
                    </p>
                  </div>
                </div>

                {/* Intellectual Property Rights */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    8. Intellectual Property Rights
                  </h3>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "25px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #e74c3c"
                  }}>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>8.1.</strong> All Content on the Website, including trademarks, service marks, text, graphics, logos, images, and software, is owned by SYTIS or its licensors, all rights reserved. Our Content and Marks are protected by U.S. copyright, trademark, patent, and other intellectual property laws.
                    </p>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>8.2.</strong> You may not reproduce, distribute, modify, or create derivative works of any content without our express prior written permission.
                    </p>
                    <p>
                      <strong>8.3.</strong> If you wish to make any use of the Website, Content, or Marks other than as set out in this section or elsewhere in our Terms of Use, please address your request to: <a href="mailto:info@sytis.com" style={{ color: "#e74c3c" }}>info@sytis.com</a>. If we grant permission for any use of Content or Marks, you must display our copyright notice and trademark attribution exactly as provided, and ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our Content. We reserve all rights not expressly granted to you in and to the Website, Content, and Marks. Any breach of these Intellectual Property Rights will constitute a material breach of our Terms of Use and your right to use our Website will terminate immediately.
                    </p>
                  </div>
                </div>

                {/* Privacy Policy */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    11. Privacy Policy
                  </h3>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "25px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #e74c3c"
                  }}>
                    <p style={{ marginBottom: "15px" }}>
                      By using the Website, you agree to be bound by our Privacy Policy located at, <a href="/privacy-policy" style={{ color: "#e74c3c" }}>https://www.sytis.com/privacy-policy</a>, which is incorporated by reference into these Terms of Use, please review it carefully. We use cookies to improve user experience. By using the Website, you consent to our Cookie Policy, see our Cookie Notice located at <a href="/cookie-policy" style={{ color: "#e74c3c" }}>https://www.sytis.com/cookie-policy</a>.
                    </p>
                    <p>
                      We care about data privacy and security. Please be advised the Website is hosted in the United States. If you access the Website from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in the United States, then through your continued use of the Website, you are transferring your data to the United States, and you expressly consent to have your data transferred to and processed in the United States. If you reside in the European Union or European Economic Area ("EU/EEA"), see applicable GDPR section located in the privacy policy, <a href="/privacy-policy" style={{ color: "#e74c3c" }}>https://www.sytis.com/privacy-policy</a>. By using the Website, you acknowledge that you have read and agree to the Privacy Policy, which explains how we collect, use, and share your information under the California Online Privacy Protection Act (Cal. Civ. Code § 1798.83), the California Consumer Privacy Act (Cal. Civ. Code § 1798.100 et seq), and the EU's General Data Protection Regulation (GDPR). California residents can request deletion or disclosure.
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    25. Contact Information
                  </h3>
                  <div style={{ 
                    backgroundColor: "#fff5f5", 
                    padding: "25px", 
                    borderRadius: "8px",
                    border: "2px solid #e74c3c"
                  }}>
                    <p style={{ marginBottom: "15px" }}>
                      For any questions about these Terms of Use or to send legal notices, contact us at:
                    </p>
                    <div style={{ 
                      display: "grid", 
                      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
                      gap: "20px",
                      marginBottom: "20px"
                    }}>
                      <div>
                        <strong>Email:</strong><br />
                        <a href="mailto:info@sytis.com" style={{ color: "#e74c3c" }}>info@sytis.com</a>
                      </div>
                      <div>
                        <strong>Phone:</strong><br />
                        <a href="tel:8884470651" style={{ color: "#e74c3c" }}>1 (888) 447-0651</a>
                      </div>
                    </div>
                    <div>
                      <strong>Mail:</strong><br />
                      SYTIS<br />
                      3474 Empresa Dr. #150<br />
                      San Luis Obispo, California 93449
                    </div>
                  </div>
                </div>

                {/* Final Statement */}
                <div className="section" style={{ 
                  backgroundColor: "#2c3e50", 
                  color: "white", 
                  padding: "30px", 
                  borderRadius: "10px",
                  textAlign: "center"
                }}>
                  <p style={{ fontSize: "1.1rem", margin: 0 }}>
                    By using the Website, you acknowledge that you have read, understood, and agree to these Terms of Use. If you do not agree with any part of these Terms, please discontinue using the Website immediately.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      
      <MainFooter />
    </Layout>
  );
};

export default TermsOfUse;
