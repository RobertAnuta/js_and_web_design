import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios.js';
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";


const Profile = () => {
  const { deleteUser, currentUser  } = useContext(AuthContext);
  const navigate = useNavigate()

 const handleDeleteUser = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
  
    if (confirmDelete) {
      try {
        await deleteUser(currentUser.id); 
        navigate("/login");
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

const userId = useLocation().pathname.split("/")[2]

const { isLoading, error, data } = useQuery(["user"], () => 
    makeRequest.get("/users/find/" + userId).then((res) => {
    return res.data
    })
  )

const userData = data || {};

  return (
    <div className="profile">
      <div className="images">
        <img
          src={userData.coverPic}
          alt="Cover Picture"
          className="cover"
        />
        <img
          src={userData.profilePic }
          alt="Profile Picture"
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{userData.name}</span>
            <div className="info">
            </div>
          </div>
          <div className="right">
            <button onClick={handleDeleteUser}>Delete Account</button>
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
      <Posts/>
      </div>
    </div>
  );
};

export default Profile;
