import { FaSearch } from "react-icons/fa";
import logo from "../assets/kce-high-resolution-logo-transparent.png";
import { Link , useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [SearchTerm , setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm',SearchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="">
      <div className="flex justify-between items-center p-2">
        <Link to="">
          <h1 className="flex flex-wrap">
            <div className="h-8">
              <img src={logo} className="h-full max-[690px]:h-6 max-[690px]:w-16" />
            </div>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="text-white border border-gray-400 bg-transparent p-3 rounded-lg flex items-center max-[690px]:hidden">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 placeholder:text-white "
            value={SearchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
          <FaSearch className="" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="">
            <li className="max-[690px]:text-sm text-white hover:underline">
              Home
            </li>
          </Link>
          <Link to="/search">
            <li className="max-[690px]:text-sm text-white hover:underline">
              Events
            </li>
          </Link>
          <Link to="/about">
            <li className="max-[690px]:text-sm text-white hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-8 w-8 object-cover mr-5"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="max-[690px]:text-sm text-white hover:underline pr-5">
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
