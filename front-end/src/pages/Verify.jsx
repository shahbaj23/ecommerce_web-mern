import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { clearCart } from "../Product/CartSlice";
// import toast from "rea"

export default function Verify() {
  const { user, token } = useSelector((state) => state.authentication);
//   const {cartData} = useSelector((state)=> state.cart)
  const [searchParam,setSearchParam] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const success = searchParam.get("success")
  const orderID = searchParam.get("orderId")

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        "http://localhost:3000/api/order/verifyStripe", {success, orderID, },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success){
        dispatch(clearCart())
        navigate(`/order/${user?.id}`)
      } else {
        navigate('/cart')
      }
    } catch (error) {
        console.log(error)
        // toast
    }
  };

  useEffect(()=>{
    verifyPayment()
  }, [token])

  return <div>Verify</div>;
}
