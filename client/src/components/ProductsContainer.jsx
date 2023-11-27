import ProductCard from "./Product_card"

const ProductsContainer = () => {
  return (
    <>
    <div className="row product-container-row m-4">
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
  
    </div>
    </>
  )
}

export default ProductsContainer