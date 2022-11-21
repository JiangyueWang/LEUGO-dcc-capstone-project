import {React, useState, useEffect} from 'react';
import useAuth from "../../hooks/useAuth";
import axios from 'axios';

import DisplaySetsInCollection from '../../components/DisplaySetsInCollection/DisplaySetsInCollection';

const MyCollection = () => {
    const [user, token] = useAuth();
    const [setsInCollection, setSetsinCollection] = useState()

    const fetchSetsInCollection = async () => {
        // fetch all the sets in the collection table from the database that belongs to loggin user
        const getSetsinCollectionUrl = `http://127.0.0.1:8000/${user.username}/collection/`;
        try {
            let response = await axios.get(`${getSetsinCollectionUrl}`, {
                 headers: {
                    Authorization: "Bearer " + token,
                  }, 
            });
            setSetsinCollection(response.data);
        } catch (error) {
            console.log(error.response.data)
        }
    }
    useEffect(() => {
        fetchSetsInCollection();
      }, []);
    
    console.log(setsInCollection)
    return (
    <div>
        {setsInCollection && <DisplaySetsInCollection  setSetsinCollection={setsInCollection}/>}
    </div>);
}
 
export default MyCollection;