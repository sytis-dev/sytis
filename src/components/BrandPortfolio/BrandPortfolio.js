import brandPortfolio from "@/data/brandPortfolio";
import Link from "next/link";
import React from "react";
import { Image } from "react-bootstrap";

const BrandPortfolio = () => {
  return (
    (<section className="brand-portfolio" id="brand-portfolio">
      {brandPortfolio.map(({ id, bg, image, title }) => (
        <div key={id} className="brand-portfolio__item">
          <div
            className="brand-portfolio__item__bg"
            style={{ backgroundImage: `url(${bg.src})` }}
          ></div>
          <div className="auto-container">
            <div className="brand-portfolio__image">
              <Image
                src={
                  require(`@/images/update-09-06-2021/brand/${image}`).default
                    .src
                }
                alt=""
              />
            </div>
            <div className="brand-portfolio__content">
              <h2 className="brand-portfolio__title">{title}</h2>
              <Link href="/portfolio-single" className="brand-portfolio__link" legacyBehavior>
                checkout some of our recent work
                <span className="flaticon-arrows-10"></span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>)
  );
};

export default BrandPortfolio;
