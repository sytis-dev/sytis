import demoBg from "@/images/background/footer-bg-2.jpg";
import logo from "@/images/logo.png";
import logo3 from "@/images/logo-3.png";
import logo6 from "@/images/update-01-10-2021/logo-6-light.png";
import logo7 from "@/images/update-01-10-2021/logo-7-light.png";
import logo8 from "@/images/update-01-10-2021/logo-8-light.png";
import logo5 from "@/images/update-09-06-2021/logo-5-light.png";

export const footer = { year: new Date().getFullYear(), author: "SYTIS" };

export const mainFooterDemo = {
  ...footer,
  demoBg,
  title: "Create Stunning Website Now!",
  tagline: "Purchase linoor Template Now",
  templateLink: "#",
};

export const mainFooter = {
  logo,
  logo3,
  logo5,
  logo6,
  logo7,
  logo8,
  bg: demoBg,
  title: "Let’s Start Working Together",
  about:
    "There are many variation of passages of lorem ipsum available, but the majority suffered.",
  about2: "The new corporate agency theme",
  about3:
    "We’ve grown our business on a set of \n three building blocks. Enjoy the \n people you work.",
  text: "SYTIS is a technology company focused on software and high definition infrared and optical cameras, delivering actionable, intelligent data when it is needed most: before an issue gets out of control. ",
  address: "3474 Empresa Dr. #150 \n San Luis Obispo, CA 93449",
  address3: "66 Mark Street, New Town DC 5752, Lo New York",
  address2:
    "214 Gold Street Round Road. 66 \n Code New York, United States \n of America",
  addressLink: "https://g.co/kgs/hxtBTUA",
  phone: "(888) 447-0651",
  phone2: "+92 3333 222 000",
  email: "info@sytis.com",
  textBottom:
    "Sign up for our latest news & articles. We won’t give you spam mails.",
  subscribeText:
    "Register and get notified about the news & updates before it gets too late.",
  socials: [
    {
      id: 1,
      href: "https://www.facebook.com/sytistech",
      icon: "fab fa-facebook-square",
    },
    {
      id: 3,
      href: "https://www.instagram.com/sytis.tech/ ",
      icon: "fab fa-instagram",
    },
    {
      id: 4,
      href: "https://www.linkedin.com/company/sytis",
      icon: "fab fa-linkedin",
    },
  ],
  links: [
    {
      id: 1,
      href: "/sytis /solutions",
      title: "Solutions",
    },
    {
      id: 2,
      href: "/sytis/applications",
      title: "Applications",
    },
    {
      id: 3,
      href: "/sytis/about",
      title: "About",
    },
    {
      id: 4,
      href: "/sytis/blog",
      title: "Blog",
    },
    {
      id: 5,
      href: "/sytis/faq",
      title: "FAQ",
    },
    {
      id: 6,
      href: "/sytis/solution-inquiry",
      title: "Solution Inquiry",
    },
    {
      id: 7,
      href: "/sytis/privacy-policy",
      title: "Privacy Policy",
    },
    {
      id: 8,
      href: "/sytis/shipping",
      title: "Shipping",
    },
    {
      id: 9,
      href: "/sytis/terms-of-use",
      title: "Terms of Use ",
    },
  ],
  ...footer,
  newses: [
    {
      id: 1,
      image: "footer-1-1.png",
      date: "20 Nov, 2020",
      title: "The best digital services for the startups",
    },
    {
      id: 2,
      image: "footer-1-2.png",
      date: "20 Nov, 2020",
      title: "The best digital services for the startups",
    },
  ],
};
