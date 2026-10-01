import { Link } from "react-router-dom";
import {
  Headphones,
  Cable,
  Zap,
  Smartphone,
  ArrowRight,
} from "lucide-react";

const icons = {
  Earbuds: Headphones,
  Cables: Cable,
  Chargers: Zap,
  Accessories: Smartphone,
};

function CategoryCard({ category }) {
  if (!category) return null;

  const Icon = icons[category.name] || Smartphone;

  return (
    <Link
      to={`/products?category=${encodeURIComponent(category.name)}`}
      className="category-card"
    >
      <div className="category-icon">
        <Icon size={28} />
      </div>

      <div>
        <h3>{category.name}</h3>
        {category.description && <p>{category.description}</p>}
      </div>

      <ArrowRight className="category-arrow" size={19} />
    </Link>
  );
}

export default CategoryCard;

