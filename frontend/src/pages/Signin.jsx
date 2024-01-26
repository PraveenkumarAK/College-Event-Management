import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/User/userSlice";
import OAuth from "../components/OAuth";
import { BiShowAlt } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/backend/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/profile");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  console.log(formData);

  return (
    <div className="mt-20 max-sm:mt-2 mb-28 flex flex-col items-center">

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md backdrop-blur-lg items-center shadow-2xl rounded-lg px-10 py-12 max-[690px]:w-[375px] ">
      <h1 className="text-3xl text-center font-semibold my-7 text-white">Sign In</h1>
      
        <input
          type="email"
          placeholder="email"
          className="border-b-2 p-3 rounded-lg  outline-none w-96 flex self-center bg-transparent text-white placeholder:text-white max-[690px]:w-80"
          id="email"
          onChange={handleChange}
          required
        />

        <div className="flex">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="password"
          className="border-b-2 p-3 rounded-lg outline-none w-96 flex self-center bg-transparent text-white placeholder:text-white max-[690px]:w-80"
          id="password"
          onChange={handleChange}
        />
          <span className="flex text-xl mt-5 -ml-6 cursor-pointer text-white" onClick={handleShowPassword}>
              {showPassword ? <BiShowAlt /> : <BiSolidHide />}
          </span>
          </div>

        <button
          disabled={loading}
          className="bg-transparent w-64  flex justify-center text-white text-xl font-medium p-2 cursor-pointer rounded-lg border border-white hover:bg-white duration-300 hover:text-black"
        >
          {loading ? "Loading..." : "Sign in"}
        </button>
        <OAuth />
      <div className="flex gap-2 mt-5 text-white max-[690px]:w-64">
        <p>Don't have a account ?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-600 underline">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-700 mt-5">{error}</p>}
      </form>
    </div>
  );
}

