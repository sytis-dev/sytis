import PageBanner from "@/components/BannerSection/PageBanner";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import React from "react";
import Head from "next/head";
import BuildDataCache from "../../utils/buildDataCache.js";
import { Col, Row } from "react-bootstrap";
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
  // Group products by their solutions (similar to how solutions page works)
  const productGroups = products.reduce((groups, product) => {
    // Try to get the solution name from categories or use "Other Products"
    const solutionName = product.categories?.[0]?.name || "Other Products";
    
    if (!groups[solutionName]) {
      groups[solutionName] = [];
    }
    groups[solutionName].push(product);
    return groups;
  }, {});

  return (
    <Layout pageTitle="Products">
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
          {Object.entries(productGroups).map(([solutionName, groupProducts]) => (
            <div key={solutionName} style={{ marginBottom: '60px' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ 
                  fontSize: '2.5rem', 
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
              
              <Row>
                {groupProducts.map((product) => (
                  <Col key={product.id} md={6} lg={4} style={{ marginBottom: '32px' }}>
                    <Link href={`/products/${product.custom_url?.url?.replace(/\//g, '') || product.id}`}>
                      <a style={{ textDecoration: 'none' }}>
                        <div
                          className="service-nine__card"
                          style={{
                            border: '2px solid #e9ebee',
                            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)',
                            borderRadius: 10,
                            cursor: 'pointer',
                            transition: 'box-shadow 0.3s, border-color 0.3s',
                            position: 'relative',
                            width: '100%',
                            overflow: 'hidden',
                            padding: 0,
                            '&:hover': {
                              borderColor: '#e61919',
                              boxShadow: '0 8px 25px 0 rgba(0,0,0,0.15)'
                            }
                          }}
                        >
                          <div style={{
                            width: '100%',
                            height: 0,
                            paddingBottom: '75%', // 4:3 aspect ratio for products
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
                              padding: '20px'
                            }}>
                              {product.all_images?.[0]?.url_standard && (
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
                              )}
                              <h4 style={{ 
                                textAlign: 'center', 
                                color: '#1a1a1a',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                lineHeight: '1.3',
                                margin: 0
                              }}>
                                {product.name}
                              </h4>
                              {product.sku && (
                                <p style={{
                                  textAlign: 'center',
                                  color: '#666',
                                  fontSize: '0.9rem',
                                  margin: '8px 0 0 0'
                                }}>
                                  SKU: {product.sku}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
          
          {products.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <h3 style={{ color: '#666', marginBottom: '10px' }}>Products Coming Soon</h3>
              <p style={{ color: '#999' }}>Our product catalog is being updated. Please check back soon.</p>
            </div>
          )}
        </div>
      </section>
      
      <MainFooter />
    </Layout>
  );
};

export default Products;
