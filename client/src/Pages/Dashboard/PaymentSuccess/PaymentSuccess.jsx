import React from "react";
import NavFixedGap from "../../../components/gap's/NavFixedGap";
import { useParams } from "react-router-dom";
import { VscCheck } from "react-icons/vsc";

const PaymentSuccess = () => {
  const { tranId } = useParams();
  return (
    <div>
      <NavFixedGap />
      <div className="flex items-center my-16 mx-auto bg-white shadow-lg w-[500px] px-[50px] py-[30px]">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center bg-green-200 text-green-600 text-7xl w-[200px] h-[200px] rounded-full">
            <VscCheck />
          </div>
          <h1 className="text-green-600 text-5xl font-bold mt-12">Success</h1>
          <p className="text-gray-600 text-center mt-4">
            We recieved your purchase request we'll be in touch shortly!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
