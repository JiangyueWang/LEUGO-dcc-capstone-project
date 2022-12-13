import React from 'react';
import SearchResultsInfo from '../SearchResultsInfo/SearchResultsInfo';
import "./DisplaySearchResults.css"
const DisplaySearchResults = (props) => {

    if (props.searchType === 'name') {
        return (
            <div className='search-results-wrapper grid'>
                {
                    props.results.map ((result) => {
                    return (
                        <div className='single-search-result-outter-wrapper'>
                                <SearchResultsInfo set={result} key={result.set_num}/>
                        </div>

                        
                    )
                })}:()
            </div>
            
            );
    } else if (props.searchType === 'num'){
        const result = props.results;
        return (
            <div className='single-search-result-outter-wrapper'>
            <SearchResultsInfo set={result} key={result.set_num}/>
            </div>
        );
    } else if (props.searchType === 'theme') {
        return (
            <div className='search-results-wrapper grid'>
                {
                    props.results.map ((result) => {
                    return (
                        <div className='single-search-result-outter-wrapper'>
                            <SearchResultsInfo set={result} key={result.set_num}/>
                        </div>
                        
                    )
                })}
            </div>
        );
    }



}
 
export default DisplaySearchResults;