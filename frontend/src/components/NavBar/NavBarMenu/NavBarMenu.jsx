import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CloseNavMenuIcon from "../../../assests/CloseMenu.svg";
import MyCollectionIcon from "../../../assests/MyCollectionIcon.svg"
import MyWishListIcon from "../../../assests/WishListIcon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons'

const NavBarMenu = (props) => {
    const [isCloseMenuHovered, setIsCloseMenuHovered] = useState(false);
    const [isGoToMyHomeHovered, setIsGoToMyHomeHovered] = useState(false);
    const [isGoToMyCollectionHovered, setIsGoToMyCollectionHovered] = useState(false);
    const [isGoToMyWishListHovered, setIsGoToMyWishListHovered] = useState(false);
    
    const ref = useRef();
    
    useEffect(() => {
      const checkIfClickedOutside = (event) => {

        // if clicked outside the ul close the navBar menu
        if(!ref.current.contains(event.target)) {
            props.setIsNavBarMenuClicked(false);
        }
      }
      document.addEventListener("mousedown", checkIfClickedOutside)
    },[])

    const handleLogOutClick = () => {
        props.logoutUser();
        props.setIsNavBarMenuClicked(false);
        props.setIsSearchClicked(false);
      }

    return (
    <div >

        <ul ref={ref} className={(props.isNavBarMenuClicked) ? 'navBar-menu active flex' : 'navBar-menu flex'} >

            {/* close navBar menu */}
            <li className="navBar-close-icon-wrapper flex"                               
                    onMouseOver={() => setIsCloseMenuHovered(!isCloseMenuHovered)}
                    onMouseOut={() => setIsCloseMenuHovered(!isCloseMenuHovered)}
                    onClick={() => props.setIsNavBarMenuClicked(false)}>
                <span className="navBar-close-icon">
                <img src={CloseNavMenuIcon}
                    alt="close menu"
                ></img>
                </span>
                <div className={isCloseMenuHovered ? "close-menu-text-active" : "close-menu-text-inactive"}>
                <p>close menu</p>
                </div>
            </li>
            
            {/* Go to my homepage */}
            <li onMouseOver={() => setIsGoToMyHomeHovered(!isGoToMyHomeHovered)}
                onMouseOut={() => setIsGoToMyHomeHovered(!isGoToMyHomeHovered)}>
                <Link to={``}><FontAwesomeIcon className="fa" icon={faHouse} size="2x"/>
                    <div className={isGoToMyHomeHovered ? "close-menu-text-active" : "close-menu-text-inactive"}>
                        <p>Go to my homepage</p>
                    </div>
                </Link>
            </li>

            {/* Go to my collection */}
            <li onMouseOver={() => setIsGoToMyCollectionHovered(!isGoToMyCollectionHovered)}
                onMouseOut={() => setIsGoToMyCollectionHovered(!isGoToMyCollectionHovered)}>
                <Link to={`${props.user.username}/collection`}>
                    <img src={MyCollectionIcon}></img>
                    <div className={isGoToMyCollectionHovered ? "close-menu-text-active" : "close-menu-text-inactive"}>
                        <p>Go to my Collection</p>
                    </div>
                </Link>
            </li>
            
            {/* Go to my wish list */}
            <li onMouseOver={() => setIsGoToMyWishListHovered(!isGoToMyWishListHovered)}
                onMouseOut={() => setIsGoToMyWishListHovered(!isGoToMyWishListHovered)}>
                <Link to={`${props.user.username}/wishlist`}>
                    <img src={MyWishListIcon}></img>
                    <div className={isGoToMyWishListHovered ? "close-menu-text-active" : "close-menu-text-inactive"}>
                        <p>Go to my Wish List</p>
                    </div>
                </Link>
            </li>
                      
            <li>
                <button onClick={() => handleLogOutClick()} className="logoutButton" >Logout</button>
            </li>

        </ul>

    </div>
    );
}
 
export default NavBarMenu;