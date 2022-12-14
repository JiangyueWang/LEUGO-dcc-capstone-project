import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SearchIcon from "../../../assests/searchSetInactive.svg";
import "./SearchSetForm.css";
const SearchSetForm = (props) => {
    const navigate = useNavigate();
    
    const [searchType, setSearchType] = useState();
    const [searchValue, setSearchValue] = useState();
    
    const handleSearchFormSubmission = (event) => {
        event.preventDefault();

        if (searchType !== undefined) {
            
            if(searchValue === undefined) {
                // if the user didnt eneter any value to search
                // an alert to warn user to enter the value to search
                // SearchSet form stays open
                alert("please enter a value to search");
                props.setSearchIsClicked(props.isSearchClicked);
            }
            else {
                // solution found on https://stackoverflow.com/questions/73753678/how-to-use-both-state-and-query-params-with-usenavigate-in-react-router
                // solution reference https://stackoverflow.com/questions/65800658/react-router-v6-navigate-to-a-url-with-searchparams
                navigate( {
                    pathname:"/search",
                    search: `${searchType}=${searchValue}`,
                },);
                props.setSearchIsClicked(!props.isSearchClicked)
            }
        } else {
            // if the user didnt select which type of search i.e. name, number or theme
            // an alert to warn user to select the type of search
            // SearchSet form stays open
            alert("please select type to search the set");
            props.setSearchIsClicked(props.isSearchClicked);
        }
        
            
    }
    
    return ( 
    <div className='search-set-selector-form-wrapper flex'>
        <div  className='selector-wrapper'>
            <select value={searchType} onChange={(event) => setSearchType(event.target.value)}>
                <option>search set by</option>
                <option value={`name`}>name</option>
                <option value={`num`}>number</option>
                <option value={`theme`}>theme</option>
            </select>
        </div>
        <div className="search-form-wrapper" >
            <form className="search-form" onSubmit={(e)=>{handleSearchFormSubmission(e)}}>
                    <div className='search-btn-input-wrapper flex'>
                    <button type='submit' className='search-set-button'>
                        <img src={SearchIcon}></img>
                    </button>
                    <input type="text" placeholder='search...' onChange={(event) => setSearchValue(event.target.value)}/>
                    </div>


            </form>
        </div>
    </div>
    );
}
 
export default SearchSetForm;