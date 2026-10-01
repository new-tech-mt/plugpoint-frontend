import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  PackageOpen,
  RotateCcw,
} from "lucide-react";
import ProductCard from "../components/ProductCard";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/products`;

function Products({
  onAddToCart,
  onBuyNow,
}) {
  const [searchParams] = useSearchParams();

  const initialCategory =
    searchParams.get("category") || "All";

  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState(initialCategory);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            "Failed to fetch products"
          );
        }

        const data =
          await response.json();

        setProducts(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (err) {
        console.error(
          "Products fetch error:",
          err
        );

        setError(
          "Unable to load products right now. Please make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    "All",
    ...new Set(
      products
        .map(
          (product) =>
            product.category
        )
        .filter(Boolean)
    ),
  ];

  const filteredProducts = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return products.filter(
      (product) => {
        const matchesCategory =
          category === "All" ||
          product.category ===
            category;

        const matchesSearch =
          !query ||
          product.name
            ?.toLowerCase()
            .includes(query) ||
          product.category
            ?.toLowerCase()
            .includes(query) ||
          product.description
            ?.toLowerCase()
            .includes(query);

        return (
          matchesCategory &&
          matchesSearch
        );
      }
    );
  }, [
    products,
    category,
    search,
  ]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
  };

  return (
    <div className="products-page">

      {/* PAGE HERO */}

      <section className="products-page-hero">

        <div className="container">

          <span className="section-label">
            PLUGPOINT STORE
          </span>

          <h1>
            Explore Our
            <span>
              {" "}
              Tech Collection
            </span>
          </h1>

          <p>
            Discover quality electronics,
            smart accessories and everyday
            tech essentials designed for
            modern life.
          </p>

        </div>

      </section>


      {/* PRODUCTS */}

      <section className="products-section section">

        <div className="container">

          {/* TOOLBAR */}

          <div className="products-toolbar">

            <div className="products-search">

              <Search size={19} />

              <input
                type="search"
                placeholder="Search products..."
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                disabled={
                  loading || !!error
                }
              />

              {search && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={() =>
                    setSearch("")
                  }
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}

            </div>

            <div className="products-filter-icon">

              <SlidersHorizontal
                size={18}
              />

              <span>
                Filter
              </span>

            </div>

          </div>


          {/* LOADING */}

          {loading && (
            <div className="empty-products large-empty">

              <div className="empty-products-icon">
                <PackageOpen size={42} />
              </div>

              <span className="empty-products-label">
                PLUGPOINT STORE
              </span>

              <h2>
                Loading Products...
              </h2>

              <p>
                Please wait while we load
                the latest products from
                our store.
              </p>

            </div>
          )}


          {/* ERROR */}

          {!loading && error && (
            <div className="empty-products large-empty">

              <div className="empty-products-icon">
                <PackageOpen size={42} />
              </div>

              <span className="empty-products-label">
                STORE ERROR
              </span>

              <h2>
                Unable to Load Products
              </h2>

              <p>
                {error}
              </p>

              <button
                type="button"
                className="primary-button"
                onClick={() =>
                  window.location.reload()
                }
              >
                Try Again
              </button>

            </div>
          )}


          {/* CONTENT */}

          {!loading && !error && (
            <>

              {/* CATEGORY FILTERS */}

              {categories.length > 1 && (
                <div className="category-filters">

                  {categories.map(
                    (item) => (
                      <button
                        key={item}
                        type="button"
                        className={
                          category === item
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          setCategory(item)
                        }
                      >
                        {item}
                      </button>
                    )
                  )}

                </div>
              )}


              {/* RESULTS HEADER */}

              {products.length > 0 && (
                <div className="products-results-header">

                  <div>

                    <span className="products-results-label">
                      OUR COLLECTION
                    </span>

                    <p>
                      {
                        filteredProducts.length
                      }{" "}
                      product
                      {filteredProducts.length !==
                      1
                        ? "s"
                        : ""}{" "}
                      found
                    </p>

                  </div>

                  {(search ||
                    category !== "All") && (
                    <button
                      type="button"
                      className="clear-filter-button"
                      onClick={
                        clearFilters
                      }
                    >
                      <RotateCcw
                        size={15}
                      />

                      Clear Filters
                    </button>
                  )}

                </div>
              )}


              {/* PRODUCT GRID */}

              {filteredProducts.length >
              0 ? (
                <div className="products-grid">

                  {filteredProducts.map(
                    (product) => (
                      <ProductCard
                        key={
                          product._id
                        }
                        product={
                          product
                        }
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
              ) : (
                <div className="empty-products large-empty">

                  <div className="empty-products-icon">
                    <PackageOpen
                      size={42}
                    />
                  </div>

                  <span className="empty-products-label">
                    {products.length ===
                    0
                      ? "COLLECTION COMING SOON"
                      : "NO MATCHES FOUND"}
                  </span>

                  <h2>
                    {products.length ===
                    0
                      ? "Products Coming Soon"
                      : "No products found"}
                  </h2>

                  <p>
                    {products.length ===
                    0
                      ? "Our product collection is being prepared. New electronics and accessories will appear here soon."
                      : "We couldn't find any product matching your current search or category."}
                  </p>

                  {products.length ===
                  0 ? (
                    <Link
                      to="/"
                      className="primary-button"
                    >
                      Back to Home
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="primary-button"
                      onClick={
                        clearFilters
                      }
                    >
                      <RotateCcw
                        size={16}
                      />

                      Clear Filters
                    </button>
                  )}

                </div>
              )}

            </>
          )}

        </div>

      </section>

    </div>
  );
}

export default Products;

