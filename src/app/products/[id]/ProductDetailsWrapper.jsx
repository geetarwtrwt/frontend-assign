"use client";

import { useState, useContext, useEffect } from "react";
import ProductDetails from "@/components/ProductDetails";
import RecentlyViewed from "@/components/RecentlyViewed";
import { CartContext } from "@/context/CartContext";

export default function ProductDetailsWrapper({ product }) {
  const { addToCart } = useContext(CartContext);

  const [selectedColor, setSelectedColor] = useState(
    product.variants[0]?.color
  );
  const [selectedSize, setSelectedSize] = useState(
    product.variants[0].sizes[0]
  );

  const availableSizesForColor =
    product.variants.find((e) => e.color === selectedColor)?.sizes || [];

  useEffect(() => {
    setSelectedSize("");
  }, [selectedColor]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select both color and size.");
      return;
    }
    addToCart(product, selectedColor, selectedSize);
  };

  useEffect(() => {
    if (product) {
      let viewed = JSON.parse(localStorage.getItem("recentViewdProduct")) || [];

      viewed = viewed.filter((e) => e.id !== product.id);
      viewed.unshift({
        id: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
      });
      viewed = viewed.slice(0, 3);
      localStorage.setItem("recentViewdProduct", JSON.stringify(viewed));
    }
  }, [product]);
  return (
    <>
      <ProductDetails
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        onColorSelect={setSelectedColor}
        onSizeSelect={setSelectedSize}
        onAddToCart={handleAddToCart}
        availableSizesForColor={availableSizesForColor}
      />
      <RecentlyViewed />
    </>
  );
}
