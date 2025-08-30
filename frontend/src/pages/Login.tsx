import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserContext";

const Login = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {loginUser,btnLoading} = useUserData();

  async function submitHandler (e:any){
    e.preventDefault();
    loginUser(email,password,navigate);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[#121212]">
      <div className="bg-black text-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Login to Music App</h2>

        <form className="space-y-6" onSubmit={submitHandler}>
          {/* Email input */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Email or Username
            </label>
            <input
              type="email"
              placeholder="Email or username"
              className="w-full px-4 py-3 rounded-md bg-[#121212] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
              required
            />
          </div>

          {/* Password input with toggle */}
          <div className="relative">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              className="w-full px-4 py-3 pr-10 rounded-md bg-[#121212] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
              required
            />

            <span
              className="absolute right-3 top-11 cursor-pointer text-gray-400 hover:text-white"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-green-500 hover:bg-green-600 text-black font-semibold text-lg transition cursor-pointer"
            disabled={btnLoading}
          >{btnLoading ? "Logging In..." : "Log In"}
          </button>
        </form>

        {/* Extra links */}
        <div className="text-center mt-6 text-sm text-gray-400">
          <a href="" className="hover:underline">
            Forgot your password?
          </a>
        </div>

        <div className="text-center mt-6 text-sm text-gray-400">
          Don’t have an account?{" "}
          <a href="/register" className="text-white font-semibold hover:underline">
            Sign up for Music App
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
