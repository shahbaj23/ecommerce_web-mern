import { useReducer, useState } from "react";
import uploadProduct from "../assets/upload_area.png";
import axios from "axios";
import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "TOGGLE_SIZE":
      return {
        ...state,
        sizes: state.sizes.includes(action.size)
          ? state.sizes.filter((s) => s !== action.size)
          : [...state.sizes, action.size],
      };
    case "RESET_FORM":
      return {
        title: "",
        description: "",
        category: "",
        subCategory: "",
        price: "",
        sizes: [],
      };

    default:
      return state;
  }
};

export default function AddProduct({ token }) {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    title: "",
    description: "",
    category: "",
    subCategory: "",
    price: "",
    sizes: [],
  });

  const handleAddPruduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("title", state.title);
      formData.append("description", state.description);
      formData.append("category", state.category);
      formData.append("subCategory", state.subCategory);
      formData.append("price", state.price);
      formData.append("sizes", JSON.stringify(state.sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);
      console.log(token);
      const response = await axios.post(
        "http://localhost:3000/api/product/add-product",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);

        dispatch({ type: "RESET_FORM" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full md:ml-64 p-6">
      <h2 className="text-3xl font-bold mb-8">Add New Product</h2>

      <form onSubmit={handleAddPruduct} className="flex flex-col gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-[#555555]">
            Product Images
          </h3>

          <div className="flex gap-2">
            <label className="flex flex-col justify-center items-center border-gray-400 cursor-pointer bg-white hover:bg-gray-100 transition">
              <img
                src={!image1 ? uploadProduct : URL.createObjectURL(image1)}
                alt=""
                className="w-20 h-20 opacity-70"
              />
              <input
                type="file"
                name="image1"
                onChange={(e) => setImage1(e.target.files[0])}
                hidden
              />
            </label>
            <label className="flex flex-col justify-center items-center border-gray-400 cursor-pointer bg-white hover:bg-gray-100 transition">
              <img
                src={!image2 ? uploadProduct : URL.createObjectURL(image2)}
                alt=""
                className="w-20 h-20  opacity-70"
              />
              <input
                type="file"
                name="image2"
                onChange={(e) => setImage2(e.target.files[0])}
                hidden
              />
            </label>
            <label className="flex flex-col justify-center items-center border-gray-400 cursor-pointer bg-white hover:bg-gray-100 transition">
              <img
                src={!image3 ? uploadProduct : URL.createObjectURL(image3)}
                alt=""
                className="w-20 h-20  opacity-70"
              />
              <input
                name="image3"
                type="file"
                onChange={(e) => setImage3(e.target.files[0])}
                hidden
              />
            </label>
            <label className="flex flex-col justify-center items-center border-gray-400 cursor-pointer bg-white hover:bg-gray-100 transition">
              <img
                src={!image4 ? uploadProduct : URL.createObjectURL(image4)}
                alt=""
                className="w-20 h-20  opacity-70"
              />
              <input
                type="file"
                name="image4"
                onChange={(e) => setImage4(e.target.files[0])}
                hidden
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col w-[300px] md:w-[400px]">
            <label className="font-semibold text-lg mb-1 text-[#555555]">
              Title
            </label>
            <input
              type="text"
              value={state.title}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "title",
                  value: e.target.value,
                })
              }
              className="p-3 border border-gray-400 bg-white rounded-[5px] focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter product title..."
            />
          </div>

          <div className="flex flex-col w-full md:w-[600px]">
            <label className="font-semibold text-lg mb-1 text-[#555555]">
              Product Description
            </label>
            <textarea
              className="p-3 border border-gray-400 bg-white rounded-[5px] h-[120px] focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Write product description..."
              value={state.description}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "description",
                  value: e.target.value,
                })
              }
            ></textarea>
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex flex-col">
              <p className="font-semibold text-lg mb-1 text-[#555555]">
                Category
              </p>
              <select
                className="outline-none bg-white border p-2 border-gray-400 rounded-[5px] focus:ring-1 focus:ring-blue-500"
                value={state.category}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "category",
                    value: e.target.value,
                  })
                }
              >
                <option value="">Select Category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
                <option value="Shoes">Shoes</option>
              </select>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-lg mb-1 text-[#555555]">
                Sub category
              </p>
              <select
                className="outline-none bg-white border p-2 border-gray-400 rounded-[5px] focus:ring-1 focus:ring-blue-500"
                value={state.subCategory}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "subCategory",
                    value: e.target.value,
                  })
                }
              >
                <option value="">Select Subcategory</option>
                <option value="Top Wear">Top Wear</option>
                <option value="Bottom Wear">Bottom Wear</option>
                <option value="Sneaker">Sneaker</option>
                <option value="Kids Wear">Kids Wear</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-lg mb-1 text-[#555555]">
                Price
              </label>
              <input
                type="number"
                className="p-2 border border-gray-400 bg-white rounded-lg w-[140px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={state.price}
                placeholder="₹"
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "price",
                    value: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div>
            <p>Product Size</p>
            <div className="flex gap-2">
              {["S", "M", "L", "XL", "XXL"].map((item) => (
                <p
                  key={item}
                  onClick={() => dispatch({ type: "TOGGLE_SIZE", size: item })}
                  className={`border px-3 py-1 text-2xl flex justify-center items-center border-gray-400 cursor-pointer ${
                    state.sizes.includes(item)
                      ? "bg-blue-500 text-white"
                      : "bg-white text-[#555555]"
                  }`}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-8 w-[150px] bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
