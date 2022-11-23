import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import DisplaySearchResults from '../../components/SearchResultsPageComponents/DisplaySearchResults/DisplaySearchResults';

const SearchResultsPage = (props) => {
    // this is the API key to read data from Rebriable database
    const APIKEY = `25b99659e1195c90ddfc10b563ba266c`;


    // const [searchParams] = useSearchParams();
    // const valueForSearch = searchParams.get('q');
    
    const location = useLocation();
    
    const typeForSearch = location.state.typeForSearch;
    const valueForSearch = location.state.valueForSearch;
  


    const [searchResults, setSearchResults] = useState();
    
    const [allThemes, setAllThemes] = useState();

    const fetchSearchResults = async () => {
       
        if(typeForSearch === 'name') {
            try {
            let response = await axios.get(`https://rebrickable.com/api/v3/lego/sets/?ordering=-year&search=${valueForSearch}`, {
                headers: {
                    Authorization: `key ${APIKEY}`,
                },
            });
            setSearchResults(response.data.results);
            } catch (error) {
                console.log(error.response.data);
            }

        }
        // else if(typeForSearch === 'num') {
        //     console.log("searching for item number....")
        //     try {
        //         let response = await axios.get(`https://rebrickable.com/api/v3/lego/sets/76903-1/`, {
        //             headers: {
        //                 Authorization: `key ${APIKEY}`,
        //             },
        //         });
        //         setSearchResults(response);
        //         console.log(searchResults)
        //         } catch (error) {
        //             console.log(error.response.data);
        //         }
  
        // }

        console.log(`typeForSearch ${typeForSearch}`)
        console.log(`valueForSearch ${valueForSearch}`)
        console.log(searchResults)
        
                    
        // get all the themes
        // try {
        //     let response_all_themes = await axios.get(`https://rebrickable.com/api/v3/lego/themes/`, {
        //         headers: {
        //             Authorization: `key ${APIKEY}`,
        //         },
        //     });
        //     setAllThemes(response_all_themes.data.results);
        // } catch (error) {
        //     console.log(error.response.data);
        // }

    } 
    useEffect(() => {
        fetchSearchResults();
    }, [valueForSearch]);


    return ( 
    <div>
        <h1>{`search results for "${valueForSearch}"`}</h1> 


        {searchResults && <DisplaySearchResults results={searchResults} />}  
        
    </div>);
}
 
export default SearchResultsPage;