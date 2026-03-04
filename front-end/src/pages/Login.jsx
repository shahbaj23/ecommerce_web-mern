import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../Product/AuthSlice";
import { useEffect, useState } from "react";
import clothLogin from "../assets/clothLogin.jpg";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.authentication);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(userLogin({ email: formData.email, password: formData.password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden h-[450px]">
        <div className="md:w-1/2 hidden md:block relative">
          <img
            src={clothLogin}
            alt="login"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-white text-3xl font-bold tracking-wide">
              Elevate Your Style
            </h2>
            <p className="text-gray-200 mt-2 text-sm">
              Discover trends crafted just for you.
            </p>
          </div>
        </div>

        <div className="md:w-1/2 w-full p-10">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Sign In
          </h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            Enter your credentials to access your account
          </p>

          {error && (
            <div className="bg-red-100 text-red-600 text-sm p-2 rounded mt-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="example@gmail.com"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Enter your password"
              />
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-gray-500 hover:text-black">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-black hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
