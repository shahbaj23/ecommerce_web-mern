import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";

export default function Sidebar({
  selectedCategories,
  setSelectedCategories,
  subCategory,
  setSubCategory,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((p) => p !== category)
        : [...prev, category]
    );
  };

  const handleSubCategory = (subCategory) => {
    setSubCategory((prev) =>
      prev.includes(subCategory)
        ? prev.filter((p) => p !== subCategory)
        : [...prev, subCategory]
    );
  };

  return (
    <>
      <div className="hidden md:block w-64 h-full px-6 bg-white">
        <p className="text-2xl font-bold mb-4">Filter</p>

        <div className="text-[#3d3d3d]">
          <h2 className="text-[18px] font-semibold mb-2">Categories</h2>
          <div className="mt-1 border border-[#ddada2] p-2 flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes("men")}
                onChange={() => handleCategory("men")}
              />{" "}
              Men
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes("women")}
                onChange={() => handleCategory("women")}
              />{" "}
              Women
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes("kids")}
                onChange={() => handleCategory("kids")}
              />{" "}
              Kids
            </label>
          </div>
        </div>

        <div className="text-[#3d3d3d] mt-4">
          <h2 className="text-[18px] font-semibold mb-2">Sub Categories</h2>
          <div className="mt-1 border border-[#ddada3] p-2 rounded-lg flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={subCategory.includes("top wear")}
                onChange={() => handleSubCategory("top wear")}
              />{" "}
              Top wear
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={subCategory.includes("bottom wear")}
                onChange={() => handleSubCategory("bottom wear")}
              />{" "}
              Bottom Wear
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Sneaker
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={subCategory.includes("casual")}
                onChange={() => handleSubCategory("casual")}
              />
              Casual
            </label>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center gap-2 w-[110px] text-lg font-semibold px-4 py-2 border border-[#ddada3] rounded-md mt-2 ml-4"
      >
        {isOpen ? (
          <FaFilter className="text-xl" />
        ) : (
          <CiFilter className="text-2xl" />
        )}
        Filter
      </button>
      <div
        className={`
          fixed bottom-0 left-0 right-0
          w-full bg-white
          border shadow-xl p-6 rounded-t-2xl
          transition-transform duration-300 
          z-50 
          h-[70vh] overflow-y-auto
          md:hidden
          ${isOpen ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-4 text-2xl font-bold"
        >
          ✕
        </button>

        <p className="text-2xl font-bold mb-4">Filter</p>

        <div className="text-[#3d3d3d]">
          <h2 className="text-[18px] font-semibold mb-2">Categories</h2>
          <div className="mt-1 border border-[#929292] p-2 rounded-lg flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Men
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Women
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Kids
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Shoes
            </label>
          </div>
        </div>
        <div className="text-[#3d3d3d] mt-4">
          <h2 className="text-[18px] font-semibold mb-2">Sub Categories</h2>
          <div className="mt-1 border border-[#929292] p-2 rounded-lg flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Top wear
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Bottom Wear
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Sneaker
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Casual
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
