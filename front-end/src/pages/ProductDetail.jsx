import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { singleFetchProduct } from "../Product/ProductSlice";
import { addCart } from "../Product/CartSlice";

export default function ProductDetail() {
  const [activeImage, setActiveImage] = useState("");
  // const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  const [err, setErr] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    singleItem: product,
    loading,
    error,
  } = useSelector((state) => state.products);

  const { token } = useSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(singleFetchProduct(id));
  }, [id]);

  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  const handleCart = () => {
    if (!token) {
      return alert("Please Login first!");
    }

    if (!selectedSize) {
      return setErr("Please select the size!");
    }

    dispatch(addCart({ token, itemId: product._id, size: selectedSize }));
    console.log({token, itemId: product._id, size: selectedSize})
  };


  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;
  if (!product) return <h1>No Product Found</h1>;

  return (
    <div className="bg-gray-50 min-h-screen p-20">
      <h1 className="text-2xl font-bold mb-10">Product Details</h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <img
            src={activeImage || "/placeholder.png"}
            alt="product"
            className="w-full h-[500px] object-cover rounded-xl shadow"
          />

          <div className="flex gap-4 mt-4">
            {product?.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border 
                  ${activeImage === img ? "border-black" : "border-gray-300"}`}
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

          <p className="text-xl font-semibold text-green-600 mb-4">
            ₹{product.price}
          </p>

          <div className="mb-4">
            <label className="mr-2 font-medium">Size:</label>
            <div
              // value={size}
              // onChange={(e) => setSize(e.target.value)}
              className="rounded-md flex gap-2 text-gray-700"
            >
              {["S", "M", "L", "XL", "XXL"].map((size, i) => (
                <p
                  className={`border px-2 text-[17px] cursor-pointer ${
                    selectedSize === size ? "bg-[#ad5949] text-white" : "bg-white"
                  }`}
                  onClick={()=> setSelectedSize(size)}
                  key={i}
                  value={size}
                >
                  {size}
                </p>
              ))}
              <p>{err}</p>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>
          <button
            className="p-2 font-semibold cursor-pointer bg-blue-500 text-white py-3 rounded-xl mt-4 text-lg hover:bg-blue-400"
            onClick={handleCart}
          >
            Add to Cart
          </button>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">Product Tags</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              {product?.tags?.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
