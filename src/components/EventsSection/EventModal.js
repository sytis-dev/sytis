import React from "react";
import { Modal, Button, Image } from "react-bootstrap";
import Link from "next/link";

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

const EventModal = ({ show, onHide, event }) => {
  if (!event) return null;

  const { title, image, date, endDate, time, address, link, days, month } = event;
  const hasValidAddress = !!address && address.trim() !== "";
  const eventImage = eventImages[image];
  
  // Check if this is a wide logo that needs special handling
  const isWideLogo = image === "nsc-2025.png" || image === "neca-2025.png" || image === "powergen-2025.png" || image === "DistribuTECH-2026.jpg" || image === "nreca-2026.png" || image === "wind-europe-2026.png" || image === "eei-2026.png" || image === "nfpa-2026.jpg" || image === "nsc-2026.png";

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="event-modal-content">
          <div className="event-modal-image">
            <Image
              src={eventImage?.src || ""}
              alt={title}
              style={{
                width: "100%",
                minHeight: "200px",
                maxHeight: "250px",
                objectFit: isWideLogo ? "contain" : "cover",
                objectPosition: isWideLogo ? "center" : "center",
                backgroundColor: isWideLogo ? "#f8f9fa" : "transparent",
                borderRadius: "8px",
                padding: isWideLogo ? "20px" : "0",
              }}
            />
          </div>
          
          <div className="event-modal-details">
            <div className="event-modal-date">
              <div className="event-modal-date-box">
                <span className="event-modal-days">{days}</span>
                <span className="event-modal-month">{month}</span>
              </div>
              <div className="event-modal-date-text">
                <p><strong>Start Date:</strong> {date}</p>
                <p><strong>End Date:</strong> {endDate}</p>
              </div>
            </div>
            
            <div className="event-modal-info">
              <div className="event-modal-time">
                <i className="far fa-clock"></i>
                <span>{time}</span>
              </div>
              {hasValidAddress && (
                <div className="event-modal-address">
                  <i className="far fa-map"></i>
                  <span>{address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        {link && (
          <Link href={link} passHref>
            <Button variant="primary" as="a" target="_blank" rel="noopener noreferrer">
              Visit Event Website
            </Button>
          </Link>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;

