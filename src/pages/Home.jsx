import { useEffect, useState } from "react";

import {
  ArrowRight,
  ChevronRight,
  Headphones,
  ShieldCheck,
  Truck,
  MessageCircle,
  Zap,
  Star,
} from "lucide-react";

import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";

const API_URL =
  "${import.meta.env.VITE_API_URL}/api/products";

const SETTINGS_URL =
  "${import.meta.env.VITE_API_URL}/api/settings";

const categories = [
  {
    title: "Earbuds",
    subtitle: "Wireless Audio",
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Cables",
    subtitle: "Fast Charging",
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Chargers",
    subtitle: "Power Essentials",
    image:
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Accessories",
    subtitle: "Smart Gadgets",
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=85",
  },
];

function Home({
  onAddToCart,
  onBuyNow,
}) {
  const [latestProducts, setLatestProducts] =
    useState([]);

  const [loadingProducts, setLoadingProducts] =
    useState(true);

  const [productsError, setProductsError] =
    useState("");

  const [whatsappNumber, setWhatsappNumber] =
    useState("923284212706");

  /*
    LOAD LATEST PRODUCTS
  */
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        setLoadingProducts(true);
        setProductsError("");

        const response =
          await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            "Failed to fetch products."
          );
        }

        const data =
          await response.json();

        setLatestProducts(
          Array.isArray(data)
            ? data.slice(0, 4)
            : []
        );
      } catch (error) {
        console.error(
          "Latest products error:",
          error
        );

        setProductsError(
          "Unable to load products right now. Please try again."
        );
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchLatestProducts();
  }, []);

  /*
    LOAD WHATSAPP NUMBER
    FROM ADMIN SETTINGS
  */
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response =
          await fetch(SETTINGS_URL);

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
      } catch (error) {
        console.error(
          "Store settings error:",
          error
        );
      }
    };

    fetchSettings();
  }, []);

  return (
    <main className="pp-home">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="pp-main-hero">

        <div className="pp-main-hero-image"></div>

        <div className="pp-main-hero-overlay"></div>

        <div className="pp-container pp-main-hero-content">

          <div className="pp-hero-content-left">

            <span className="pp-small-label">
              QUALITY TECH ACCESSORIES
            </span>

            <h1>
              Top Electronics
              <br />
              For a <span>Smarter You</span>
            </h1>

            <p>
              Latest gadgets, quality accessories and
              everyday electronics — all in one place.
            </p>

            <div className="pp-hero-actions">

              <Link
                to="/products"
                className="pp-gold-btn"
              >
                SHOP NOW
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/products"
                className="pp-white-btn"
              >
                EXPLORE PRODUCTS
              </Link>

            </div>

          </div>

        </div>

        <div className="pp-hero-bottom-line">

          <div>
            <Truck size={18} />

            <span>
              <strong>
                Fast Delivery
              </strong>

              Across Pakistan
            </span>
          </div>

          <div>
            <ShieldCheck size={18} />

            <span>
              <strong>
                Secure Service
              </strong>

              Reliable Shopping
            </span>
          </div>

          <div>
            <MessageCircle size={18} />

            <span>
              <strong>
                24/7 Support
              </strong>

              We're Here To Help
            </span>
          </div>

          <div>
            <Star size={18} />

            <span>
              <strong>
                Quality Products
              </strong>

              Selected For You
            </span>
          </div>

        </div>

      </section>


      {/* =====================================================
          CATEGORY
      ====================================================== */}

      <section
        className="pp-category-section"
        id="categories"
      >

        <div className="pp-container">

          <div className="pp-section-title-row">

            <div>

              <span className="pp-section-label">
                SHOP BY CATEGORY
              </span>

              <h2>
                Explore Our Categories
              </h2>

              <p>
                Find the tech accessories you need for
                everyday life.
              </p>

            </div>

            <Link
              to="/products"
              className="pp-see-all"
            >
              View All
              <ArrowRight size={17} />
            </Link>

          </div>

          <div className="pp-category-banners">

            {categories.map((category) => (
              <Link
                key={category.title}
                to={`/products?category=${category.title}`}
                className="pp-category-banner"
              >

                <img
                  src={category.image}
                  alt={category.title}
                />

                <div className="pp-category-overlay"></div>

                <div className="pp-category-content">

                  <span>
                    {category.subtitle}
                  </span>

                  <h3>
                    {category.title}
                  </h3>

                  <div className="pp-category-link">
                    SHOP NOW
                    <ChevronRight size={16} />
                  </div>

                </div>

              </Link>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          BIG PROMO
      ====================================================== */}

      <section className="pp-promo-section">

        <div className="pp-container">

          <div className="pp-big-promo">

            <div className="pp-big-promo-image"></div>

            <div className="pp-big-promo-overlay"></div>

            <div className="pp-big-promo-content">

              <span className="pp-section-label">
                PLUGPOINT
              </span>

              <h2>
                Your One-Stop
                <br />
                <span>
                  Electronics Shop
                </span>
              </h2>

              <p>
                Mobiles, accessories, chargers, earbuds
                and useful gadgets for your everyday
                lifestyle.
              </p>

              <Link
                to="/products"
                className="pp-gold-btn"
              >
                SHOP NOW
                <ArrowRight size={17} />
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURE CARDS
      ====================================================== */}

      <section className="pp-feature-section">

        <div className="pp-container">

          <div className="pp-feature-grid">

            <div className="pp-feature-card pp-feature-one">

              <div className="pp-feature-image"></div>

              <div className="pp-feature-overlay"></div>

              <div className="pp-feature-content">

                <span>
                  QUALITY PRODUCTS
                </span>

                <h3>
                  Best Prices
                </h3>

                <p>
                  Upgrade your lifestyle with
                  useful tech products.
                </p>

                <Link
                  to="/products"
                  className="pp-mini-btn"
                >
                  SHOP NOW
                </Link>

              </div>

            </div>


            <div className="pp-feature-card pp-feature-two">

              <div className="pp-feature-image"></div>

              <div className="pp-feature-overlay"></div>

              <div className="pp-feature-content">

                <span>
                  SMART TECHNOLOGY
                </span>

                <h3>
                  Latest Gadgets
                </h3>

                <p>
                  Discover practical electronics
                  for everyday use.
                </p>

                <Link
                  to="/products"
                  className="pp-mini-btn"
                >
                  EXPLORE
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          LATEST COLLECTION
      ====================================================== */}

      <section className="pp-products-section">

        <div className="pp-container">

          <div className="pp-section-title-row">

            <div>

              <span className="pp-section-label">
                LATEST PRODUCTS
              </span>

              <h2>
                Our Latest Collection
              </h2>

              <p>
                Discover the newest products added to
                PlugPoint.
              </p>

            </div>

            <Link
              to="/products"
              className="pp-see-all"
            >
              Shop All
              <ArrowRight size={17} />
            </Link>

          </div>


          {/* LOADING */}

          {loadingProducts && (
            <div className="pp-products-empty">

              <div className="pp-empty-icon">
                <Zap size={27} />
              </div>

              <h3>
                Loading Products...
              </h3>

              <p>
                Please wait while we load the latest
                products from PlugPoint.
              </p>

            </div>
          )}


          {/* ERROR */}

          {!loadingProducts &&
            productsError && (
              <div className="pp-products-empty">

                <div className="pp-empty-icon">
                  <Zap size={27} />
                </div>

                <h3>
                  Products Could Not Be Loaded
                </h3>

                <p>
                  {productsError}
                </p>

                <Link
                  to="/products"
                  className="pp-gold-btn"
                >
                  VIEW PRODUCTS
                  <ArrowRight size={17} />
                </Link>

              </div>
            )}


          {/* PRODUCTS */}

          {!loadingProducts &&
            !productsError &&
            latestProducts.length > 0 && (
              <div className="pp-products-grid">

                {latestProducts.map(
                  (product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onAddToCart={
                        onAddToCart
                      }
                      onBuyNow={
                        onBuyNow
                      }
                    />
                  )
                )}

              </div>
            )}


          {/* EMPTY */}

          {!loadingProducts &&
            !productsError &&
            latestProducts.length === 0 && (
              <div className="pp-products-empty">

                <div className="pp-empty-icon">
                  <Zap size={27} />
                </div>

                <h3>
                  Products Coming Soon
                </h3>

                <p>
                  No products have been added yet.
                  Your real product collection will
                  appear here once products are added
                  from the admin panel.
                </p>

                <Link
                  to="/products"
                  className="pp-gold-btn"
                >
                  VIEW PRODUCTS
                  <ArrowRight size={17} />
                </Link>

              </div>
            )}

        </div>

      </section>


      {/* =====================================================
          WHY PLUGPOINT
      ====================================================== */}

      <section
        className="pp-why-section"
        id="why-plugpoint"
      >

        <div className="pp-container">

          <div className="pp-centered-title">

            <span className="pp-section-label">
              WHY PLUGPOINT
            </span>

            <h2>
              Shop Smart. Live Better.
            </h2>

            <p>
              Simple shopping, useful products and direct
              support whenever you need it.
            </p>

          </div>


          <div className="pp-why-grid">

            <div className="pp-why-card">

              <div className="pp-why-icon">
                <Headphones size={25} />
              </div>

              <h3>
                Quality Tech
              </h3>

              <p>
                Carefully selected accessories for your
                everyday devices.
              </p>

            </div>


            <div className="pp-why-card">

              <div className="pp-why-icon">
                <Truck size={25} />
              </div>

              <h3>
                Pakistan Wide
              </h3>

              <p>
                PlugPoint delivers products across
                Pakistan.
              </p>

            </div>


            <div className="pp-why-card">

              <div className="pp-why-icon">
                <ShieldCheck size={25} />
              </div>

              <h3>
                Reliable Service
              </h3>

              <p>
                We are here to help with genuine
                technical issues.
              </p>

            </div>


            <div className="pp-why-card">

              <div className="pp-why-icon">
                <MessageCircle size={25} />
              </div>

              <h3>
                Direct Support
              </h3>

              <p>
                Contact us directly whenever you need
                product assistance.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHATSAPP
      ====================================================== */}

      <section
        className="pp-whatsapp-section"
        id="support"
      >

        <div className="pp-container">

          <div className="pp-whatsapp-box">

            <div>

              <span className="pp-section-label">
                NEED HELP?
              </span>

              <h2>
                Have a question about a product?
              </h2>

              <p>
                Contact PlugPoint directly through WhatsApp.
              </p>

            </div>


            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="pp-gold-btn"
            >
              <MessageCircle size={18} />
              WHATSAPP US
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;
