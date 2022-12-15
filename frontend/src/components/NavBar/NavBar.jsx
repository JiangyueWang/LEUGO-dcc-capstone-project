import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import SearchSetForm from "./SearchSetForm/SearchSetForm.jsx";
import Logo from "../../assests/logo.svg";
import NavBarMenuIcon from "../../assests/navBarMenu.svg";
import NavBarMenuActived from "../../assests/navBarMenuHover.svg";
import SearchSetIcon from "../../assests/searchSetInactive.svg";
import SearchSetIconActived from "../../assests/searchSetActive.svg";
import NavBarMenu from "./NavBarMenu/NavBarMenu";

import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  // defined state variable to capture icons in NavBar click and hover effect
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isSearchHovered, setIsSearchHovered] = useState(false);

  const [isNavBarMenuClicked, setIsNavBarMenuClicked] = useState(false);
  const [isNavBarMenuHovered, setIsNavBarMenuHovered] = useState(false);

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
    <nav className="navBar-wrapper grid" style={user ? ({backgroundImage:`url("../assests/whiteBrick.svg")`}) :  ({background:"rgba(128, 128, 128, 0.4)"}) }> 
 
      <div className="logo" onClick={(e) => handleLogoClick(e)}>
        <img src={Logo}></img>
      </div>

      <div className="search-set-navBarMenu-wrapper grid">

        <div onClick={(e) => {handleSearchSetClick(e)}}
            onMouseOver={() => setIsSearchHovered(!isSearchHovered)}
            onMouseOut={() => setIsSearchHovered(!isSearchHovered)}
            className="navBar-search-set-icon"
            >
            <img src={((!isSearchHovered) && (!isSearchClicked)) ? SearchSetIcon : SearchSetIconActived }
                alt="search set icon"></img> 
        </div>
      
        <div  onClick={(e) => handleNavBarMenuClick(e)} 
            onMouseOver={() => setIsNavBarMenuHovered(!isNavBarMenuHovered)}
            onMouseOut={() => setIsNavBarMenuHovered(!isNavBarMenuHovered)}>
          <img src={!isNavBarMenuHovered && !isNavBarMenuClicked ? NavBarMenuIcon : NavBarMenuActived}
              className="navBarMenu flex" 
              alt="menu"
              />
        </div>
      </div>
      
    
    </nav>     

      {isSearchClicked ? 
        (<SearchSetForm setSearchIsClicked={setIsSearchClicked} isSearchClicked={isSearchClicked}/>): null}
      
      {user ? (<NavBarMenu 
                isNavBarMenuClicked={isNavBarMenuClicked} 
                setIsNavBarMenuClicked={setIsNavBarMenuClicked} 
                user={user}
                logoutUser={logoutUser}
                setIsSearchClicked={setIsSearchClicked}
                />) : null}
        
        {/* {user ? (<ul className={(isNavBarMenuClicked) ? 'navBar-menu active flex' : 'navBar-menu flex'} >
                    <li className="navBar-close-icon-wrapper flex"                               
                              onMouseOver={() => setIsCloseMenuHovered(!isCloseMenuHovered)}
                              onMouseOut={() => setIsCloseMenuHovered(!isCloseMenuHovered)}>
                          <span className="navBar-close-icon">
                            <img src={CloseNavMenuIcon} onClick={() => setIsNavBarMenuClicked(false)}
                              alt="close menu"
                            ></img>
                          </span>
                          <div className={isCloseMenuHovered ? "close-menu-text-active" : "close-menu-text-inactive"}>
                            <p>close menu</p>
                          </div>
                      </li>
                      
                      <li onMouseOver={() => setIsGoToMyHomeHovered(!isGoToMyHomeHovered)}
                          onMouseOut={() => setIsGoToMyHomeHovered(!isGoToMyHomeHovered)}>
                        <Link to={``}><FontAwesomeIcon className="fa" icon={faHouse} size="2x"/>
                          <div className={isGoToMyHomeHovered ? "close-menu-text-active" : "close-menu-text-inactive"}>
                              <p>go to my homepage</p>
                          </div>
                        </Link>
                      </li>

                      <li onMouseOver={() => setIsGoToMyCollectionHovered(!isGoToMyCollectionHovered)}
                          onMouseOut={() => setIsGoToMyCollectionHovered(!isGoToMyCollectionHovered)}>
                        <Link to={`${user.username}/collection`}>
                                  <img src={MyCollectionIcon}></img>
                          <div className={isGoToMyCollectionHovered ? "close-menu-text-active" : "close-menu-text-inactive"}>
                              <p>go to my collection</p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to={`${user.username}/wishlist`}>
                        <img src={MyWishListIcon}></img></Link>
                      </li>
                      
                      <li>
                        <button onClick={() => handleLogOutClick()} className="logoutButton" >Logout</button>
                      </li>

                </ul>) : null} */}
    </div>
  );
};

export default Navbar;
