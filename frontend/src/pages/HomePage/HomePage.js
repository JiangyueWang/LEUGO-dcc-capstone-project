import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";
import EntriesChartTracker from "../../components/EntriesChartTracker/EntriesChartTracker";

import Minifig from "../../assests/Minifig.svg";
import SingleBrick from "../../assests/SingleBrick.svg";
import "./HomePage.css";

import LE from "../../assests/LE.svg";
import U from "../../assests/U.svg";
import GO from "../../assests/GO.svg";

import leugoOnIphone from "../../assests/homePageiPhoneImage.png";
import SearchSetIcon from "../../assests/searchSetInactive.svg";
import NavBarMenuIcon from "../../assests/navBarMenu.svg";

const HomePage = () => {
  const [user, token] = useAuth();

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  function handleMouseMove(event) {
    const { clientX, clientY } = event;
    setCursorPosition({ x: clientX, y: clientY });
  }

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
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);

  }, [])

  return (
    <div className="homepage-container" style={user ? {backgroundColor: "rgba(255, 255, 255, 1)"} : null}>
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
            <div className="select-chart-type-wrapper">
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
        (

          <div className="home-page-wrapper-black">

          
          <div className="hero-section-wrapper flex">

            <div className="hero-section-images flex">
              <img src={LE} className="le-letters"></img>
              {/* <img src={U}></img> */}
              <img src={U} className="u-letter" style={{width:cursorPosition.x, height:cursorPosition.y}}></img>

              <img src={GO}></img>
            </div>

            <div className="home-page-section-one flex" style={{paddingTop:`${700-cursorPosition.y*3}px`}}>
              <div>
                <h1>LEUGO</h1>
                <br></br>
                <h2>
                  View your lego sets in one-stop shop
                </h2>
                <br></br>
                <br></br>
                <div>
                  <div>
                    <img src={SearchSetIcon}></img>
                    <p>Search a lego set you are looking for</p>
                  </div>
                  <br></br>
                  <div>
                    <img src={NavBarMenuIcon}></img>
                    <p>Sign in to view your personalise lego collection</p>
                  </div>
                  
                </div>
              </div>
              <div >
                <img src={leugoOnIphone} className="leugoOnIphone-img"></img>
              </div>
              
              
            </div>
          </div> 
          
          </div>
        )
      }
    </div>
  );
};

export default HomePage;
