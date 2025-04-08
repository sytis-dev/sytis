import Link from "next/link";
import React from "react";
import { Col } from "react-bootstrap";
import Image from "next/image";

const SYTISBlogPost = ({ post = {} }) => {
  const { image, date, author, title, summary, href } = post;

  return (
    <Col lg={4} md={6} sm={12} className="news-block animated fadeInUp">
      <div className="inner-box">
        <div className="image-box">
          <Link href={`${href}`}>
            <a>
              {image && (
                <Image width={500} height={500} src={image} alt={title} />
              )}
            </a>
          </Link>
        </div>
        <div className="lower-box">
          <div className="post-meta">
            <ul className="clearfix">
              <li>
                <span className="far fa-clock"></span> {date}
              </li>
              <li>
                <span className="far fa-user-circle"></span> {author}
              </li>
            </ul>
          </div>
          <h5>
            <Link href={`${href}`} style={{ fontSize: "30%" }}>
              {title}
            </Link>{" "}
          </h5>
          {/* <div className="summary">{summary}</div> */}
          <div className="link-box">
            <Link href={`${href}`}>
              <a className="theme-btn">
                <span className="flaticon-next-1"></span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default SYTISBlogPost;
