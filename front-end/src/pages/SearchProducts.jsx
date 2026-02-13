import { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Product/ProductSlice";
import { RxCross2 } from "react-icons/rx";
import { ImSpinner8 } from "react-icons/im";
import {Link} from 'react-router-dom'

export default function SearchProducts({ setSearchOpen }) {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef();

  const { item: allProducts, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const searchProducts = useMemo(() => {
    if (query.length < 2) return [];
    return allProducts.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, allProducts]);

  useEffect(() => {
    if (!query) return setSearching(false);

    setSearching(true);
    const timer = setTimeout(() => setSearching(false), 500);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="w-full max-w-[520px] mx-4 sm:mx-0 border border-[#777676] rounded-xl shadow-2xl px-6 py-3 bg-white">
      <h2 className="text-center mb-4 text-2xl font-bold">Search Products</h2>
      <div className="flex items-center border px-2 py-1 rounded">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="flex-1 bg-transparent outline-none text-sm"
          autoFocus
        />
        <RxCross2
          className="cursor-pointer text-gray-600 hover:text-black"
          onClick={() => {
            if (query) setQuery("");
            else setSearchOpen(false);
          }}
        />
      </div>

      <div className="max-h-[380px] overflow-y-auto mt-5">
        {!query && (
          <p className="text-center text-gray-400 text-sm mt-6">Search Product</p>
        )}

        {query && (searching || loading) && (
          <div className="flex justify-center items-center px-3 py-10 text-gray-500">
            <ImSpinner8 className="animate-spin text-2xl" />
          </div>
        )}

        {query && !searching && !loading && searchProducts.length > 0 && (
          searchProducts.map((item) => (
            <Link
              to={`/product/${item._id}`}
              key={item.id}
              onClick={()=> setSearchOpen(false)}
              className="px-3 py-2 border-b cursor-pointer flex gap-2 hover:bg-gray-100"
            >
              <img
                className="w-20 h-20 object-cover"
                src={item.images[0]}
                alt={item.title}
              />
              <p>{item.title}</p>
            </Link>
          ))
        )}

        {query && !searching && !loading && searchProducts.length === 0 && (
          <div className="px-3 py-2 text-gray-500 text-center">No products found.</div>
        )}
      </div>
    </div>
  );
}
