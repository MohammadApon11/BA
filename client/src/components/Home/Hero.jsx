import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import mainSlider from "../../data/MainSlider";
import { NextArrow, PrevArrow } from "../btn's/SliderBtn";
import NavigateBtn from "../btn's/NavigateBtn";
import { Link } from "react-router-dom";

const Hero = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  console.log("window width", windowWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  return (
    <div className="max-w-[1200px] mx-auto">
      <Slider {...settings}>
        {mainSlider.map((slide) => (
          <Link
            to="/products"
            className="lg:h-[370px] md:h-[280px] sm:h-[600px] h-[450px]"
            key={slide?.id}
          >
            <img
              className="w-full h-full xl:rounded-3xl lg:hidden"
              src={windowWidth > 800 ? slide.bg1 : slide.bg2}
              alt=""
            />
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;

// <Slider {...settings}>
// {mainSlider.map((slide) => (
//   <div className="sm:h-[400px] h-[250px]" key={slide?.id}>
//     <div
//       className="flex items-center h-[100%] justify-center bg-cover bg-center"
//       style={{ backgroundImage: `url(${slide?.bg})` }}
//     >
//       <div className="w-full h-full absolute top-0 left-0 bg-black opacity-50"></div>
//       {/* <img className="bg-cover content-center" src={slide.bg} alt="" /> */}
//       <div className="z-[1000] flex items-center justify-center flex-col text-white">
//         <h1 className="md:text-[24px] xs:text-[17px] mobile:text-[19px] text-[16px] uppercase">
//           {slide?.title1}
//         </h1>
//         <h1 className="md:text-[60px] xs:text-[25px] mobile:text-[35px] text-[24px] font-semibold">
//           {slide?.title2}
//         </h1>
//         <h1 className="md:text-[60px] xs:text-[25px] mobile:text-[35px]  text-[24px] -mt-[10px] md:-mt-[20px] font-semibold ">
//           {slide?.title3}
//         </h1>
//         <NavigateBtn to={"/products"}>Shop Now</NavigateBtn>
//       </div>
//     </div>
//   </div>
// ))}
// </Slider>
