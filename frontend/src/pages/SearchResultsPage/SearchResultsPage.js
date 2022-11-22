import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
const SearchResultsPage = (props) => {
    // this is the API key to read data from Rebriable database
    const APIKEY = `25b99659e1195c90ddfc10b563ba266c`;
    const [searchParams, setSearchParams] = useSearchParams();
    const value = searchParams.get('q')
    return ( 
    <div>
        <h1>search for {value}</h1>    
    </div>);
}
 
export default SearchResultsPage;