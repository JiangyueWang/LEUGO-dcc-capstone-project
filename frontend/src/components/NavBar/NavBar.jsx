import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import SearchSetForm from "../SearchSetForm/SearchSetForm";
import Logo from "../../assests/logo.svg";
import NavBarMenu from "../../assests/navBarMenu.svg";
import NavBarMenuHovered from "../../assests/navBarMenuHover.svg";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  
  const navigate = useNavigate();
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [navBarMenuIsClicked, setNavBarMenuIsClicked] = useState(false);
 
  const [hovered, setHovered] = useState(false)
  const handleLogoClick = (e) => {
    navigate({
      pathname:"",
    })
    setNavBarMenuIsClicked(false);
    setIsSearchClicked(false)
  }
  const handleNavBarMenuClick = (e) => {
    e.preventDefault();
    if(!user) {
      navigate({
        pathname:"/login"
      }) 
    } else {
      setNavBarMenuIsClicked(!navBarMenuIsClicked)
    }
  }
  return (
    <nav className="navBar flex"> 

      <div className="logo" onClick={(e) => handleLogoClick(e)}>
        <img src={Logo}></img>
      </div>
      
      <div className="">
          {!isSearchClicked ? <button onClick={() => {setIsSearchClicked(!isSearchClicked)} } className="primaryButton">search</button> : null}
          {isSearchClicked ? <SearchSetForm setSearchIsClicked={setIsSearchClicked} isSearchClicked={isSearchClicked}/>  : null}
      </div>

      <div onClick={(e) => handleNavBarMenuClick(e)} >
        <img src={hovered ? NavBarMenuHovered : NavBarMenu} 
            onMouseOver={() => setHovered(!hovered)} 
            onMouseOut={() => setHovered(!hovered)}
            className="navBarMenu" 
            alt="menu"
            />
      </div>

        <ul className={(navBarMenuIsClicked) ? 'navBar-menu active' : 'navBar-menu'} >
                 <li>
                  <button className="navBar-toggle" onClick={() => setNavBarMenuIsClicked(false)}>close</button>
                </li>
                <li>
                  {user ? (<Link to={``}>MyHome</Link>) : null}
                </li>
                <li>
                  {user ? (<Link to={`${user.username}/collection`}>MyCollection</Link>) : null}
                </li>
                <li>
                  {user ? (<Link to={`${user.username}/wishlist`}>MyWishList</Link>) : null}
                </li>
                
                <li>
                  {user ? (<button onClick={logoutUser} className="navBarBtn" >Logout</button>) : null}
                </li>
        </ul>
    </nav>
  );
};

export default Navbar;
