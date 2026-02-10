import {} from "react";
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
import { HeroVideo } from "../components/HeroVideo";
import { PromoVideo } from "../components/PromoVideo";
import { Footer } from "./Footer";

export const LandingPageComponent = () => {
  const data = useFetchdata();
  return (
    <>
      <motion.div
        id="dashboard"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {data}
        <useFetchdata />
        <HeroVideo />
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
        <DownloadPantaloons />
        <Footer />
      </motion.div>
    </>
  );
};
