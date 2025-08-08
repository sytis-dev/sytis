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
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
          href: `/applications/${slugify(app.name, { lower: true })}`,
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
          {applications.map(({ id, icon, title, href, image, description }, idx) => (
            <Col key={id} md={6} lg={4} style={{ marginBottom: '32px' }}>
              <Link href={href} style={{ textDecoration: 'none' }}>
                <div
                  className="service-nine__card"
                  style={{
                    border: `2px solid ${hoveredIndex === idx ? '#d00' : '#e9ebee'}`,
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)',
                    borderRadius: 10,
                    cursor: 'pointer',
                    transition: 'box-shadow 0.3s, border-color 0.3s',
                    position: 'relative',
                    width: '100%',
                    overflow: 'hidden',
                    padding: 0,
                  }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div style={{
                    width: '100%',
                    height: 0,
                    paddingBottom: '100%', // 1:1 aspect ratio
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <div
                        className="service-nine__icon"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: 24,
                          fontSize: 64,
                          color: 'var(--thm-base)',
                        }}
                      >
                        <Image
                          src={icon}
                          alt={title}
                          width={200}
                          height={200}
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      <h4 style={{ marginTop: "1rem", textAlign: 'center', color: 'var(--thm-black)' }}>
                        {title}
                      </h4>
                    </div>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default SytisApplications;
