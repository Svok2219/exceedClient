import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="bodyS">
      <div className="cardS">
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: "#F8FAF5",
            margin: "0 auto",
          }}
        >
          <i className="checkmark i">✓</i>
        </div>
        <h1 className="h1S">Success</h1>
        <p className="pS">
          We received your purchase request;
          <br /> we'll be in touch shortly!
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
