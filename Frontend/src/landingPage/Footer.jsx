import "../styles/footer.css";
import footer_3 from "../images/footer_3.png";
import footer_4 from "../images/footer_4.png";
import footer_5 from "../images/footer_5.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faIntercom,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import {
  faArrowRotateLeft,
  faHeadset,
  faIndianRupee,
  faTruck,
  faWallet,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { theme } from "../config/theme";

const MotionDiv = motion.div;

export const Footer = () => {
  return (
    <>
      <MotionDiv
        id="footer_container_parent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          background: theme.colors.surfaceDark,
          color: theme.colors.text.inverse,
          paddingTop: "4rem", /* Increased padding */
          paddingBottom: "2rem",
        }}
      >
        {/* Newsletter Section - Centered */}
        <div
          id="footer_container_1"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            marginBottom: "4rem"
          }}
        >
          <div
            className="footer_container_1_heading"
            style={{
              color: theme.colors.text.inverse,
              marginBottom: "1.5rem"
            }}
          >
            <p style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem", letterSpacing: "1px" }}>GET AHEAD OF THE STYLE CURVE</p>
            <p style={{ fontSize: "0.9rem", color: theme.colors.text.disabled, letterSpacing: "0.5px" }}>SUBSCRIBE TO THE FASHION NEWSLETTER</p>
          </div>

          <div
            className="footer_container_1_input"
            style={{
              display: "flex",
              width: "100%",
              maxWidth: "500px",
              gap: "0.5rem",
              alignItems: "stretch", /* Ensure equal height */
              height: "48px" /* Fixed height */
            }}
          >
            <input
              style={{
                padding: "0 1.5rem",
                width: "100%",
                border: "none",
                fontSize: "0.9rem",
                borderRadius: theme.borderRadius.md,
                outline: "none",
                height: "100%",
                flex: 1
              }}
              type="text"
              placeholder="YOUR EMAIL ADDRESS"
            />
            <MotionDiv
              as="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: theme.colors.accent,
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
                border: "none",
                padding: "0 2rem",
                borderRadius: theme.borderRadius.md,
                height: "100%",
                whiteSpace: "nowrap",
                fontSize: "0.9rem",
                letterSpacing: "1px"
              }}
            >
              JOIN
            </MotionDiv>
          </div>

          <div className="footer_container_1_icons" style={{ marginTop: "2rem", display: "flex", gap: "2rem" }}>
            {[faFacebook, faInstagram, faX, faYoutube, faWhatsapp].map(
              (icon, index) => (
                <MotionDiv
                  key={index}
                  whileHover={{ scale: 1.2, color: theme.colors.accent }}
                  transition={{ duration: 0.2 }}
                  style={{
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    color: "rgba(255,255,255,0.7)"
                  }}
                >
                  <FontAwesomeIcon icon={icon} />
                </MotionDiv>
              )
            )}
          </div>
        </div>

        {/* Features Section - Horizontal Bulletin */}
        <div id="footer_container_2_parent" style={{ borderTop: `1px solid ${theme.colors.border.dark}`, borderBottom: `1px solid ${theme.colors.border.dark}`, backgroundColor: "rgba(255,255,255,0.02)" }}>
          <div
            id="footer_container_2"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between", /* Spread evenly */
              padding: "2rem 1rem",
              maxWidth: "1200px",
              margin: "0 auto",
              gap: "1rem"
            }}
          >
            {[
              { icon: faArrowRotateLeft, text: "EASY RETURNS" },
              { icon: faHeadset, text: "1800-180-1800" },
              { icon: faTruck, text: "FREE SHIPPING" },
              { icon: faIndianRupee, text: "CASH ON DELIVERY" },
              { icon: faWallet, text: "SECURE MONEY" },
              { icon: faIntercom, text: "FREE ALTERATIONS" },
            ].map((item, index) => (
              <MotionDiv
                key={index}
                whileHover={{ y: -5, color: theme.colors.accent }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  flex: "1 1 150px", /* Grow/Shrink */
                  justifyContent: "center"
                }}
              >
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  color: theme.colors.accent
                }}>
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <p style={{ fontSize: "0.8rem", fontWeight: "600", letterSpacing: "0.5px" }}>{item.text}</p>
              </MotionDiv>
            ))}
          </div>
        </div>

        {/* Links Grid */}
        <div
          id="footer_container_3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "3rem",
            maxWidth: "1200px",
            margin: "4rem auto",
            padding: "0 2rem",
            color: theme.colors.text.disabled,
            fontSize: "0.9rem"
          }}
        >
          {/* Columns */}
          <div>
            <p className="heading" style={{ color: "white", fontWeight: "bold", marginBottom: "1.5rem", letterSpacing: "1px" }}>WOMEN</p>
            <p>Westernwear</p>
            <p>Ethnicwear</p>
            <p>Sports & Activewear</p>
            <p>Sleepwear & Lingerie</p>
            <p>Footwear</p>
            <p>Accessories</p>
          </div>
          <div>
            <p className="heading" style={{ color: "white", fontWeight: "bold", marginBottom: "1.5rem", letterSpacing: "1px" }}>MEN</p>
            <p>Top Wear</p>
            <p>Ethnic Wear</p>
            <p>Accessories</p>
            <p>Footwear</p>
            <p>Innerwear</p>
          </div>
          <div>
            <p className="heading" style={{ color: "white", fontWeight: "bold", marginBottom: "1.5rem", letterSpacing: "1px" }}>KIDS</p>
            <p>Boys Clothing</p>
            <p>Girls Clothing</p>
            <p>Baby Clothing</p>
            <p>Toys & Accessories</p>
          </div>
          <div>
            <p className="heading" style={{ color: "white", fontWeight: "bold", marginBottom: "1.5rem", letterSpacing: "1px" }}>HOME</p>
            <p>Bath</p>
            <p>Bed</p>
            <p>Kitchenware</p>
            <p>Decor</p>
          </div>
          <div>
            <p className="heading" style={{ color: "white", fontWeight: "bold", marginBottom: "1.5rem", letterSpacing: "1px" }}>ABOUT</p>
            <p>About us</p>
            <p>Store Locator</p>
            <p>Payment Options</p>
          </div>
          <div>
            <p className="heading" style={{ color: "white", fontWeight: "bold", marginBottom: "1.5rem", letterSpacing: "1px" }}>CUSTOMER</p>
            <p>Track Order</p>
            <p>FAQ</p>
            <p>Return Policy</p>
          </div>
        </div>

        <hr style={{ border: `1px solid ${theme.colors.border.dark}`, opacity: 0.1, maxWidth: "1200px", margin: "0 auto" }} />

        <div id="footer_container_5" style={{ padding: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem", maxWidth: "1200px", margin: "0 auto", fontSize: "0.85rem", color: theme.colors.text.disabled }}>
          <div style={{ display: "flex", gap: "2rem" }}>
            <p style={{ cursor: "pointer" }}>Privacy Policy</p>
            <p style={{ cursor: "pointer" }}>Terms & Conditions</p>
          </div>

          <p>© 2024 Aditya Birla Fashion & Retail Limited. All rights reserved.</p>

          <p className="footer_container_5_img" style={{ display: "flex", gap: "1rem", opacity: 0.8 }}>
            <img style={{ height: "24px" }} src={footer_3} alt="Visa" />
            <img style={{ height: "24px" }} src={footer_4} alt="Mastercard" />
            <img style={{ height: "24px" }} src={footer_5} alt="Paypal" />
          </p>
        </div>
      </MotionDiv>
    </>
  );
};
