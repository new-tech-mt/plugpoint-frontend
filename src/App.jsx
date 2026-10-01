import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  /*
    ADD PRODUCT TO CART
  */
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item._id === product._id
      );

      if (existing) {
        return currentCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  /*
    BUY NOW
    Add product to cart and go directly to checkout
  */
  const buyNow = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item._id === product._id
      );

      if (existing) {
        return currentCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    navigate("/checkout");
  };

  /*
    INCREASE QUANTITY
  */
  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  /*
    DECREASE QUANTITY
  */
  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item._id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  /*
    REMOVE PRODUCT FROM CART
  */
  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item._id !== productId
      )
    );
  };

  /*
    CLEAR CART AFTER ORDER
  */
  const clearCart = () => {
    setCart([]);
  };

  /*
    TOTAL CART ITEMS
  */
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="app">
      {/* NAVBAR */}
      <Navbar cartCount={cartCount} />

      <main>
        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <Home
                onAddToCart={addToCart}
                onBuyNow={buyNow}
              />
            }
          />

          {/* PRODUCTS */}
          <Route
            path="/products"
            element={
              <Products
                onAddToCart={addToCart}
                onBuyNow={buyNow}
              />
            }
          />

          {/* PRODUCT DETAILS */}
          <Route
            path="/products/:id"
            element={
              <ProductDetails
                onAddToCart={addToCart}
                onBuyNow={buyNow}
              />
            }
          />

          {/* CART */}
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeFromCart}
              />
            }
          />

          {/* CHECKOUT */}
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                onOrderPlaced={clearCart}
              />
            }
          />
        </Routes>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
