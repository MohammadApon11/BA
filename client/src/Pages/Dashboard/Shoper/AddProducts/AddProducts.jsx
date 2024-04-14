import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionWraper from "../../../../components/Wrapper's/SectionWraper";

const image_hosting_token = import.meta.env.VITE_image_hosting_token;
const AddProducts = () => {
  const options1 = [
    { value: "", text: "Available Quantity" },
    { value: "1", text: "1" },
    { value: "2", text: "2" },
    { value: "3", text: "3" },
    { value: "4", text: "4" },
    { value: "5", text: "5" },
    { value: "6", text: "6" },
    { value: "7", text: "7" },
    { value: "8", text: "8" },
    { value: "9", text: "9" },
    { value: "10", text: "10" },
    { value: "11", text: "11" },
    { value: "12", text: "12" },
    { value: "13", text: "13" },
    { value: "14", text: "14" },
    { value: "15", text: "15" },
    { value: "16", text: "16" },
    { value: "17", text: "17" },
    { value: "18", text: "18" },
    { value: "19", text: "19" },
    { value: "20", text: "20" },
  ];
  const options2 = [
    { value: "", text: "Category" },
    { value: "electronics", text: "Electronics" },
    { value: "fashion", text: "Fashion" },
    { value: "home&garden", text: "Home & Garden" },
    { value: "beauty&personalCare", text: "Beauty & Personal Care" },
    { value: "health&wellnes", text: "Health & Wellnes" },
    { value: "sports&outdoors", text: "Sports & Outdoors" },
    { value: "automotive", text: "Automotive" },
    { value: "toys&games", text: "Toys & Games" },
    { value: "books&media", text: "Books & Media" },
    { value: "food&beverages", text: "Food & Beverages" },
    { value: "officesupplies", text: "Office Supplies" },
    { value: "pets", text: "Pets" },
    { value: "jewelry&accessories", text: "Jewelry & Accessories" },
    { value: "Arts&Crafts", text: "Arts & Crafts" },
  ];
  const [selected1, setSelected1] = useState(options1[0].value);
  const [selected2, setSelected2] = useState(options1[0].value);

  const handleChange1 = (event) => {
    setSelected1(event.target.value);
  };

  const handleChange2 = (event) => {
    setSelected2(event.target.value);
  };

  // class add work here
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const image_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log("from data", data);
    const {
      available_quantity,
      brand,
      categoryId,
      description,
      name,
      price,
      ratings,
      regularPrice,
      shop,
      shopEmail,
      subImage1,
      subImage2,
      subImage3,
      subImage4,
    } = data;
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(image_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageResponse) => {
        if (imageResponse.success) {
          const image = imageResponse.data.display_url;
          const newProduct = {
            available_quantity,
            brand,
            categoryId,
            description,
            name,
            price,
            ratings,
            regularPrice,
            shop,
            shopEmail,
            reviews: [],
            sells: 0,
            subImages: [subImage1, subImage2, subImage3, subImage4],
            image,
            flashSale: false,
            forYou: false,
            status: "pending",
          };
          axiosSecure.post("/products", newProduct).then((res) => {
            if (res.data.insertedId) {
              Swal.fire("Product added", "success");
              reset();
            }
            console.log("after added class", res.data);
          });
        }
      });
  };

  return (
    <SectionWraper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-5 border-primary gap-5 rounded-lg shadow-md bg-white"
      >
        <h1 className="my-5 text-center text-3xl underline">Upload Product</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-3 rounded-lg text-gray-600">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Type here"
              className="outline-none w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Product Image</span>
            </label>
            <input
              {...register("image", { required: true })}
              type="file"
              className="w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Product Sub Image 1</span>
            </label>
            <input
              placeholder="Type url"
              {...register("subImage1")}
              className="w-full max-w-xs outline-none"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Product Sub Image 2</span>
            </label>
            <input
              placeholder="Type url"
              {...register("subImage2")}
              className="w-full max-w-xs outline-none"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Product Sub Image 3</span>
            </label>
            <input
              placeholder="Type url"
              {...register("subImage3")}
              className="w-full max-w-xs outline-none"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Product Sub Image 4</span>
            </label>
            <input
              placeholder="Type url"
              {...register("subImage4")}
              className="w-full max-w-xs outline-none"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Shop Name</span>
            </label>
            <input
              {...register("shop")}
              type="text"
              defaultValue={user?.displayName}
              readOnly
              placeholder="Type here"
              className="outline-none w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Shop Email</span>
            </label>
            <input
              {...register("shopEmail")}
              defaultValue={user?.email}
              readOnly
              type="text"
              placeholder="Type here"
              className="outline-none w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Available Quantity</span>
            </label>
            <select
              {...register("available_quantity", { required: true })}
              className="outline-none w-full max-w-xs"
              value={selected1}
              onChange={handleChange1}
            >
              {options1.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Available Category</span>
            </label>
            <select
              {...register("categoryId", { required: true })}
              className="outline-none w-full max-w-xs"
              value={selected2}
              onChange={handleChange2}
            >
              {options2.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Regular Price</span>
            </label>
            <input
              {...register("regularPrice", { required: true })}
              type="text"
              placeholder="Type here"
              className="outline-none w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Offer Price</span>
            </label>
            <input
              {...register("price", { required: true })}
              type="text"
              placeholder="Type here"
              className="outline-none w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Ratings</span>
            </label>
            <input
              {...register("ratings", { required: true })}
              type="number"
              placeholder="Type here"
              className="outline-none w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Brand Name</span>
            </label>
            <input
              {...register("brand", { required: true })}
              type="text"
              placeholder="Type here"
              className="outline-none w-full max-w-xs"
            />
          </div>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Product Details</span>
          </label>
          <textarea
            {...register("description", { required: true })}
            type="text"
            placeholder="Type here"
            className="outline-none bg-white border p-3 w-full text-gray-600"
          />
        </div>
        <div className="text-center mt-5">
          <button type="submit" className="btn btn-primary w-1/2">
            ADD Product
          </button>
        </div>
      </form>{" "}
    </SectionWraper>
  );
};

export default AddProducts;
