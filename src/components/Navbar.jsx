import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  Search,
} from "lucide-react";

const SETTINGS_URL =
  "${import.meta.env.VITE_API_URL}/api/settings";

function Navbar({ cartCount = 0 }) {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [storeContact, setStoreContact] =
    useState("03284212706");

  const closeMobile = () =>
    setMobileOpen(false);

  /*
    LOAD STORE CONTACT NUMBER
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
          data.settings?.storeContactNumber
        ) {
          setStoreContact(
            data.settings.storeContactNumber
          );
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
    <>
      <div className="top-strip">
        <div className="container top-strip-inner">
          <span>
            ???? All Pakistan Delivery
          </span>

          <span>
            Quality Tech Accessories
          </span>

          <a
            href={`tel:${storeContact}`}
          >
            {storeContact}
          </a>
        </div>
      </div>

      <header className="navbar">
        <div className="container navbar-inner">

          {/* BRAND */}
          <Link
            to="/"
            className="brand"
            onClick={closeMobile}
          >
            <span className="brand-icon">
              ?
            </span>

            <span className="brand-text">
              <strong>Plug</strong>
              Point
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="desktop-nav">

            <NavLink to="/">
              Home
            </NavLink>

            <NavLink to="/products">
              Products
            </NavLink>

            <a href="/#categories">
              Categories
            </a>

            <a href="/#why-plugpoint">
              Why PlugPoint
            </a>

            <a href="/#contact">
              Contact
            </a>

          </nav>

          {/* NAVBAR ACTIONS */}
          <div className="navbar-actions">

            <Link
              to="/products"
              className="nav-icon-button"
              aria-label="Search"
            >
              <Search size={19} />
            </Link>

            <Link
              to="/cart"
              className="nav-cart"
              aria-label="Shopping cart"
              onClick={closeMobile}
            >
              <ShoppingCart size={19} />

              {cartCount > 0 && (
                <span>
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              className="mobile-menu-button"
              type="button"
              onClick={() =>
                setMobileOpen(
                  (value) => !value
                )
              }
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={21} />
              ) : (
                <Menu size={21} />
              )}
            </button>

          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="mobile-menu">

            <NavLink
              to="/"
              onClick={closeMobile}
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              onClick={closeMobile}
            >
              Products
            </NavLink>

            <a
              href="/#categories"
              onClick={closeMobile}
            >
              Categories
            </a>

            <a
              href="/#why-plugpoint"
              onClick={closeMobile}
            >
              Why PlugPoint
            </a>

            <a
              href="/#contact"
              onClick={closeMobile}
            >
              Contact
            </a>

          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
