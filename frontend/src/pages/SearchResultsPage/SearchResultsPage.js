import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DisplaySearchResults from '../../components/SearchResultsPageComponents/DisplaySearchResults/DisplaySearchResults';

const SearchResultsPage = (props) => {
    // this is the API key to read data from Rebriable database
    const APIKEY = `25b99659e1195c90ddfc10b563ba266c`;

    const [searchParams, setSearchParams] = useSearchParams();

    let typeForSearch = '';
    let valueForSearch = '';

    const valueForSearchNameTemp = searchParams.get('name');
    const valueForSearchNumTemp = searchParams.get('num');
    const valueForSearchThemeTemp = searchParams.get('theme');

    
    if(valueForSearchNumTemp===null && valueForSearchThemeTemp===null) {
        typeForSearch = 'name';
        valueForSearch = searchParams.get('name');

    } else if (valueForSearchNameTemp===null && valueForSearchThemeTemp===null) {
        typeForSearch = 'num';
        valueForSearch = searchParams.get('num');
    } else {
        typeForSearch = 'theme';
        valueForSearch = searchParams.get('theme');
    }

    const [searchResults, setSearchResults] = useState();
    const [searchResultFiltered, setSearchResultFiltered] = useState();

    const searchResultSetter = (searchResult) => {
        setSearchResults(searchResult);
    }

    const fetchSearchResultsForNameSearch = async () => {
            try {
            let response = await axios.get(`https://rebrickable.com/api/v3/lego/sets/?ordering=-year&search=${valueForSearch}`, {
                headers: {
                    Authorization: `key ${APIKEY}`,
                },
            });
            searchResultSetter(response.data.results);
            // setSearchResultFiltered(response.data.results);
            } catch (error) {
                console.log(error.response.data);
            }

    }

    const fetchSearchResultsForNumberSearch = async () => {
            try {
                let response = await axios.get(`https://rebrickable.com/api/v3/lego/sets/${valueForSearch}-1/`, {
                    headers: {
                        Authorization: `key ${APIKEY}`,
                    },
                });
                searchResultSetter(response.data);
                // setSearchResultFiltered(response.data);
            } catch (error) {
                    console.log(error.response.data);
                }
    }

    const [themeSets, setThemeSets] = useState();
    const themeSetsSetter = (themeSets) => {
        setThemeSets(themeSets)
    }

    const fetechAllThemes = async () => {
        try {
            let response = await axios.get(`https://rebrickable.com/api/v3/lego/themes/`, {
                headers: {
                    Authorization: `key ${APIKEY}`,
                },
            });
            searchResultSetter(response.data.results);
            } catch (error) {
                console.log(error.response.data);
            }
    }

    const fetchSetsForSearchedTheme = async (themeId) => {
        console.log(`themeId In fetch request ${themeId}`)
        try {
            let response = await axios.get(`https://rebrickable.com/api/v3/lego/sets/?theme_id=${themeId}&ordering=-year`, {
                headers: {
                    Authorization: `key ${APIKEY}`,
                },
            });
            themeSetsSetter(response.data.results);
            } catch (error) {
                console.log(error.response.data);
            }
            console.log(themeSets)
    }
    
    useEffect(() => {
        if (typeForSearch === 'name') {
            fetchSearchResultsForNameSearch();
     
        } else if (typeForSearch === 'num') {
            fetchSearchResultsForNumberSearch();
  
        } else if (typeForSearch === 'theme') { 
            fetechAllThemes();
 
        }
        console.log(searchResults)
        console.log(searchResultFiltered)
    
    }, [valueForSearch]);

    useEffect(() => {
        if(searchResults) {
            if (typeForSearch === 'name') {
                const filteredResults = searchResults.filter(result => result.num_parts !== 0 )
                setSearchResultFiltered(filteredResults)  
            } else if (typeForSearch === 'theme') {
                const filteredResults = searchResults.filter(result => result.name === `${valueForSearch}`)
                setSearchResultFiltered(filteredResults)
                const themeId = filteredResults[0].id;
                fetchSetsForSearchedTheme(themeId);

            } else {
                setSearchResultFiltered(searchResults) 
            }
            
        } else {
            return;
        }

    }, [searchResults])


    return ( 
    <div>
        <h1>{`search results for "${valueForSearch}"`}</h1> 
        {(searchResultFiltered && typeForSearch!=='theme') && <DisplaySearchResults results={searchResultFiltered} searchType={typeForSearch}/>}  
        {(searchResultFiltered && typeForSearch==='theme' && themeSets) && <DisplaySearchResults results={themeSets} searchType={typeForSearch}/>}  

    </div>);
}
 
export default SearchResultsPage;