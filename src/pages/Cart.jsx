import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";

function Cart({
  cart,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const subtotal = cart.reduce(
    (total, item) => total + Number(item.price || 0) * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <section className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">
            <ShoppingBag size={34} />
          </div>

          <h1>Your Cart Is Empty</h1>

          <p>
            Looks like you haven't added anything to your cart yet.
          </p>

          <Link to="/products" className="cart-shop-button">
            Shop Products
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <span className="cart-eyebrow">SHOPPING CART</span>
          <h1>Your Cart</h1>
          <p>
            Review your products before placing your order.
          </p>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => {
              const price = Number(item.price || 0);

              return (
                <article className="cart-item" key={item._id}>
                  <div className="cart-item-image">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <span>⚡</span>
                    )}
                  </div>

                  <div className="cart-item-info">
                    <span className="cart-item-category">
                      {item.category || "Tech Accessory"}
                    </span>

                    <h3>{item.name}</h3>

                    <strong>
                      Rs. {price.toLocaleString("en-PK")}
                    </strong>

                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button
                          type="button"
                          onClick={() => onDecrease(item._id)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={15} />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          onClick={() => onIncrease(item._id)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="remove-cart-item"
                        onClick={() => onRemove(item._id)}
                      >
                        <Trash2 size={15} />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-total">
                    Rs.{" "}
                    {(price * item.quantity).toLocaleString("en-PK")}
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items</span>
              <span>
                {cart.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
              </span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>
                Rs. {subtotal.toLocaleString("en-PK")}
              </strong>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Total</span>
              <strong>
                Rs. {subtotal.toLocaleString("en-PK")}
              </strong>
            </div>

            <Link to="/checkout" className="checkout-button">
              Proceed to Checkout
              <ArrowRight size={17} />
            </Link>

            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Cart;
