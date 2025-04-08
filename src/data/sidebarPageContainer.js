import image from "@/images/resource/featured-image-16.jpg";
import featuredImage from "@/images/resource/featured-image-17.jpg";

export const sidebar = {
  title: "Applications",
  title2: "Need monitoring help?",
  text: "SYTIS is a technology company focused on software and high definition infrared and optical cameras, delivering actionable, intelligent data when it is needed most: before an issue gets out of control. ",
  phone: "(888) 447-0651",
  navItems: [
    {
      id: 1,
      title: "Substation Monitoring",
      href: "/applications/substation-monitoring",
    },
    {
      id: 2,
      title: "Electrical Panel",
      href: "/applications/electrical-panel",
    },
    {
      id: 3,
      title: "flame and fire Detection",
      href: "/applications/fire-detection",
    },
    {
      id: 4,
      title: "Renewable Energy ",
      href: "/applications/renewable-energy",
    },
    {
      id: 5,
      title: "Security",
      href: "/applications/security",
    },
    {
      id: 6,
      title: "Transportation",
      href: "/applications/transportation",
    },
  ],
};

const common = {
  image,
  text1:
    "Need something changed or is there something not quite working the way you envisaged? Is your van a little old and tired and need refreshing? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  featuredTitle: "planning & strategy",
  featuredText:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  featuredImage,
  features: [
    "Research beyond the business plan",
    "Marketing options and rates",
    "The ability to turnaround consulting",
    "Customer engagement matters",
  ],
  text2:
    "Need something changed or is there something not quite working the way you envisaged? Is your van a little old and tired and need refreshing? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  text3:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
};

export const webDevelopment = {
  ...common,
  title: "Website Development",
};

export const graphicDesigning = {
  ...common,
  title: "Graphic Designing",
};

export const digitalMarketing = {
  ...common,
  title: "Digital Marketing",
};

export const seo = {
  ...common,
  title: "SEO & Content Writing",
};

export const appDevelopment = {
  ...common,
  title: "App Development",
};

export const uiDesigning = {
  ...common,
  title: "UI/UX Designing",
};
