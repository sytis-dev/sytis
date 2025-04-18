import Link from "next/link";
import React, { forwardRef } from "react";
import TextSplit from "../Reuseable/TextSplit";

const SlideItemThree = ({ slide = {} }, ref) => {
  const { bg, title, text, button_text, button_link, id } = slide;

  return (
    <div style={{ userSelect: "none" }} ref={ref} className="slide-item">
      <div className="round-shape-1"></div>
      <div className="round-image">
        <div
          className="image"
          style={{
            backgroundPosition: "-110px 40px",
            backgroundImage: `url(${
              require(`@/images/main-slider/${bg}`).default.src
            })`,
          }}
        ></div>
      </div>
      <div className="auto-container">
        <div className="content-box">
          <div className="content">
            <div className="inner">
              {id == 1 ? (
                <h1>
                  <TextSplit text={title} />
                </h1>
              ) : (
                <h2
                  style={{
                    fontSize: "120px",
                    fontWeight: "500",
                    lineHeight: "1.0",
                  }}
                >
                  <TextSplit text={title} />
                </h2>
              )}

              <div style={{ color: "white" }} className="text">
                {text}
              </div>
              <div className="link-box">
                <Link href={button_link}>
                  <a className="theme-btn btn-style-two">
                    <i className="btn-curve"></i>
                    <span className="btn-title">{button_text}</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(SlideItemThree);
