import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import Minifighead from "../../assests/LoginMinifig.svg"
import "./LoginPage.css";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  return (
    <div className="login-page-container">


      <div className="login-minifighead flex">
          <img src={Minifighead} ></img>
      </div>
      
      <div className="form-container-outer flex">
        <form className="form-wrapper-inner flex" onSubmit={handleSubmit}>
          <div className="username-input-wrapper">
              <labe><h2>Username:{" "}</h2></labe>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
          </div>

          <div className="passwrod-input-wrapper">

            <labe><h2>Password:{" "}</h2></labe>
            <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            />

          </div>

          {isServerError ? (
            <p className="error">Login failed, incorrect credentials!</p>
          ) : null}
          
          <button className="primary-button">Login!</button>

          <div className="register-wrapper">
            <p>Don’t have a LEUGO Account?</p>
            <Link to="/register"><p className="create-account-p">Create an account!</p></Link>
          </div>
          
        </form>


      </div>



    </div>
  );
};

export default LoginPage;
