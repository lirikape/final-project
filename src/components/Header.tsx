import { NavLink } from "react-router-dom";

export default function Header() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

  return (
    <header>
      <div className="flex justify-between items-center px-3   h-14 shadow-md bg-gray-100 ">
        <h2 className="font-medium text-base lg:text-lg leading-6 text-black">
          NavBar
        </h2>
        <NavLink to="/">
          <span className="font-medium text-xs leading-6 uppercase text-center text-blue-600">
            All Products
          </span>
        </NavLink>
        <NavLink to="/cart">
          <span className="font-medium text-xs leading-6 uppercase text-center text-blue-600">
            CART{cartItems.length > 0 && `(${cartItems.length})`}
          </span>
        </NavLink>
      </div>
    </header>
  );
}
