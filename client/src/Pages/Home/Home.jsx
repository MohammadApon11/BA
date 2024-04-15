import React, { useEffect, useState } from "react";
import PopularInstructor from "../../components/Home/PopularInstructor";
import World from "../../components/Home/World";
import Marque from "../../components/Home/Marquee";
import Hero from "../../components/Home/Hero";
import NavFixedGap from "../../components/gap's/NavFixedGap";
import SectionGap from "../../components/gap's/SectionGap";
import { Toaster } from "react-hot-toast";
import PopularCategories from "../../components/Home/PopularCategories";
import FlashSale from "../../components/Home/FlashSale";
import ForYou from "../../components/Home/ForYou";

const Home = () => {
  return (
    <div className="dark:bg-black">
      <NavFixedGap />
      <Marque></Marque>
      <Hero />
      <SectionGap />
      <FlashSale />
      <SectionGap />
      <PopularCategories />
      <SectionGap />
      <ForYou />
      <SectionGap />
      {/* <PopularInstructor />
      <PopularInstructor />
      <World /> */}
      <Toaster />
    </div>
  );
};

export default Home;
