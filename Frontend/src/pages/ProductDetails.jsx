import "../styles/productdetails.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faStar,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { motion } from "framer-motion";
import { Footer } from "../landingPage/Footer";
import { useCartCustom } from "../hooks/cartCustom";
import { theme } from "../config/theme";

const MotionDiv = motion.div;

export const ProductDetails = ({ category }) => {
  const { id } = useParams();
  const product = useSelector((state) => state.fetchData.data);
  // MongoDB returns flat array, filter by category
  const products = product.length > 0
    ? product.filter(p => p.category === category)
    : [];

  const [quantity, setQuantity] = useState(1);
  const { addToCart, handleSizeClick } = useCartCustom();

  return (
    <>
      <MotionDiv
        id="product_details_page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background: theme.colors.background,
          minHeight: "100vh",
        }}
      >
        {products.map((product) => {
          if (product.id === id) {
            return (
              <MotionDiv
                key={product.id}
                id="product_details_page_container"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="product_details_img">
                  {[1, 2, 3, 4].map((_, index) => (
                    <MotionDiv
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: theme.borderRadius.lg,
                          boxShadow: theme.shadows.md,
                        }}
                        src={product.image}
                        alt="Product"
                      />
                    </MotionDiv>
                  ))}
                </div>
                <div>
                  <p
                    className="product_details_brand"
                    style={{
                      color: theme.colors.text.primary,
                      fontSize: "2rem",
                      fontWeight: "bold",
                    }}
                  >
                    {product.brand}
                  </p>
                  <div
                    className="product_details_features"
                    style={{
                      color: theme.colors.text.secondary,
                    }}
                  >
                    <p>{product.features.material}</p>
                    <p>{product.features.fit}</p>
                    <p>{product.features.size}</p>
                    <p>{product.features.color}</p>
                    <p>{product.features.sleeve_type}</p>
                  </div>
                  <p
                    className="product_details_first_one"
                    style={{
                      color: theme.colors.text.secondary,
                    }}
                  >
                    <strong style={{ color: theme.colors.warning }}>
                      <FontAwesomeIcon icon={faStar} />
                    </strong>{" "}
                    Be the first one to rate
                  </p>
                  <p
                    className="product_details_price"
                    style={{
                      color: theme.colors.primary,
                      fontSize: "2rem",
                      fontWeight: "bold",
                    }}
                  >
                    ${product.price}
                  </p>

                  <div>
                    <p
                      className="navbar_mens_size_cards_title product_details_size_heading"
                      style={{
                        color: theme.colors.text.primary,
                        fontWeight: "600",
                      }}
                    >
                      SELECT SIZE
                    </p>
                    <div className="navbar_mens_size_cards">
                      {["XS", "S", "M", "L", "XL", "XXL", "2XL"].map(
                        (size) => (
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
                        )
                      )}
                    </div>
                  </div>

                  <div className="product_details_quantity">
                    <p
                      style={{
                        color: theme.colors.text.primary,
                        fontWeight: "600",
                      }}
                    >
                      QUANTITY
                    </p>
                    <div className="product_details_quantity_counter">
                      <MotionDiv
                        as="p"
                        onClick={() => {
                          quantity > 1 && setQuantity((prev) => prev - 1);
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                          cursor: "pointer",
                          color: theme.colors.primary,
                        }}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </MotionDiv>
                      <p style={{ color: theme.colors.text.primary }}>
                        {quantity}
                      </p>
                      <MotionDiv
                        as="p"
                        onClick={() => setQuantity((prev) => prev + 1)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                          cursor: "pointer",
                          color: theme.colors.primary,
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </MotionDiv>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "1vh 0 2vh 0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: theme.colors.text.secondary,
                      }}
                    >
                      <p style={{ color: theme.colors.primary }}>
                        <FontAwesomeIcon icon={faTruck} />
                      </p>
                      <div style={{ fontSize: "0.9rem", marginLeft: "1vw" }}>
                        <p>Enter your pincode for</p>
                        <p style={{ fontWeight: "bold" }}>
                          estimated delivery timelines
                        </p>
                      </div>
                    </div>
                    <p>
                      <input
                        style={{
                          width: "7vw",
                          padding: "0.5vh 0.5vw",
                          borderRadius: theme.borderRadius.md,
                          border: `2px solid ${theme.colors.border.main}`,
                          outline: "none",
                        }}
                        type="number"
                        placeholder="Pincode"
                      />
                    </p>
                  </div>
                  <hr
                    style={{
                      border: `1px solid ${theme.colors.border.light}`,
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      margin: "2vh 0 4vh 0",
                    }}
                  >
                    <MotionDiv
                      as="p"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: theme.shadows.md,
                      }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: "2vh 3vw",
                        border: `2px solid ${theme.colors.primary}`,
                        fontSize: "0.9rem",
                        borderRadius: theme.borderRadius.full,
                        cursor: "pointer",
                        color: theme.colors.primary,
                        transition: theme.transitions.normal,
                      }}
                    >
                      ADD TO WISHLIST
                    </MotionDiv>
                    <MotionDiv
                      as="p"
                      onClick={() => {
                        addToCart(product, category);
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: theme.shadows.lg,
                      }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: "2vh 4vw",
                        border: "none",
                        fontSize: "0.9rem",
                        borderRadius: theme.borderRadius.full,
                        background: theme.colors.gradient.primary,
                        color: "white",
                        cursor: "pointer",
                        transition: theme.transitions.normal,
                      }}
                    >
                      ADD TO BAG
                    </MotionDiv>
                  </div>

                  <hr
                    style={{
                      border: `1px solid ${theme.colors.border.light}`,
                    }}
                  />

                  <div className="product_details_description">
                    <p
                      className="product_details_description_heading"
                      style={{
                        color: theme.colors.text.primary,
                        fontWeight: "bold",
                      }}
                    >
                      MATERIAL & FIT
                    </p>
                    <div
                      className="product_details_description_details"
                      style={{
                        color: theme.colors.text.secondary,
                      }}
                    >
                      <p>
                        <FontAwesomeIcon icon={faMinus} /> &nbsp;Product Type:{" "}
                        {product.title}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faMinus} /> &nbsp;Pattern: Solid
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faMinus} />
                        &nbsp; Sleeves: {product.features.sleeve_type}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faMinus} />
                        &nbsp; Color: {product.features.color}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faMinus} />
                        &nbsp; Brand: {product.brand}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faMinus} /> &nbsp;Fit:{" "}
                        {product.features.fit}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faMinus} /> &nbsp;Product
                        material: {product.features.material}
                      </p>
                    </div>
                    <p
                      className="product_details_description_desc"
                      style={{
                        color: theme.colors.text.secondary,
                        lineHeight: "1.6",
                      }}
                    >
                      From beach days to pool parties, these fits have you
                      covered. The T-shirt has a crew neck, half sleeves, a
                      chest pocket and a comfort fit with dynamic prints.
                      Crafted in a high-quality knit material that offers
                      exceptional breathability and comfort.
                    </p>
                  </div>

                  <div className="product_details_product_details">
                    {[
                      "FABRIC CARE",
                      "DELIVER AND RETURNS",
                      "DETAILS",
                      "REVIEWS",
                    ].map((item) => (
                      <MotionDiv
                        key={item}
                        as="div"
                        whileHover={{
                          backgroundColor: theme.colors.background,
                        }}
                        style={{
                          cursor: "pointer",
                          padding: "1rem",
                          borderRadius: theme.borderRadius.md,
                          transition: theme.transitions.normal,
                          color: theme.colors.text.primary,
                        }}
                      >
                        <p>{item}</p>
                        <p>
                          <FontAwesomeIcon icon={faPlus} />
                        </p>
                      </MotionDiv>
                    ))}
                  </div>
                </div>
              </MotionDiv>
            );
          }
        })}
      </MotionDiv>

      <Footer />
    </>
  );
};
