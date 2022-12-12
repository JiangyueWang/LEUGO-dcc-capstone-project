import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import parentAtDeskWithComputer from "../../assests/parentAtDeskWithComputer.png";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );

  return (
    <div className="login-regitser-page-container">
      <div className="register-page-top-img flex">
          <img src={parentAtDeskWithComputer} ></img>
      </div>
      <div className="form-container-outer flex">
        <form className="form-wrapper-inner flex" onSubmit={handleSubmit}>
          <div className="form-input-wrapper">
          <label>
            <h2>First Name:{" "}</h2>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            </label>
          </div>

          <div className="form-input-wrapper">
            <label>
              <h2>Last Name:{" "}</h2>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="form-input-wrapper">
              <label><h2>Username:{" "}</h2></label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
          <div className="form-input-wrapper">
            <label><h2>Email:{" "}</h2></label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-input-wrapper">
            <label><h2>Password:{" "}</h2></label>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            
          </div>

          <p style={{ fontSize: "12px" }}>
            NOTE: Make this an uncommon password with characters, numbers, and
            special characters!
          </p>
          <button className="primary-button">Register!</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
