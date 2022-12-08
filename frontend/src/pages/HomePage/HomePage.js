import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";
import EntriesChartTracker from "../../components/EntriesChartTracker/EntriesChartTracker";

import Minifig from "../../assests/Minifig.svg";
import SingleBrick from "../../assests/SingleBrick.svg";
import "./HomePage.css";

const HomePage = () => {
  const [user, token] = useAuth();

  // define state variables that are required to store the data from the backend
  const [totalBrickCount, setTotalBrickCount] = useState();
  const [totalMinifigsCount, setTotalMinifigsCount] = useState();
  const [totalSets, setTotalSets] = useState();
  const [sameThemeCount, setSameThemeCount] = useState();
  const [chartType, setChartType] = useState('Bar');

  const fetchDashboardInfo = async () => {
    // fetch data from the backend to be displayed on login user's home page
    const getDashboardDataUrl = `http://127.0.0.1:8000/${user.username}/collection/?sum=all`;
    try {
        let response = await axios.get(`${getDashboardDataUrl}`, {
            headers: {
                Authorization: "Bearer " + token,
              }, 
        }
        );
        setTotalBrickCount(response.data.total_num_parts.num_parts__sum);
        setTotalMinifigsCount(response.data.total_num_minifigs.minifigs_num__sum);
        setTotalSets(response.data.total_num_set);
        setSameThemeCount(response.data.theme);
  
    } catch (error) {
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    fetchDashboardInfo();
  }, [])

  return (
    <div className="container">
      {
        user ? 
        (<div className="homepage-background-login-user">
          <h1>Hello {user.username}!</h1>
          <br></br>
          <div className="user-sets-info flex">
            <h2>Congraulation! You've owned {totalSets} sets in your collection!</h2>
            <br></br>
            <h3>In your collection, you have</h3>
            <ul className="">

              <li className="flex li-item-flex">
                <img src={SingleBrick}></img>
                <p>{totalBrickCount} bricks</p>
                
              </li>
            
              <li className="flex li-item-flex">
                <img src={Minifig}></img>
                <p>{totalMinifigsCount} minifigs</p>
              </li>
            </ul>
          </div>
          <div>
            <h2>View number of sets in different Theme</h2>
            <br></br>
            <div className="flex select-chart-type-wrapper">
              <p>Select a chart type</p>
              <select value={chartType} onChange={(event) => setChartType(event.target.value)}>
                <option value={"Bar"}>Bar Chart</option>
                <option value={"PieChart"}>Pie Chart</option>
              </select>
            </div>
            {sameThemeCount ? (
              <div className="flex chart-wrapper-flex"><EntriesChartTracker entries={sameThemeCount} chartType={chartType}/></div>
              ) : null} 
              </div>
        </div>
        ) :
        (<h1>Home Page</h1>)
      }
    </div>
  );
};

export default HomePage;
