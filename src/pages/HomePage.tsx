import { useDispatch, useSelector } from "react-redux";
import { fetchPhones } from "../redux/phonesSlice";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { getPhones } from "../redux/selectors";

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
    <div>
      {status === "loading" && <div>Завантаження...</div>}
      {status === "succeeded" && (
        <ul>
          {phones.map(
            (phone: {
              id: string;
              title: string;
              price: number;
              img: string;
            }) => (
              <li key={phone.id}>
                <div>
                  <img src={phone.img} alt="" />
                  <h3>{phone.title}</h3>
                  <p>{phone.price}</p>
                </div>
                <button onClick={() => handleAddToCart(phone)}>
                  Додати в кошик
                </button>
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
