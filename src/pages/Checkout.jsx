import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Building2,
  Phone,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/orders`;

const SETTINGS_URL =
  `${import.meta.env.VITE_API_URL}/api/settings`;

const DEFAULT_WHATSAPP =
  "923213359177";

const defaultSettings = {
  whatsappOrderNumber:
    "03213359177",

  paymentMethods: {
    cod: true,
    easypaisa: false,
    jazzcash: false,
    bankTransfer: false,
  },

  paymentNumber: "",

  bankName: "",
  accountTitle: "",
  accountNumber: "",
  iban: "",
};

function Checkout({
  cart,
  onOrderPlaced,
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const [settings, setSettings] =
    useState(defaultSettings);

  const [selectedPayment, setSelectedPayment] =
    useState("");

  const [loadingSettings, setLoadingSettings] =
    useState(true);

  const [settingsError, setSettingsError] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(null);

  /*
    IMPORTANT:
    Keep a copy of the cart before
    App.jsx clears the original cart.
  */
  const [orderedItems, setOrderedItems] =
    useState([]);

  const [orderedTotal, setOrderedTotal] =
    useState(0);

  const [orderedCustomer, setOrderedCustomer] =
    useState(null);

  const [orderedPayment, setOrderedPayment] =
    useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoadingSettings(true);
        setSettingsError("");

        const response =
          await fetch(SETTINGS_URL);

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to load payment settings."
          );
        }

        if (!data.settings) {
          throw new Error(
            "Store payment settings are unavailable."
          );
        }

        setSettings(data.settings);
      } catch (err) {
        console.error(
          "Checkout settings error:",
          err
        );

        setSettingsError(
          "Unable to load payment methods. Please try again."
        );
      } finally {
        setLoadingSettings(false);
      }
    };

    fetchSettings();
  }, []);

  const availablePaymentMethods =
    useMemo(() => {
      const methods =
        settings.paymentMethods || {};

      const available = [];

      if (methods.cod) {
        available.push({
          value: "COD",
          label: "Cash on Delivery",
          description:
            "Pay when your order is delivered.",
          icon: <ShoppingBag size={20} />,
        });
      }

      if (methods.easypaisa) {
        available.push({
          value: "EasyPaisa",
          label: "EasyPaisa",
          description:
            "Pay using the EasyPaisa number below.",
          icon: <Phone size={20} />,
        });
      }

      if (methods.jazzcash) {
        available.push({
          value: "JazzCash",
          label: "JazzCash",
          description:
            "Pay using the JazzCash number below.",
          icon: <Phone size={20} />,
        });
      }

      if (methods.bankTransfer) {
        available.push({
          value: "Bank Transfer",
          label: "Bank Transfer",
          description:
            "Transfer the amount to our bank account.",
          icon: (
            <Building2 size={20} />
          ),
        });
      }

      return available;
    }, [settings.paymentMethods]);

  useEffect(() => {
    if (
      availablePaymentMethods.length === 0
    ) {
      setSelectedPayment("");
      return;
    }

    const currentStillAvailable =
      availablePaymentMethods.some(
        (method) =>
          method.value ===
          selectedPayment
      );

    if (!currentStillAvailable) {
      setSelectedPayment(
        availablePaymentMethods[0].value
      );
    }
  }, [
    availablePaymentMethods,
    selectedPayment,
  ]);

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const cleanPhoneNumber = (
    number
  ) => {
    const cleaned = String(
      number || ""
    )
      .replace(/\D/g, "")
      .replace(/^0/, "92");

    return cleaned || DEFAULT_WHATSAPP;
  };

  const getWhatsAppNumber = () => {
    return cleanPhoneNumber(
      settings.whatsappOrderNumber
    );
  };

  /*
    BUILD PROFESSIONAL WHATSAPP MESSAGE
  */
  const buildWhatsAppMessage = (
    order
  ) => {
    const items =
      orderedItems.length > 0
        ? orderedItems
        : order.items || [];

    const productLines = items
      .map((item, index) => {
        const product =
          item.product || item;

        const name =
          product.name ||
          item.name ||
          "Product";

        const price =
          Number(
            product.price ??
              item.price ??
              0
          );

        const quantity =
          Number(
            item.quantity || 1
          );

        const itemTotal =
          price * quantity;

        return [
          `${index + 1}. ${name}`,
          `   Qty: ${quantity}`,
          `   Price: Rs. ${price.toLocaleString(
            "en-PK"
          )}`,
          `   Subtotal: Rs. ${itemTotal.toLocaleString(
            "en-PK"
          )}`,
        ].join("\n");
      })
      .join("\n\n");

    const total =
      Number(
        order.totalAmount ??
          orderedTotal ??
          0
      );

    const customer =
      orderedCustomer || form;

    const paymentMethod =
      orderedPayment ||
      order.paymentMethod ||
      selectedPayment;

    return [
      "🛒 *NEW ORDER - PLUGPOINT*",
      "",
      `📋 *Order ID:* ${order._id}`,
      "",
      "👤 *CUSTOMER DETAILS*",
      `Name: ${customer.name}`,
      `Phone: ${customer.phone}`,
      `Address: ${customer.address}`,
      `City: ${customer.city}`,
      "",
      "📦 *ORDER DETAILS*",
      productLines || "No products found.",
      "",
      "💰 *ORDER TOTAL*",
      `Total: *Rs. ${total.toLocaleString(
        "en-PK"
      )}*`,
      "",
      `💳 *Payment Method:* ${paymentMethod}`,
      "",
      "✅ *Please confirm my order.*",
      "",
      "Thank you! ❤️",
    ].join("\n");
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setError("");

    if (cart.length === 0) {
      setError(
        "Your cart is empty."
      );
      return;
    }

    if (
      !selectedPayment ||
      !availablePaymentMethods.some(
        (method) =>
          method.value ===
          selectedPayment
      )
    ) {
      setError(
        "Please select an available payment method."
      );
      return;
    }

    try {
      setSubmitting(true);

      /*
        Save everything BEFORE App.jsx clears
        the cart.
      */
      const cartSnapshot =
        cart.map((item) => ({
          ...item,
          quantity:
            Number(item.quantity || 0),
        }));

      const customerSnapshot = {
        ...form,
      };

      const paymentSnapshot =
        selectedPayment;

      const totalSnapshot =
        cartSnapshot.reduce(
          (total, item) =>
            total +
            Number(item.price || 0) *
              Number(item.quantity || 0),
          0
        );

      const response =
        await fetch(API_URL, {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            customer:
              customerSnapshot,

            items: cartSnapshot.map(
              (item) => ({
                product:
                  item._id,
                quantity:
                  item.quantity,
              })
            ),

            paymentMethod:
              paymentSnapshot,
          }),
        });

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to place order."
        );
      }

      /*
        Store snapshots for WhatsApp.
      */
      setOrderedItems(
        cartSnapshot
      );

      setOrderedCustomer(
        customerSnapshot
      );

      setOrderedPayment(
        paymentSnapshot
      );

      setOrderedTotal(
        totalSnapshot
      );

      setSuccess(data.order);

      /*
        Now it is safe to clear the cart.
      */
      if (onOrderPlaced) {
        onOrderPlaced();
      }
    } catch (err) {
      console.error(
        "Order error:",
        err
      );

      setError(
        err.message ||
          "Unable to place order. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    if (!success) return;

    const message =
      buildWhatsAppMessage(success);

    const whatsappNumber =
      getWhatsAppNumber();

    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  if (success) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="checkout-success">
            <div className="checkout-success-icon">
              <CheckCircle2
                size={54}
              />
            </div>

            <span className="section-label">
              ORDER CONFIRMED
            </span>

            <h1>
              Thank You for Your Order!
            </h1>

            <p>
              Your order has been
              successfully placed.
            </p>

            <div className="success-order-box">
              <span>
                Order ID
              </span>

              <strong>
                {success._id}
              </strong>
            </div>

            <div className="success-order-box">
              <span>
                Payment Method
              </span>

              <strong>
                {success.paymentMethod}
              </strong>
            </div>

            <div className="success-order-box">
              <span>
                Total Amount
              </span>

              <strong>
                Rs.{" "}
                {Number(
                  success.totalAmount ||
                    orderedTotal ||
                    0
                ).toLocaleString(
                  "en-PK"
                )}
              </strong>
            </div>

            {success.paymentMethod !==
              "COD" && (
              <p className="payment-instruction">
                Please complete your
                payment using the selected
                payment method and keep
                your transaction details.
              </p>
            )}

            <div className="checkout-success-actions">
              <button
                type="button"
                className="whatsapp-order-button"
                onClick={
                  handleWhatsApp
                }
              >
                <MessageCircle
                  size={19}
                />
                Send Order on WhatsApp
              </button>

              <Link
                to="/products"
                className="primary-button"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="checkout-empty">
            <ShoppingBag
              size={48}
            />

            <span className="section-label">
              PLUGPOINT CHECKOUT
            </span>

            <h1>
              Your Cart is Empty
            </h1>

            <p>
              Add some products to your
              cart before proceeding to
              checkout.
            </p>

            <Link
              to="/products"
              className="primary-button"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <Link
          to="/cart"
          className="back-link"
        >
          <ArrowLeft size={17} />
          Back to Cart
        </Link>

        <div className="checkout-header">
          <span className="section-label">
            PLUGPOINT CHECKOUT
          </span>

          <h1>
            Complete Your Order
          </h1>

          <p>
            Enter your delivery details
            and select an available payment
            method.
          </p>
        </div>

        {error && (
          <div className="checkout-error">
            {error}
          </div>
        )}

        <div className="checkout-grid">
          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >
            <div className="checkout-card">
              <div className="checkout-card-heading">
                <div>
                  <span className="checkout-card-number">
                    01
                  </span>
                </div>

                <div>
                  <h2>
                    Delivery Information
                  </h2>

                  <p>
                    Where should we deliver
                    your order?
                  </p>
                </div>
              </div>

              <div className="checkout-fields">
                <label>
                  Full Name

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={
                      handleChange
                    }
                    placeholder="Enter your full name"
                    required
                  />
                </label>

                <label>
                  Phone Number

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={
                      handleChange
                    }
                    placeholder="03XX XXXXXXX"
                    required
                  />
                </label>

                <label>
                  Complete Address

                  <textarea
                    name="address"
                    value={
                      form.address
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="House number, street, area..."
                    rows="4"
                    required
                  />
                </label>

                <label>
                  City

                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={
                      handleChange
                    }
                    placeholder="Enter your city"
                    required
                  />
                </label>
              </div>
            </div>

            <div className="checkout-card">
              <div className="checkout-card-heading">
                <div>
                  <span className="checkout-card-number">
                    02
                  </span>
                </div>

                <div>
                  <h2>
                    Payment Method
                  </h2>

                  <p>
                    Select one of the
                    payment methods currently
                    available.
                  </p>
                </div>
              </div>

              {loadingSettings ? (
                <div className="payment-loading">
                  Loading available
                  payment methods...
                </div>
              ) : settingsError ? (
                <div className="checkout-error">
                  {settingsError}
                </div>
              ) : availablePaymentMethods.length ===
                0 ? (
                <div className="payment-unavailable">
                  <CreditCard
                    size={30}
                  />

                  <h3>
                    No Payment Method
                    Available
                  </h3>

                  <p>
                    Please contact the
                    store before placing
                    your order.
                  </p>
                </div>
              ) : (
                <>
                  <div className="payment-method-list">
                    {availablePaymentMethods.map(
                      (method) => (
                        <button
                          key={
                            method.value
                          }
                          type="button"
                          className={`payment-method ${
                            selectedPayment ===
                            method.value
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            setSelectedPayment(
                              method.value
                            )
                          }
                        >
                          <span className="payment-radio">
                            {selectedPayment ===
                              method.value && (
                              <span />
                            )}
                          </span>

                          <span className="payment-method-icon">
                            {
                              method.icon
                            }
                          </span>

                          <span className="payment-method-content">
                            <strong>
                              {
                                method.label
                              }
                            </strong>

                            <small>
                              {
                                method.description
                              }
                            </small>
                          </span>
                        </button>
                      )
                    )}
                  </div>

                  {(selectedPayment ===
                    "EasyPaisa" ||
                    selectedPayment ===
                      "JazzCash") &&
                    settings.paymentNumber && (
                      <div className="bank-payment-details">
                        <div>
                          <Phone
                            size={18}
                          />

                          <span>
                            Payment Number
                          </span>
                        </div>

                        <strong>
                          {
                            settings.paymentNumber
                          }
                        </strong>
                      </div>
                    )}

                  {(selectedPayment ===
                    "EasyPaisa" ||
                    selectedPayment ===
                      "JazzCash") &&
                    !settings.paymentNumber && (
                      <div className="payment-info-warning">
                        Payment number has not
                        been configured yet.
                        Please contact the
                        store.
                      </div>
                    )}

                  {selectedPayment ===
                    "Bank Transfer" && (
                    <div className="bank-payment-details">
                      <div>
                        <Building2
                          size={18}
                        />

                        <span>
                          Bank Transfer
                          Details
                        </span>
                      </div>

                      {settings.bankName && (
                        <p>
                          <strong>
                            Bank:
                          </strong>{" "}
                          {
                            settings.bankName
                          }
                        </p>
                      )}

                      {settings.accountTitle && (
                        <p>
                          <strong>
                            Account Title:
                          </strong>{" "}
                          {
                            settings.accountTitle
                          }
                        </p>
                      )}

                      {settings.accountNumber && (
                        <p>
                          <strong>
                            Account Number:
                          </strong>{" "}
                          {
                            settings.accountNumber
                          }
                        </p>
                      )}

                      {settings.iban && (
                        <p>
                          <strong>
                            IBAN:
                          </strong>{" "}
                          {settings.iban}
                        </p>
                      )}

                      {!settings.bankName &&
                        !settings.accountTitle &&
                        !settings.accountNumber &&
                        !settings.iban && (
                          <p>
                            Bank details have
                            not been configured
                            yet. Please contact
                            the store.
                          </p>
                        )}
                    </div>
                  )}
                </>
              )}
            </div>

            <button
              type="submit"
              className="checkout-submit-button"
              disabled={
                submitting ||
                loadingSettings ||
                availablePaymentMethods.length ===
                  0 ||
                !!settingsError
              }
            >
              <CheckCircle2
                size={19}
              />

              {submitting
                ? "Placing Order..."
                : "Place Order"}
            </button>
          </form>

          <aside className="checkout-summary">
            <div className="checkout-card">
              <div className="checkout-card-heading">
                <div>
                  <span className="checkout-card-number">
                    03
                  </span>
                </div>

                <div>
                  <h2>
                    Order Summary
                  </h2>

                  <p>
                    Review your items before
                    placing the order.
                  </p>
                </div>
              </div>

              <div className="checkout-items">
                {cart.map(
                  (item) => (
                    <div
                      className="checkout-item"
                      key={item._id}
                    >
                      <div className="checkout-item-image">
                        {item.image ? (
                          <img
                            src={
                              item.image
                            }
                            alt={
                              item.name
                            }
                          />
                        ) : (
                          <span>
                            ⚡
                          </span>
                        )}
                      </div>

                      <div className="checkout-item-info">
                        <strong>
                          {item.name}
                        </strong>

                        <span>
                          Qty:{" "}
                          {
                            item.quantity
                          }
                        </span>
                      </div>

                      <strong>
                        Rs.{" "}
                        {(
                          Number(
                            item.price ||
                              0
                          ) *
                          Number(
                            item.quantity ||
                              0
                          )
                        ).toLocaleString(
                          "en-PK"
                        )}
                      </strong>
                    </div>
                  )
                )}
              </div>

              <div className="checkout-total">
                <span>
                  Total
                </span>

                <strong>
                  Rs.{" "}
                  {subtotal.toLocaleString(
                    "en-PK"
                  )}
                </strong>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
