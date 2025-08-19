// components/ProductDetails.js
import Image from "next/image";
import React from "react";
import SizeSelector from "./SizeSelector";

const ProductDetails = ({
  product,
  selectedColor,
  selectedSize,
  onColorSelect,
  onSizeSelect,
  onAddToCart,
  availableSizesForColor,
}) => {
  if (!product) {
    return <p>No Product Found</p>;
  }

  const selectedVariant = product.variants.find(
    (v) => v.color === selectedColor
  );
  console.log(selectedVariant);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Product Image */}
      <div className="md:w-1/2 flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden shadow-md">
        <Image
          src={product.imageUrl}
          alt="Product Image"
          width={500}
          height={500}
          priority
          unoptimized
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-900">
          {product.name}
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          {product.description}
        </p>
        <p className="text-5xl font-bold text-blue-600">
          ${product.price.toFixed(2)}
        </p>

        {/* Color Selector */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Color: {selectedColor}
          </h3>
          <div className="flex gap-3">
            {product.variants.map((variant) => (
              <button
                key={variant.color}
                className={`w-10 h-10 rounded-full border-2 ${
                  selectedColor === variant.color
                    ? "border-blue-500 ring-2 ring-blue-300"
                    : "border-gray-300"
                } focus:outline-none transition-all duration-200`}
                style={{ backgroundColor: variant.hex }}
                onClick={() => onColorSelect(variant.color)}
                title={variant.color}
              ></button>
            ))}
          </div>
        </div>

        {/* Size Selector */}
        <SizeSelector
          availableSizes={availableSizesForColor}
          selectedSize={selectedSize}
          onSizeSelect={onSizeSelect}
        />
        <button
          onClick={onAddToCart}
          className="w-full py-4 bg-blue-600 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring focus:ring-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
