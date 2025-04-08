import { blogPage } from "@/data/sidebarPageContainerTwo";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import SidebarSide from "./SidebarSide";
import BlogDetails from "./BlogDetails";
import ContentSide from "./ContentSide";
import VideoModal from "../VideoModal/VideoModal";

const { videoId } = blogPage;

const SytisBlogPostPageContainer = ({
  isDetails = false,
  blogPosts = [],
  post = {},
}) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  return (
    <>
      <div className="sidebar-page-container">
        <div className="auto-container">
          <Row className="clearfix">
            <Col lg={8} md={12} sm={12} className="content-side">
              {isDetails ? (
                <div>
                  <BlogDetails post={post} blogPosts={blogPosts} />
                </div>
              ) : (
                <ContentSide handleOpen={handleOpen} />
              )}
            </Col>
            <Col lg={4} md={12} sm={12} className="sidebar-side">
              <SidebarSide post={post} blogPosts={blogPosts} />
            </Col>
          </Row>
        </div>
      </div>
      {!isDetails && (
        <VideoModal isOpen={isOpen} setOpen={setOpen} id={videoId} />
      )}
    </>
  );
};

export default SytisBlogPostPageContainer;
