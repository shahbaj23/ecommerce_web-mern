import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearError, register } from "../Product/AuthSlice";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { loading, error, user } = useSelector((state) => state.authentication);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(()=>{
    if (error){
      const timer = setTimeout(() => {
        dispatch(clearError())
      }, 3000);

      return ()=> clearInterval(timer)
    }
  },[error])

  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[user,navigate])

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault()

    if(formData.password !== formData.confirmPassword){
      alert("Password do not match!")
      return;
    }
    dispatch(register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    }))
  }

  {loading && <p>Loading...</p>}

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="bg-white/50 w-[300px] md:w-[400px] mx-auto p-4 rounded-lg shadow-lg">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-black">
            Sign Up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                
                className="block text-sm/6 font-medium text-black"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  className="block w-full rounded-md bg-white shadow px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-black"
              >
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
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm/6 font-medium text-black"
                >
                  Password
                </label>
              </div>
              <div>
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
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-black"
                  >
                    Confirm-Password
                  </label>
                </div>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
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
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </form>

          <p className="mt-3 mb-6 text-sm/6 text-gray-800">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
