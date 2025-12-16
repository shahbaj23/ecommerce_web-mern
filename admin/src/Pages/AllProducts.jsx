import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

export default function AllProducts({ token }) {
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/product/product-list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setAllProducts(response.data.products);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/product/remove-product",{id},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if(response.data.success){
        toast.success(response.data.message)
        await fetchAllProduct();
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPage = 8;

  const lastIndex = currentPage * itemsPage;
  const firstIndex = lastIndex - itemsPage;

  const currentItems = allProducts.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(allProducts.length / itemsPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="md:ml-64 p-6">
      <h2 className="text-2xl font-semibold mb-4">All Products</h2>

      <div className="w-full overflow-x-auto p-1 rounded-lg">
        <table className="w-full border-none text-left">
          <thead className="bg-[#c8958a] text-white">
            <tr>
              <th className="p-1 ">Image</th>
              <th colSpan={2} className="p-1 ">
                Title
              </th>
              <th className="p-1 ">Category</th>
              <th className="p-1 ">Sub Category</th>
              <th className="p-1 ">Price</th>
              <th className="p-1 ">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item, i) => (
              <tr key={i} className="border-b border-gray-500 py-5">
                <td className="p-3">
                  <img
                    className="w-[50px] h-[50px] object-cover"
                    src={item.images[0]}
                    alt="Image"
                  />
                </td>
                <td colSpan={2} className="p-3">
                  {item.title}
                </td>
                <td className="p-3 ">{item.category}</td>
                <td className="p-3 ">{item.subCategory}</td>
                <td className="p-3 ">{item.price}</td>
                <td className="p-3">
                  <button className="bg-[#ddada3] px-2 ml-3 text-white text-[13px]">
                    Edit
                  </button>
                  <button onClick={()=>removeProduct(item._id)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center my-10">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded mx-1 ${
                currentPage === index + 1
                  ? "bg-[#c8958a] text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
