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
                        <SearchResultsInfo set={result} />
                        
                    )
                })}
            </div>
            
            );
    } else if (props.searchType === 'num'){
        return (
            <div>
                <img src={props.results.set_img_url} />
                <div>{props.results.name}</div>
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