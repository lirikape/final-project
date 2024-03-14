import React from "react";

interface Phone {
  id: string;
  title: string;
  price: number;
  img: string;
  quantity: number;
}

function Cart() {
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
  }, [cartItems]);

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
    <>
      <h1>CART-{cartItems.length} items</h1>
      {cartItems.length === 0 ? (
        <p>Кошик порожній</p>
      ) : (
        <>
          <ul>
            {cartItems.map((phone) => (
              <li key={phone.id}>
                <div>
                  <img src={phone.img} alt="" />
                  <h3>{phone.title}</h3>
                  <p>{phone.price}</p>
                  <button onClick={() => handleDelete(phone.id)}>
                    Видалити
                  </button>
                  <div>
                    <button onClick={() => handleQuantityChange(phone.id, -1)}>
                      minus
                    </button>
                    <p>Quantity: {phone.quantity}</p>
                    <button onClick={() => handleQuantityChange(phone.id, 1)}>
                      plus
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <h2>Summary</h2>
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total amount: {totalAmount}</p>
            <button>Buy</button>
          </div>
        </>
      )}
    </>
  );
}

export default Cart;
