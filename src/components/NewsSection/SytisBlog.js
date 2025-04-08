import newsSection from "@/data/newsSection";
import useActive from "@/hooks/useActive";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import SingleNews from "./SingleNews";
import SYTISBlogPost from "./SytisBlogPost";

const { title, newsData } = newsSection;

const STORAGE_KEY = "blog_data";
const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000;

const SYTISBlog = ({ className = "", showTitle = true, isMore = false }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasError, setHasError] = useState(false);

  const ref = useActive("#blog");

  useEffect(() => {
    const loadBlogPosts = async () => {
      setIsFetching(true);

      try {
        // Check localStorage for cached data
        const cachedData = localStorage.getItem(STORAGE_KEY);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);

          // If cache is still valid, use it
          if (Date.now() - timestamp < CACHE_EXPIRATION_MS) {
            console.log("Using cached blogPosts");
            setBlogPosts(data);
            setIsFetching(false);
            return;
          }
        }

        console.log("Fetching blogPosts from API");
        const response = await fetch("/api/blog-posts");

        if (!response.ok) {
          throw new Error("Failed to fetch blogPosts");
        }

        const { data } = await response.json();

        if (!data) {
          throw new Error("Invalid data format");
        }

        const formattedData = data.map((post) => ({
          id: post.id.toString(),
          href: `/blog/${post.url}`,
          image: `https://store-f8ph8pgqne-1.mybigcommerce.com${post.thumbnail_path}`,
          title: post.title,
          body: post.body,
          summary: post.summary.split(" ").slice(0, 25).join(" "),
          author: post.author,
          date: new Date(post.published_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
          }),
        }));

        // Store in localStorage with timestamp
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ data: formattedData, timestamp: Date.now() })
        );

        setBlogPosts(formattedData);
      } catch (error) {
        console.error("Error loading blogPosts:", error);
        setHasError(true);
      } finally {
        setIsFetching(false);
      }
    };

    loadBlogPosts();
  }, []);

  if (hasError) {
    return <div>Sorry, there was an error loading the blogPosts.</div>;
  }

  return (
    <section ref={ref} className={`news-section ${className}`} id="blog">
      <div className="auto-container">
        {showTitle && (
          <div className="sec-title centered">
            <h2>
              {title}
              <span className="dot">.</span>
            </h2>
          </div>
        )}

        <Row className="clearfix">
          {blogPosts.slice(0, showTitle ? 3 : undefined).map((post) => (
            <SYTISBlogPost key={post.id} post={post}/>
          ))}
        </Row>
        {isMore && (
          <div className="more-box">
            <Link href="/blog">
              <a className="theme-btn btn-style-one">
                <i className="btn-curve"></i>
                <span className="btn-title">Load more post</span>
              </a>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default SYTISBlog;
