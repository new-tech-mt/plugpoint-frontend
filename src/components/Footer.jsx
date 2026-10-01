import { Link } from "react-router-dom";
import {
  MessageCircle,
  Phone,
  MapPin,
  Truck,
} from "lucide-react";

function Footer() {
  return (
    <footer className="footer" id="contact">

      <div className="container footer-grid">

        {/* BRAND */}

        <div className="footer-brand">

          <Link
            to="/"
            className="brand footer-logo"
          >
            <span className="brand-icon">
              ?
            </span>

            <span className="brand-text">
              <strong>Plug</strong>Point
            </span>
          </Link>


          <p>
            Your trusted destination for quality
            tech accessories across Pakistan.
          </p>


          <a
            href="https://wa.me/923284212706"
            target="_blank"
            rel="noreferrer"
            className="footer-whatsapp"
          >
            <MessageCircle size={18} />
            WhatsApp Us
          </a>

        </div>


        {/* SHOP */}

        <div className="footer-column">

          <h3>
            Shop
          </h3>

          <Link to="/products">
            All Products
          </Link>

          <Link to="/products?category=Earbuds">
            Earbuds
          </Link>

          <Link to="/products?category=Cables">
            Cables
          </Link>

          <Link to="/products?category=Chargers">
            Chargers
          </Link>

          <Link to="/products?category=Accessories">
            Accessories
          </Link>

        </div>


        {/* INFORMATION */}

        <div className="footer-column">

          <h3>
            Information
          </h3>

          <a href="/#why-plugpoint">
            Why PlugPoint
          </a>

          <a href="/#delivery">
            Delivery Information
          </a>

          <a href="/#support">
            Technical Support
          </a>

          <a href="/#contact">
            Contact Us
          </a>

        </div>


        {/* CONTACT */}

        <div className="footer-column">

          <h3>
            Contact
          </h3>


          <a
            href="tel:03284212706"
            className="footer-contact"
          >
            <Phone size={17} />

            <span>
              0328 4212706
            </span>
          </a>


          <div className="footer-contact">

            <MapPin size={17} />

            <span>
              Pakistan
            </span>

          </div>


          <div className="footer-contact">

            <Truck size={17} />

            <span>
              Delivery Across Pakistan
            </span>

          </div>

        </div>

      </div>


      {/* FOOTER BOTTOM */}

      <div className="footer-bottom">

        <div className="container footer-bottom-inner">

          <p>
            © 2026 PlugPoint. All Rights Reserved.
          </p>

          <p>
            Connect. Charge. Enjoy.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;

