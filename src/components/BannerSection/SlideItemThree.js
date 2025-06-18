import Link from "next/link";
import React, { forwardRef } from "react";
import TextSplit from "../Reuseable/TextSplit";
import Image from "next/image";

const SlideItemThree = ({ slide = {} }, ref) => {
  const { bg, title, text, button_text, button_link, id, fontSize } = slide;

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
              <Link href="https://ldesconsortium.sandia.gov/">
                <a
                  className="w-[20px] sm:w-[140px] opacity-90 pointer-events-auto"
                  title="Learn more about our LDES partnership"
                >
                  <Image
                    width={300}
                    height={125}
                    src="/ldes-logo.png"
                    alt="LDES National Consortium Teaming Partner"
                    className="w-full h-auto"
                  />
                </a>
              </Link>
              {id == 1 ? (
                <h1>
                  <TextSplit fontSize={fontSize} text={title} />
                </h1>
              ) : (
                <h2
                  style={{
                    fontSize: "120px",
                    fontWeight: "500",
                    lineHeight: "1.0",
                  }}
                >
                  <TextSplit fontSize={fontSize} text={title} />
                </h2>
              )}

              <div style={{ color: "white" }} className="text">
                {text}
              </div>

              {/* Button + Logo Row */}
              <div className="link-box flex items-center gap-4 mt-8 flex-wrap">
                <Link href={button_link}>
                  <a className="theme-btn btn-style-two">
                    <i className="btn-curve"></i>
                    <span className="btn-title">{button_text}</span>
                  </a>
                </Link>
              </div>
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(SlideItemThree);
