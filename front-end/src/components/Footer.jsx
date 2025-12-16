import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-700 text-gray-300 pt-10 pb-5 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        <div>
          <h2 className="text-white text-2xl font-semibold">ShopEase</h2>
          <p className="mt-3 text-sm text-gray-400">
            Your one-stop destination for the latest fashion, electronics, and home essentials.
          </p>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Products</li>
            <li className="hover:text-white cursor-pointer">Categories</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm flex flex-col">
            <li className="hover:text-white cursor-pointer">FAQ</li>
            <Link to={"/return"} className="hover:text-white cursor-pointer">Returns</Link>
            <Link to={"/"} className="hover:text-white cursor-pointer">Shipping Info</Link>
            <Link to={"/order/:id"} className="hover:text-white cursor-pointer">Order Tracking</Link>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-3">Subscribe to get special offers and updates.</p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 rounded-l-md bg-gray-800 text-white focus:outline-none"
            />
            <button className="bg-blue-600 px-4 rounded-r-md hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white mt-10 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} ShopEase — All Rights Reserved.
      </div>
    </footer>
  );
}
