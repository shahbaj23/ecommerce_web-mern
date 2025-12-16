import { MdOutlineLocalShipping } from "react-icons/md";
import { RiExchangeFundsFill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import "../App.css"

export default function OurPolicy() {
  return (
    <div className="flex flex-col md:flex-row justify-around gap-6 md:gap-1 p-8 my-10">
      <div className="flex flex-col justify-center items-center">
        <MdOutlineLocalShipping className="text-[50px] md:text-[70px] text-[#d68e80] text-center" />
        <p className="text-[18px] md:text-2xl font-semibold roboto text-[#4d4c4c]">7 Days return policy</p>
        <p className="text-[#979797] robot">We offer hassle free exchange policy</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <RiExchangeFundsFill className="text-[50px] md:text-[70px] text-[#d68e80] text-center" />
        <p className="text-[18px] md:text-2xl font-semibold roboto text-[#4d4c4c]">7 Days return policy</p>
        <p className="text-[#979797] robot">We offer hassle free exchange policy</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <BiSupport className="text-[50px] md:text-[70px] text-[#d68e80] text-center" />
        <p className="text-[18px] md:text-2xl font-semibold roboto text-[#4d4c4c]">7 Days return policy</p>
        <p className="text-[#979797] roboto">We offer hassle free exchange policy</p>
      </div>
    </div>
  );
}
