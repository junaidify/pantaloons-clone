import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import "../styles/cards.css";
import {
  faHeart,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../config/api";
import { useNavigate } from "react-router-dom";
import { theme } from "../config/theme";
import { Button, Box } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";

const MotionDiv = motion.div;

export const Cards = ({
  category,
  cssClass,
  headingOfTheCards,
  customClass,
}) => {
  const cards = useSelector((state) => state.fetchData.data);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Filter and limit to 8 items
  const filteredCards = cards
    ? cards.filter(item => !category || item.category === category)
    : [];

  const displayCards = filteredCards.slice(0, 8);

  // Auto-scroll logic
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isHovered || displayCards.length < 4) return;

    const scrollSpeed = 0.8; // Slower, smoother speed
    let animationId;

    const scroll = () => {
      // Logic for infinite scroll: If we scrolled past half (since we duplicated items), reset to 0
      // We need to ensure content width is sufficient.
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 1; // Reset to near 0 to avoid jump
      } else {
        scrollContainer.scrollLeft += scrollSpeed;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, displayCards.length]);

  const handleWishlist = (productId) => {
    const item = cards.find((item) => item.id === productId);
    if (!item) return;

    const wishlistItem = {
      productId: item.id,
      title: item.title,
      category: category,
      price: item.price,
      image: item.image,
      brand: item.brand,
      rating: item.rating,
    };

    api.post(`/wishlist`, wishlistItem).catch((error) => console.error(error));
    navigate(`/navbar/${category}/${item.id}`);
  };

  // Duplicate items for infinite scroll effect
  const carouselItems = [...displayCards, ...displayCards]; // 2x

  if (!displayCards.length) return null;

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        padding: "4rem 0", // Consistent Padding
        background: "#fff",
        marginBottom: "2rem"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mens_cards_container" style={{ maxWidth: "100%", overflow: "hidden", padding: "0" }}>

        {/* Title */}
        <p
          className={`${cssClass}_cards_title ${customClass}_cards_title`}
          style={{
            color: theme.colors.text.primary,
            fontSize: "2.5rem",
            fontWeight: "800",
            marginBottom: "3rem",
            textAlign: "center",
            letterSpacing: "-0.5px"
          }}
        >
          {headingOfTheCards}
        </p>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="no-scrollbar" // Add class to hide scrollbar if CSS exists, or rely on inline
          style={{
            display: "flex",
            gap: "2rem",
            overflowX: "scroll",
            padding: "1rem 0", // remove side padding to go edge-to-edge or use container?
            width: "100%",
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE
            paddingLeft: "max(2rem, env(safe-area-inset-left))" // Start padding
          }}
        >
          {/* Hide Webkit Scrollbar via style injection or class */}
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
          `}</style>

          {carouselItems.map((item, index) => (
            <MotionDiv
              key={`${item.id}-${index}`}
              onClick={() => handleWishlist(item.id)}
              className={`${cssClass}_cards ${customClass}_cards`}
              whileHover={{ y: -10, boxShadow: theme.shadows.xl }}
              style={{
                background: theme.colors.surface,
                borderRadius: theme.borderRadius.lg,
                overflow: "hidden",
                cursor: "pointer",
                minWidth: "280px",
                maxWidth: "280px",
                flexShrink: 0,
                border: "1px solid #f0f0f0",
                transition: "all 0.3s ease"
              }}
            >
              <p className={`${cssClass}_cards_img_parent`} style={{ height: "360px", width: "100%" }}>
                <img
                  className="cards_img"
                  src={item.image}
                  alt={item.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </p>
              <Box p={5}>
                <p className={`${cssClass}_cards_brand`} style={{ fontWeight: "700", marginBottom: "0.25rem", color: theme.colors.text.primary, textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "1px" }}>{item.brand}</p>
                <div
                  className={`${cssClass}_cards_features`}
                  style={{
                    color: theme.colors.text.secondary,
                    fontSize: "1rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginBottom: "0.5rem"
                  }}
                >
                  {item.title}
                </div>
                <p className={`${cssClass}_cards_price`} style={{ fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1.2rem" }}>${item.price}</span>
                  <span style={{ color: theme.colors.success, fontSize: "0.75rem", background: "#f0fff4", padding: "4px 8px", borderRadius: "12px", border: "1px solid #c6f6d5" }}>
                    30% OFF
                  </span>
                </p>
              </Box>
            </MotionDiv>
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <Button
            rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
            variant="outline"
            size="lg"
            onClick={() => navigate(`/navbar/${category}`)}
            height="56px"
            px={8}
            borderRadius="full"
            borderColor="black"
            borderWidth="2px"
            _hover={{ bg: "black", color: "white" }}
            fontSize="0.9rem"
            fontWeight="bold"
            letterSpacing="1px"
            textTransform="uppercase"
          >
            View All {headingOfTheCards}
          </Button>
        </div>
      </div>
    </MotionDiv>
  );
};
