import { useCallback, useEffect, useMemo, useState } from "react";
import { useLandingPageProductCarousel } from "../hooks/landingPageProductCarousel";
import { motion } from "framer-motion";
import "../styles/productpage.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import api from "../config/api";
import { useNavigate } from "react-router-dom";
import { theme } from "../config/theme";

const MotionDiv = motion.div;

export const ProductCustomHook = ({
  category,
  cssClass,
  heading_of_product_page,
}) => {
  const product = useSelector((state) => state.fetchData.data);
  // MongoDB returns flat array, filter by category
  const products = product.length > 0
    ? product.filter(p => p.category === category)
    : [];
  const [filters, setFilters] = useState({
    brand: false,
    price: false,
    rating: false,
    material: "",
    color: "",
    size: "",
  });

  console.log(products && products[0]);

  const { setDisplaySlide, currentSlide } = useLandingPageProductCarousel();
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, type, checked, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleSizeClick = useCallback((size) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      size: size,
    }));
  }, []);

  const applyFilters = useCallback(() => {
    let filteredProducts = [...products];

    if (filters.brand) {
      filteredProducts = filteredProducts.sort((a, b) =>
        a.brand.localeCompare(b.brand)
      );
    }

    if (filters.material) {
      filteredProducts = filteredProducts.filter((product) =>
        product.features.material
          .toLowerCase()
          .includes(filters.material.toLowerCase())
      );
    }

    if (filters.color) {
      filteredProducts = filteredProducts.filter((product) =>
        product.features.color
          .toLowerCase()
          .includes(filters.color.toLowerCase())
      );
    }

    if (filters.size) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.features.size.toLowerCase() === filters.size.toLowerCase()
      );
    }

    if (filters.price) {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (filters.rating) {
      filteredProducts = filteredProducts.filter(
        (product) => product.rating >= 4
      );
    }

    return filteredProducts;
  }, [filters, products]);

  const sortedProducts = useMemo(() => applyFilters(), [applyFilters]);

  const handleHeartClick = (productId) => {
    const item = products.find((item) => item.id === productId);

    if (!item) {
      console.error("Product not found in products array.");
      return;
    }

    const wishlistItem = {
      productId: item.id,
      title: item.title,
      category: category,
      price: item.price,
      image: item.image,
      brand: item.brand,
      rating: item.rating,
    };

    console.log("Adding to wishlist:", wishlistItem);

    api
      .post(`/wishlist`, wishlistItem)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setDisplaySlide(20);
  }, [setDisplaySlide]);

  return (
    <MotionDiv
      id="product_page_container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: theme.colors.background,
        minHeight: "100vh",
      }}
    >
      <MotionDiv
        className="parent_of_checkbox"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: theme.colors.surface,
          borderRadius: theme.borderRadius.lg,
          padding: "1.5rem",
          boxShadow: theme.shadows.md,
        }}
      >
        <p
          className="heading_of_product_checkbox"
          style={{
            color: theme.colors.text.primary,
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          FILTER BY:
        </p>
        <div>
          <input
            onChange={handleChange}
            name="brand"
            className="product_page_checkbox"
            type="checkbox"
            id="content"
            style={{
              accentColor: theme.colors.primary,
            }}
          />
          <label
            className="product_page_checkbox_content"
            htmlFor="content"
            style={{
              color: theme.colors.text.secondary,
            }}
          >
            Brand
          </label>
        </div>
        <div>
          <input
            onChange={handleChange}
            name="price"
            className="product_page_checkbox"
            type="checkbox"
            style={{
              accentColor: theme.colors.primary,
            }}
          />
          <label
            className="product_page_checkbox_content"
            htmlFor="price"
            style={{
              color: theme.colors.text.secondary,
            }}
          >
            Price
          </label>
        </div>
        <div>
          <input
            onChange={handleChange}
            name="rating"
            className="product_page_checkbox"
            type="checkbox"
            style={{
              accentColor: theme.colors.primary,
            }}
          />
          <label
            className="product_page_checkbox_content"
            htmlFor="rating"
            style={{
              color: theme.colors.text.secondary,
            }}
          >
            Best Seller
          </label>
        </div>
        <div>
          <input
            onChange={handleChange}
            name="material"
            className="product_page_checkbox  product_page_input_filter"
            type="text"
            placeholder="Enter material"
            style={{
              borderRadius: theme.borderRadius.md,
              border: `2px solid ${theme.colors.border.light}`,
              padding: "0.5rem",
            }}
          />
        </div>
        <div>
          <input
            onChange={handleChange}
            name="color"
            className="product_page_checkbox  product_page_input_filter"
            type="text"
            placeholder="Enter color"
            style={{
              borderRadius: theme.borderRadius.md,
              border: `2px solid ${theme.colors.border.light}`,
              padding: "0.5rem",
            }}
          />
        </div>
      </MotionDiv>

      <div>
        <div className="navbar_mens_parent_of_cards_of_sizes">
          <p
            className="navbar_mens_product_heading"
            style={{
              color: theme.colors.text.primary,
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            {heading_of_product_page}
          </p>
          {category !== "home" && category !== "beauty" && (
            <>
              <p
                className="navbar_mens_size_cards_title"
                style={{
                  color: theme.colors.text.primary,
                  fontWeight: "600",
                }}
              >
                SHOP BY SIZE
              </p>
              <div className="navbar_mens_size_cards">
                {["XS", "S", "M", "L", "XL", "XXL", "2XL"].map((size) => (
                  <MotionDiv
                    key={size}
                    as="p"
                    onClick={() => handleSizeClick(size)}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: theme.colors.primary,
                      color: "white",
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      cursor: "pointer",
                      border: `2px solid ${theme.colors.border.main}`,
                      borderRadius: theme.borderRadius.md,
                      transition: theme.transitions.normal,
                    }}
                  >
                    {size}
                  </MotionDiv>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="navbar_mens_all_cards_components">
          <div className={`${cssClass}_parent_of_cards`} ref={currentSlide}>
            {sortedProducts &&
              sortedProducts.map((item, index) => (
                <MotionDiv
                  key={item.id}
                  className={`${cssClass}_cards`}
                  onClick={() => {
                    navigate(`/navbar/${category}/${item.id}`);
                  }}
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
                      className="cards_img"
                      src={item.image}
                      alt={item.title}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleHeartClick(item.id);
                    }}
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
        </div>
      </div>
    </MotionDiv>
  );
};
