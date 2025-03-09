import { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";




export default function PastListItems({ id, name, price, description, date, children }) {
    const authContext = useContext(AuthContext);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full p-4 sm:p-6 bg-stone-800 text-stone-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mb-6 relative">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-stone-100">Order</h3>
          <span className="text-xs sm:text-sm font-medium text-stone-400">Order by: {authContext.user}</span>
        </div>
        <div className="space-y-2 sm:space-y-3">
          {/* Name */}
          <div>
            <span className="text-xs sm:text-sm font-semibold text-stone-400">Name</span>
            <h4 className="text-base sm:text-lg font-medium text-stone-100">{name}</h4>
          </div>
          {/* Price */}
          <div>
            <span className="text-xs sm:text-sm font-semibold text-stone-400">Price</span>
            <h4 className="text-base sm:text-lg font-medium text-stone-100">${price}</h4>
          </div>
          {/* Description */}
          <div>
            <span className="text-xs sm:text-sm font-semibold text-stone-400">Description</span>
            <p className="text-sm sm:text-base text-stone-300 break-words">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
