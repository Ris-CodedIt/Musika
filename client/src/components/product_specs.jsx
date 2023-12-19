import RatingComponent from "./rating_component"

const ProductSpecs = () => {
  return (
    <div className="ps-specs-container">
        <div className="ps-detail-div">
            <div className="ps-date-posted">Posted: 19/01/2023</div>
            <div className="ps-price">Price: <span>$20.76</span></div>
            
        </div>
        <div className="ps-detail-div">
             <RatingComponent rating={3.2}/>
            <div className="ps-review-count">240 reviews</div>
        </div>
        <div className="ps-descrpition-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate debitis consequatur, corrupti qui nam ipsa, eligendi mollitia sit quo assumenda voluptate? Incidunt a cum autem similique veniam aspernatur hic enim in amet qui maiores architecto nam, quia consequatur, eos quidem doloremque voluptatem dolorem corrupti fugit esse voluptatibus perspiciatis. A, tenetur.
        </div>
        <div className="ps-buttons-div">
            <button className="add-to-cart">Add to cart</button>
            <button className="add-a-review">Review</button>
        </div>
    </div>
  )
}

export default ProductSpecs