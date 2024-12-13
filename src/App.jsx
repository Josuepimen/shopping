import React, { useState } from 'react';
import data from '../data.json';

function App() {
  const [cart, setCart] = useState([]);
  
  const addToCart = (dessert) => {
    const existingItem = cart.find(item => item.name === dessert.name);
    if (existingItem) {
      setCart(cart.map(item => 
        item.name === dessert.name 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...dessert, quantity: 1 }]);
    }
  };

  const removeFromCart = (dessert) => {
    const existingItem = cart.find(item => item.name === dessert.name);
    if (existingItem.quantity > 1) {
      setCart(cart.map(item => 
        item.name === dessert.name 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ));
    } else {
      setCart(cart.filter(item => item.name !== dessert.name));
    }
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

  return (
    <div className='mx-auto p-4'>
      <h1 className='font-RedHat text-orange-950 font-black text-3xl'>Desserts</h1>
      <div className='flex flex-col items-center gap-4'>
        {data.map((dessert, index) => (
          <div key={index} className='rounded-lg p-4 shadow-lg w-full max-w-xs'>
            <picture>
              <source media="(max-width: 639px)" srcSet={dessert.image.mobile} />
              <source media="(min-width: 640px) and (max-width: 1023px)" srcSet={dessert.image.tablet} />
              <img 
                src={dessert.image.desktop} 
                alt={dessert.name} 
                className='h-full rounded-md'
              />
            </picture>
            <button 
              onClick={() => addToCart(dessert)} 
              className='mb-4 rounded-3xl border border-amber-700 p-3 flex justify-center font-RedHat font-semibold text-orange-950 w-44 hover:bg-zinc-200 transition duration-200'
            >
            <img src="/public/assets/images/icon-add-to-cart.svg" alt="Add to Cart" className='mr-2 ' />
              Add to Cart
            </button>
            <p className='text-yellow-950 '>{dessert.category}</p>
            <h2 className='font-bold text-lg mt-2 text-orange-950'>{dessert.name}</h2>
            <p className='text-orange-600 font-semibold'>${dessert.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className='fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4'>
        <h2 className='font-bold text-lg'>Your Cart ({totalItems})</h2>
        {cart.map((item, index) => (
          <div key={index} className='flex justify-between items-center'>
            <span>{item.name} x {item.quantity}</span>
            <div>
              <button onClick={() => removeFromCart(item)} className='px-2'>-</button>
              <button onClick={() => addToCart(item)} className='px-2'>+</button>
            </div>
          </div>
        ))}
        <h3 className='font-semibold'>Order Total: ${totalPrice}</h3>
      </div>
    </div>
  );
}

export default App;