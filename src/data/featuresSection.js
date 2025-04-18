import bg from "@/images/background/image-3.jpg";
import image from "@/images/resource/featured-image-13.jpg";
import image2 from "@/images/update-26-02-2021/resources/feature-2-1.jpg";
import image3 from "@/images/update-26-02-2021/resources/feature-3-1.jpg";

const featuresSection = {
  bg,
  title: "Grow With Community & Experience Endless Possibilities",
  features: [
    {
      id: 1,
      icon: "flaticon-design-tools",
      title: "latest\ntechnology",
    },
    {
      id: 2,
      icon: "flaticon-idea",
      title: "amazing\nfree support",
    },
    {
      id: 3,
      icon: "flaticon-clock",
      title: "quick\nservices",
    },
  ],
};

export default featuresSection;

export const featuresSectionTwo = {
  image:
    "https://cdn11.bigcommerce.com/s-f8ph8pgqne/products/86/images/501/TC-90-Feature-Image-1032x669__14699.1742920131.1280.1280.jpg?c=1",
  title: "INTRODUCING THE SYTIS TC-90™",
  altText: "TC90™ Bi-spectral Panel Camera",
  title2: "SYTIS TC-90™",
  link: "/products/tc90-bi-spectral-panel-camera",
  features: [
    {
      id: 1,
      title: "24/7 BI-SPECTRAL MONITORING",
      text: "Continuous real-time, remote thermal & optical monitoring inside operational electrical panels.",
    },
    {
      id: 2,
      title: "TECHNICIAN SAFETY",
      text: "Lowers risks of hazardous inspections such as arc flashes and tower climbs.",
    },
    {
      id: 3,
      title: "AI-DRIVEN INFRASPEC™ SOFTWARE",
      text: "Leverage automated alerts & historical records for data-driven decisions while detecting issues before failure occurs.",
    },
  ],
};

export const featureSix = {
  image: image2,
  imageCaption: "Total design freedom \n for everyone",
  title: "Linoor place a very strong impact",
  text: "There are many variations of passages of lorem ipsum available, but the majority have suffered alteration in some form injected humour, or randomised words.",
  items: [
    "Self-contained, state-of-the-art time clock",
    "Scalability of up to 500 employees per time clock",
    "The ability to connect up to 32 time clocks",
    "Employee self-enrollment",
  ],
};

export const featureSeven = {
  title: "planning and strategy",
  features: [
    {
      id: 1,
      image: "strategy-1-1.jpg",
      title: "Take a look around our business growth",
      text: "Sed quia magni dolores eos qui ratione voluptatem sequi nesciunt eque porro.",
      href: "/services",
    },
    {
      id: 2,
      image: "strategy-1-2.jpg",
      title: "Our Mission and unique vissions",
      text: "Sed quia magni dolores eos qui ratione voluptatem sequi nesciunt eque porro.",
      href: "/about",
    },
    {
      id: 3,
      image: "strategy-1-3.jpg",
      title: "Finance advice and a global solution",
      text: "Sed quia magni dolores eos qui ratione voluptatem sequi nesciunt eque porro.",
      href: "/services",
    },
  ],
};

export const featureEight = {
  image: image3,
  title: "We’re here to help your businesses growth",
  text: "There are many variations of pass of lorem ips but the majority have suffered alteration in some form. Injected humour not randomised words which.",
  barTitle: "Digital marketing",
  percent: 70,
};
