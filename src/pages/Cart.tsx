import React from "react";
import { useDispatch } from "react-redux";
import "tailwindcss/tailwind.css";
import { addCart } from "../redux/phonesSlice";

interface Phone {
  id: string;
  title: string;
  price: number;
  img: string;
  quantity: number;
}

function Cart() {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = React.useState<Phone[]>(
    JSON.parse(localStorage.getItem("cartItems") || "[]")
  );

  const [totalQuantity, setTotalQuantity] = React.useState(0);
  const [totalAmount, setTotalAmount] = React.useState(0);

  React.useEffect(() => {
    let quantity = 0;
    let amount = 0;

    cartItems.forEach((phone) => {
      quantity += phone.quantity;
      amount += phone.price * phone.quantity;
    });

    setTotalQuantity(quantity);
    setTotalAmount(amount);
    dispatch(addCart(cartItems.length));
  }, [cartItems, dispatch]);

  const handleDelete = (id: string) => {
    const newCartItems = cartItems.filter((phone) => phone.id !== id);
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  const handleQuantityChange = (id: string, change: number) => {
    const newCartItems = cartItems.map((phone) => {
      if (phone.id === id) {
        const newQuantity = phone.quantity + change;
        return {
          ...phone,
          quantity: Math.max(1, newQuantity),
        };
      }
      return phone;
    });
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  return (
    <div className="  bg-gradient-to-r from-purple-600 to-blue-500  md:h-screen pb-[200px] md:pb-0">
      <div className="pt-16 "></div>
      {cartItems.length === 0 ? (
        <p className="text-3xl bg-white">Кошик порожній</p>
      ) : (
        <div className="flex items-center md:items-start justify-center flex-col md:flex-row gap-6">
          <ul className="flex flex-col bg-white shadow-lg pb-6 rounded-md w-[366px] md:w-[880px]">
            <h1 className="font-medium text-[20px] leading-6 text-gray-700  border-b-4 pl-6 pt-4 pb-[18px]">
              CART-{cartItems.length} items
            </h1>
            {cartItems.map((phone) => (
              <li
                key={phone.id}
                className="flex flex-col md:flex-row bg-white py-6 px-6 md:px-3 w-[366px] md:w-[880px] border-b-4"
              >
                <img
                  src={phone.img}
                  alt=""
                  width="184px"
                  className="ml-0 md:ml-6 w-[318px] md:w-[184px]"
                />
                <div className="w-[346px]  pl-3 md:pl-6 mb-8 md:mb-0 ">
                  <h3 className="font-bold text-base leading-6 text-gray-700 mb-[18px] md:mb-4">
                    {phone.title}
                  </h3>
                  {/* <p>{phone.price}</p> */}
                  <button
                    onClick={() => handleDelete(phone.id)}
                    className="bg-blue-600 hover:bg-blue-800 shadow-md w-[42.5px] h-[29px] p-[8px 15.65px 9px 15.85px] rounded-[3.2px] border border-transparent leading-4 flex items-center justify-center whitespace-nowrap"
                  >
                    <svg
                      width="12"
                      height="13"
                      viewBox="0 0 12 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.0474 1.52576C11.2349 1.52576 11.4224 1.71326 11.4224 1.90076V2.65076C11.4224 2.86169 11.2349 3.02576 11.0474 3.02576H1.29736C1.08643 3.02576 0.922363 2.86169 0.922363 2.65076V1.90076C0.922363 1.71326 1.08643 1.52576 1.29736 1.52576H4.10986L4.3208 1.10388C4.41455 0.916382 4.60205 0.775757 4.81299 0.775757H7.5083C7.71924 0.775757 7.90674 0.916382 8.00049 1.10388L8.23486 1.52576H11.0474ZM2.16455 11.7211L1.67236 3.77576H10.6724L10.1567 11.7211C10.1333 12.3304 9.64111 12.7758 9.03174 12.7758H3.28955C2.68018 12.7758 2.18799 12.3304 2.16455 11.7211Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>

                <div>
                  <div className="flex flex-row w-[366px] md:w-[254px] pl-3 md:pl-6">
                    <button
                      onClick={() => handleQuantityChange(phone.id, -1)}
                      className="w-[42.5px] h-[36.13px] p-[12.07px 15.65px 12.06px 15.85px] rounded-[4px] bg-blue-600 hover:bg-blue-800 shadow-md flex items-center justify-center mr-5"
                    >
                      <svg
                        width="12"
                        height="3"
                        viewBox="0 0 12 3"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.3322 0.120789C10.7306 0.120789 11.0822 0.472351 11.0822 0.870789V1.62079C11.0822 2.04266 10.7306 2.37079 10.3322 2.37079H1.33215C0.910278 2.37079 0.582153 2.04266 0.582153 1.62079V0.870789C0.582153 0.472351 0.910278 0.120789 1.33215 0.120789H10.3322Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                    <p className="w-[152px]">Quantity: {phone.quantity}</p>
                    <button
                      onClick={() => handleQuantityChange(phone.id, 1)}
                      className="w-[42.5px] h-[36.13px] p-[12.07px 15.65px 12.06px 15.85px] rounded-[4px] bg-blue-600 hover:bg-blue-800 shadow-md flex items-center justify-center font-black text-xs leading-none uppercase text-center text-white ml-2"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-medium text-[20px] leading-6 text-gray-700 flex justify-center pt-6">
                    {" "}
                    {phone.price}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="bg-white w-[366px] md:w-96 rounded-md  h-[242px] ">
            <h2 className="font-medium text-[20px] leading-6 text-gray-700 pt-4 pb-[18px] border-b-4 pl-6 ">
              Summary
            </h2>
            <p className="font-normal text-base leading-6 text-gray-700 pl-6 pt-6 pb-2">
              Total Quantity: {totalQuantity}
            </p>
            <p className="font-medium text-base leading-6 text-gray-700 pl-6 pb-6">
              Total amount: {totalAmount}
            </p>
            <button className="rounded-lg p-3 md:p-4 w-80 h-12 shadow-md bg-blue-600 hover:bg-blue-800 flex items-center justify-center font-medium text-[14px] leading-6 uppercase text-center text-white ml-6">
              GO TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
