import PageBanner from "@/components/BannerSection/PageBanner";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import React, { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import BuildDataCache from "../../utils/buildDataCache.js";
import { Col, Row, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

export async function getStaticProps() {
  try {
    // Use shared cache to fetch products data
    const products = await BuildDataCache.getProducts();

    return {
      props: { products },
      // No revalidate property = static build at build time
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: { products: [] },
    };
  }
}

const Products = ({ products = [] }) => {
  const [selectedSolution, setSelectedSolution] = useState("all");
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // Get unique solution names for filter buttons
  const solutionNames = useMemo(() => {
    const names = [...new Set(products.map(p => p.solutionName).filter(Boolean))];
    return names.sort(); // Sort alphabetically
  }, [products]);

  // Filter products based on selected solution
  const filteredProducts = useMemo(() => {
    if (selectedSolution === "all") {
      return products;
    }
    return products.filter(product => product.solutionName === selectedSolution);
  }, [products, selectedSolution]);

  // Group filtered products by solution for display
  const productGroups = useMemo(() => {
    if (selectedSolution === "all") {
      // Group by solution when showing all
      return filteredProducts.reduce((groups, product) => {
        const solutionName = product.solutionName || "Other Products";
        if (!groups[solutionName]) {
          groups[solutionName] = [];
        }
        groups[solutionName].push(product);
        return groups;
      }, {});
    } else {
      // Single group when filtering
      return { [selectedSolution]: filteredProducts };
    }
  }, [filteredProducts, selectedSolution]);

  return (
    (<Layout pageTitle="Products">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYTIS | Products</title>
        <meta
          name="description"
          content="Explore SYTIS's complete product catalog of thermal monitoring cameras, sensors, and AI-driven systems for electrical asset protection."
        />
        <meta
          property="og:description"
          content="Explore SYTIS's complete product catalog of thermal monitoring cameras, sensors, and AI-driven systems for electrical asset protection."
        />
        <meta property="og:title" content="SYTIS | Products" />
      </Head>
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="Products" />
      <section className="service-nine" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="auto-container">
          {/* Filter Buttons */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '60px',
            padding: '0 20px'
          }}>
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{ 
                fontSize: '1.7rem', 
                fontWeight: '600', 
                color: '#1a1a1a',
                marginBottom: '18px'
              }}>
                Filter by Category
              </h3>
              <p style={{ 
                color: '#666', 
                fontSize: '1rem',
                margin: 0
              }}>
                Browse our products by solution category
              </p>
            </div>
            
            {/* Filter Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 20px'
            }}>
                             {/* Desktop: Single row layout */}
               <div 
                 style={{
                   display: isMobile ? 'none' : 'flex',
                   flexWrap: 'nowrap',
                   justifyContent: 'center',
                   gap: '15px',
                   width: '100%',
                   maxWidth: '1000px'
                 }}
               >
                <Button
                  variant={selectedSolution === "all" ? "primary" : "outline-primary"}
                  onClick={() => setSelectedSolution("all")}
                  style={{
                    borderRadius: '25px',
                    padding: '12px 20px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    border: selectedSolution === "all" ? 'none' : '2px solid #e61919',
                    backgroundColor: selectedSolution === "all" ? '#e61919' : 'transparent',
                    color: selectedSolution === "all" ? 'white' : '#e61919',
                    transition: 'all 0.3s ease',
                    minWidth: '140px',
                    whiteSpace: 'nowrap',
                    height: 'auto',
                    lineHeight: '1.2',
                    flex: '0 0 auto'
                  }}
                >
                  All Products
                </Button>
                
                {solutionNames.map((solutionName) => (
                  <Button
                    key={solutionName}
                    variant={selectedSolution === solutionName ? "primary" : "outline-primary"}
                    onClick={() => setSelectedSolution(solutionName)}
                    style={{
                      borderRadius: '25px',
                      padding: '12px 20px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      border: selectedSolution === solutionName ? 'none' : '2px solid #e61919',
                      backgroundColor: selectedSolution === solutionName ? '#e61919' : 'transparent',
                      color: selectedSolution === solutionName ? 'white' : '#e61919',
                      transition: 'all 0.3s ease',
                      minWidth: '140px',
                      whiteSpace: 'nowrap',
                      height: 'auto',
                      lineHeight: '1.2',
                      flex: '0 0 auto'
                    }}
                  >
                    {solutionName}
                  </Button>
                ))}
              </div>
              
                                                           {/* Mobile: Grid layout - 2 columns */}
               <div 
                 style={{
                   display: isMobile ? 'block' : 'none',
                   width: '100%',
                   maxWidth: '100%'
                 }}
               >
                                   <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px',
                    width: '100%',
                    padding: '0 10px'
                  }}>
                                     <Button
                     variant={selectedSolution === "all" ? "primary" : "outline-primary"}
                     onClick={() => setSelectedSolution("all")}
                     style={{
                       borderRadius: '18px',
                       padding: '8px 12px',
                       fontSize: '0.8rem',
                       fontWeight: '500',
                       border: selectedSolution === "all" ? 'none' : '2px solid #e61919',
                       backgroundColor: selectedSolution === "all" ? '#e61919' : 'transparent',
                       color: selectedSolution === "all" ? 'white' : '#e61919',
                       transition: 'all 0.3s ease',
                       whiteSpace: 'nowrap',
                       height: 'auto',
                       lineHeight: '1.2',
                       width: '100%',
                       minHeight: '36px'
                     }}
                   >
                     All Products
                   </Button>
                   
                   {solutionNames.map((solutionName) => (
                     <Button
                       key={solutionName}
                       variant={selectedSolution === solutionName ? "primary" : "outline-primary"}
                       onClick={() => setSelectedSolution(solutionName)}
                       style={{
                         borderRadius: '18px',
                         padding: '8px 12px',
                         fontSize: '0.8rem',
                         fontWeight: '500',
                         border: selectedSolution === solutionName ? 'none' : '2px solid #e61919',
                         backgroundColor: selectedSolution === solutionName ? '#e61919' : 'transparent',
                         color: selectedSolution === solutionName ? 'white' : '#e61919',
                         transition: 'all 0.3s ease',
                         whiteSpace: 'nowrap',
                         height: 'auto',
                         lineHeight: '1.2',
                         width: '100%',
                         minHeight: '36px'
                       }}
                     >
                       {solutionName}
                     </Button>
                   ))}
                </div>
              </div>
            </div>
            
            {/* Results Count */}
            <div style={{ 
              marginTop: '25px',
              color: '#666',
              fontSize: '0.95rem',
              fontWeight: '500'
            }}>
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              {selectedSolution !== "all" && ` in ${selectedSolution}`}
            </div>
          </div>

          {/* Products Display */}
          {Object.entries(productGroups).map(([solutionName, groupProducts]) => (
            <div key={solutionName} style={{ marginBottom: '60px' }}>
               {selectedSolution === "all" && (
                 <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                   <h2 style={{ 
                     fontSize: '2rem', 
                     fontWeight: 'bold', 
                     color: '#1a1a1a',
                     marginBottom: '10px'
                   }}>
                     {solutionName}
                   </h2>
                   <div style={{
                     width: '60px',
                     height: '3px',
                     backgroundColor: '#e61919',
                     margin: '0 auto'
                   }}></div>
                 </div>
               )}
              
              <Row className="g-3">
                {groupProducts.map((product) => (
                  <Col key={product.id} xs={12} sm={6} lg={4} style={{ marginBottom: '24px' }}>
                    <Link
                      href={`/products/${product.custom_url?.url?.replace(/\//g, '') || product.id}`}
                      style={{ textDecoration: 'none' }}
                      legacyBehavior>
                        <div
                          className="service-nine__card"
                          style={{
                            border: '2px solid #e9ebee',
                            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)',
                            borderRadius: 10,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            width: '100%',
                            overflow: 'hidden',
                            padding: 0,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#e61919';
                            e.currentTarget.style.boxShadow = '0 8px 25px 0 rgba(0,0,0,0.15)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#e9ebee';
                            e.currentTarget.style.boxShadow = '0 2px 12px 0 rgba(0,0,0,0.04)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <div style={{
                            width: '100%',
                            height: 0,
                            paddingBottom: '75%', // 4:3 aspect ratio for products
                            position: 'relative',
                            backgroundColor: '#f8f9fa'
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
                              padding: '16px'
                            }}>
                              {product.all_images?.[0]?.url_standard ? (
                                <div style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  marginBottom: 16,
                                  width: '100%',
                                  height: '60%'
                                }}>
                                  <Image
                                    src={product.all_images[0].url_standard}
                                    alt={product.name}
                                    width={150}
                                    height={150}
                                    style={{ objectFit: "contain", maxWidth: '100%', maxHeight: '100%' }}
                                  />
                                </div>
                              ) : (
                                <div style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  marginBottom: 16,
                                  width: '100%',
                                  height: '60%',
                                  color: '#ccc',
                                  fontSize: '3rem'
                                }}>
                                  📷
                                </div>
                              )}
                              <h4 style={{ 
                                textAlign: 'center', 
                                color: '#1a1a1a',
                                fontSize: '1rem',
                                fontWeight: '600',
                                lineHeight: '1.3',
                                margin: 0,
                                wordBreak: 'break-word'
                              }}>
                                {product.name}
                              </h4>
                              {product.sku && (
                                <p style={{
                                  textAlign: 'center',
                                  color: '#666',
                                  fontSize: '0.8rem',
                                  margin: '6px 0 0 0'
                                }}>
                                  SKU: {product.sku}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
          
          {filteredProducts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <h3 style={{ color: '#666', marginBottom: '10px' }}>No Products Found</h3>
              <p style={{ color: '#999' }}>
                {selectedSolution === "all" 
                  ? "No products are currently available. Please check back soon."
                  : `No products found in the ${selectedSolution} category.`
                }
              </p>
              {selectedSolution !== "all" && (
                <Button
                  variant="outline-primary"
                  onClick={() => setSelectedSolution("all")}
                  style={{
                    marginTop: '15px',
                    borderRadius: '25px',
                    padding: '8px 20px',
                    border: '2px solid #e61919',
                    color: '#e61919',
                    backgroundColor: 'transparent'
                  }}
                >
                  View All Products
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
      <MainFooter />
    </Layout>)
  );
};

export default Products;
