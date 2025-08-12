import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import slugify from "slugify";
import Image from "next/image";

const STORAGE_KEY = "solutions_data"; // Key to store in localStorage
const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours expiration

const SYTISSolutions = ({ solutions: rawSolutions = [] }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Format the solutions data (moved from useEffect to direct processing)
  const solutions = rawSolutions.map((sol) => ({
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

  // If no solutions, show a message
  if (!solutions.length) {
    return (
      <section className="service-nine">
        <div className="auto-container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Solutions will be available soon.</p>
          </div>
        </div>
      </section>
    );
  }

  // Split solutions into two arrays of two
  const solutions1 = solutions.slice(0, 2);
  const solutions2 = solutions.slice(2, 4);

  return (
    (<section className="service-nine">
      <div className="auto-container">
        <Row className="g-1 justify-content-center">
          {solutions1.map(({ id, icon, title, href, description }, idx) => {
            const globalIdx = idx;
            return (
              (<Col key={id} md={6} lg={4} style={{ marginBottom: '32px' }}>
                <Link href={href} style={{ textDecoration: 'none' }} legacyBehavior>
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
              </Col>)
            );
          })}
        </Row>
        <Row className="g-1 justify-content-center">
          {solutions2.map(({ id, icon, title, href, description }, idx) => {
            const globalIdx = idx + solutions1.length;
            return (
              (<Col key={id} md={6} lg={4} style={{ marginBottom: '32px' }}>
                <Link href={href} style={{ textDecoration: 'none' }} legacyBehavior>
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
              </Col>)
            );
          })}
        </Row>
      </div>
    </section>)
  );
};

export default SYTISSolutions;
