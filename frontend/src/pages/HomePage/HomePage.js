import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";

const HomePage = () => {
  const [user, token] = useAuth();

  // As a Leugo app user, I want to see a ‘dashboard’ that shows 
  // my total brick count, 
  // my total number of owned sets
  // and how many minifigs I own


  return (
    <div className="container">
      {
        user ? 
        (<h1>Home Page for {user.username}!</h1>) :
        (<h1>Home Page</h1>)
      }
      
      {/* {cars &&
        cars.map((car) => (
          <p key={car.id}>
            {car.year} {car.model} {car.make}
          </p>
        ))} */}
    </div>
  );
};

export default HomePage;
