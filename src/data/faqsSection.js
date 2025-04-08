const faqs = [
  {
    id: 1,
    title: "Can the TC-90™ be placed in a Class 1 Div 2 environment?",
    text: "Yes,  per UL, the TC-90™ thermal; card camera requires no UL approval due to its low voltage levels",
  },
  {
    id: 2,
    title:
      "Will using the TC-90™ meet my requirements for NFPA 70B annual IR Camera inspections?",
    text: "Yes, continuous monitoring with the TC-90™ thermal card camera far exceeds the annual infrared camera inspections required under NFPA 70B.",
  },
  {
    id: 3,
    title:
      "Do I need to be a trained thermographer to install and operate the TC-90™ thermal card camera? ",
    text: "No, our firmware and software does all the work for you.  Thermography training is not a requirement as our software allows presets.  A short training by SYTIS personnel over the phone is all most folks need to run the system.",
  },
  {
    id: 4,
    title:
      "Can I use POE (Power over ethernet) to power my TC-90™ thermal card camera?",
    text: "Yes, connecting to the ethernet will also allow you to transmit the videos and still images of the targets over your ethernet.",
  },
  {
    id: 5,
    title:
      "If I’m in a remote location with no ethernet, can I still use the TC-90™ thermal card camera?",
    text: "Yes, we have a variety of ways to power the camera and send images and alerts that do not require direct ethernet access.",
  },
  ,
  {
    id: 6,
    title:
      "Is there a quick way that I can prove the cost savings for a wind farm before I purchase and install the TC-90™?",
    text: "Yes, we recommend using the US Dept of Energy’s free software WOMBAT (Wind Operations & Management cost-Benefit Analysis Tool) for this purpose. If you would like our help with configuring and using WOMBAT to ascertain you cost savings, contact us.",
  },
  {
    id: 7,
    title:
      "Can the GridSafe™ system monitor all components in an unmanned substation? ",
    text: "Yes. That’s one of the reasons for its design.  The PTZ cameras include virtual fence line monitoring up to a mile around the perimeter of the sire as well.",
  },
  {
    id: 8,
    title:
      "Can the SYTIS PTZ bi-Spectral cameras see a fire though fog or clouds?",
    text: "Yes, the SYTIS cameras can see a small (1ft. X 1 ft.) fire up to 5 miles away and it can recognize it as a fire with our proven AI technology.  We see through smoke, clouds, rain and fog.",
  },
];

const resources = [
  {
    id: 1,
    title: "Thermal Card Camera",
    links: [
      {
        href: "https://store-f8ph8pgqne.mybigcommerce.com/content/Datasheets/SYTIS/sytis-tc-90.pdf",
        text: "Thermal Card Camera (TC-90™)",
      },

    ],
  },
  {
    id: 2,
    title: "PTZ Cameras",
    links: [
      {
        href: "https://store-f8ph8pgqne.mybigcommerce.com/content/Datasheets/SYTIS/sytis-mini-ptz-25mm.pdf",
        text: "Bi-spectral Mini PTZ Camera 25mm (IIS-BPTM6451-F25)",
      },
      {
        href: "https://store-f8ph8pgqne.mybigcommerce.com/content/Datasheets/SYTIS/sytis-mini-ptz-50mm.pdf",
        text: "Bi-spectral Mini PTZ Camera 50mm (IIS-BPTM6451-F50)",
      },
      {
        href: "https://store-f8ph8pgqne.mybigcommerce.com/content/Datasheets/SYTIS/sytis-ptz-100mm.pdf",
        text: "Bi-spectral PTZ Camera 100mm (BPTT6451-F100)",
      },
      {
        href: "https://store-f8ph8pgqne.mybigcommerce.com/content/Datasheets/SYTIS/sytis-variable-ptz.pdf",
        text: "Bi-spectral Variable PTZ Camera (B-PTT-6451-VF)",
      },
    ],
  },
  {
    id: 3,
    title: "Bullet Cameras",
    links: [
      {
        href: "https://store-f8ph8pgqne.mybigcommerce.com/content/Datasheets/SYTIS/sytis-low-res-bullet.pdf",
        text: "Bi-spectral Bullet Camera (low-res) (IIS-BB2519-F8)",
      },
      {
        href: "https://store-f8ph8pgqne.mybigcommerce.com/content/Datasheets/SYTIS/sytis-bullet.pdf",
        text: "Bi-Spectrum Bullet Camera (IIS-BB6451-F)",
      },
    ],
  },
];

export const faqsSection = [
  {
    id: 1,
    faqs,
    defaultCurrent: 1,
  },
];

export const resourcesSection = [
  {
    id: 1,
    resources,
    defaultCurrent: 1,
  },
];
