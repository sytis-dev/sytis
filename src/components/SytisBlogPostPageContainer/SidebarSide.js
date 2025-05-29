import { sidebar } from "@/data/sidebarPageContainerTwo";
import Link from "next/link";
import React, { Fragment } from "react";
import { Image } from "react-bootstrap";
import TextSplit from "../Reuseable/TextSplit";

const { categories, tags, comments, posts } = sidebar;

const SidebarSide = ({ blogPosts, post }) => {
  blogPosts = blogPosts.filter(({ id }) => id !== post.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get("search"));
  };

  return (
    <aside className="sidebar blog-sidebar">
      <div className="sidebar-widget recent-posts">
        <div className="widget-inner">
          {/* <div className="sidebar-title">
            <h4>{post.title}</h4>
          </div> */}

          {blogPosts.map(({ id, title, thumbnail_path, preview_url }) => (
            <div key={id} className="post">
              <a href={preview_url.replace("/blog", "/articles")}>
                {" "}
                <figure className="post-thumb">
                  <Image
                    src={`https://store-f8ph8pgqne-1.mybigcommerce.com${thumbnail_path}`}
                    alt=""
                  />
                </figure>
                <h5 className="text">
                  <a href={preview_url.replace("/blog", "/articles")}>
                    {title}
                  </a>
                </h5>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-widget popular-tags">
        <div className="widget-inner">
          <div className="sidebar-title">
            <h4>Tags</h4>
          </div>
          <div className="tags-list clearfix">
            {post.tags.map((tag, index) => (
              <Fragment key={index}>
                {tag}
                {index < post.tags.length - 1 && ", "}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarSide;
