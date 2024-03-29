import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import GetAllDistricts from "../../../../hooks/GetAllDistricts";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import GetAllUpazilas from "../../../../hooks/GetAllUpazilas";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";

const AddressModal = ({ handleAddressOpen }) => {
  const [checkedText, setCheckedText] = useState("home");
  const { allDistricts } = GetAllDistricts();
  const { allUpazilas } = GetAllUpazilas();
  const [isOpen, setIsOpen] = useState("");
  const [districtsData, setDistrictsData] = useState(null);
  const [upazilasData, setUpazilasData] = useState(null);
  const [filterdUpazilasData, setFilterdUpazilasData] = useState([]);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [currency, setCurrency] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const { user } = useAuth();

  const handleCurrency = (currency) => {
    setCurrency(currency);
    setIsCurrencyOpen(false); // Close the currency dropdown after selecting currency
  };
  const handleAddressSet = (address, item) => {
    if (address === "districts") {
      setDistrictsData(item);
      const filteredData = allUpazilas.filter(
        (upazila) => upazila?.district_id === item?.id
      );
      setFilterdUpazilasData(filteredData);
    }
    if (address === "upazilas") {
      setUpazilasData(item);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [currencyError, setCurrencyError] = useState("");
  const [districtError, setDistrictError] = useState("");
  const [upazilaError, setUpazilaError] = useState("");
  const [textareaError, setTextareaError] = useState("");

  const onSubmit = async (data) => {
    const ids = JSON.parse(localStorage.getItem("checkedIds")) || [];

    try {
      if (districtsData === null) {
        setDistrictError("Please select a district");
        return;
      }

      if (upazilasData === null) {
        setUpazilaError("Please select a upazila");
        return;
      }

      if (currency === "") {
        setCurrencyError("Please select a currency");
        return;
      }
      if (textareaValue === "") {
        setTextareaError("Please enter you address");
        return;
      }

      const order = {
        ...data,
        userEmail: user?.email,
        recievedFrom: checkedText,
        currency,
        district: districtsData?.name,
        upazila: upazilasData?.name,
        shippingAddress: textareaValue,
        productIds: ids,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/order`,
        order
      );
      if (response?.data?.url) {
        window.location.replace(response?.data?.url);
        localStorage.removeItem("checkedIds");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".currency-dropdown") &&
        !event.target.closest(".select-dropdown")
      ) {
        setIsOpen(""); // Close all dropdowns
        setIsCurrencyOpen(false); // Close currency dropdown
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };
  return (
    <form className="my-0" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between pb-3 border-b text-[16px]">
        <span className="text-black">Shipping Info</span>
        <span
          className="underline text-[#0397d3] cursor-pointer"
          onClick={() => handleAddressOpen()}
        >
          Cancel
        </span>
      </div>
      <div className="flex items-center justify-between text-black text-[16px]">
        <div className="flex items-center gap-6">
          <span>Received From:</span>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="radio-7"
              className="radio radio-info"
              checked={checkedText === "home"}
              onChange={() => setCheckedText("home")}
            />
            Home
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="radio-7"
              className="radio radio-info"
              checked={checkedText === "office"}
              onChange={() => setCheckedText("office")}
            />
            Office
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-1/2">
          <input
            type="text"
            className="text-[#495057] placeholder:text-[#495057] text-[16px] addressInputBorder outline-none my-0"
            {...register("name", { required: true })}
            placeholder="Your Name"
          />
          {errors.orderName && (
            <span className="text-[14px] text-red-500">
              This field is required
            </span>
          )}
        </div>
        <div className="w-1/2">
          <input
            className="text-[#495057] placeholder:text-[#495057] text-[16px]addressInputBorder outline-none my-0"
            {...register("number", { required: true })}
            placeholder="Your Number"
          />{" "}
          {errors.orderName && (
            <span className="text-[14px] text-red-500">
              Thisfield is required
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-1/2">
          <div
            className="border-[#495057] border rounded-sm text-sm  h-[45px] text-[#495057] flex items-center justify-between px-3 relative cursor-pointer select-dropdown"
            onClick={() => setIsOpen(isOpen === "districts" ? "" : "districts")}
          >
            {districtsData ? districtsData.name : "Select City"}
            <MdOutlineKeyboardArrowDown className="text-xl" />
            <ul
              className={`absolute bottom-[44px] left-0 overflow-y-auto h-[300px] w-full bg-white border border-[#495057] flex flex-col gap-2 districtsModal ${
                isOpen === "districts" ? "block" : "hidden"
              }`}
            >
              <span className="bg-gray-400 p-1 text-white">Select City</span>
              {allDistricts.map((item, index) => (
                <li
                  className="pl-2 hover:bg-[#0397d3] hover:text-white text-[14px] cursor-pointer"
                  onClick={() => {
                    handleAddressSet("districts", item);
                    setIsOpen("");
                  }}
                  key={index}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          {districtError && (
            <span className="text-[14px] text-red-500">{districtError}</span>
          )}
        </div>
        <div className="w-1/2">
          <div
            className="border-[#495057] border rounded-sm text-sm h-[45px] text-[#495057] flex items-center justify-between px-3 relative select-dropdown cursor-pointer"
            onClick={() => setIsOpen(isOpen === "upazilas" ? "" : "upazilas")}
          >
            {upazilasData ? upazilasData.name : "Select Area"}{" "}
            <MdOutlineKeyboardArrowDown className="text-xl" />
            <ul
              className={`absolute -bottom-[150px] left-0 overflow-y-auto h-[150px] w-full bg-white border border-[#495057] flex flex-col gap-2 z-10 districtsModal ${
                isOpen === "upazilas" ? "block" : "hidden"
              }`}
            >
              <span className="bg-gray-400 p-1 text-white">Select Area</span>
              {districtsData
                ? filterdUpazilasData.map((item, index) => (
                    <li
                      className="pl-2 text-[14px] hover:bg-[#0397d3] hover:text-white cursor-pointer"
                      onClick={() => {
                        handleAddressSet("upazilas", item);
                        setIsOpen(""); // Close the dropdown
                      }}
                      key={index}
                    >
                      {item.name}
                    </li>
                  ))
                : allUpazilas.map((item, index) => (
                    <li
                      className="pl-2 text-[14px] hover:bg-[#0397d3] hover:text-white cursor-pointer"
                      onClick={() => {
                        handleAddressSet("upazilas", item);
                        setIsOpen(""); // Close the dropdown
                      }}
                      key={index}
                    >
                      {item.name}
                    </li>
                  ))}
            </ul>
          </div>
          {upazilaError && (
            <span className="text-[14px] text-red-500">{upazilaError}</span>
          )}
        </div>
      </div>
      <div className="my-2">
        <div
          className="border border-[#495057] rounded-sm h-10 text-[16px] text-[#495057] w-full flex items-center justify-between px-3 cursor-pointer relative currency-dropdown"
          onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
        >
          {currency ? currency : "Select Currency"}
          <MdOutlineKeyboardArrowDown className="text-xl" />
          <ul
            className={`border border-[#495057] z-20 flex flex-col bg-white absolute -right-[1px] -bottom-[101px] w-2/5 ${
              isCurrencyOpen ? "block" : "hidden"
            }`}
          >
            <li
              onClick={() => handleCurrency("BDT")}
              className="hover:bg-[#0397d3] hover:text-white pl-4 pr-5 py-1 cursor-pointer"
            >
              BDT
            </li>
            <li
              onClick={() => handleCurrency("USD")}
              className="hover:bg-[#0397d3] hover:text-white pl-4 pr-5 py-1 cursor-pointer"
            >
              USD
            </li>
            <li
              onClick={() => handleCurrency("RUPEE")}
              className="hover:bg-[#0397d3] hover:text-white pl-4 pr-5 py-1 cursor-pointer"
            >
              RUPEE
            </li>
          </ul>
        </div>
        {currencyError && (
          <span className="text-[14px] text-red-500">{currencyError}</span>
        )}
      </div>
      <div>
        <input
          type="text"
          className="text-[#495057] placeholder:text-[#495057] text-[16px] w-full addressInputBorder outline-none my-0"
          {...register("orderName", { required: true })}
          placeholder="Type Order Name (anything)"
        />
        {errors.orderName && (
          <span className="text-[14px] text-red-500">
            Order name field is required
          </span>
        )}
      </div>
      <textarea
        className="bg-white outline-none mt-5 w-full placeholder:text-[14px] px-3 py-2 text-[16px] text-[#495057] border border-[#495057] rounded-sm"
        name=""
        id=""
        placeholder="Mention the house/flat number, neighborhood name, area of contact"
        value={textareaValue}
        onChange={handleTextareaChange}
      ></textarea>
      {textareaError && (
        <span className="text-[14px] text-red-500">{textareaError}</span>
      )}
      <input
        className="bg-[#0397d3] text-white rounded-md cursor-pointer"
        type="submit"
        value="Pay"
      />
    </form>
  );
};

export default AddressModal;
