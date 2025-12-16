import { useState } from "react"
import axios from 'axios'
import { backendUrl } from "../App"
import { toast } from "react-toastify"

export default function Login({setToken}) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onHandleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/api/user/admin', {email, password})

      if(response.data.success){
        setToken(response.data.token)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(response.data.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-200">
        
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">
          Admin Panel
        </h2>

        <form onSubmit={onHandleSubmit} className="space-y-6">
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a href="#" className="text-sm text-indigo-500 hover:text-indigo-400">
                Forgot password?
              </a>
            </div>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md text-sm font-semibold shadow-md transition"
          >
            Sign In
          </button>
        </form>

      </div>
    </div>
  );
}
