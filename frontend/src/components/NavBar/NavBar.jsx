import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>Logo</b>
          </Link>
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
