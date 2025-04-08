import { contactSection } from "@/data/contactSection";
import useActive from "@/hooks/useActive";
import dynamic from "next/dynamic";
import React from "react";
import { Col, Row } from "react-bootstrap";

const MapBox = dynamic(() => import("../MapSection/MapBox"));
const FormBox = dynamic(() => import("./FormBox"));

const { title, contacts, inputs } = contactSection;

const ContactSectionForm = ({ className = "", map = false, form = false }) => {
  const ref = useActive("#contact");

  return (
    <section ref={ref} className={`contact-section ${className}`} id="contact">
      <div className="auto-container">
        {form && <FormBox inputs={inputs} />}
      </div>
    </section>
  );
};

export default ContactSectionForm;
