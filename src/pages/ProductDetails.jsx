import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Zap,
  Truck,
  ShieldCheck,
  MessageCircle,
  PackageOpen,
  Star,
} from "lucide-react";

const API_URL =
  "${import.meta.env.VITE_API_URL}/api/products";

const SETTINGS_URL =
  "${import.meta.env.VITE_API_URL}/api/settings";

function ProductDetails({
  onAddToCart,
  onBuyNow,
}) {
  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [whatsappNumber, setWhatsappNumber] =
    useState("923284212706");

  /*
    LOAD PRODUCT
  */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(
            `${API_URL}/${id}`
          );

        if (response.status === 404) {
          setProduct(null);
          return;
        }

        if (!response.ok) {
          throw new Error(
            "Failed to fetch product"
          );
        }

        const data =
          await response.json();

        setProduct(data);
      } catch (err) {
        console.error(
          "Product details fetch error:",
          err
        );

        setError(
          "Unable to load this product right now. Please make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  /*
    LOAD WHATSAPP NUMBER
    FROM ADMIN SETTINGS
  */
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response =
          await fetch(
            SETTINGS_URL
          );

        const data =
          await response.json();

        if (
          response.ok &&
          data.settings?.whatsappOrderNumber
        ) {
          const cleanNumber =
            data.settings.whatsappOrderNumber
              .replace(/\D/g, "")
              .replace(/^0/, "92");

          if (cleanNumber) {
            setWhatsappNumber(
              cleanNumber
            );
          }
        }
      } catch (err) {
        console.error(
          "Store settings error:",
          err
        );
      }
    };

    fetchSettings();
  }, []);

  /* LOADING */

  if (loading) {
    return (
      <div className="not-found-page">

        <div className="container">

          <div className="not-found-icon">
            <PackageOpen size={48} />
          </div>

          <span className="section-label">
            PLUGPOINT STORE
          </span>

          <h1>
            Loading Product...
          </h1>

          <p>
            Please wait while we load the
            product details.
          </p>

        </div>

      </div>
    );
  }

  /* ERROR */

  if (error) {
    return (
      <div className="not-found-page">

        <div className="container">

          <div className="not-found-icon">
            <PackageOpen size={48} />
          </div>

          <span className="section-label">
            PLUGPOINT STORE
          </span>

          <h1>
            Unable to Load Product
          </h1>

          <p>
            {error}
          </p>

          <Link
            to="/products"
            className="primary-button"
          >
            <ArrowLeft size={17} />
            Back to Products
          </Link>

        </div>

      </div>
    );
  }

  /* NOT FOUND */

  if (!product) {
    return (
      <div className="not-found-page">

        <div className="container">

          <div className="not-found-icon">
            <PackageOpen size={48} />
          </div>

          <span className="section-label">
            PLUGPOINT STORE
          </span>

          <h1>
            Product Not Found
          </h1>

          <p>
            This product is not available
            right now. Products are managed
            through the PlugPoint admin panel.
          </p>

          <Link
            to="/products"
            className="primary-button"
          >
            <ArrowLeft size={17} />
            Back to Products
          </Link>

        </div>

      </div>
    );
  }

  const price =
    Number(product.price || 0);

  const oldPrice =
    Number(product.oldPrice || 0);

  return (
    <div className="product-details-page">

      <div className="container">

        {/* BACK */}

        <Link
          to="/products"
          className="back-link"
        >
          <ArrowLeft size={17} />
          Back to Products
        </Link>


        {/* PRODUCT */}

        <div className="product-details-grid">

          {/* IMAGE */}

          <div className="product-details-image">

            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
              />
            ) : (
              <div className="product-details-placeholder">

                <span>
                  ? PlugPoint
                </span>

                <small>
                  Product Image
                </small>

              </div>
            )}

            {product.badge && (
              <span className="details-product-badge">
                {product.badge}
              </span>
            )}

          </div>


          {/* CONTENT */}

          <div className="product-details-content">

            <span className="product-category">
              {product.category ||
                "Tech Accessory"}
            </span>

            <h1>
              {product.name}
            </h1>


            {/* RATING */}

            {product.rating > 0 && (
              <div className="details-rating">

                <Star
                  size={15}
                  fill="currentColor"
                />

                <strong>
                  {product.rating}
                </strong>

                {product.reviews !==
                  undefined && (
                  <span>
                    ({product.reviews} reviews)
                  </span>
                )}

              </div>
            )}


            {/* PRICE */}

            <div className="details-price">

              <strong>
                Rs.{" "}
                {price.toLocaleString(
                  "en-PK"
                )}
              </strong>

              {oldPrice > price && (
                <del>
                  Rs.{" "}
                  {oldPrice.toLocaleString(
                    "en-PK"
                  )}
                </del>
              )}

            </div>


            {/* DESCRIPTION */}

            <p className="details-description">
              {product.description ||
                "Product details will be available soon."}
            </p>


            {/* FEATURES */}

            {Array.isArray(
              product.features
            ) &&
              product.features.length >
                0 && (
                <div className="details-features">

                  <h3>
                    Product Features
                  </h3>

                  <ul>
                    {product.features.map(
                      (
                        feature,
                        index
                      ) => (
                        <li
                          key={index}
                        >
                          {feature}
                        </li>
                      )
                    )}
                  </ul>

                </div>
              )}


            {/* ACTIONS */}

            <div className="product-details-actions">

              <button
                type="button"
                className="details-add-button"
                onClick={() =>
                  onAddToCart(
                    product
                  )
                }
              >
                <ShoppingCart
                  size={19}
                />

                Add to Cart
              </button>


              <button
                type="button"
                className="details-buy-button"
                onClick={() =>
                  onBuyNow(
                    product
                  )
                }
              >
                <Zap size={19} />

                Buy Now
              </button>

            </div>


            {/* TRUST */}

            <div className="details-trust">

              <div>

                <Truck size={20} />

                <div>

                  <strong>
                    Pakistan-Wide Delivery
                  </strong>

                  <span>
                    Delivery available
                    across Pakistan.
                  </span>

                </div>

              </div>


              <div>

                <ShieldCheck
                  size={20}
                />

                <div>

                  <strong>
                    Reliable Support
                  </strong>

                  <span>
                    Support for genuine
                    technical issues.
                  </span>

                </div>

              </div>


              <div>

                <MessageCircle
                  size={20}
                />

                <div>

                  <strong>
                    Need Help?
                  </strong>

                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Contact us on WhatsApp
                  </a>

                </div>

              </div>

            </div>


            <p className="no-return-note">
              PlugPoint does not offer
              standard returns. Genuine
              technical issues are handled
              through technical support.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;
