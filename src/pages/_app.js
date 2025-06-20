import ContextProvider from "@/context/ContextProvider";
import "@/vendors/animate.css";
import "@/vendors/custom-animate.css";
import "@/vendors/flaticon.css";
import "@/vendors/fontawesome-all.css";
import "@/vendors/linoor-icons.css";
import "@/vendors/reey-font.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "node_modules/swiper/swiper-bundle.min.css";
import "react-circular-progressbar/dist/styles.css";
import "react-modal-video/css/modal-video.min.css";
import "tiny-slider/dist/tiny-slider.css";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { CookieManager } from "react-cookie-manager";
import "react-cookie-manager/style.css";

// extra css
import "@/styles/style.css";
import "@/styles/hover.css";
import "@/styles/responsive.css";

const GTM_ID = "GTM-WL832HQN";

const MyApp = ({ Component, pageProps }) => {
  return (
    <CookieManager
      translations={{
        title: "Would You Like A Cookie? 🍪",
        message:
          "We value your privacy. Choose which cookies you want to allow. Essential cookies are always enabled as they are necessary for the website to function properly.",
        buttonText: "Accept All",
        declineButtonText: "Decline All",
        manageButtonText: "Manage Cookies",
        privacyPolicyText: "Privacy Policy",
      }}
      showManageButton={true}
      privacyPolicyUrl="/privacy-policy"
      theme="dark"
      enableFloatingButton={true}
      displayType="banner"
      cookieKitId="6854954ce5b3247b9f0e5e18"
      onManage={(preferences) => {
        if (preferences) {
          console.log("Cookie preferences updated:", preferences);
        }
      }}
      onAccept={() => {
        console.log("User accepted all cookies");
        // Analytics tracking can be initialized here
      }}
      onDecline={() => {
        console.log("User declined all cookies");
        // Handle declined state if needed
      }}
      classNames={{
        // // Main action buttons
        // acceptButton:
        //   "bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg",
        // declineButton:
        //   "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg",
        // manageButton:
        //   "border-2 border-blue-500 text-blue-500 font-bold py-2 px-4 rounded-lg hover:bg-blue-50",

        // // Banner style (bottom of screen)
        // bannerContainer:
        //   "bg-white/90 border-2 border-blue-200 shadow-xl rounded-xl",
        // bannerContent: "p-6 space-y-4",
        // bannerTitle: "text-lg font-bold text-blue-800",
        // bannerMessage: "text-sm text-gray-700",

        // // Popup style (bottom left corner)
        // popupContainer:
        //   "bg-white/90 border-2 border-blue-200 shadow-xl rounded-xl",
        // popupContent: "p-6 space-y-4",
        // popupTitle: "text-lg font-bold text-blue-800",
        // popupMessage: "text-sm text-gray-700",

        // // Modal style (center of screen)
        // modalContainer: "bg-black/50 backdrop-blur-sm",
        // modalContent: "bg-white p-8 rounded-xl max-w-lg mx-auto",
        // modalTitle: "text-xl font-bold text-gray-900",
        // modalMessage: "text-gray-600 my-4",

        // // Floating cookie button (appears after consent is given)
        // floatingButton: "bg-blue-500 text-white shadow-lg hover:bg-blue-600",
        // floatingButtonCloseButton: "bg-red-500 text-white",

        // // Manage Cookie UI elements
        // manageCookieContainer: "space-y-6",
        // manageCookieTitle: "text-xl font-bold text-blue-800",
        // manageCookieMessage: "text-gray-700",
        // manageCookieCategory: "border-b border-gray-200 pb-4",
        // manageCookieCategoryTitle: "font-bold text-gray-800",
        // manageCookieCategorySubtitle: "text-gray-600",
        // manageCookieStatusText: "text-xs text-gray-500 italic",
        // manageCookieToggle: "bg-gray-300",
        // manageCookieToggleChecked: "bg-green-500",
        // manageCancelButton:
        //   "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded",
        // manageSaveButton:
        //   "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded",

        // // Other elements
        // privacyPolicyLink: "text-blue-600 underline hover:text-blue-800",
        poweredByLink: "hidden",
      }}
    >
      {" "}
      <ContextProvider>
        {/* ✅ GTM Script */}
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />

        {/* ✅ GTM noscript fallback */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        <Component {...pageProps} />
        <Analytics />
      </ContextProvider>
    </CookieManager>
  );
};

export default MyApp;
