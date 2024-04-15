import React, { useEffect, useState } from "react";
import NavFixedGap from "../../../../components/gap's/NavFixedGap";
import GetCartDataByEmail from "../../../../hooks/GetCartDataByEmail";
import useAuth from "../../../../hooks/useAuth";
import SectionWraper from "../../../../components/Wrapper's/SectionWraper";
import ProgressBar from "@ramonak/react-progress-bar";
import greenBornCard from "../../../../assets/icons/borno-card.png";
import grayBornCard from "../../../../assets/icons/borno-card-gray.png";
import congressImg from "../../../../assets/icons/borno-card-congress.gif";
import { MdCheck } from "react-icons/md";
import { useUtilsContext } from "../../../../providers/UtilsProviders";
import { VscTrash } from "react-icons/vsc";
import { LuHeart, LuMinus } from "react-icons/lu";
import axios from "axios";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import AddressModal from "./AddressModal";

const CartPage = () => {
  const { user } = useAuth();
  const { allCartData } = GetCartDataByEmail(user?.email);
  const {
    cartUpdateFlag,
    updateCart,
    totalOrderPrice,
    setTotalOrderPrice,
    totalRegularPrice,
    setTotalRegularOrderPrice,
  } = useUtilsContext();
  const howMuchGetCard1 = 49 - totalOrderPrice;
  const howMuchGetCard2 = 59 - totalOrderPrice;
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedIds, setCheckedIds] = useState([]);
  const allCheckedDone = checkedIds?.length === allCartData?.length;
  const [plusLoading, setPlusLoading] = useState(false);
  const [minusLoading, setMinusLoading] = useState(false);
  const [LoadingId, setLoadingId] = useState("");

  useEffect(() => {
    const storedCheckedIds =
      JSON.parse(localStorage.getItem("checkedIds")) || [];
    setCheckedIds(storedCheckedIds);
  }, []);

  const selectedProduct = allCartData.filter((product) =>
    checkedIds.includes(product?._id)
  );

  useEffect(() => {
    if (selectedProduct && selectedProduct?.length > 0) {
      const totalPrice = selectedProduct
        .filter((product) => product.selectStatus === true)
        .reduce((prev, current) => prev + current.price * current.quantity, 0);
      setTotalOrderPrice(totalPrice);
      const totalRegularPrice = selectedProduct
        .filter((product) => product.selectStatus === true)
        .reduce(
          (prev, current) => prev + current.regularPrice * current.quantity,
          0
        );
      setTotalRegularOrderPrice(totalRegularPrice);
    }
    if (selectedProduct && selectedProduct?.length > 0) {
      const totalPrice = selectedProduct
        .filter((product) => product.selectStatus === true)
        .reduce((prev, current) => prev + current.price * current.quantity, 0);
      setTotalOrderPrice(totalPrice);
    }

    if (allCheckedDone && checkedAll) {
      setCheckedAll(true);
    }
    if (!allCheckedDone && checkedAll) setCheckedAll(false);
  }, [selectedProduct, checkedAll, checkedIds, cartUpdateFlag]);

  const handleChecked = async (id) => {
    try {
      // Update localStorage and state
      const storedCheckedIds =
        JSON.parse(localStorage.getItem("checkedIds")) || [];
      const index = storedCheckedIds.indexOf(id);
      let newCheckedIds;

      if (index !== -1) {
        newCheckedIds = storedCheckedIds.filter(
          (checkedId) => checkedId !== id
        );
      } else {
        newCheckedIds = [...storedCheckedIds, id];
      }
      localStorage.setItem("checkedIds", JSON.stringify(newCheckedIds));
      setCheckedIds(newCheckedIds);

      // Update checkedAll state based on the current state and id being checked/unchecked
      if (checkedAll && !newCheckedIds.includes(id)) {
        setCheckedAll(false); // If checkedAll was true and this item is being unchecked, set checkedAll to false
      } else if (!checkedAll && newCheckedIds.length === allCartData.length) {
        setCheckedAll(true); // If all items are checked, set checkedAll to true
      }

      // Fetch the current selectStatus of the item from the backend
      const selectStatusResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/cart/selectStatus/${id}`,
        {
          method: "GET",
          // Add any additional headers required
        }
      );

      if (!selectStatusResponse.ok) {
        throw new Error(
          "Failed to fetch selectStatus for the id from the server."
        );
      }

      const selectStatusData = await selectStatusResponse.json();
      const currentSelectStatus = selectStatusData.selectStatus;
      // Toggle selectStatus
      const newSelectStatus = !currentSelectStatus;

      // Update the selectStatus for the item on the backend
      const updateSelectStatusResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/cart/selectStatus/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers required
          },
          body: JSON.stringify({ selectStatus: newSelectStatus }),
        }
      );

      if (!updateSelectStatusResponse.ok) {
        throw new Error(
          "Failed to update selectStatus for the id on the server."
        );
      }
    } catch (error) {
      console.error("Error handling selectStatus:", error.message);
      // Handle error
    }
  };
  // handle checked all function
  const handleCheckAll = async () => {
    try {
      if (checkedAll) {
        setCheckedIds([]);
        localStorage.setItem("checkedIds", JSON.stringify([]));
      } else {
        const allIds = allCartData.map((item) => item._id);
        setCheckedIds(allIds);
        localStorage.setItem("checkedIds", JSON.stringify(allIds));
      }

      // Send a request to update selectStatus for all items on the backend
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/cart/selectStatusAll`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: allCartData.map((item) => item._id),
            selectStatus: !checkedAll, // Toggle selectStatus based on the current checkedAll value
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update selectStatus for all items on the server."
        );
      }
    } catch (error) {
      console.error("Error handling check all:", error.message);
      // Handle error
    }

    setCheckedAll(!checkedAll); // Toggle checkedAll state after processing
  };
  // delete cart single data
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${import.meta.env.VITE_API_URL}/cart/${id}`
          );
          if (response.data.deletedCount > 0) {
            updateCart();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          console.error(`Error deleting resource with ID ${id}:`, error);
          Swal.fire({
            title: "Error",
            text: "An error occurred while deleting the resource.",
            icon: "error",
          });
        }
      }
    });
  };
  // add wishlist function
  const handleAddWhislist = async (wishId) => {
    try {
      const wishlistProduct = allCartData.find(
        (product) => product?._id === wishId
      );

      // Show confirmation dialog using SweetAlert
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to add this item to your wishlist?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add it to wishlist",
      });

      // If user confirms, proceed with adding to wishlist
      if (result.isConfirmed) {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/wishlist`,
          { wishlistProduct }
        );
        if (response.status === 201) {
          // Show success message using SweetAlert
          await Swal.fire({
            title: "Added to Wishlist!",
            text: "Your item has been added to the wishlist.",
            icon: "success",
          });

          // If added to wishlist successfully, delete from cart
          const deleteResponse = await axios.delete(
            `${import.meta.env.VITE_API_URL}/cart/${wishId}`
          );
          if (deleteResponse.data.deletedCount > 0) {
            updateCart();
          }
        }
      }
    } catch (error) {
      console.error(error?.response?.data?.message);
      if (
        error?.response?.data?.message === "Item already exists in the wishlist"
      ) {
        // Show error message if item already exists in the wishlist
        toast.error(error?.response?.data?.message);
      }
    }
  };

  // quantity updates
  const handleQuantityUpdate = async (productId, updateStatus) => {
    try {
      setLoadingId(productId);
      if (updateStatus === "plus") {
        setPlusLoading(true);
      }

      if (updateStatus === "minus") {
        setMinusLoading(true);
      }

      const cartResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/cartQuantity/${productId}`
      );

      updateCart();

      if (updateStatus === "minus" && cartResponse.data.quantity === 1) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Quantity is already 1. Cannot decrease further.",
          showConfirmButton: false,
          timer: 1500,
        });
        // updateCart();
        return;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/cart/quantityUpdate/${productId}`,
        { updateStatus }
      );

      if (response.status === 200) {
        updateCart();
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      if (updateStatus === "plus") {
        setPlusLoading(false);
      }
      if (updateStatus === "minus") {
        setMinusLoading(false);
      }
    }
  };
  const [addressOpen, setAddressOpen] = useState(false);
  const handleAddressOpen = () => {
    setAddressOpen(!addressOpen);
  };

  return (
    <div className="relative">
      <SectionWraper>
        <NavFixedGap />
        {allCartData.length > 0 ? (
          <div
            className={`grid lg:grid-cols-12 gap-6 xl:mt-[35px] lg:mt-[20px] md:mt-[15px]`}
          >
            <div className={`col-span-9 gap-x-9 rounded-[4px]`}>
              <div
                className={`bg-white text-black pt-[10px] shadow-md max-md:hidden block ${
                  checkedIds.length > 0 ? "block" : "hidden"
                }`}
              >
                <div
                  className={`text-center text-[15px] transition-all duration-700  overflow-hidden ${
                    totalOrderPrice >= 59 ? "h-[110px]" : "h-0"
                  }`}
                >
                  <img className="mx-auto" src={congressImg} alt="" />
                  <p className="mt-2">
                    Congratulations You'll Get 2 color card
                  </p>
                </div>
                <div className="grid grid-cols-12 p-[35px]">
                  <div className="col-span-5 grid grid-cols-12">
                    <div className="w-full col-span-2  -mt-5">
                      <img
                        className="w-[50px]"
                        src="/icons/cart-shopping.png"
                        alt=""
                      />
                      <p className="w-[100px] text-[16px] font-semibold mt-1">
                        Your Order
                      </p>
                      <p className="text-[15px]">Tk {totalOrderPrice}</p>
                    </div>
                    <ProgressBar
                      className="progress_bar col-span-10 -ml-1 transition-all duration-350"
                      barContainerClassName="container"
                      completedClassName={`${
                        totalOrderPrice >= 49 && "barCompleted"
                      }`}
                    />
                  </div>
                  <div className="col-span-7 grid grid-cols-12">
                    <div className="w-full col-span-2  -mt-5 ml-2">
                      <img
                        className="w-[50px]"
                        src={`${
                          totalOrderPrice >= 49 ? greenBornCard : grayBornCard
                        }`}
                        alt=""
                      />
                      <p className="w-[100px] text-[16px] font-semibold">
                        1 Color Card
                      </p>
                      <p className="text-[15px]">Tk 49</p>
                    </div>
                    <ProgressBar
                      className="progress_bar col-span-8 mr-1"
                      barContainerClassName="container"
                      completedClassName={`${
                        totalOrderPrice >= 59 && "barCompleted"
                      }`}
                    />
                    <div className="w-full col-span-2  -mt-5">
                      <img
                        className="w-[50px]"
                        src={`${
                          totalOrderPrice >= 59 ? greenBornCard : grayBornCard
                        }`}
                        alt=""
                      />
                      <p className="w-[100px] text-[16px] font-semibold">
                        2 Color Card
                      </p>
                      <p className="text-[15px]">Tk 59</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#e5fff2] py-[8px] text-center text-[15px] text-[#008945]">
                  {totalOrderPrice < 49 ? (
                    <>Buy only Tk {howMuchGetCard1} products and win</>
                  ) : totalOrderPrice < 59 ? (
                    <>Buy only Tk {howMuchGetCard2} products and win</>
                  ) : (
                    ""
                  )}{" "}
                  {totalOrderPrice < 49
                    ? "1 Color card"
                    : totalOrderPrice < 59
                    ? "2 Color card"
                    : "✅ You'll Get 2 color card"}
                </div>
              </div>
              <div className="bg-white p-[24px] flex items-center justify-between lg:mt-[35px] mt-[25px] text-black shadow-md">
                <div className="flex items-center gap-2  text-[15px]">
                  <div
                    className={`w-[20px] h-[20px] border-2 rounded-[4px] cursor-pointer flex items-center justify-center ${
                      checkedAll
                        ? "bg-[#17a2b8]"
                        : allCheckedDone
                        ? "bg-[#17a2b8]"
                        : "bg-white"
                    }`}
                    onClick={handleCheckAll}
                  >
                    <MdCheck
                      className={` ${
                        checkedAll
                          ? "block text-white"
                          : allCheckedDone
                          ? "block text-white"
                          : "hidden"
                      }`}
                    />
                  </div>
                  Select All ({checkedIds?.length} Items)
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="">
                    {user?.displayName}, your total:{" "}
                    <del className="text-pink-500">
                      {checkedIds.length <= 0 ? 0 : totalRegularPrice} Tk.
                    </del>{" "}
                  </span>
                  <span className="text-[#38c976] flex items-center gap-[2px]">
                    {checkedIds.length <= 0 ? 0 : totalOrderPrice}{" "}
                    <span>Tk</span>
                  </span>
                </div>
              </div>
              {/* product card */}
              <div className="mt-[35px] border bg-white">
                {allCartData?.map((item, index) => (
                  <div
                    className={`border grid md:grid-cols-12 p-6 ${
                      checkedIds.includes(item?._id) ? "bg-red-50" : "bg-white"
                    }`}
                    key={index}
                  >
                    <div className="col-span-8 flex items-center max-sm:justify-between gap-5">
                      <div
                        className={`w-[20px] h-[20px] border-2 rounded-[4px] cursor-pointer flex items-center justify-center
                  ${checkedIds.includes(item._id) ? "bg-[#17a2b8]" : "bg-white"}
                  `}
                        onClick={() => handleChecked(item?._id)}
                      >
                        <MdCheck
                          className={`${
                            checkedIds.includes(item._id)
                              ? "block text-white"
                              : "hidden"
                          }`}
                        />
                      </div>
                      <img
                        className="sm:w-[35%] w-[25%]"
                        src={item?.image}
                        alt=""
                      />
                      <div className="text-black">
                        <h6 className="text-lg">{item?.name}</h6>
                        <p className="text-[14px]">{item?.brand}</p>
                        <div className="flex items-center gap-5 mt-2">
                          <VscTrash
                            onClick={() => handleDelete(item?._id)}
                            className="hover:text-red-500 cursor-pointer text-xl"
                          />
                          <div className="flex items-center gap-1 hover:text cursor-pointer text-sm hover:text-[#4396ee]">
                            <LuHeart
                              onClick={() => handleAddWhislist(item?._id)}
                              className="text-xl"
                            />
                            Wishlist
                          </div>
                        </div>
                        <span className="text-[14px] text-red-500">
                          Only {item?.available_quantity} copies available
                        </span>
                      </div>
                    </div>
                    <div className="col-span-4 flex items-center justify-between max-md:mt-5 max-md:ml-10">
                      <div className="flex items-center text-sm">
                        <button
                          onClick={() =>
                            handleQuantityUpdate(item?._id, "minus")
                          }
                          className="bg-gray-200 text-black w-[35px] h-[33px] flex items-center justify-center cursor-pointer hover:bg-gray-200 hover:text-black mt-0"
                          disabled={
                            minusLoading && LoadingId === item?._id
                              ? true
                              : false
                          }
                        >
                          {minusLoading && LoadingId === item?._id ? (
                            <span className="animate-spin text-sm cursor-wait">
                              ↻
                            </span>
                          ) : (
                            <LuMinus />
                          )}
                        </button>
                        <span className="text-black w-[35px] h-[33px] flex items-center border-t border-b text-[14px] justify-center bg-white">
                          {item?.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityUpdate(item?._id, "plus")
                          }
                          className="bg-gray-200 text-black w-[35px] h-[33px] flex items-center justify-center cursor-pointer hover:bg-gray-200 hover:text-black mt-0"
                          disabled={
                            plusLoading && LoadingId === item?._id
                              ? true
                              : false
                          }
                        >
                          {plusLoading && LoadingId === item?._id ? (
                            <span className="animate-spin text-sm cursor-wait">
                              ↻
                            </span>
                          ) : (
                            <GoPlus />
                          )}
                        </button>
                      </div>
                      <div className="max-md:ml-3">
                        <p className="text-black">
                          {item?.quantity * item?.price} Tk.
                        </p>
                        <del className="text-pink-500">
                          {item?.quantity * item?.regularPrice} Tk.
                        </del>
                      </div>
                    </div>
                  </div>
                ))}
                {/* payment btn */}
                <div className="py-6 px-4 flex items-center justify-end">
                  <div className="">
                    <p className="text-[14px] text-gray-500">
                      Apply{" "}
                      <span className="font-semibold">
                        Promo Code or Voucher Code
                      </span>{" "}
                      on the Shipping Page
                    </p>
                    <div className="flex items-center justify-end gap-8 mt-2">
                      <button
                        className={`text-white bg-[#f5bf2c] hover:bg-[#e6b329] transition-all duration-100 py-[12px] px-6 flex items-center gap-3 rounded-sm`}
                        onClick={handleAddressOpen}
                        disabled={checkedIds.length > 0 ? false : true}
                      >
                        Place Order
                        <BsArrowRight className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-lg:hidden lg:block col-span-3 h-[270px] text-black border bg-white p-6">
              <div className="flex items-center gap-3">
                <img src="/icons/return.svg" alt="" />
                <span className="text-[14px]">Cash on Delivery Available</span>
              </div>
              <div className="flex items-center gap-3 my-5">
                <img src="/icons/replacement.svg" alt="" />
                <span className="text-[14px]">7 Days Replacement Policy</span>
              </div>
              <div className="flex items-center gap-3">
                <img src="/icons/moneyback.svg" alt="" />
                <span className="text-[14px]">100% Money Back Guarantee</span>
              </div>
              <div className="flex items-center gap-3 my-5">
                <img src="/icons/purchase.svg" alt="" />
                <span className="text-[14px]">Purchase & Earn Points</span>
              </div>
              <div className="flex items-center gap-3">
                <img src="/icons/original.svg" alt="" />
                <span className="text-[14px]">100% Original Product</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 my-12">
            <img src="/icons/icon_empty_cart.png" alt="" />
            <h1 className="text-3xl text-gray-800">Your Cart is Empty!</h1>
            <p className="text-[18px] text-gray-500 mt-2">
              Looks like you haven't made order yet.
            </p>
            <Link className="text-[#007bff] text-[16px]" to="/">
              Continue to Shopping
            </Link>
          </div>
        )}
        <Toaster />
      </SectionWraper>
      <div className={`${addressOpen ? "visible" : "invisible"}`}>
        <div className="w-full h-full bg-black absolute top-0 opacity-70"></div>
        <div className="bg-white border h-[540px] max-w-[380px] p-3 mt-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] fixed rounded-md overflow-auto  scrollbar-webkit">
          <AddressModal handleAddressOpen={handleAddressOpen} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
