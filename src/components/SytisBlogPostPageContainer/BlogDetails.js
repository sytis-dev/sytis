import { blogDetails } from "@/data/sidebarPageContainerTwo";
import Link from "next/link";
import React, { Fragment } from "react";
import { Col, Image, Row } from "react-bootstrap";
import CommentBox from "./CommentBox";

const {
  image,
  date,
  admin,
  title,
  text1,
  text2,
  comments,
  tags,
  category,
  posts,
  inputs,
} = blogDetails;

const BlogDetails = ({ post = {}, blogPosts = [] }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    inputs.forEach(({ name }) => (data[name] = formData.get(name)));
    console.log(data);
  };

  post.date = new Date(post.published_date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  // Find the index of the current post
  const postIndex = blogPosts.findIndex(({ id }) => id === post.id);

  // Handle cases where there's no post before or after
  blogPosts = [
    // Get the previous post, or the last post if there is none before
    blogPosts[postIndex - 1 >= 0 ? postIndex - 1 : blogPosts.length - 1],

    // Get the next post, or the first post if there is none after
    blogPosts[postIndex + 1 < blogPosts.length ? postIndex + 1 : 0],
  ];

  return (
    <div className="blog-details">
      <div className="post-details">
        <div className="inner-box">
          {/* <div className="image-box">
            <Link href="/blog-single">
              <a>
                <Image src={`https://store-f8ph8pgqne-1.mybigcommerce.com${post.thumbnail_path}`} alt="" />
              </a>
            </Link>
          </div> */}
          <div className="lower-box">
            <div className="post-meta">
              <ul className="clearfix">
                <li>
                  <span className="far fa-clock"></span> {post.date}
                </li>
                <li>
                  <span className="far fa-user-circle"></span> {post.author}
                </li>
              </ul>
            </div>
            <h4>{post.title}</h4>
            <div className="text">
              <p dangerouslySetInnerHTML={{ __html: post.body }} />
            </div>
          </div>
        </div>
        <div className="info-row clearfix">
          <div className="tags-info">
            <strong>Tags:</strong>{" "}
            {post.tags.map((tag, i) => (
              <Fragment key={i}>
                <a href="#">{tag}</a>
                {tags.length !== i + 1 && ", "}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="post-control-two">
        <Row className="clearfix">
          {blogPosts.map((post, i) => (
            <Col key={i} md={6} sm={12} className="control-col">
              <div className="control-inner">
                <h4>
                  <a href={post.preview_url.replace("blog", "articles")}>
                    {post.title}
                  </a>
                </h4>
                <a
                  href={post.preview_url.replace("blog", "articles")}
                  className="over-link"
                ></a>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default BlogDetails;
