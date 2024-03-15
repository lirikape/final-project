import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { getPhones } from "../redux/selectors";
import { fetchPhones } from "../redux/operations";
import React from "react";

function HomePage() {
  const dispatch: AppDispatch = useDispatch();
  const phones = useSelector(getPhones);
  const status = useSelector((state: RootState) => state.phones.status);
  const error = useSelector((state: RootState) => state.phones.error);

  useEffect(() => {
    dispatch(fetchPhones());
  }, [dispatch]);

  const handleAddToCart = (phone: {
    id: string;
    title: string;
    price: number;
    img: string;
  }) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
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
    <div className="bg-gradient-to-r from-purple-600 to-blue-500 w-screen h-screen">
      {status === "loading" && <div>Завантаження...</div>}
      {status === "succeeded" && (
        <ul className="flex flex-row gap-6">
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
                <div className="h-[157.59px]">
                  <h3>{phone.title}</h3>
                  <p className="text-red-100">{phone.price}</p>
                  <button
                    onClick={() => handleAddToCart(phone)}
                    className=" w-[128.69px] h-[36px] top-[97.59px] left-[24px] px-[26.24500274658203px] py-[10px] border border-transparent rounded-md text-white text-xs font-medium leading-4 flex items-center justify-center whitespace-nowrap"
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
