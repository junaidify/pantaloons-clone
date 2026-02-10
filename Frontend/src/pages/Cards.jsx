import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import "../styles/cards.css";
import {
  faAngleLeft,
  faAngleRight,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLandingPageProductCarousel } from "../hooks/landingPageProductCarousel";
import api from "../config/api";
import { useNavigate } from "react-router-dom";
import { theme } from "../config/theme";

const MotionDiv = motion.div;

export const Cards = ({
  category,
  cssClass,
  headingOfTheCards,
  customClass,
}) => {
  const { currentSlide, handleNextSlide, handlePrevSlide } =
    useLandingPageProductCarousel();
  const cards = useSelector((state) => state.fetchData.data);
  const navigate = useNavigate();

  const handleWishlist = (productId) => {
    const item = cards.find((item) => item.id === productId);

    if (!item) {
      console.error("Product not found in products array.");
      return;
    }

    const wishlistItem = {
      id: item.id,
      title: item.title,
      features: item.features,
      brand: item.brand,
      price: item.price,
      image: item.image,
    };

    console.log("Adding to wishlist:", wishlistItem);

    api
      .post(`/wishlist`, {
        [category]: wishlistItem,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    navigate(`/navbar/${category}/${item.id}`);
  };

  return (
    <MotionDiv
      id={`${cssClass}_cards_container`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        padding: "2rem 0",
      }}
    >
      <p
        className={`${cssClass}_cards_title  ${customClass}_cards_title `}
        style={{
          color: theme.colors.text.primary,
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "2rem",
        }}
      >
        {headingOfTheCards}
      </p>
      <div className={`${cssClass}_cards_wrapper`}>
        <div className={`${cssClass}_parent_of_cards`} ref={currentSlide}>
          {cards &&
            cards.map((item, index) => (
              <MotionDiv
                key={item.id}
                onClick={() => handleWishlist(item.id)}
                className={`${cssClass}_cards  ${customClass}_cards`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{
                  y: -10,
                  boxShadow: theme.shadows.xl,
                }}
                style={{
                  background: theme.colors.surface,
                  borderRadius: theme.borderRadius.lg,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: theme.transitions.normal,
                }}
              >
                <p className={`${cssClass}_cards_img_parent`}>
                  <img
                    className="cards_img "
                    id={`${customClass}_cards_img`}
                    src={item.image}
                    alt={item.title}
                    style={{
                      transition: theme.transitions.normal,
                    }}
                  />
                </p>
                <p
                  className={`${cssClass}_cards_brand`}
                  style={{
                    color: theme.colors.text.primary,
                    fontWeight: "600",
                  }}
                >
                  {item.brand}
                </p>
                <div
                  className={`${cssClass}_cards_features`}
                  style={{
                    color: theme.colors.text.secondary,
                  }}
                >
                  {item.features.material}&nbsp;
                  {item.features.fit}&nbsp;
                  {item.features.size}&nbsp;
                  {item.features.color}&nbsp;
                  {item.features.sleeve_type}
                </div>
                <p
                  className={`${cssClass}_cards_price`}
                  style={{
                    color: theme.colors.primary,
                    fontWeight: "bold",
                  }}
                >
                  ${item.price}&nbsp;{" "}
                  <span
                    style={{
                      marginLeft: "1vw",
                      fontStyle: "italic",
                      color: theme.colors.success,
                    }}
                  >
                    30% OFF
                  </span>
                </p>
                <MotionDiv
                  className={`${cssClass}_cards_heart`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    color: theme.colors.secondary,
                  }}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </MotionDiv>
              </MotionDiv>
            ))}
        </div>
        <MotionDiv
          as="button"
          onClick={handlePrevSlide}
          className={`${cssClass}_cards_prev_btn`}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          style={{
            background: theme.colors.primary,
            color: "white",
            borderRadius: theme.borderRadius.full,
            transition: theme.transitions.normal,
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </MotionDiv>
        <MotionDiv
          as="button"
          onClick={handleNextSlide}
          className={`${cssClass}_cards_next_btn`}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          style={{
            background: theme.colors.primary,
            color: "white",
            borderRadius: theme.borderRadius.full,
            transition: theme.transitions.normal,
          }}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </MotionDiv>
      </div>
    </MotionDiv>
  );
};
