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
};

const EventModal = ({ show, onHide, event }) => {
  if (!event) return null;

  const { title, image, date, endDate, time, address, link, days, month } = event;
  const hasValidAddress = !!address && address.trim() !== "";
  const eventImage = eventImages[image];
  
  // Check if this is a wide logo that needs special handling
  const isWideLogo = image === "nsc-2025.png" || image === "neca-2025.png";

  return (
    (<Modal show={show} onHide={onHide} size="lg" centered>
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
          <Link href={link} passHref legacyBehavior>
            <Button variant="primary" as="a" target="_blank" rel="noopener noreferrer">
              Visit Event Website
            </Button>
          </Link>
        )}
      </Modal.Footer>
    </Modal>)
  );
};

export default EventModal;


