import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { BiShowAlt } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import background from '../assets/jeremy-chevallier.jpg'

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/backend/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  return (
    <div style={{backgroundSize:'cover', backgroundImage: `url(${background})`}}>
      <div className=" backdrop-blur-lg flex justify-center shadow-2xl ">
    <div className=" max-sm:mt-2  flex flex-col justify-center h-screen"  >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 place-items-center">
      <h1 className="text-3xl text-center font-semibold my-7 text-white">Sign up</h1>
        <input
          type="text"
          placeholder="username"
          className="border-b-2 p-3 rounded-lg outline-none w-96 flex self-center bg-transparent text-white placeholder:text-white max-[690px]:w-80"
          id="username"
          onChange={handleChange}
          required
        />

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
          {loading ? "Loading..." : "Sign up"}
        </button>
        <OAuth />
      <div className="flex gap-2 mt-5 text-white max-[690px]:w-64">
        <p>Already have account ?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-600 underline">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-700 mt-5">{error}</p>}
      </form>
    </div>
    </div>
    </div>
  );
}
