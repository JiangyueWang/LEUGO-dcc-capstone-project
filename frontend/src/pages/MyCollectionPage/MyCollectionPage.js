import {React, useState, useEffect} from 'react';
import useAuth from "../../hooks/useAuth";
import axios from 'axios';

import DisplaySetsInCollection from '../../components/DisplaySetsInCollection/DisplaySetsInCollection';

import "./MyCollectionPage.css";
const MyCollection = () => {
    const [user, token] = useAuth();
 
    // declated setInCollection state variable to store sets data from the database
    const [setsInCollection, setSetsinCollection] = useState()

    const fetchSetsInCollection = async () => {
        // fetch all the sets' information in the collection table from the database that belongs to loggin user
        const getSetsinCollectionUrl = `http://127.0.0.1:8000/${user.username}/collection/`;
        try {
            let response = await axios.get(`${getSetsinCollectionUrl}`, {
                 headers: {
                    Authorization: "Bearer " + token,
                  }, 
            });
            //function setSetsinCollection updates the setsInCollection state variable with all sets information fetched from database
            setSetsinCollection(() => response.data);
        } catch (error) {
            console.log(error.response.data)
        }
    }
    useEffect(() => {
        fetchSetsInCollection();
      }, []);

    return (
    <div >
        {setsInCollection ? 
            (<div className='collection-page-content-wrapper'>
            <DisplaySetsInCollection  setSetsinCollection={setsInCollection} username={user.username} usertoken={token} fetchSetsInCollection={fetchSetsInCollection}/>
            </div>) : null}
    </div>
    );
}
 
export default MyCollection;