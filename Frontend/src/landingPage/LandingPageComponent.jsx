import { } from "react";
import { motion } from "framer-motion";
import "../styles/dashboard.css";
import { useFetchdata } from "../hooks/fetchData";
import { DealsOfTheDay } from "./DealsOfTheDay";
import { NewArrivals } from "./NewArrivals";
import { TrendingNow } from "./TrendingNow";
import { BestSeller } from "./BestSeller";
import { StyleFinder } from "./StyleFinder";
import { ImgContainer } from "./ImgContainer";
import { DownloadPantaloons } from "./DownloadPantaloons";
import { HeroSection } from "./HeroSection";
import { PromoVideo } from "../components/PromoVideo";
import { Footer } from "./Footer";
import { HeroVideo } from "../components/HeroVideo"; // keep original if needed, but we replaced usage. Actually just remove it if unused.

export const LandingPageComponent = () => {
  useFetchdata();
  return (
    <>
      <motion.div
        id="dashboard"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
        <DealsOfTheDay />
        <NewArrivals />
        <PromoVideo
          title="Season's Best Offers"
          description="Don't miss out on our exclusive deals!"
        />
        <TrendingNow />
        <StyleFinder />
        <BestSeller />
        <ImgContainer />
        <Footer />
      </motion.div>
    </>
  );
};
