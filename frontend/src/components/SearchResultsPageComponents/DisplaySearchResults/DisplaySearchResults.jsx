import React, { useEffect, useState } from 'react';
import SearchResultsInfo from '../SearchResultsInfo/SearchResultsInfo';
import axios from 'axios';
const DisplaySearchResults = (props) => {

    if (props.searchType === 'name') {
        return (
            <div>
                {
                    props.results.map ((result) => {
                    return (
                        <div>

                            <div>
                                <SearchResultsInfo set={result} />
                            </div>
                            
                        </div>

                        
                    )
                })}:()
            </div>
            
            );
    } else if (props.searchType === 'num'){
        const result = props.results;
        return (
            <div>
            <SearchResultsInfo set={result} />
            </div>
        );
    } else if (props.searchType === 'theme') {
        return (
            <div>
                {
                    props.results.map ((result) => {
                    return (
                        <SearchResultsInfo set={result} />
                    )
                })}
            </div>
        );
    }



}
 
export default DisplaySearchResults;