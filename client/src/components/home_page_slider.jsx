import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation,Pagination,A11y,EffectFade,Autoplay,} from "swiper/modules";
import "swiper/css/bundle";

function HomePageSlider() {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, A11y, EffectFade, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      effect="fade"
      autoplay={{"delay": 2500,"disableOnInteraction": false}}
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <div className="home-slider">
          <img src="/static/plot.jpg" alt="promo image" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="home-slider">
          <img src="/static/plot.jpg" alt="promo image" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="home-slider">
          <img src="/static/plot.jpg" alt="promo image" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="home-slider">
          <img src="/static/plot.jpg" alt="promo image" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default HomePageSlider;

// function HomePageSlider() {
//   return (
//       <div className="home-slider">
//         <img src="/static/plot.jpg" alt="promo image"/>
//       </div>
//   );
// }

// export default HomePageSlider;
