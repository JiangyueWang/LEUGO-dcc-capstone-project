import React, { useState } from 'react';
import { createSearchParams, useNavigate} from "react-router-dom";

const SearchSetForm = (props) => {
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState();
    
    const handleSearchFormSubmission = (event) => {
        event.preventDefault();

        navigate({
            pathname:"/search",
            search: createSearchParams(
                {
                    q:`${searchValue}`
                }).toString()
        });
        
        props.setSearchIsClicked({text: "search", isClicked: false});
    }
    
    return ( 
    <div>
        <form onSubmit={handleSearchFormSubmission}>
            <button type='submit'>search</button>
            <input type="text" placeholder='search a set' onChange={(event) => setSearchValue(event.target.value)}/>
        </form>
    </div>);
}
 
export default SearchSetForm;