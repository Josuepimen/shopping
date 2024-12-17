import React, { useState } from "react";
import data from "../data.json";

function App() {
  const [cart, setCart] = useState([]);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const addToCart = (dessert) => {
    const existingItem = cart.find((item) => item.name === dessert.name);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.name === dessert.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...dessert, quantity: 1 }]);
    }
  };

  const removeFromCart = (dessert) => {
    const existingItem = cart.find((item) => item.name === dessert.name);
    if (existingItem.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.name === dessert.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      setCart(cart.filter((item) => item.name !== dessert.name));
    }
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const handleConfirmOrder = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleStartNewOrder = () => {
    setCart([]);
    setIsConfirmationModalOpen(false);
  };

  return (
    <div className="mx-auto p-4 bg-orange-50">
      <h1 className="font-RedHat text-orange-950 font-black text-3xl">Desserts</h1>
      <div className="flex flex-col items-center gap-2">
        {data.map((dessert, index) => (
          <div key={index} className="rounded-lg p-2 w-full max-w-xs">
            <picture>
              <source media="(max-width: 639px)" srcSet={dessert.image.mobile} />
              <source media="(min-width: 640px) and (max-width: 1023px)" srcSet={dessert.image.tablet} />
              <img
                src={dessert.image.desktop}
                alt={dessert.name}
                className="w-full h-auto rounded-lg"
              />
              <div className="flex justify-center">
                <button
                  onClick={() => addToCart(dessert)}
                  className="-mt-8 relative rounded-3xl bg-white border border-amber-700 p-3 flex justify-center font-RedHat font-semibold text-orange-950 w-44 hover:bg-zinc-200 transition duration-200"
                >
                  <img
                    src="/assets/images/icon-add-to-cart.svg"
                    alt="Add to Cart"
                    className="mr-2"
                  />
                  Add to Cart
                </button>
              </div>
            </picture>
            <p className="text-yellow-950">{dessert.category}</p>
            <h2 className="font-bold text-lg text-orange-950">{dessert.name}</h2>
            <p className="text-orange-600 font-semibold">${dessert.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="bottom-0 left-0 right-0 bg-pink-50 p-4 rounded-2xl">
        <h2 className="font-extrabold text-lg font-RedHat text-orange-600">
          Your Cart ({totalItems})
        </h2>
        {totalItems === 0 ? (
          <div className="flex flex-col items-center">
            <img
              src="/assets/images/illustration-empty-cart.svg"
              alt="No items in cart"
              className="w-32 h-32"
            />
            <p className="text-yellow-950 font-RedHat font-semibold">
              Your added items will appear here
            </p>
          </div>
        ) : (
          <>
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-4 border-b border-orange-300 pb-2"
              >
                <div className="flex items-center">
                  <img
                    src={item.image.desktop}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg mr-2"
                  />
                  <p>
                    {item.name} x {item.quantity} ={" "}
                    <span className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="px-2 font-bold text-red-500"
                  >
                    -
                  </button>
                  <button
                    onClick={() => addToCart(item)}
                    className="px-2 font-bold text-green-500"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <h3 className="font-semibold">Order Total: ${totalPrice}</h3>
            <button
              onClick={handleConfirmOrder}
              className="mt-4 rounded-3xl border border-green-700 p-3 flex justify-center font-RedHat font-semibold text-green-950 w-44 hover:bg-green-200 transition duration-200"
            >
              Confirm Order
            </button>
            <button
              onClick={handleStartNewOrder}
              className="mt-2 rounded-3xl border border-red-700 p-3 flex justify-center font-RedHat font-semibold text-red-950 w-44 hover:bg-red-200 transition duration-200"
            >
              Start New Order
            </button>
          </>
        )}
      </div>

      {isConfirmationModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="font-bold text-lg">Order Confirmation</h2>
            <p className="mt-2">Your order has been confirmed!</p>
            <button
              onClick={() => setIsConfirmationModalOpen(false)}
              className="mt-4 rounded-3xl border border-blue-700 p-2 text-blue-700 hover:bg-blue-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;