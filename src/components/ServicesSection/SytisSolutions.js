import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import slugify from "slugify";
import Image from "next/image";

const STORAGE_KEY = "solutions_data"; // Key to store in localStorage
const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours expiration

const SYTISSolutions = () => {
  const [solutions, setSolutions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadSolutions = async () => {
      setIsFetching(true);

      try {
        // Check localStorage for cached data
        const cachedData = localStorage.getItem(STORAGE_KEY);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);

          // If cache is still valid, use it
          if (Date.now() - timestamp < CACHE_EXPIRATION_MS) {
            console.log("Using cached solutions");
            setSolutions(data);
            setIsFetching(false);
            return;
          }
        }

        console.log("Fetching solutions from API");
        const response = await fetch("/api/solutions");

        if (!response.ok) {
          throw new Error("Failed to fetch solutions");
        }

        const { data } = await response.json();

        if (!data) {
          throw new Error("Invalid data format");
        }

        const formattedData = data.map((sol) => ({
          id:
            sol.category_id.toString() +
            "-" +
            slugify(sol.name, { lower: true }),
          href: `/solutions/${slugify(sol.name, { lower: true })}`,
          image: sol.image_url,
          title: sol.name,
          icon: sol.icon || "flaticon-computer",
          description:
            sol.description ||
            "Lorem ipsum is simply free sed qui magni dolores eos qui voptam.",
        }));

        console.log(formattedData);

        // Store in localStorage with timestamp
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ data: formattedData, timestamp: Date.now() })
        );

        setSolutions(formattedData);
      } catch (error) {
        console.error("Error loading solutions:", error);
        setHasError(true);
      } finally {
        setIsFetching(false);
      }
    };

    loadSolutions();
  }, []);

  if (hasError) {
    return <div>Sorry, there was an error loading the solutions.</div>;
  }

  return (
    <section className="service-nine">
      <div className="auto-container">
        <Row>
          {solutions.map(({ id, icon, title, href, image, description }) => (
            <Col key={id} md={6} lg={4}>
              <div className="service-nine__card">
                <div className="service-nine__card__inner">
                  <div className="service-nine__image">
                    <a href={href}>
                      {" "}
                      <Image src={image} alt={title} width={500} height={300} />
                    </a>
                  </div>
                  <div
                    className="service-nine__content"
                    style={{ textAlign: "center" }}
                  >
                    <div
                      className="service-nine__icon"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {/* <i className={icon} style={{ fontSize: "2rem" }}></i>{" "} */}
                      {/* You can adjust the size if needed */}
                    </div>
                    <h4 style={{ marginTop: "1rem" }}>
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

export default SYTISSolutions;
