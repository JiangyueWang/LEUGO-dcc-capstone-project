import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import SearchSetForm from "../SearchSetForm/SearchSetForm";
import Logo from "../../assests/logo.svg";
import NavBarMenuIcon from "../../assests/navBarMenu.svg";
import NavBarMenuActived from "../../assests/navBarMenuHover.svg";
import SearchSetIcon from "../../assests/searchSetInactive.svg";
import SearchSetIconActived from "../../assests/searchSetActive.svg";
import CloseNavMenuIcon from "../../assests/CloseMenu.svg";
import MyCollectionIcon from "../../assests/MyCollectionIcon.svg"
import MyWishListIcon from "../../assests/WishListIcon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons'

import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  
  const navigate = useNavigate();
  
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isNavBarMenuClicked, setIsNavBarMenuClicked] = useState(false);
 
  // const [hovered, setHovered] = useState(false)
  // const [SearchSetHovered, setSearchSetHovered] = useState(false)
  
  
  const handleLogoClick = (e) => {
    // when click the logo of the NavBar, it navigates the user to homepage
    navigate({
      pathname:"",
    })
    setIsNavBarMenuClicked(false);
    setIsSearchClicked(false);
    // setSearchSetHovered(false);
  }
  
  const handleNavBarMenuClick = (e) => {
    e.preventDefault();
    setIsSearchClicked(false);
    if(!user) {
      navigate({
        pathname:"/login"
      }) 
      setIsNavBarMenuClicked(!isNavBarMenuClicked);
    } else {
      setIsNavBarMenuClicked(!isNavBarMenuClicked);
      // setSearchSetHovered(false);
    }
  }
  const handleSearchSetClick = (e) => {
    e.preventDefault();
    setIsSearchClicked(!isSearchClicked);
    setIsNavBarMenuClicked(false);
    // setSearchSetHovered(!SearchSetHovered)
  }
  return (
    <div>
    <nav className="navBar-wrapper grid"> 
 
      <div className="logo" onClick={(e) => handleLogoClick(e)}>
        <img src={Logo}></img>
      </div>

      <div className="search-set-navBarMenu-wrapper grid">
        <div onClick={(e) => {handleSearchSetClick(e)}} className="search-set-icon">
            <img src={!isSearchClicked ? SearchSetIcon : SearchSetIconActived}
                //  src={SearchSetHovered ? SearchSetIconHovered : SearchSetIcon} 
                // onMouseOver={() => setSearchSetHovered(!SearchSetHovered)} 
                // onMouseOut={() => setSearchSetHovered(!SearchSetHovered)}

                alt="search set icon"></img> 
        </div>
      
        <div  onClick={(e) => handleNavBarMenuClick(e)} >
          <img src={!isNavBarMenuClicked ? NavBarMenuIcon : NavBarMenuActived}
              // src={hovered ? NavBarMenuHovered : NavBarMenu} 
              // onMouseOver={() => setHovered(!hovered)} 
              // onMouseOut={() => setHovered(!hovered)}
              className="navBarMenu flex" 
              alt="menu"
              />
        </div>
      </div>
      
    
    </nav>     

      {isSearchClicked ? 
        (<SearchSetForm setSearchIsClicked={setIsSearchClicked} isSearchClicked={isSearchClicked}/>): null}
        
        {user ? (  <ul className={(isNavBarMenuClicked) ? 'navBar-menu active flex' : 'navBar-menu flex'} >
                      <li className="navBar-close-icon-wrapper flex">
                          <div className="navBar-close-menu-text">close menu</div>
                          <span className="navBar-close-icon">
                            <img src={CloseNavMenuIcon} onClick={() => setIsNavBarMenuClicked(false)}></img>
                          </span>
                      </li>
                  <li>
                    {user ? (<Link to={``}><FontAwesomeIcon className="fa" icon={faHouse} size="2x"/></Link>) : null}
                  </li>
                  <li>
                    {user ? (<Link to={`${user.username}/collection`}>
                              <img src={MyCollectionIcon}></img>

                              </Link>) : null}
                  </li>
                  <li>
                    {user ? (<Link to={`${user.username}/wishlist`}>
                    <img src={MyWishListIcon}></img></Link>) : null}
                  </li>
                  
                  <li>
                    {user ? (<button onClick={logoutUser} className="logoutButton" >Logout</button>) : null}
                  </li>
        </ul>) : null}
    </div>
  );
};

export default Navbar;
