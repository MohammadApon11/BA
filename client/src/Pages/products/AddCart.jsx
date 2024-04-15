import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import GetSingleProduct from "../../hooks/GetSingleProduct";
import NavFixedGap from "../../components/gap's/NavFixedGap";
import SectionWraper from "../../components/Wrapper's/SectionWraper";
import CommonHero from "../../components/Hero's/CommonHero";
import SectionGap from "../../components/gap's/SectionGap";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaCartPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineDiscount } from "react-icons/md";
import useCart from "../../hooks/PostCartData";
import GetCartDataByEmail from "../../hooks/GetCartDataByEmail";
import { UseScrollTop } from "../../hooks/useScrollTop";

const customStyles = {
  itemShapes: Star,
  activeFillColor: "#ffde37",
  inactiveFillColor: "#fff2b1",
};
const customStyles2 = {
  itemShapes: Star,
  activeFillColor: "#ffde37",
  inactiveFillColor: "gray",
};

const AddCart = () => {
  const [ratings, setRating] = useState(0);
  const { id } = useParams();
  const { product } = GetSingleProduct(id);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [targetImage, setTargetImage] = useState(null);
  const [showAllReviews, setShowALlReviews] = useState(false);
  const navgate = useNavigate();
  const {
    image,
    price,
    name,
    description,
    available_quantity,
    shop,
    regularPrice,
    brand,
    subImages,
    reviews,
    _id,
  } = product;

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please login first!",
      });
      return navgate("/login");
    }

    if (data.review === "") {
      return toast("Please type you review", {
        icon: "⚠️",
      });
    }
    const reviews = {
      ...data,
      ratings: ratings,
      email: user?.email || "anonymous@example.com",
      name: user?.displayName || "Anonymous",
      image:
        user?.photoURL ||
        "https://img.freepik.com/free-vector/mysterious-gangster-character-illustration_23-2148460670.jpg?w=740&t=st=1708429998~exp=1708430598~hmac=eab247ca0be45bdc32c66d666374b0c1d7094ebac068d3d536ff24c466fb99c4",
      createdAt: new Date().toLocaleDateString(),
    };
    axios
      .put(`${import.meta.env.VITE_API_URL}/products/${product._id}`, reviews)
      .then((res) => {
        if (res.data.success) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your review has been saved!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const { allCartData } = GetCartDataByEmail(user?.email);

  const isAlreadyAddedToCart = allCartData?.find(
    (cartData) => cartData?.productId === id
  );

  const handleAddToCart = () => {
    const cartData = {
      available_quantity,
      brand,
      image,
      name,
      price,
      shop,
      regularPrice,
      productId: _id,
      userEmail: user?.email,
      quantity: 1,
    };

    if (!user?.email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please login first!",
      });
      return navgate("/login");
    }
    if (user?.email) {
      addToCart(cartData);
    }
  };

  return (
    <SectionWraper>
      <UseScrollTop />
      <NavFixedGap />
      <CommonHero product={product} />
      <SectionGap />
      <div className="grid grid-cols-12 gap-x-4 border p-4">
        <div className="col-span-5">
          <div className="max-w-full h-[300px] relative overflow-hidden rounded-2xl">
            <img
              className="p-2 w-full h-full rounded-3xl"
              src={targetImage === null ? image : targetImage}
              alt=""
            />
          </div>
          <div className="grid grid-cols-4 mt-[40px] ml-2">
            {subImages?.map((image, index) => (
              <div className="border p-2 h-[80px]">
                <img
                  key={index}
                  className="cursor-pointer w-full h-full rounded-lg"
                  onClick={() => setTargetImage(image)}
                  src={image}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-7 text-black">
          <h4 className="text-[28px] uppercase">{name}</h4>
          <div className="border-b border-dotted pb-2">
            <div className="flex items-center gap-3">
              <Rating
                style={{ maxWidth: 80 }}
                value={product?.ratings}
                readOnly
                itemStyles={customStyles}
              />
              <span className="text-[14px] text-pink-500 py-2">
                ({`${reviews?.length} customer reviews`})
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-[15px]">
                Brand: <span className="text-pink-500">{brand}</span>
              </span>
              <span className="text-gray-400 text-[15px]">
                Shop: <span className="text-pink-500">{shop}</span>
              </span>
            </div>
          </div>
          <div className="border-b border-dotted py-3">
            <p>
              <span className="text-pink-500 font-semibold text-[28px]">
                {" "}
                Tk {price}
              </span>
              {"  "}
              <del className="text-[16px] text-gray-400">Tk {price + 20}</del>
            </p>
            <span className="flex items-center gap-1 mt-2 text-[15px]">
              <FaCheckCircle className="text-pink-500" /> In Stock: (
              {available_quantity}+ available)
            </span>
          </div>
          <div className="flex items-center gap-2 mt-[20px]">
            {isAlreadyAddedToCart ? (
              <Link
                to={"/cart"}
                className={`rounded-[24px] flex items-center justify-center gap-2 w-[400px] h-[50px]  hover:text-white ${
                  isAlreadyAddedToCart
                    ? "hover:bg-[#f90] bg-white text-black hover:text-white shadow-md"
                    : "hover:bg-pink-400 bg-pink-500"
                }`}
              >
                <FaCartPlus className="text-[20px]" />
                Go to Cart ➞
              </Link>
            ) : (
              <button
                onClick={handleAddToCart}
                className={`rounded-[24px] text-white flex items-center justify-center gap-2 w-[400px] h-[50px] hover:bg-pink-400 bg-pink-500`}
              >
                <FaCartPlus className="text-[20px]" />
                Add to cart
              </button>
            )}
          </div>
          <ul className="text-[15px] mt-[40px] flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <img
                className="w-[19px]"
                src="/icons/happy-return-new.png"
                alt=""
              />{" "}
              Free Worldwide Shipping
            </li>
            <li className="flex items-center gap-2">
              <img className="w-[18px]" src="/icons/money-hand.png" alt="" /> 30
              Days Return
            </li>
            <li className="flex items-center gap-2">
              <MdOutlineDiscount className="text-[17px]" /> Member Discount
            </li>
          </ul>
          <p className="mt-3 text-[15px]">{description}</p>
        </div>
      </div>
      <SectionGap />
      <div className="">
        <div className="bg-pink-500 flex items-center justify-center w-[140px] h-[60px] text-white text-[17px] rounded-t-md">
          Reviews ({reviews?.length})
        </div>
        <div className="grid grid-cols-12 bg-white border p-[24px] pt-[40px] text-black">
          <div className="col-span-7">
            <span className="text-[20px]">
              {reviews?.length} review For {name}
            </span>
            <div className="pb-6">
              {showAllReviews
                ? reviews?.map((item, index) => (
                    <div
                      className="flex items-center gap-4 mt-[30px]"
                      key={index}
                    >
                      <img
                        className="rounded-[50%] w-[65px] h-[65px]"
                        src={item?.image}
                        alt=""
                      />
                      <div>
                        <span>
                          {item?.name} -{" "}
                          <span className="text-[15px]">{item?.createdAt}</span>
                        </span>
                        <Rating
                          style={{ maxWidth: 80 }}
                          value={item?.ratings}
                          readOnly
                          itemStyles={customStyles}
                        />
                        <p className="mt-[10px] text-[15px]">{item?.review}</p>
                      </div>
                    </div>
                  ))
                : reviews?.map(
                    (item, index) =>
                      index <= 4 && (
                        <div
                          className="flex items-center gap-4 mt-[30px] transition-all duration-300"
                          key={index}
                        >
                          <img
                            className="rounded-[50%] w-[65px] h-[65px]"
                            src={item?.image}
                            alt=""
                          />
                          <div>
                            <span>
                              {item?.name} -{" "}
                              <span className="text-[15px]">
                                {item?.createdAt}
                              </span>
                            </span>
                            <Rating
                              style={{ maxWidth: 80 }}
                              value={item?.ratings}
                              readOnly
                              itemStyles={customStyles}
                            />
                            <p className="mt-[10px] text-[15px]">
                              {item?.review}
                            </p>
                          </div>
                        </div>
                      )
                  )}
              {reviews?.length > 5 && (
                <div className="border-t border-b text-center py-3 mt-5 text-pink-500 ">
                  <span
                    className="cursor-pointer"
                    onClick={() => setShowALlReviews(!showAllReviews)}
                  >
                    {showAllReviews ? "Show Less" : "Show All Review(s)"}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-5">
            <div className="mt-[40px] border-b text-[20px] pb-3">
              Add a review
            </div>
            <div className="mt-[50px]">
              <span className="text-[15px]">
                Your rating <span className="text-pink-500">*</span>
              </span>
              <Rating
                style={{ maxWidth: 80 }}
                value={ratings}
                onChange={setRating}
                itemStyles={customStyles2}
              />
              <form
                className="m-0 max-w-full mt-[30px]"
                onSubmit={handleSubmit(onSubmit)}
              >
                <textarea
                  className="h-[120px] w-full bg-transparent border rounded-md outline-none p-[15px]"
                  {...register("review")}
                ></textarea>
                <button className="bg-pink-500 hover:bg-pink-400">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </SectionWraper>
  );
};

export default AddCart;
