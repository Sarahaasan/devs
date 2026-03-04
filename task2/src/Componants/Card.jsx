import React, { Component } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { BsCart3, BsEye } from 'react-icons/bs';
import { MdCategory } from 'react-icons/md';
import { HiOutlineHashtag } from 'react-icons/hi';

class Card extends Component {
  render() {
    const { id, name, price, quantity, category , increaseQuantity, decreaseQuantity, deleteProduct } = this.props;
    
    return (
      <div className="max-w-sm p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col gap-4">
         {
            quantity === 0 && (
              <div className="text-center bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                Out of Stock
              </div>
            )
         }
        <span className="flex items-center gap-2 text-sm text-blue-600 font-semibold">
          <MdCategory className="text-lg" />
          {category}
        </span>
        
        <h2 className="text-2xl font-bold text-gray-800">
          {name}
        </h2>
    
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1 text-gray-500 text-sm">
            <HiOutlineHashtag />
            {id}
          </span>
          <span className="text-3xl font-bold text-green-600">
            ${price.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
          <span className="text-gray-700 font-semibold"> {quantity}</span>
          <div className="flex items-center gap-4">
            <button className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all hover:scale-110"
            onClick={() => decreaseQuantity(id)}
            disabled={quantity === 0}
            >
              <AiOutlineMinus />
            </button>
            <span className="font-bold text-xl min-w-[30px] text-center">
              {quantity}
            </span>
            <button className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-all hover:scale-110"
            onClick={() => increaseQuantity(id)}
            disabled={quantity === 0}
            >
              <AiOutlinePlus />
            </button>
          </div>
        </div>

        {/* buttons  */}
        <div className="flex gap-3 mt-2">
          <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all hover:scale-105">
            <BsCart3 className="text-lg" />
            Add to Cart
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-all hover:scale-105"
          onClick={() => deleteProduct(id)}
          >
            Delete
          </button>
        </div>
        
      </div>
    );
  }
}

export default Card;