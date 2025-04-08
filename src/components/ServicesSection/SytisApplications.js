import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import slugify from "slugify";
import Image from "next/image";

const STORAGE_KEY = "applications_data"; // Key to store in localStorage
const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours expiration

const SytisApplications = () => {
  const [applications, setApplications] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadApplications = async () => {
      setIsFetching(true);

      try {
        // Check localStorage for cached data
        const cachedData = localStorage.getItem(STORAGE_KEY);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);

          // If cache is still valid, use it
          if (Date.now() - timestamp < CACHE_EXPIRATION_MS) {
            console.log("Using cached applications");
            setApplications(data);
            setIsFetching(false);
            return;
          }
        }

        console.log("Fetching applications from API");
        const response = await fetch("/api/applications");

        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        const { data } = await response.json();

        if (!data) {
          throw new Error("Invalid data format");
        }

        const formattedData = data.map((app) => ({
          id:
            app.category_id.toString() +
            "-" +
            slugify(app.name, { lower: true }),
          href: `/sytis/applications/${slugify(app.name, { lower: true })}`,
          image: app.image_url,
          title: app.name,
          icon: app.iconUrl || "flaticon-computer", // Ensure iconUrl is always a valid PNG URL
          description:
            app.description ||
            "Lorem ipsum is simply free sed qui magni dolores eos qui voptam.",
        }));

        console.log(formattedData);

        // Store in localStorage with timestamp
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ data: formattedData, timestamp: Date.now() })
        );

        setApplications(formattedData);
      } catch (error) {
        console.error("Error loading applications:", error);
        setHasError(true);
      } finally {
        setIsFetching(false);
      }
    };

    loadApplications();
  }, []);

  if (hasError) {
    return <div>Sorry, there was an error loading the applications.</div>;
  }

  return (
    <section className="service-nine">
      <div className="auto-container">
        <Row>
          {applications.map(({ id, icon, title, href, image, description }) => (
            <Col key={id} md={6} lg={4}>
              <div className="service-nine__card">
                <div className="service-nine__card__inner">
                  <div className="service-nine__image">
                    <Image src={image} alt={title} width={500} height={300} />
                  </div>
                  <div className="service-nine__content">
                    <div className="service-nine__icon" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <img src={icon} alt={title} style={{ width: "80px", height: "80px" }} />
                    </div>
                    <h4 style={{ textAlign: "center" }}>
                      <Link href={href}>{title}</Link>
                    </h4>
                    {/* <p dangerouslySetInnerHTML={{ __html: description }} /> */}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default SytisApplications;
