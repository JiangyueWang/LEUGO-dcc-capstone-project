import React, { useState } from 'react';
import { createSearchParams, useNavigate } from "react-router-dom";

const SearchSetForm = (props) => {
    const navigate = useNavigate();
    
    const [searchType, setSearchType] = useState();
    const [searchValue, setSearchValue] = useState();
    
    const handleSearchFormSubmission = (event) => {
        event.preventDefault();
        if(searchValue !== undefined) {

            // solution found on https://stackoverflow.com/questions/73753678/how-to-use-both-state-and-query-params-with-usenavigate-in-react-router
            // solution reference https://stackoverflow.com/questions/65800658/react-router-v6-navigate-to-a-url-with-searchparams
            navigate( {
                pathname:"/search",
                search: `${searchType}=${searchValue}`,
            },);
            }
            props.setSearchIsClicked(!props.isSearchClicked)
    }
    
    return ( 
    <div>
        <select value={searchType} onChange={(event) => setSearchType(event.target.value)}>
            <option>search a set by --</option>
            <option value={`name`}>search a set by name</option>
            <option value={`num`}>search a set by item number</option>
            <option value={`theme`}>search a set by theme</option>
        </select>
        <form onSubmit={(e)=>{handleSearchFormSubmission(e)}}>
            <button type='submit'>search</button>
            <input type="text" placeholder='search for sets to add collection or wishlist' onChange={(event) => setSearchValue(event.target.value)}/>
        </form>
    </div>);
}
 
export default SearchSetForm;