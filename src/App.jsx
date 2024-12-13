import React from 'react';
import data from '../data.json';


function App() {
  return (
    <div className='mx-auto p-4'>
      <h1 className='font-RedHat text-orange-950 font-black text-3xl'>Desserts</h1>
      <div className='flex flex-col items-center gap-4'>
        {data.map((dessert, index) => (
          <div key={index} className='border rounded-lg p-4 shadow-lg w-full max-w-xs'>
            <img 
              src={dessert.image.thumbnail} 
              alt={dessert.name} 
              className='w-full h-auto rounded-md'
            />
            <h2 className='font-bold text-lg mt-2 text-center'>{dessert.name}</h2>
            <p className='text-gray-700 text-center'>{dessert.category}</p>
            <p className='text-orange-600 font-semibold text-center'>${dessert.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
