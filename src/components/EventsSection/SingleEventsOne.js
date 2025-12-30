import Link from "next/link";
import React from "react";
import { Col, Image } from "react-bootstrap";

// Static imports for all event images
import distributech from "@/images/update-09-06-2021/events/distributech.png";
import energyStorageSummit from "@/images/update-09-06-2021/events/energy-storage-summit.jpeg";
import eei from "@/images/update-09-06-2021/events/eei.png";
import cleanPower from "@/images/update-09-06-2021/events/clean-power.jpeg";
import nfpa from "@/images/update-09-06-2021/events/nfpa.png";
import renewableUk from "@/images/update-09-06-2021/events/renewable_uk.png";
import windeurope from "@/images/update-09-06-2021/events/windeurope.png";
import neca2025 from "@/images/update-09-06-2021/events/neca-2025.png";
import nsc2025 from "@/images/update-09-06-2021/events/nsc-2025.png";
import powergen2025 from "@/images/update-09-06-2021/events/powergen-2025.png";
import distributech2026 from "@/images/update-09-06-2021/events/DistribuTECH-2026.jpg";
import nreca2026 from "@/images/update-09-06-2021/events/nreca-2026.png";
import windEurope2026 from "@/images/update-09-06-2021/events/wind-europe-2026.png";
import eei2026 from "@/images/update-09-06-2021/events/eei-2026.png";
import nfpa2026 from "@/images/update-09-06-2021/events/nfpa-2026.jpg";
import nsc2026 from "@/images/update-09-06-2021/events/nsc-2026.png";

// Image mapping object
const eventImages = {
  "distributech.png": distributech,
  "energy-storage-summit.jpeg": energyStorageSummit,
  "eei.png": eei,
  "clean-power.jpeg": cleanPower,
  "nfpa.png": nfpa,
  "renewable_uk.png": renewableUk,
  "windeurope.png": windeurope,
  "neca-2025.png": neca2025,
  "nsc-2025.png": nsc2025,
  "powergen-2025.png": powergen2025,
  "DistribuTECH-2026.jpg": distributech2026,
  "nreca-2026.png": nreca2026,
  "wind-europe-2026.png": windEurope2026,
  "eei-2026.png": eei2026,
  "nfpa-2026.jpg": nfpa2026,
  "nsc-2026.png": nsc2026,
};

const SingleEventsOne = ({ event = {}, isPast = false }) => {
  const { title, image, date, endDate, time, address, link, days, month } =
    event;

  const hasValidAddress = !!address && address.trim() !== "";
  const eventImage = eventImages[image];
  
  // Check if this is a wide logo that needs special handling
  const isWideLogo = image === "nsc-2025.png" || image === "neca-2025.png" || image === "powergen-2025.png" || image === "DistribuTECH-2026.jpg" || image === "nreca-2026.png" || image === "wind-europe-2026.png" || image === "eei-2026.png" || image === "nfpa-2026.jpg" || image === "nsc-2026.png";

  // Apply past event styling
  const pastEventClass = isPast ? 'past-event' : '';
  const pastEventStyle = isPast ? {
    filter: 'grayscale(100%)',
    opacity: 0.6
  } : {};
  
  // Apply past event styling to date component
  const pastDateStyle = isPast ? {
    filter: 'grayscale(100%)',
    opacity: 0.6
  } : {};

  return (
    <Col md={6} lg={4}>
      <div className={`events-one__item ${pastEventClass}`}>
        <div className="events-one__image">
          <div className="events-one__dates" style={pastDateStyle}>
            <div className="events-one__date">
              {days}
              <br />
              {month}
            </div>
          </div>

          {hasValidAddress ? (
            <Link href={link}>
              <a>
                <Image
                  src={eventImage?.src || ""}
                  alt=""
                  style={{
                    width: "100%",
                    minHeight: "250px",
                    maxHeight: "275px",
                    objectFit: isWideLogo ? "contain" : "cover",
                    objectPosition: isWideLogo ? "center" : "center",
                    backgroundColor: isWideLogo ? "#f8f9fa" : "transparent",
                    borderRadius: "8px",
                    padding: isWideLogo ? "20px" : "0",
                    ...pastEventStyle
                  }}
                />
              </a>
            </Link>
          ) : (
            <Image
              src={eventImage?.src || ""}
              alt=""
              style={{
                width: "100%",
                minHeight: "250px",
                maxHeight: "275px",
                objectFit: isWideLogo ? "contain" : "cover",
                objectPosition: isWideLogo ? "center" : "center",
                backgroundColor: isWideLogo ? "#f8f9fa" : "transparent",
                borderRadius: "8px",
                padding: isWideLogo ? "20px" : "0",
                ...pastEventStyle
              }}
            />
          )}
        </div>

        <div className="events-one__content">
          <h3 className="events-one__title">
            {hasValidAddress ? (
              <Link href={link}>{title}</Link>
            ) : (
              <span>{title}</span>
            )}
          </h3>
          <ul className="events-one__meta list-unstyled">
            <li>
              <i className="far fa-clock"></i>
              {time}
            </li>
            <li>
              <i className="far fa-map"></i>
              {address}
            </li>
          </ul>
          {isPast && (
            <div className="past-event-indicator">
              <span className="past-event-badge">Past Event</span>
            </div>
          )}
        </div>
      </div>
    </Col>
  );
};

export default SingleEventsOne;
