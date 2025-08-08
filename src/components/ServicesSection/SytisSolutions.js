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
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

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
          icon: sol.iconUrl || "flaticon-computer", // Ensure iconUrl is always a valid PNG URL
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
        setIsFirstLoad(false);
      }
    };

    loadSolutions();
  }, []);

  if (hasError) {
    return <div>Sorry, there was an error loading the solutions.</div>;
  }

  // Skeleton loading component
  const SkeletonCard = ({ idx }) => (
    <Col key={`skeleton-${idx}`} md={6} lg={4} style={{ marginBottom: '32px' }}>
      <div
        className="service-nine__card"
        style={{
          border: '2px solid #e9ebee',
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)',
          borderRadius: 10,
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          padding: 0,
        }}
      >
        <div style={{
          width: '100%',
          height: 0,
          paddingBottom: '100%',
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
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }}>
            <div style={{
              width: 120,
              height: 120,
              backgroundColor: '#e0e0e0',
              borderRadius: 8,
              marginBottom: 24,
            }}></div>
            <div style={{
              width: '60%',
              height: 20,
              backgroundColor: '#e0e0e0',
              borderRadius: 4,
            }}></div>
          </div>
        </div>
      </div>
    </Col>
  );

  // Split solutions into two arrays of two
  const solutions1 = solutions.slice(0, 2);
  const solutions2 = solutions.slice(2, 4);

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
      <section className="service-nine">
        <div className="auto-container">
          <Row className="g-1 justify-content-center">
            {/* Show skeleton cards while loading on first visit */}
            {(isFetching && isFirstLoad && solutions.length === 0) ? (
              // Show 2 skeleton cards for first row
              Array.from({ length: 2 }, (_, idx) => (
                <SkeletonCard key={idx} idx={idx} />
              ))
            ) : (
              solutions1.map(({ id, icon, title, href, description }, idx) => {
                const globalIdx = idx;
            return (
              <Col key={id} md={6} lg={4} style={{ marginBottom: '32px' }}>
                <Link href={href} style={{ textDecoration: 'none' }}>
                  <div
                    className="service-nine__card"
                    style={{
                      border: `2px solid ${hoveredIndex === globalIdx ? '#d00' : '#e9ebee'}`,
                      boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)',
                      borderRadius: 10,
                      cursor: 'pointer',
                      transition: 'box-shadow 0.3s, border-color 0.3s',
                      position: 'relative',
                      width: '100%',
                      overflow: 'hidden',
                      padding: 0,
                    }}
                    onMouseEnter={() => setHoveredIndex(globalIdx)}
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
            );
          })
            )}
          </Row>
          <Row className="g-1 justify-content-center">
            {/* Show skeleton cards while loading on first visit */}
            {(isFetching && isFirstLoad && solutions.length === 0) ? (
              // Show 2 skeleton cards for second row
              Array.from({ length: 2 }, (_, idx) => (
                <SkeletonCard key={idx + 2} idx={idx + 2} />
              ))
            ) : (
              solutions2.map(({ id, icon, title, href, description }, idx) => {
            const globalIdx = idx + solutions1.length;
            return (
              <Col key={id} md={6} lg={4} style={{ marginBottom: '32px' }}>
                <Link href={href} style={{ textDecoration: 'none' }}>
                  <div
                    className="service-nine__card"
                    style={{
                      border: `2px solid ${hoveredIndex === globalIdx ? '#d00' : '#e9ebee'}`,
                      boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)',
                      borderRadius: 10,
                      cursor: 'pointer',
                      transition: 'box-shadow 0.3s, border-color 0.3s',
                      position: 'relative',
                      width: '100%',
                      overflow: 'hidden',
                      padding: 0,
                    }}
                    onMouseEnter={() => setHoveredIndex(globalIdx)}
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
            );
          })
            )}
          </Row>
        </div>
      </section>
    </>
  );
};

export default SYTISSolutions;
