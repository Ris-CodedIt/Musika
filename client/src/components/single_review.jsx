 import RatingComponent from "./rating_component"

const SingleReview = () => {
  return (
    <div className="product-review-card">
        <div className="prc-top-part">
            <div className="prc-user-name">User name</div>
            <div className="prc-rating"><RatingComponent rating={4.2}/></div>
        </div>
        <div className="prc-bottom-part">
            <div className="prc-review">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo similique nam saepe impedit. Nesciunt voluptates soluta ab, tempora non voluptatum.
            </div>
        </div>
    </div>
  )
}

export default SingleReview