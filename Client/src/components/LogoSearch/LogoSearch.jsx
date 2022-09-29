import React from "react";
import "./LogoSearch.css";
import Logo from "../../img/logo.png";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
function LogoSearch(props) {
  const navigate = useNavigate();
  const handleClickHome = () => {
    return navigate("/home");
  };
  return (
    <div className="LogoSearch">
      <img src={Logo} alt="" onClick={handleClickHome} />
      <div className="Search">
        <input type="text" placeholder="#Explore" />
        <div className="s-icon">
          <FiSearch />
        </div>
      </div>
    </div>
  );
}

export default LogoSearch;
