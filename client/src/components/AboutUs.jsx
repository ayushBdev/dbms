import React from "react";
import image from "../images/aboutimg.jpg";

const AboutUs = () => {
  return (
    <>
      <section className="container">
        <h2 className="page-heading about-heading">About Us</h2>
        <div className="about">
          <div className="hero-img">
            <img
              src={image}
              alt="hero"
            />
          </div>
          <div className="hero-content">
            <p>
            Empowering healthcare access, we prioritize your well-being. Seamlessly connect with top professionals for your needs. Our platform streamlines appointment scheduling, saving you time. Make informed decisions with comprehensive provider profiles at your fingertips. Your health journey begins here, with effortless access to quality care. Trust us to guide you towards a healthier, happier life.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
