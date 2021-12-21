import React from "react";
import HeroHome from "../components/HeroHome";
import Service from "../components/Service";
import Contact from "../components/Contact";
import FeaturedProducts from "../components/FeaturedProducts";

const HomePage = () => {
  return <div>
    <HeroHome />
    <FeaturedProducts />
    <Service />
    <Contact />
  </div>;
};

export default HomePage;
