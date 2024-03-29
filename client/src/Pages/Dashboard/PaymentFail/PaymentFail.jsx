import React from "react";
import { useParams } from "react-router-dom";
import NavFixedGap from "../../../components/gap's/NavFixedGap";

const PaymentFail = () => {
  const { tranId } = useParams();
  return (
    <div>
      <NavFixedGap />
      Payment Fail {tranId}
    </div>
  );
};

export default PaymentFail;
