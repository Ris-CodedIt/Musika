import React from "react";
import ProductSpecs from "../components/product_specs";
import SingleReview from "../components/single_review";

const ProductLandingPage = () => {
  return (
    <div className="main">
      <div className="container product-landing-page">
        <div className="pl-product-name">Product Name</div>
        <div className="pl-image-and-specs">
          <div className="pl-product-image"> Image</div>
          <div className="pl-product-specs">
            <ProductSpecs />
          </div>
        </div>
        <div className="pl-product-reviews">
          <div className="row product-reviews-row">
            <div className="col-md-6 col-sm-10 mt-3"><SingleReview/></div>
            <div className="col-md-6 col-sm-10 mt-3"><SingleReview/></div>
            <div className="col-md-6 col-sm-10 mt-3"><SingleReview/></div>
            <div className="col-md-6 col-sm-10 mt-3"><SingleReview/></div>
            <div className="col-md-6 col-sm-10 mt-3"><SingleReview/></div>
            <div className="col-md-6 col-sm-10 mt-3"><SingleReview/></div>
            {/* <div className="no-review-text">No Product Reviews</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLandingPage;
