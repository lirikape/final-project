import { NavLink } from "react-router-dom";

export default function Header() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

  return (
    <header>
      <div>
        <h2>NavBar</h2>
        <NavLink to="/">
          <span>All Products</span>
        </NavLink>
        <NavLink to="/cart">
          <span>CART{cartItems.length > 0 && `(${cartItems.length})`}</span>
        </NavLink>
      </div>
    </header>
  );
}
