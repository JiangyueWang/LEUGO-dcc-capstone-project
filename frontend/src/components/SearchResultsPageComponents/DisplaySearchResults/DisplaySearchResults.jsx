import React from 'react';
import SearchResultsInfo from '../SearchResultsInfo/SearchResultsInfo';

const DisplaySearchResults = (props) => {

    if (props.results.length > 1) {
        return (

            <div>
                {props.results.map ((result) => {
                    return (
                        <SearchResultsInfo set={result} />
                        
                    )
                })}
            </div>
            
            );
    } else {
        return (
            <div>{props.result}</div>
        )
    }



}
 
export default DisplaySearchResults;