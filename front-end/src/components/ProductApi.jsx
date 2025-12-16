import { MdOutlineLocalShipping } from "react-icons/md";
import { RiExchangeFundsFill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";

export default function ProductApi() {
  return (
    <div className="flex justify-between">
        <div>
            <MdOutlineLocalShipping />
            <div>
                <p>7 Days return policy</p>
            </div>
        </div>
        <div>
            <RiExchangeFundsFill />
        </div>
        <div>
            <BiSupport />
        </div>
    </div>
  )
}
