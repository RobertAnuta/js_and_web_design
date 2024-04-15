import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import iconImage from '../../assets/icon-left-font-monochrome-black.png';
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);

    const navigate = useNavigate()

 const handleLogout = () => {
  logout();
  navigate("/login"); 
};

const handleProfile = () => {
  navigate("/profile/" + currentUser.id); 

}

  return (
    <div className="navbar">
      <div className="left">
        <Link>
          <img className="logo" src={iconImage} alt="logo" to="/"/>
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
      </div>
      <div className="right">
        <div className="user" onClick={handleProfile}>
          <img
            src={currentUser.profilePic}
            alt="profile picture"
          />
          <span>{currentUser.name}</span>
        </div>
        <button onClick={handleLogout}>Logout</button>

      </div>
    </div>
  );
};

export default Navbar;
