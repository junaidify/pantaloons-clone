import api from "../config/api";
import { useCallback, useState } from "react";

export const useCartCustom = () => {
  const [filters, setFilters] = useState({ size: "" });
  const [category, setCategory] = useState("mens");

  const addToCart = (product, category) => {
    const cartItem = {
      productId: product.id,
      title: product.title,
      category: category,
      price: product.price,
      image: product.image,
      brand: product.brand,
      quantity: 1,
    };

    api.post(`/cart`, cartItem)
      .then(response => {
        console.log('Added to cart:', response.data);
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
      });

    setCategory(category);
  };

  const handleSizeClick = useCallback((size) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      size: size,
    }));
  }, []);

  return {
    addToCart,
    handleSizeClick,
    category,
  };
};
