import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { getPhones } from "../redux/selectors";
import { fetchPhones } from "../redux/operations";

import "tailwindcss/tailwind.css";
import { addCart } from "../redux/phonesSlice";
function HomePage() {
  const dispatch: AppDispatch = useDispatch();
  const phones = useSelector(getPhones);
  const status = useSelector((state: RootState) => state.phones.status);
  const error = useSelector((state: RootState) => state.phones.error);
  const [cartResult, setCartResult] = useState(0);

  useEffect(() => {
    dispatch(addCart(cartResult));
    dispatch(fetchPhones());
  }, [cartResult, dispatch]);

  const handleAddToCart = (phone: {
    id: string;
    title: string;
    price: number;
    img: string;
  }) => {
    setCartResult((prev) => prev + 1);
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    // const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const isPhoneInCart = cartItems.some(
      (item: { id: string }) => item.id === phone.id
    );

    if (isPhoneInCart) {
      alert(`Телефон "${phone.title}" вже є в кошику.`);
    } else {
      cartItems.push(phone);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-500   py-2 flex justify-center md:h-screen">
      {status === "loading" && <div>Завантаження...</div>}
      {status === "succeeded" && (
        <ul className="flex flex-col gap-2 md:gap-6 md:flex-row md:flex-wrap">
          {phones.map(
            (phone: {
              id: string;
              title: string;
              price: number;
              img: string;
            }) => (
              <li
                key={phone.id}
                className="bg-white shadow-md  rounded-md w-[240px]  h-[min-content]"
              >
                <img
                  src={phone.img}
                  alt=""
                  width="240px"
                  className="rounded-t-md"
                />
                <div className="h-[157.59px] p-6 flex flex-col ">
                  <h3 className="font-medium text-base lg:text-lg leading-6 text-gray-700">
                    {phone.title}
                  </h3>
                  <p className="font-normal text-base leading-8 text-gray-700">
                    {phone.price}
                  </p>
                  <button
                    onClick={() => handleAddToCart(phone)}
                    className="bg-blue-600 hover:bg-blue-800 shadow-md w-[128.69px] h-[36px] top-[97.59px] left-[24px] px-[26.24500274658203px] py-[10px] border border-transparent rounded-md text-white text-xs font-medium leading-4 flex items-center justify-center whitespace-nowrap mt-2"
                  >
                    ADD TO CART
                  </button>
                </div>
              </li>
            )
          )}
        </ul>
      )}
      {status === "failed" && <div>Помилка: {error}</div>}
    </div>
  );
}

export default HomePage;
