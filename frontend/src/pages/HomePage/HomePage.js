import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";

const HomePage = () => {
  const [user, token] = useAuth();
  const [totalBrickCount, setTotalBrickCount] = useState();
  const [totalMinifigsCount, setTotalMinifigsCount] = useState();
  const [totalSets, setTotalSets] = useState();
  const [sameThemeCount, setSameThemeCount] = useState();

    // As a Leugo app user, I want to see a ‘dashboard’ that shows 
    // my total brick count, 
    // my total number of owned sets
    // and how many minifigs I own
    const fetchDashboardInfo = async () => {
      const getDashboardDataUrl = `http://127.0.0.1:8000/${user.username}/collection/?sum=all`;
      try {
          let response = await axios.get(`${getDashboardDataUrl}`, {
              headers: {
                  Authorization: "Bearer " + token,
                }, 
          }
          );
          console.log(response.data)
          setTotalBrickCount(response.data.total_num_parts.num_parts__sum);
          setTotalMinifigsCount(response.data.total_num_minifigs.minifigs_num__sum);
          setTotalSets(response.data.total_num_set)
          setSameThemeCount(response.data.theme)
      } catch (error) {
        console.log(error.response.data)
      }
  }
  useEffect(() => {
    fetchDashboardInfo();
    console.log(totalBrickCount)
  }, [])

  return (
    <div className="container">
      {
        user ? 
        (<div>
          <h1>Home Page for {user.username}!</h1>
          <ul>
            <li>total brick count :{totalBrickCount}</li>
            <li>total minifigs count :{totalMinifigsCount}</li>
            <li>total number of owned sets: {totalSets}</li>
            {sameThemeCount ? (
              sameThemeCount.map((theme) => {
                return (
                  <li>{theme.theme}: {theme.count}</li>
                  )

              })) : null
            }
          </ul>
        </div>) :
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
