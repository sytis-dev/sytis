import substationImage from "@/images/icons/substation.png";
import electricPanelImage from "@/images/icons/electric.png";
import flameImage from "@/images/icons/fire-icon.png";
import renewableImage from "@/images/icons/renewable.png";
import securityImage from "@/images/icons/security.png";
import transportationImage from "@/images/icons/transportation.png";

const services = [
  {
    id: 1,
    image: substationImage,
    href: "/applications/substation-monitoring",
    icon: "flaticon-vector",
    title: "Substation\nMonitoring",
    altText: "Substation Monitoring",
    text: "Substation monitoring is the process of observing and analyzing the performance of electrical substations to ensure their efficient operation and reliability.",
  },
  {
    id: 2,
    image: electricPanelImage,
    href: "/applications/electrical-panel",
    icon: "flaticon-digital",
    title: "Electrical\nPanel",
    altText: "Electrical Panel",
    text: "Electrical panels are crucial components in electrical systems, serving as the central point for distributing electricity to various circuits and devices within a building or facility.",
  },
  {
    id: 3,
    image: flameImage,
    href: "/applications/fire-detection",
    icon: "flaticon-instant-camera",
    altText: "Flame and Fire Protection",
    title: "flame\nfire Protection",
    text: "Effective flame and fire protection systems are essential for safeguarding lives and property from the devastating effects of fire, ensuring early detection and suppression.",
  },
  {
    id: 4,
    image: renewableImage,
    href: "/applications/renewable-energy",
    icon: "flaticon-monitor",
    title: "Renewable \nEnergy",
    altText: "Renewable Energy",
    text: "Renewable energy refers to energy derived from natural sources that are replenished at a faster rate than they are consumed, such as solar, wind, hydro, and geothermal energy.",
  },
  {
    id: 5,
    image: securityImage,
    href: "/applications/security",
    icon: "flaticon-instant-camera",
    title: "Security",
    altText: "Security Systems",
    text: "Security systems are designed to protect people, property, and assets from unauthorized access, theft, vandalism, and other potential threats through various technologies and measures.",
  },
  {
    id: 6,
    image: transportationImage,
    href: "/applications/transportation",
    icon: "flaticon-monitor",
    title: "Transportation",
    altText: "Transportation Systems",
    text: "Transportation systems encompass the infrastructure, vehicles, and services that facilitate the movement of people and goods from one location to another, including roads, railways, airways, and waterways.",
  },
];

const servicesSection = {
  title: "LET’S CREATE SOMETHING\ntogether",
  text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised.",
  services,
};

export const servicesSectionThree = {
  title: "Applications",
  services,
};

export default servicesSection;

export const serviceSectionThree = [
  {
    id: 1,
    icon: "flaticon-responsive",
    href: "/applications/substation-monitoring",
    title: "Substation\nMonitoring",
  },
  {
    id: 2,
    icon: "flaticon-computer",
    href: "/applications/electrical-maintenance",
    title: "Electrical\nMaintenance",
  },
  {
    id: 3,
    icon: "flaticon-digital-marketing",
    href: "/applications/",
    title: "digital\nmarketing",
  },
  {
    id: 4,
    icon: "flaticon-development",
    href: "/applications/",
    title: "seo & content\nwriting",
  },
  {
    id: 5,
    icon: "flaticon-app-development",
    href: "/applications/",
    title: "App\nDevelopment",
  },
  {
    id: 6,
    icon: "flaticon-ui",
    href: "/applications/",
    title: "Ui/UX\ndesigning",
  },
];

export const servicesSectionOne = {
  title: "We Shape the Perfect\nSolutions",
  text: "We are committed to providing our customers with exceptional service while offering our employees the best training.",
  services: serviceSectionThree,
};

export const serviceSix = {
  tagline: "Checkout Our Services",
  title: "What we’re offering",
  services: [
    {
      id: 1,
      image: "service-1-1.jpg",
      title: "Business Growth",
      href: "/digital-marketing",
      icon: "flaticon-mobile-analytics",
      text: "Aliq is notm hendr erit a augue insu image pellen simply freed text ipsum.",
    },
    {
      id: 2,
      image: "service-1-2.jpg",
      title: "Marketing Advice",
      href: "/digital-marketing",
      icon: "flaticon-research",
      text: "Aliq is notm hendr erit a augue insu image pellen simply freed text ipsum.",
    },
    {
      id: 3,
      image: "service-1-3.jpg",
      title: "Finance Consulting",
      href: "/digital-marketing",
      icon: "flaticon-creative",
      text: "Aliq is notm hendr erit a augue insu image pellen simply freed text ipsum.",
    },
  ],
};

export const serviceSeven = [
  {
    id: 1,
    icon: "flaticon-laptop",
    href: "/digital-marketing",
    title: "Speed Optimization",
    text: "Lorem ipsum is are many variations of pass of majority.",
  },
  {
    id: 2,
    icon: "flaticon-presentation",
    href: "/digital-marketing",
    title: "Marketing Analysis",
    text: "Lorem ipsum is are many variations of pass of majority.",
  },
  {
    id: 3,
    icon: "flaticon-target",
    href: "/digital-marketing",
    title: "SEO and Backlinks",
    text: "Lorem ipsum is are many variations of pass of majority.",
  },
  {
    id: 4,
    icon: "flaticon-visualization",
    href: "/digital-marketing",
    title: "Content Marketing",
    text: "Lorem ipsum is are many variations of pass of majority.",
  },
];

export const serviceEight = {
  text: "Our Services List",
  title: "What We’re Offering",
  services: [
    {
      id: 1,
      title: "Consumer Products",
      href: "/digital-marketing",
      icon: "flaticon-vector-4",
    },
    {
      id: 2,
      title: "Audit Marketing",
      href: "/digital-marketing",
      icon: "flaticon-analysis",
    },
    {
      id: 3,
      title: "Advice Bankings",
      href: "/digital-marketing",
      icon: "flaticon-business",
    },
    {
      id: 4,
      title: "Marketing Rules",
      href: "/digital-marketing",
      icon: "flaticon-global",
    },
  ],
};

export const serviceNine = [
  {
    id: 1,
    image: "service-9-1.jpg",
    icon: "flaticon-responsive",
    title: "modern designing",
    text: "Lorem ipsum is simply free sed qui magni dolores eos qui voptam.",
    href: "/ui-designing",
  },
  {
    id: 2,
    image: "service-9-2.jpg",
    icon: "flaticon-computer",
    title: "graphic designing",
    text: "Lorem ipsum is simply free sed qui magni dolores eos qui voptam.",
    href: "/graphic-designing",
  },
  {
    id: 3,
    image: "service-9-3.jpg",
    icon: "flaticon-global",
    title: "digital marketing",
    text: "Lorem ipsum is simply free sed qui magni dolores eos qui voptam.",
    href: "/digital-marketing",
  },
  {
    id: 4,
    image: "service-9-4.jpg",
    icon: "flaticon-development",
    title: "Content Writting",
    text: "Lorem ipsum is simply free sed qui magni dolores eos qui voptam.",
    href: "/seo",
  },
  {
    id: 5,
    image: "service-9-5.jpg",
    icon: "flaticon-app-development",
    title: "App Development",
    text: "Lorem ipsum is simply free sed qui magni dolores eos qui voptam.",
    href: "/app-development",
  },
  {
    id: 6,
    image: "service-9-6.jpg",
    icon: "flaticon-planning",
    title: "ui / ux designing",
    text: "Lorem ipsum is simply free sed qui magni dolores eos qui voptam.",
    href: "/ui-designing",
  },
];
