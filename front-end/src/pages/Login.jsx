import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../Product/AuthSlice";
import { useEffect, useState } from "react";
import clothLogin from "../assets/clothLogin.jpg"

export default function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {loading, error, user} = useSelector((state)=> state.authentication)

  const [formData, setFormData] = useState({
    email:"",
    password: ""
  })

  useEffect(()=>{
    if(user){
      navigate("/")
    }
  },[navigate, user])

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]: e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault()

    dispatch(userLogin(
      {email: formData.email,
        password: formData.password
      }
    ))
  }


  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="bg-[#617c76] flex md:flex flex-col md:flex-row gap-6 mx-auto  rounded-lg shadow-lg">
      <img className="w-[550px] h-[400px] object-cover" src={clothLogin} alt="" />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-black">Sign in to your account</h2>
        </div>
          <form onSubmit={handleSubmit} className="space-y-6 p-4">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-black">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white shadow px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-black">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black shadow outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-3 mb-6 text-sm/6 text-gray-800">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
