import React, { useEffect, useState } from "react";
import PopularInstructor from "../../components/Home/PopularInstructor";
import World from "../../components/Home/World";
import Marque from "../../components/Home/Marquee";
import Hero from "../../components/Home/Hero";
import NavFixedGap from "../../components/gap's/NavFixedGap";
import SectionGap from "../../components/gap's/SectionGap";
import { Toaster } from "react-hot-toast";
import PopularCategories from "../../components/Home/PopularCategories";

const Home = () => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="dark:bg-black">
      <NavFixedGap />
      <Marque handleTheme={handleTheme}></Marque>
      <Hero />
      <SectionGap />
      <PopularCategories />
      {/* <PopularInstructor />
      <PopularInstructor />
      <World /> */}
      <Toaster />
    </div>
  );
};

export default Home;
