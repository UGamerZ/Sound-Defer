import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { sliderImgLinks } from "@/config/slider-img-links";

const Slider = () => {
  return (
    <Swiper
      slidesPerView={3}
      modules={[Autoplay]}
      loop={true}
      autoplay={{ disableOnInteraction: false }}
    >
      {sliderImgLinks.map((link, index) => (
        <SwiperSlide key={index}>
          <img src={link} alt="artist" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
