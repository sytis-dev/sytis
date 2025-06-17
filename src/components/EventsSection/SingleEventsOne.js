import Link from "next/link";
import React from "react";
import { Col, Image } from "react-bootstrap";

const SingleEventsOne = ({ event = {} }) => {
  const { title, image, date, endDate, time, address, link, days, month } =
    event;

  const hasValidAddress = !!address && address.trim() !== "";

  return (
    <Col md={6} lg={4}>
      <div className="events-one__item">
        <div className="events-one__image">
          <div className="events-one__dates">
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
                  src={
                    require(`@/images/update-09-06-2021/events/${image}`).default
                      .src
                  }
                  alt=""
                  style={{
                    width: "100%",
                    minHeight: "250px",
                    maxHeight: "275px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </a>
            </Link>
          ) : (
            <Image
              src={
                require(`@/images/update-09-06-2021/events/${image}`).default.src
              }
              alt=""
              style={{
                width: "100%",
                minHeight: "250px",
                maxHeight: "275px",
                objectFit: "cover",
                borderRadius: "8px",
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
        </div>
      </div>
    </Col>
  );
};

export default SingleEventsOne;
