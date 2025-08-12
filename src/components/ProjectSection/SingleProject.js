import Link from "next/link";
import React from "react";
import { Image } from "react-bootstrap";
import { SwiperSlide } from "swiper/react";

const SingleProject = ({ project = {} }) => {
  const { image, title, category } = project;

  return (
    (<SwiperSlide>
      <div className="project-seven__item">
        <Image
          src={
            require(`@/images/update-01-10-2021/project/${image}`).default.src
          }
          alt=""
        />
        <div className="project-seven__content">
          <Link href="/portfolio-single" className="project-seven__link" legacyBehavior>
            <i className="flaticon-right-arrow"></i>
          </Link>
          <p className="project-seven__category">{category}</p>
          <h3 className="project-seven__title">
            <Link href="/portfolio-single" legacyBehavior>{title}</Link>
          </h3>
        </div>
      </div>
    </SwiperSlide>)
  );
};

export default SingleProject;
