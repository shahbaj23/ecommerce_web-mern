import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

// const API = import.meta.env.VITE_API_URL ;

if (!API) {
  throw new Error("VITE_API_URL is not defined");
}


export default function AllProducts({ token }) {
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAllProduct = async () => {
    try {
      const response = await axios.get(
        `${API}/api/product/product-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setAllProducts(response.data.products);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${API}/api/product/remove-product`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchAllProduct();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filtered = allProducts.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPage = 8;
  const lastIndex = currentPage * itemsPage;
  const firstIndex = lastIndex - itemsPage;

  const currentItems = filtered.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filtered.length / itemsPage);

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Products</h2>

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* ---- MOBILE ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">

        {currentItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-sm border p-4"
          >
            <img
              src={item.images[0]}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />

            <h3 className="font-semibold text-gray-800">{item.title}</h3>

            <p className="text-sm text-gray-500">
              {item.category} • {item.subCategory}
            </p>

            <p className="text-green-600 font-bold mt-2">
              ₹{item.price}
            </p>

            <div className="flex gap-3 mt-3">
              <button className="flex-1 bg-blue-500 text-white py-1 rounded-md text-sm">
                Edit
              </button>

              <button
                onClick={() => removeProduct(item._id)}
                className="text-red-500 text-xl"
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}

      </div>

      {/* ---- DESKTOP TABLE ---- */}
      <div className="hidden md:block bg-white rounded-xl shadow border overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Sub Category</th>
              <th className="p-4">Price</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>

            {currentItems.map((item) => (
              <tr
                key={item._id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4">
                  <img
                    src={item.images[0]}
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>

                <td className="p-4 font-medium">{item.title}</td>

                <td className="p-4">{item.category}</td>

                <td className="p-4">{item.subCategory}</td>

                <td className="p-4 text-green-600 font-semibold">
                  ₹{item.price}
                </td>

                <td className="p-4 text-center">

                  <div className="flex justify-center gap-3">

                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs">
                      Edit
                    </button>

                    <button
                      onClick={() => removeProduct(item._id)}
                      className="text-red-500 text-xl"
                    >
                      <MdDelete />
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      <div className="flex justify-center mt-6 flex-wrap gap-2">

        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
}