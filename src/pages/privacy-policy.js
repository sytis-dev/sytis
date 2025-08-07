/* eslint-disable react/no-unescaped-entities */
import PageBanner from "@/components/BannerSection/PageBanner";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import React from "react";
import Head from "next/head";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <Layout pageTitle="SYTIS | Privacy Policy">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYTIS | Privacy Policy</title>
        <meta
          name="description"
          content="Understand how SYTIS collects, uses and protects your personal information in compliance with privacy regulations."
        />
        <meta
          property="og:description"
          content="Understand how SYTIS collects, uses and protects your personal information in compliance with privacy regulations."
        />
        <meta property="og:title" content="SYTIS | Privacy Policy" />
      </Head>
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="Privacy Policy" parent="" parentHref="" />
      
      {/* Privacy Policy Content */}
      <section className="privacy-policy-section" style={{ padding: "80px 0", backgroundColor: "#f8f9fa" }}>
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
                    These SYTIS Privacy Policy statements (&ldquo;Policy&rdquo;) apply to information collected through <strong>https://www.sytis.com</strong> (the &ldquo;Website&rdquo;) and any related services (collectively, the &ldquo;Services&rdquo;). By accessing or using the Website or Services, you agree to this Policy. Please read it carefully.
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
                      <strong>1.1 "SYTIS," "Company," "we," "us," or "our"</strong> means the business previously operating under the name "IIS Infrared Inspection Systems LLC", a California Limited Liability Company, located at 3474 Empresa Dr. 150, San Luis Obispo, California 93401.
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong>1.2 "Website"</strong> means the SYTIS website located at, <strong>https://www.sytis.com/</strong>, and all of its subdomains, managed by the same or its providers.
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong>1.3 "User," "You" or "Your"</strong> refers to any individual who accesses or uses the Website or Services.
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong>1.4 "Personal Data"</strong> means information that identifies or can be used to identify, contact, or locate you, either directly or in combination with other information.
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong>1.5 "Sensitive Personal Data"</strong> is a subset of Personal Data requiring special protection (e.g., health, racial or ethnic origin, biometric or genetic data).
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong>1.6 "EU/EEA"</strong> means the European Union or European Economic Area.
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong>1.7 "Controller"</strong> means the entity that oversees the purpose and means of processing Personal Data.
                    </div>
                    <div>
                      <strong>1.8 "Processor"</strong> means an entity that processes Personal Data on behalf of a Controller.
                    </div>
                  </div>
                </div>

                {/* Information We Collect */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    2. Information We Collect
                  </h3>
                  
                  <div style={{ marginBottom: "25px" }}>
                    <h4 style={{ 
                      color: "#e74c3c", 
                      fontSize: "1.2rem", 
                      marginBottom: "15px",
                      fontWeight: "600"
                    }}>
                      2.1 Directly Provided Information
                    </h4>
                    <div style={{ 
                      backgroundColor: "#fff5f5", 
                      padding: "20px", 
                      borderRadius: "8px",
                      border: "1px solid #fed7d7"
                    }}>
                      <p style={{ marginBottom: "15px" }}>
                        <strong>Account Registration Data.</strong> When you create an account, we collect:
                      </p>
                      <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                        <li style={{ marginBottom: "5px" }}>• Full name</li>
                        <li style={{ marginBottom: "5px" }}>• Email address</li>
                        <li>• Password (securely hashed)</li>
                      </ul>
                      <p style={{ marginBottom: "15px" }}>
                        <strong>Newsletter Sign-Up.</strong> If you subscribe to our newsletter, we collect:
                      </p>
                      <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                        <li style={{ marginBottom: "5px" }}>• Email address</li>
                        <li>• Optional: First and last name (if provided)</li>
                      </ul>
                      <p>
                        <strong>Contact Form Submissions.</strong> If you submit an inquiry via our contact form, we collect the fields you complete (e.g., name, email, phone number, message).
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
                      2.2 Automatically Collected Information
                    </h4>
                    <div style={{ 
                      backgroundColor: "#fff5f5", 
                      padding: "20px", 
                      borderRadius: "8px",
                      border: "1px solid #fed7d7"
                    }}>
                      <p style={{ marginBottom: "15px" }}>
                        <strong>Device & Usage Data.</strong> We automatically collect information about your device and how you interact with the Website, including:
                      </p>
                      <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                        <li style={{ marginBottom: "5px" }}>• IP address</li>
                        <li style={{ marginBottom: "5px" }}>• Browser type and version</li>
                        <li style={{ marginBottom: "5px" }}>• Operating system</li>
                        <li style={{ marginBottom: "5px" }}>• Referring URLs and exit pages</li>
                        <li style={{ marginBottom: "5px" }}>• Pages viewed, time spent on each page, and clickstream data</li>
                        <li>• Dates and times of visits</li>
                      </ul>
                    </div>
                  </div>

                  <div style={{ marginBottom: "25px" }}>
                    <h4 style={{ 
                      color: "#e74c3c", 
                      fontSize: "1.2rem", 
                      marginBottom: "15px",
                      fontWeight: "600"
                    }}>
                      2.3 Cookies & Tracking Technologies
                    </h4>
                    <div style={{ 
                      backgroundColor: "#fff5f5", 
                      padding: "20px", 
                      borderRadius: "8px",
                      border: "1px solid #fed7d7"
                    }}>
                      <p>
                        We use cookies, beacons, and similar technologies to collect information (see Section 3 below).
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
                      2.4 Third-Party Sources
                    </h4>
                    <div style={{ 
                      backgroundColor: "#fff5f5", 
                      padding: "20px", 
                      borderRadius: "8px",
                      border: "1px solid #fed7d7"
                    }}>
                      <p style={{ marginBottom: "10px" }}>
                        <strong>Analytics Providers.</strong> We use analytics services (e.g., Google Analytics) that may collect usage data about your interactions with our Website.
                      </p>
                      <p>
                        <strong>Social Media Platforms.</strong> If you choose to interact with us on social media (e.g., LinkedIn), we may receive information about your public profile or engagement.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cookies Section */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    3. Cookies and Similar Technologies
                  </h3>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "25px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #e74c3c"
                  }}>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>3.1 What Are Cookies?</strong><br />
                      Cookies are small data files placed on your device when you visit a website. They allow the website to recognize your device on subsequent visits and remember certain preferences.
                    </p>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>3.2 Types of Cookies We Use</strong>
                    </p>
                    <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                      <li style={{ marginBottom: "8px" }}>
                        <strong>Essential Cookies.</strong> Strictly necessary for the Website to function correctly (e.g., session identifiers, authentication cookies).
                      </li>
                      <li style={{ marginBottom: "8px" }}>
                        <strong>Performance & Analytics Cookies.</strong> Collect information about how you use the Website (e.g., which pages you visit, how long you stay) so we can measure and improve performance. Examples include Google Analytics.
                      </li>
                      <li>
                        <strong>Functional Cookies.</strong> Remember user preferences (e.g., language choice) to enhance your experience.
                      </li>
                    </ul>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>3.3 Your Cookie Choices</strong><br />
                      Most browsers allow you to control or delete cookies via their settings. You can set your browser to reject non-essential cookies or notify you when a cookie is placed. However, disabling essential cookies may prevent the Website from functioning properly.
                    </p>
                    <p>
                      <strong>3.4 Cookie Policy Link</strong><br />
                      For more details about our cookie practices, please see <Link href="/cookie-policy" style={{ color: "#e74c3c" }}>https://www.sytis.com/cookie-policy</Link>.
                    </p>
                  </div>
                </div>

                {/* How We Use Information */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    4. How We Use Your Information
                  </h3>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "25px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #e74c3c"
                  }}>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>4.1 To Provide & Maintain Your Account.</strong> Process your account registration and allow you to log in, manage your profile, and access any user-specific features.
                    </p>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>4.2 To Send Newsletters & Communications.</strong> If you have subscribed, we use your email address to send newsletters, announcements, or updates. We rely on your consent to send marketing communications (see Section 9.2).
                    </p>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>4.3 To Respond to Inquiries.</strong> When you submit a contact form, we use your information to respond to questions or requests.
                    </p>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>4.4 To Analyze & Improve Our Website.</strong> We use usage data and analytics to understand how visitors interact with our Website, test improvements, and troubleshoot technical issues.
                    </p>
                    <p>
                      <strong>4.5 To Comply with Legal Obligations.</strong> We may process your Personal Data to comply with applicable laws, regulations, or legal processes.
                    </p>
                  </div>
                </div>

                {/* Legal Bases */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    5. Legal Bases for Processing (EU/EEA Residents)
                  </h3>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "25px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #e74c3c"
                  }}>
                    <p style={{ marginBottom: "15px" }}>
                      If you reside in the EU/EEA, we rely on the following legal grounds under the GDPR:
                    </p>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>5.1 Contract Performance.</strong> When you create an account or subscribe to a newsletter, we process your Personal Data to fulfill our service obligations (e.g., delivering newsletters, maintaining your account).
                    </p>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>5.2 Consent.</strong> For marketing communications and non-essential cookies, we rely on your explicit consent. You may withdraw consent at any time (see Section 9.2).
                    </p>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>5.3 Legitimate Interests.</strong> We process certain data (e.g., analytics) to operate and improve our Website, provided that your rights and freedoms do not override those interests.
                    </p>
                    <p>
                      <strong>5.4 Legal Obligations.</strong> We may process your data to comply with legal requirements (e.g., retention for tax or audit purposes).
                    </p>
                  </div>
                </div>

                {/* How We Share Information */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    6. How We Share Your Information
                  </h3>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "25px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #e74c3c"
                  }}>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>6.1 Service Providers & Processors.</strong> We engage third-party vendors to perform services on our behalf, such as:
                    </p>
                    <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                      <li style={{ marginBottom: "5px" }}>• Hosting & Maintenance. Servers, content-delivery networks (CDNs), and technical support providers.</li>
                      <li style={{ marginBottom: "5px" }}>• Email Service Providers. For sending newsletters and transactional emails (e.g., Mailchimp, SendGrid).</li>
                      <li style={{ marginBottom: "5px" }}>• Analytics Providers. For tracking and reporting Website usage (e.g., Google Analytics).</li>
                      <li>• Customer Relationship Management (CRM) Systems. For managing inquiries and subscriber lists.</li>
                    </ul>
                    <p style={{ marginBottom: "15px" }}>
                      These parties are authorized to use your Personal Data only as necessary to perform their services under confidentiality agreements.
                    </p>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>6.2 Affiliates & Subsidiaries.</strong> We may share information with our parent company, subsidiaries, or corporate affiliates for internal business purposes, consistent with this Policy.
                    </p>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>6.3 Business Transfers.</strong> In the event SYTIS undergoes a merger, acquisition, reorganization, sale of assets, or bankruptcy, your Personal Data may be transferred to or acquired by the successor entity. We will notify you via a prominent notice on our Website if such a change occurs.
                    </p>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>6.4 Legal Obligations & Rights Protection.</strong> We may disclose Personal Data if required by law (e.g., subpoena, court order), to comply with governmental requests, or to protect our rights, property, or safety, or the rights, property, or safety of others.
                    </p>
                    <p>
                      <strong>6.5 Consent.</strong> We may share your Personal Data for purposes not described in this Policy if you give us explicit consent.
                    </p>
                  </div>
                </div>

                {/* Data Retention */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    7. Data Retention & Deletion
                  </h3>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "25px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #e74c3c"
                  }}>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>7.1 Retention Period.</strong> We retain your Personal Data only as long as necessary to:
                    </p>
                    <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                      <li style={{ marginBottom: "5px" }}>• Fulfill the purposes outlined in Section 4 (e.g., maintain your account, send newsletters).</li>
                      <li style={{ marginBottom: "5px" }}>• Comply with legal obligations (e.g., retain records for a minimum period under applicable law).</li>
                      <li>• Resolve disputes, enforce our agreements, and protect our legal rights.</li>
                    </ul>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>7.2 Account Inactivity.</strong> If your account remains inactive for 24 months, we may delete or anonymize your Personal Data, except where required to retain it for legal or legitimate business purposes.
                    </p>
                    <p>
                      <strong>7.3 How to Request Deletion.</strong> You may request deletion of your Personal Data as outlined in Section 9. Once we verify your identity and confirm your request, we will delete or anonymize the data unless we have a legitimate business or legal reason to retain it (e.g., fraud prevention).
                    </p>
                  </div>
                </div>

                {/* Data Security */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    8. Data Security
                  </h3>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "25px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #e74c3c"
                  }}>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>8.1 Security Measures.</strong> We implement reasonable administrative, technical, and physical safeguards to protect Personal Data from unauthorized access, disclosure, alteration, or destruction. These measures include:
                    </p>
                    <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                      <li style={{ marginBottom: "5px" }}>• Encryption (SSL/TLS) for data transmitted to and from our Website.</li>
                      <li style={{ marginBottom: "5px" }}>• Access controls and multifactor authentication for internal systems.</li>
                      <li style={{ marginBottom: "5px" }}>• Periodic security assessments and vulnerability scans.</li>
                      <li>• Employee training and confidentiality agreements.</li>
                    </ul>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>8.2 No Absolute Guarantee.</strong> While we strive to protect your Personal Data, no security system is impenetrable. We cannot guarantee the security of any information transmitted to us, and you do so at your own risk.
                    </p>
                    <p>
                      <strong>8.3 Breach Notification.</strong> In the event of a data breach affecting your Personal Data, we will notify you and any applicable regulatory authorities as required by law (e.g., GDPR Article 34, CCPA § 1798.82).
                    </p>
                  </div>
                </div>

                {/* Your Rights */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    9. Your Rights & Choices
                  </h3>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "25px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #e74c3c"
                  }}>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>9.1 General Data Subject Rights (Where Applicable)</strong><br />
                      Depending on your jurisdiction and local laws, you may have the following rights regarding your Personal Data:
                    </p>
                    <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                      <li style={{ marginBottom: "5px" }}>• Right to Access. Request confirmation of whether we process your data and obtain a copy of your Personal Data.</li>
                      <li style={{ marginBottom: "5px" }}>• Right to Rectification. Request correction of inaccurate or incomplete data.</li>
                                              <li style={{ marginBottom: "5px" }}>• Right to Erasure (&ldquo;Right to Be Forgotten&rdquo;). Request deletion of your Personal Data, subject to legal exceptions.</li>
                      <li style={{ marginBottom: "5px" }}>• Right to Restrict Processing. Request that we limit processing of your Personal Data.</li>
                      <li style={{ marginBottom: "5px" }}>• Right to Data Portability. Receive a machine-readable copy of your data and, where technically feasible, have it transmitted to another controller.</li>
                      <li style={{ marginBottom: "5px" }}>• Right to Object. Object to processing based on our legitimate interests or to direct marketing.</li>
                      <li>• Right to Withdraw Consent. Where processing is based on your consent (e.g., marketing emails, non-essential cookies), you may withdraw at any time without affecting processing conducted prior to withdrawal.</li>
                    </ul>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>9.2 Opting Out of Marketing & Cookies</strong>
                    </p>
                    <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                      <li style={{ marginBottom: "5px" }}>• Marketing Emails. You may opt out of receiving marketing emails by clicking the "unsubscribe" link in any email or by emailing unsubscribe@sytis.com.</li>
                      <li>• Cookies. You can disable non-essential cookies by adjusting your browser settings (see Section 3). Note that disabling essential cookies may prevent the Website from working properly.</li>
                    </ul>
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
                    18. Contact Information
                  </h3>
                  <div style={{ 
                    backgroundColor: "#fff5f5", 
                    padding: "25px", 
                    borderRadius: "8px",
                    border: "2px solid #e74c3c"
                  }}>
                    <p style={{ marginBottom: "15px" }}>
                      If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div style={{ 
                      display: "grid", 
                      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
                      gap: "20px",
                      marginBottom: "20px"
                    }}>
                      <div>
                        <strong>Email:</strong><br />
                        <a href="mailto:privacy@sytis.com" style={{ color: "#e74c3c" }}>privacy@sytis.com</a>
                      </div>
                      <div>
                        <strong>Phone:</strong><br />
                        <a href="tel:8884470651" style={{ color: "#e74c3c" }}>(888) 447-0651</a>
                      </div>
                    </div>
                    <div>
                      <strong>Mail:</strong><br />
                      SYTIS<br />
                      3474 Empresa Dr. 150,<br />
                      San Luis Obispo, California 93401, USA
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
                    By using the Website or Services, you acknowledge that you have read, understood, and agree to this Privacy Policy. If you do not agree with any part of this Policy, please discontinue using the Website immediately.
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

export default PrivacyPolicy;
