import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserContext";

const Register = () => {
    const [name, SetName] = useState("");
    const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {registerUser,btnLoading} = useUserData();

  async function submitHandler (e:any){
    e.preventDefault();
    registerUser(name,email,password,navigate);
  }

  return (
<div className="flex items-center justify-center h-screen bg-[#121212]">
      <div className="bg-black text-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Register to Music App</h2>

        <form className="space-y-6" onSubmit={submitHandler}>

           {/* For Name  */}

            <div>
            <label className="block text-sm font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 rounded-md bg-[#121212] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={name}
              onChange={(e) => SetName(e.target.value)}
              required
            />
          </div>

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
          >{btnLoading ? "Please Wait..." : "Register"}
          </button>
        </form>


        <div className="text-center mt-6 text-sm text-gray-400">
           Have an account?{" "}
          <a href="/login" className="text-white font-semibold hover:underline">
            Login for Music App
          </a>
        </div>
      </div>
    </div>
  )
}

export default Register
