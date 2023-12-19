import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";

const RatingComponent = ({rating}) => {
  if(rating===0 ){
    return (
        <div className="ps-rating-stars zero">
          <FontAwesomeIcon icon={faStar} />
        </div>
      );
    
  }
  if(rating>=0.1 && rating<=0.5){
    return (
        <div className="ps-rating-stars">
          <FontAwesomeIcon icon={faStarHalfStroke} />
        </div>
      );
    
  }
  else if(rating>=0.6 && rating<=1){
    return (
        <div className="ps-rating-stars">
          <FontAwesomeIcon icon={faStar} />
        </div>
      );
    
  }
  else if(rating>=1.1 && rating<=1.5){
    return (
        <div className="ps-rating-stars">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStarHalfStroke} />
        </div>
      );
    
  }
  else if(rating>=1.6 && rating<=2){
    return (
        <div className="ps-rating-stars">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </div>
      );
    
  }
  else if(rating>=2.1 && rating<=2.5){
    return (
        <div className="ps-rating-stars">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStarHalfStroke} />
        </div>
      );
    
  }
  else if(rating>=2.6 && rating<=3){
    return (
        <div className="ps-rating-stars">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </div>
      );
    
  }
  else if(rating>=3.1 && rating<=3.5){
    return (
        <div className="ps-rating-stars">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStarHalfStroke} />
        </div>
      );
    
  }
  else if(rating>=3.6 && rating<=4){
    return (
        <div className="ps-rating-stars">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </div>
      );
    
  }
  else if(rating>=4.1 && rating<=4.5){
    return (
        <div className="ps-rating-stars">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStarHalfStroke} />
        </div>
      );
    
  }
  else if(rating>=4.6 && rating<=5){
    return (
        <div className="ps-rating-stars">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStarHalfStroke} />
        </div>
      );
    
  }

};

export default RatingComponent;
