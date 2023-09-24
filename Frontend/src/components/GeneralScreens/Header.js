import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchForm from "./SearchForm";
import "../../Css/Header.css";
import { RiPencilFill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { BsBookmarks } from "react-icons/bs";
import SkeletonElement from "../Skeletons/SkeletonElement";
import { AuthContext } from "../../Context/AuthContext";

const Header = () => {
  const bool = localStorage.getItem("authToken") ? true : false;
  const [auth, setAuth] = useState(bool);
  const { activeUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");
  const options = [
    { value: "All", label: "All" },
    { value: "Technology", label: "Technology" },
    { value: "Coding", label: "Coding" },
    { value: "Ai", label: "Ai" },
    { value: "Finance", label: "Finance" },
    { value: "Agriculture", label: "Agriculture" },
    { value: "Fashion", label: "Fashion" },
    { value: "Food", label: "Food" },
    { value: "Music", label: "Music" },
    { value: "Others", label: "Others" },
  ];

  useEffect(() => {
    setAuth(bool);
    setTimeout(() => {
      setLoading(false);
    }, 1600);
  }, [bool]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };
  function btnHandle(opt) {
    console.log("clicked");
    setCategory(opt);
  }

  return (
    <header>
      <div className="averager">
        <Link to="/" className="logo">
          <h5>Blog Nepal</h5>
        </Link>
        {/* <div className="Category">
          <h2>Categories</h2>
          <select
            className="dropdown"
            value={category}
            onChange={(e) => btnHandle(e.target.value)}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.value}
              </option>
            ))}
          </select>
        </div> */}
        <SearchForm />
        <div className="header_options">
          {auth ? (
            <div className="auth_options">
              <Link className="addStory-link" to="/addstory">
                <RiPencilFill /> Add Story
              </Link>

              <Link to="/readList" className="readList-link">
                <BsBookmarks />
                <span id="readListLength">{activeUser.readListLength}</span>
              </Link>
              <div className="header-profile-wrapper ">
                {loading ? (
                  <SkeletonElement type="minsize-avatar" />
                ) : (
                  <img
                    src={`/userPhotos/${activeUser.photo}`}
                    alt={activeUser.username}
                  />
                )}

                <div className="sub-profile-wrap  ">
                  <Link className="profile-link" to="/profile">
                    {" "}
                    <FaUserEdit /> Profile
                  </Link>

                  <button className="logout-btn" onClick={handleLogout}>
                    {" "}
                    <BiLogOut /> Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="noAuth_options">
              <Link className="login-link" to="/login">
                Login
              </Link>

              <Link className="register-link" to="/register">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
