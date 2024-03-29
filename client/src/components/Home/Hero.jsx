import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SectionWraper from "../Wrapper's/SectionWraper";
import mainSlider from "../../data/MainSlider";
import { NextArrow, PrevArrow } from "../btn's/SliderBtn";
import NavigateBtn from "../btn's/NavigateBtn";

const Hero = () => {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
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
          <div className="sm:h-[400px] h-[250px]" key={slide?.id}>
            <div
              className="flex items-center h-[100%] justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${slide?.bg})` }}
            >
              <div className="w-full h-full absolute top-0 left-0 bg-black opacity-50"></div>
              {/* <img className="bg-cover content-center" src={slide.bg} alt="" /> */}
              <div className="z-[1000] flex items-center justify-center flex-col text-white">
                <h1 className="md:text-[24px] xs:text-[17px] mobile:text-[19px] text-[16px] uppercase">
                  {slide?.title1}
                </h1>
                <h1 className="md:text-[60px] xs:text-[25px] mobile:text-[35px] text-[24px] font-semibold">
                  {slide?.title2}
                </h1>
                <h1 className="md:text-[60px] xs:text-[25px] mobile:text-[35px]  text-[24px] -mt-[10px] md:-mt-[20px] font-semibold ">
                  {slide?.title3}
                </h1>
                <NavigateBtn to={"shop"}>Learn More</NavigateBtn>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
