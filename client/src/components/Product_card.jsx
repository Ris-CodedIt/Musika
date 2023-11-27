import React from 'react'

const ProductCard = () => {
  return (
    <div className="col-md-3 col-sm-10 mx-auto my-3 product-card">
          <div className="product-image-div"></div>
          <div className="product-details-div">

            <div className="product-details-sub-section">
              <div className="product-tilte">Title</div>
              <div className="product-rating">5*</div>
            </div>

            <div className="product-details-sub-section">
              <div className="product-price">$0.00</div>
              <button className="add-to-cart-btn">Add to cart</button>
            </div>

          </div>
    </div>
  )
}

export default ProductCard