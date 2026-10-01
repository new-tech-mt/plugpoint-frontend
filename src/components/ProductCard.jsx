import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Zap,
  ArrowRight,
  Star,
} from "lucide-react";

function ProductCard({
  product,
  onAddToCart,
  onBuyNow,
}) {
  if (!product) return null;

  const price = Number(product.price || 0);
  const oldPrice = Number(product.oldPrice || 0);

  return (
    <article className="product-card">
      <Link
        to={`/products/${product._id}`}
        className="product-image-link"
        aria-label={`View ${product.name}`}
      >
        <div className="product-image">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
            />
          ) : (
            <div className="product-image-placeholder">
              <span>? PlugPoint</span>
              <small>Product Image</small>
            </div>
          )}

          {product.badge && (
            <span className="product-badge">
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      <div className="product-content">
        <span className="product-category">
          {product.category || "Tech Accessory"}
        </span>

        <Link
          to={`/products/${product._id}`}
          className="product-title-link"
        >
          <h3>{product.name}</h3>
        </Link>

        {product.rating > 0 && (
          <div className="product-rating">
            <Star
              size={14}
              fill="currentColor"
            />

            <span>{product.rating}</span>

            {product.reviews !== undefined && (
              <span className="review-count">
                ({product.reviews})
              </span>
            )}
          </div>
        )}

        <div className="product-bottom">
          <div className="product-price">
            <strong>
              Rs.{" "}
              {price.toLocaleString("en-PK")}
            </strong>

            {oldPrice > price && (
              <del>
                Rs.{" "}
                {oldPrice.toLocaleString("en-PK")}
              </del>
            )}
          </div>
        </div>

        <div className="product-card-actions">
          <button
            type="button"
            className="add-cart-button"
            onClick={() =>
              onAddToCart(product)
            }
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>

          <button
            type="button"
            className="buy-now-button"
            onClick={() =>
              onBuyNow(product)
            }
          >
            <Zap size={16} />
            Buy Now
          </button>
        </div>

        <Link
          to={`/products/${product._id}`}
          className="product-details-link"
        >
          <span>View Details</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
