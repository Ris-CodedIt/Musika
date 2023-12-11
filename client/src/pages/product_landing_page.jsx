import React from 'react'
import ProductSpecs from '../components/product_specs'

const ProductLandingPage = () => {
  return (
  <div className="main">
    <div className="container product-landing-page">
      <div className="pl-product-name">Product Name</div>
      <div className="pl-image-and-specs">
        <div className="pl-product-image"> Image</div>
        <div className="pl-product-specs">
           <ProductSpecs/>
        </div>
      </div>
      <div className="pl-product-reviews">
        Product Reviews
      </div>
    </div>
  </div>
  )
}

export default ProductLandingPage