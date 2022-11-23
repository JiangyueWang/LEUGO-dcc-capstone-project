import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import SearchSetForm from "../SearchSetForm/SearchSetForm";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSearchClicked, setIsSearchClicked] = useState({text: "search", isClicked: false});

  const searchIsClick = (search) => {
    const updatedSearchValue = {
      text: "",
      isClicked: !search.isClicked
    }
    return updatedSearchValue;
  }

  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>Logo</b>
          </Link>
        </li>
        <li>

          {!isSearchClicked.isClicked && <button onClick={() => {setIsSearchClicked(searchIsClick(isSearchClicked))}}>{isSearchClicked.text}</button>}
          {
            isSearchClicked.isClicked && <SearchSetForm setSearchIsClicked={setIsSearchClicked} />
          }
        </li>
          {
            user && (
                    <li>
                      <Link to={`${user.username}/collection`}>
                        <b>MyCollection</b>
                      </Link>
                    </li>
                    )
            }

            {
            user && (
                    <li>
                      <Link to={`${user.username}/wishlist`}>
                        <b>Wish List</b>
                      </Link>
                    </li>
                    )
            }

        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
