import { Route, Routes } from "react-router-dom";
import { LandingPageComponent } from "./landingPage/LandingPageComponent";
import { ProductDetails } from "./pages/ProductDetails";
import { MensProduct } from "./productpage/MensProduct";
import { WomenProduct } from "./productpage/WomenProduct";
import { KidsProduct } from "./productpage/KidsProduct";
import { HomeProduct } from "./productpage/HomeProduct";
import { BeautyProduct } from "./productpage/BeautyProduct";
import { Wishlist } from "./pages/Wishlist";
import { Navbar } from "./landingPage/Navbar";
import { Cart } from "./pages/Cart";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPageComponent />} />
        <Route path="/navbar/mens" element={<MensProduct />} />
        <Route
          path="/navbar/mens/:id"
          element={<ProductDetails category={"mens"} />}
        />
        <Route path="/navbar/women" element={<WomenProduct />} />
        <Route
          path="/navbar/women/:id"
          element={<ProductDetails category={"women"} />}
        />
        <Route path="/navbar/kids" element={<KidsProduct />} />
        <Route
          path="/navbar/kids/:id"
          element={<ProductDetails category={"kids"} />}
        />

        <Route path="/navbar/home" element={<HomeProduct />} />
        <Route
          path="/navbar/home/:id"
          element={<ProductDetails category={"home"} />}
        />

        <Route path="/navbar/beauty" element={<BeautyProduct />} />
        <Route
          path="/navbar/beauty/:id"
          element={<ProductDetails category={"beauty"} />}
        />
        <Route
          path="/navbar/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist
                category={"mens"}
                cssClass={"navbar_mens"}
                wishCategory={"mens"}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/navbar/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
