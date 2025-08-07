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

const CookiePolicy = () => {
  return (
    <Layout pageTitle="SYTIS | Cookie Policy">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYTIS | Cookie Policy</title>
        <meta
          name="description"
          content="This Cookie Policy explains how SYTIS and its partners use cookies and similar technologies to operate and improve our site, enable features, and support marketing."
        />
        <meta
          property="og:description"
          content="This Cookie Policy explains how SYTIS and its partners use cookies and similar technologies to operate and improve our site, enable features, and support marketing."
        />
        <meta property="og:title" content="SYTIS | Cookie Policy" />
      </Head>
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="Cookie Policy" parent="" parentHref="" />
      
      {/* Cookie Policy Content */}
      <section className="cookie-policy-section" style={{ padding: "80px 0", backgroundColor: "#f8f9fa" }}>
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
                    This Cookie Policy explains how SYTIS (&ldquo;SYTIS,&rdquo; &ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) uses cookies and similar tracking technologies when you visit <strong>https://www.sytis.com</strong> (the &ldquo;Website&rdquo;). It is intended to inform you about what cookies are, how we use them, and how you can control them. By continuing to use or access the Website, you consent to the use of cookies in accordance with this Policy.
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
                      <strong>1.1 &ldquo;Cookies&rdquo;</strong> are small text files placed on your device (computer, tablet, or mobile) by websites you visit. They allow the site to recognize your device and remember certain information about your visit.
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong>1.2 &ldquo;Web Beacons,&rdquo; &ldquo;Pixels,&rdquo; or &ldquo;Tracking Technologies&rdquo;</strong> refer to small graphic images or scripts that work in conjunction with cookies to collect information about your browsing.
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong>1.3 &ldquo;First-Party Cookies&rdquo;</strong> are set by the Website you are visiting (i.e., SYTIS).
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong>1.4 &ldquo;Third-Party Cookies&rdquo;</strong> are set by domains other than the one you&apos;re visiting (e.g., analytics providers, social media platforms).
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong>1.5 &ldquo;Personal Data&rdquo;</strong> means any information that identifies or can be used to identify, contact, or locate you, either directly or in combination with other data.
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong>1.6 "Subject to the GDPR/EEA Residents"</strong> refers to residents of the European Union or European Economic Area, who have additional rights regarding cookies under the EU General Data Protection Regulation.
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong>1.7 "Consent"</strong> means your informed, freely given agreement to our placement of non-essential cookies on your device, as required by applicable laws (e.g., the EU ePrivacy Directive).
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong>1.8 "Website"</strong> means the SYTIS website located at, <strong>https://www.sytis.com/</strong>, and all of its subdomains, managed by the same or its providers.
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong>1.9 "SYTIS," "Company," "we," "us," "our"</strong> means the business previously operating under the name "IIS Infrared Inspection Systems LLC", a California Limited Liability Company, located at 3474 Empresa Dr. 150, San Luis Obispo, California 93401.
                    </div>
                    <div>
                      <strong>2.0 "User", "You", or "Your"</strong> means any visitor to or user of the website.
                    </div>
                  </div>
                </div>

                {/* How Cookies Work */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    2. How Cookies Work
                  </h3>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "25px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #e74c3c"
                  }}>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>2.1</strong> When you visit our Website, we send one or more cookies to your device. Your browser stores these cookies in a file directory, and each time you return to our Website, your browser sends these cookies back to us, allowing us to recognize your device.
                    </p>
                    <p>
                      <strong>2.2</strong> Cookies perform a variety of functions, such as enabling you to navigate between pages efficiently, remembering your preferences (like language or region), and providing information to help us improve the Website's functionality.
                    </p>
                  </div>
                </div>

                {/* Types of Cookies */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    3. Types of Cookies We Use
                  </h3>
                  <p style={{ marginBottom: "20px" }}>
                    We categorize cookies into the following four groups based on their purpose and duration:
                  </p>
                  
                  <div style={{ marginBottom: "25px" }}>
                    <h4 style={{ 
                      color: "#e74c3c", 
                      fontSize: "1.2rem", 
                      marginBottom: "15px",
                      fontWeight: "600"
                    }}>
                      3.1 Essential Cookies (Strictly Necessary)
                    </h4>
                    <div style={{ 
                      backgroundColor: "#fff5f5", 
                      padding: "20px", 
                      borderRadius: "8px",
                      border: "1px solid #fed7d7"
                    }}>
                      <p style={{ marginBottom: "10px" }}>
                        <strong>Purpose:</strong> Allow the core functionality of the Website such as logging in to your account, retaining session state, and ensuring secure access to user-only sections.
                      </p>
                      <p>
                        <strong>Duration:</strong> Session cookies (deleted when you close your browser) or persistent (remain on your device until a set expiration).
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
                      3.2 Performance & Analytics Cookies
                    </h4>
                    <div style={{ 
                      backgroundColor: "#fff5f5", 
                      padding: "20px", 
                      borderRadius: "8px",
                      border: "1px solid #fed7d7"
                    }}>
                      <p style={{ marginBottom: "10px" }}>
                        <strong>Purpose:</strong> Collect aggregated, anonymous data about how visitors use our Website (pages visited, time spent, error messages) so we can improve performance and content.
                      </p>
                      <p style={{ marginBottom: "10px" }}>
                        <strong>Providers:</strong> Google Analytics, other analytics platforms.
                      </p>
                      <p>
                        <strong>Duration:</strong> Typically persistent (e.g., 2 years)
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
                      3.3 Functional Cookies
                    </h4>
                    <div style={{ 
                      backgroundColor: "#fff5f5", 
                      padding: "20px", 
                      borderRadius: "8px",
                      border: "1px solid #fed7d7"
                    }}>
                      <p style={{ marginBottom: "10px" }}>
                        <strong>Purpose:</strong> Remember choices you make, such as email opt-in status, region, or font size in order to provide enhanced, personalized features.
                      </p>
                      <p>
                        <strong>Duration:</strong> Persistent, often set to expire in 6–12 months.
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
                      3.4 Advertising & Targeting Cookies
                    </h4>
                    <div style={{ 
                      backgroundColor: "#fff5f5", 
                      padding: "20px", 
                      borderRadius: "8px",
                      border: "1px solid #fed7d7"
                    }}>
                      <p style={{ marginBottom: "10px" }}>
                        <strong>Purpose:</strong> Deliver personalized ads relevant to your interests and measure ad campaign effectiveness. These may track you across different websites.
                      </p>
                      <p style={{ marginBottom: "10px" }}>
                        <strong>Providers:</strong> Third-party ad networks (Google Ads, Facebook Pixel, LinkedIn Insight Tag, etc.).
                      </p>
                      <p>
                        <strong>Duration:</strong> Persistent, can range from 30 days to 2 years, depending on the provider.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Third-Party Cookies */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    4. Third-Party Cookies & Embedded Content
                  </h3>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "25px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #e74c3c"
                  }}>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>4.1</strong> Our Website may include third-party content (e.g., embedded YouTube videos, social media widgets). When you access these features, third parties may set cookies on your device. We do not control these cookies or how they operate. We encourage you to review the third parties' cookie policies to understand how they collect and use your data.
                    </p>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>4.2 Examples of Third-Party Services That May Set Cookies:</strong>
                    </p>
                    <ul style={{ paddingLeft: "20px" }}>
                      <li style={{ marginBottom: "8px" }}>
                        <strong>Google Analytics.</strong> Tracks and reports Website traffic.
                      </li>
                      <li style={{ marginBottom: "8px" }}>
                        <strong>YouTube.</strong> Embeds that allow you to watch videos; YouTube may set cookies for view counts and recommendations.
                      </li>
                      <li>
                        <strong>Social Plugins</strong> (e.g., LinkedIn, Facebook). If you "like," "share," or otherwise engage, these platforms may set cookies to track your behavior across sites.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Cookie Consent */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    5. Cookie Consent & Legal Bases for Processing
                  </h3>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "25px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #e74c3c"
                  }}>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>5.1 EU/EEA & UK Visitors.</strong> Under the EU ePrivacy Directive and UK's PECR, we must obtain your consent before placing non-essential cookies (all except Essential Cookies). On your first visit, a cookie banner will appear, providing you the option to:
                    </p>
                    <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                      <li style={{ marginBottom: "5px" }}>(a) Accept all non-essential cookies;</li>
                      <li style={{ marginBottom: "5px" }}>(b) Reject all non-essential cookies; or</li>
                      <li>(c) Customize which non-essential cookies (Functional, Performance, Advertising) you consent to.</li>
                    </ul>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>5.2 Other Jurisdictions.</strong> In many countries (e.g., Canada, Australia), implied consent (continued use of the site) may suffice, but we still provide a banner and opt-out where required.
                    </p>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>5.3 Legal Bases Under GDPR (EU/EEA).</strong>
                    </p>
                    <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                      <li style={{ marginBottom: "5px" }}>• Essential Cookies: Legitimate interest (necessary to provide the service).</li>
                      <li style={{ marginBottom: "5px" }}>• Performance & Functional Cookies: Legitimate interest (improving the Website) or consent.</li>
                      <li>• Advertising Cookies: Consent (you must actively opt in).</li>
                    </ul>
                    <p>
                      <strong>5.4 Legal Bases Under CCPA/CPRA (California).</strong> While CCPA does not regulate cookies directly, we disclose that we do not "sell" Personal Data. Under the CPRA, "sharing" for cross-context behavioral advertising may still require an opt-out. If you wish to opt out of any "sharing," call the toll-free number <strong>(888) 447-0651</strong>, or email <strong>privacy@sytis.com</strong>.
                    </p>
                  </div>
                </div>

                {/* How to Control Cookies */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    6. How to Control & Manage Cookies
                  </h3>
                  <p style={{ marginBottom: "20px" }}>
                    You have several options for managing cookies:
                  </p>
                  
                  <div style={{ marginBottom: "25px" }}>
                    <h4 style={{ 
                      color: "#e74c3c", 
                      fontSize: "1.2rem", 
                      marginBottom: "15px",
                      fontWeight: "600"
                    }}>
                      6.1 Cookie Banner Choices
                    </h4>
                    <p>
                      On your first visit, our cookie banner (if shown) lets you accept, reject, or customize settings for Functional, Performance, and Advertising cookies. You can update these preferences at any time by clicking the "Cookie Settings" link in the footer of the Website.
                    </p>
                  </div>

                  <div style={{ marginBottom: "25px" }}>
                    <h4 style={{ 
                      color: "#e74c3c", 
                      fontSize: "1.2rem", 
                      marginBottom: "15px",
                      fontWeight: "600"
                    }}>
                      6.2 Browser Settings
                    </h4>
                    <p style={{ marginBottom: "15px" }}>
                      Most browsers allow you to delete or block cookies. Below are links to instructions for major browsers:
                    </p>
                    <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                      <li style={{ marginBottom: "8px" }}>
                        <strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data
                      </li>
                      <li style={{ marginBottom: "8px" }}>
                        <strong>Mozilla Firefox:</strong> Preferences → Privacy & Security → Cookies and Site Data
                      </li>
                      <li style={{ marginBottom: "8px" }}>
                        <strong>Safari (macOS):</strong> Preferences → Privacy → Manage Website Data
                      </li>
                      <li style={{ marginBottom: "8px" }}>
                        <strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies
                      </li>
                      <li>
                        <strong>Opera:</strong> Settings → Advanced → Privacy & security → Site settings → Cookies and site data
                      </li>
                    </ul>
                  </div>

                  <div style={{ marginBottom: "25px" }}>
                    <h4 style={{ 
                      color: "#e74c3c", 
                      fontSize: "1.2rem", 
                      marginBottom: "15px",
                      fontWeight: "600"
                    }}>
                      6.3 Opt-Out Links for Analytics
                    </h4>
                    <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                      <li style={{ marginBottom: "8px" }}>
                        <strong>Google Analytics:</strong> You can opt out of being tracked by Google Analytics across all websites by installing the Google Analytics Opt-Out Browser Add-on.
                      </li>
                      <li>
                        <strong>Other Analytics Providers:</strong> Please refer to the respective provider's privacy settings or opt-out mechanisms.
                      </li>
                    </ul>
                  </div>

                  <div style={{ marginBottom: "25px" }}>
                    <h4 style={{ 
                      color: "#e74c3c", 
                      fontSize: "1.2rem", 
                      marginBottom: "15px",
                      fontWeight: "600"
                    }}>
                      6.4 Advertising Network Opt-Outs
                    </h4>
                    <ul style={{ paddingLeft: "20px" }}>
                      <li style={{ marginBottom: "8px" }}>
                        <strong>Google Ads Settings:</strong> Visit <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: "#e74c3c" }}>https://adssettings.google.com</a> to opt out of personalized ads on Google.
                      </li>
                      <li style={{ marginBottom: "8px" }}>
                        <strong>Facebook Ad Preferences:</strong> Visit <a href="https://www.facebook.com/ads/preferences" target="_blank" rel="noopener noreferrer" style={{ color: "#e74c3c" }}>https://www.facebook.com/ads/preferences</a> to manage ad settings.
                      </li>
                      <li style={{ marginBottom: "8px" }}>
                        <strong>Network Advertising Initiative (NAI):</strong> Visit <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" style={{ color: "#e74c3c" }}>https://optout.networkadvertising.org</a> to opt out of participating NAI member companies' targeted advertising.
                      </li>
                      <li>
                        <strong>Digital Advertising Alliance (DAA):</strong> Visit <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" style={{ color: "#e74c3c" }}>https://optout.aboutads.info</a> to opt out of DAA members' targeted advertising.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* EU/EEA Considerations */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    7. Special Considerations for EU/EEA Visitors
                  </h3>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "25px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #e74c3c"
                  }}>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>7.1</strong> Under the GDPR, you have the right to withdraw consent for non-essential cookies at any time without affecting the legality of processing based on consent before withdrawal. If you wish to revoke consent, click "Cookie Settings" in the footer and update your choices, or clear your cookies via your browser settings.
                    </p>
                    <p>
                      <strong>7.2</strong> We rely on Standard Contractual Clauses for transfers of Personal Data (including cookie-derived data) from the EU/EEA to the United States. You can request a copy of these clauses by emailing <strong>privacy@sytis.com</strong>.
                    </p>
                  </div>
                </div>

                {/* Information Sources */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    8. Sources of Information & How We Use It
                  </h3>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "25px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #e74c3c"
                  }}>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>8.1 Logged‐In Account Data.</strong> When you log in, we use Essential Cookies to remember your session. We do not share your login cookie with third parties.
                    </p>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>8.2 Newsletter Subscribers.</strong> If you have subscribed, we set a Functional Cookie to minimize repeated prompts and streamline unsubscribe options.
                    </p>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>8.3 Analytics & Website Improvement.</strong> We use Performance & Analytics Cookies to understand aggregate visitor behavior (e.g., page views, bounce rate). This helps us optimize site design, improve load times, and fix errors. We do not associate analytics data with your personal identity. Data is aggregated and anonymized.
                    </p>
                    <p>
                      <strong>8.4 Advertising & Targeting Purposes.</strong> If you have consented to Advertising & Targeting Cookies, third parties (e.g., Google Ads, Facebook) may use persistent identifiers to show you relevant ads, measure campaign performance, and restrict repeated ads. We do not use these cookies to build user profiles for internal purposes; that is handled solely by the third-party providers.
                    </p>
                  </div>
                </div>

                {/* Delete Cookies */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    9. How to Delete Cookies on Your Device
                  </h3>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "25px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #e74c3c"
                  }}>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>9.1 Manual Deletion.</strong> You can delete cookies manually by going to your browser's settings and removing cookies associated with www.sytis.com or all cookies entirely.
                    </p>
                    <p style={{ marginBottom: "15px" }}>
                      <strong>9.2 Automatic Deletion.</strong> Some browsers can be set to delete cookies automatically when you close the browser.
                    </p>
                    <p>
                      <strong>9.3 Do Not Sell or Share (California).</strong> Although this policy focuses on cookies, under CCPA/CPRA you can also opt out of "sharing" (cross-context behavioral advertising) by calling the toll-free number <strong>(888) 447-0651</strong>, or emailing <strong>privacy@sytis.com</strong>.
                    </p>
                  </div>
                </div>

                {/* Changes to Policy */}
                <div className="section" style={{ marginBottom: "40px" }}>
                  <h3 style={{ 
                    color: "#2c3e50", 
                    fontSize: "1.5rem", 
                    marginBottom: "20px",
                    fontWeight: "600"
                  }}>
                    10. Changes to This Cookie Policy
                  </h3>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "25px", 
                    borderRadius: "8px",
                    borderLeft: "4px solid #e74c3c"
                  }}>
                    <p>
                      We may update this Cookie Policy to reflect changes in our cookie practices, applicable laws, or third-party services. We will post the revised date at the top of this page and, if changes are material (e.g., adding new categories of cookies that require consent), provide a notice on our Website (e.g., via a banner) before those changes take effect. Your continued use of the Website after the "Last Updated" date constitutes acceptance of the revised Policy.
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
                    11. Contact Information
                  </h3>
                  <div style={{ 
                    backgroundColor: "#fff5f5", 
                    padding: "25px", 
                    borderRadius: "8px",
                    border: "2px solid #e74c3c"
                  }}>
                    <p style={{ marginBottom: "15px" }}>
                      If you have any questions or concerns about this Cookie Policy or our use of cookies, please contact us:
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
                    By using our Website, you acknowledge that you have read, understood, and agree to this Cookie Policy. If you do not agree with any part of this Policy, please disable non-essential cookies or discontinue using the Website.
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

export default CookiePolicy;
