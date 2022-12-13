import React, { useRef, useState } from 'react';
import useAuth from "../../../hooks/useAuth";
import axios from 'axios';
import "./AddToCollectionForm.css";

const AddToCollectionForm = (props) => {
    // this is the API key to read data from Rebriable database
    const APIKEY = `25b99659e1195c90ddfc10b563ba266c`;
    const [user, token] = useAuth();
    const reference = useRef();
    const [purchaseDate, setPurchaseDate] = useState();
    const [buildCompletionDate, setBuildCompletionDate] = useState();
    const [isAddedToCollection, setIsAddedToCollection] = useState(false);

    const addToCollectionList = async (themeId, purchaseDate, buildCompletionDate) => {


        // get the theme name from the Rebricable api
        try {
            let response = await axios.get(`https://rebrickable.com/api/v3/lego/themes/${themeId}`, {
                headers: {
                    Authorization: `key ${APIKEY}`,
                },
            });
            // this response returns the themeName of the set
            reference.current = response.data.name
            } catch (error) {
                console.log(error.response.data);
            }
        const themeName = reference.current;
       
        // get the number of minifigs of the set from the Rebricable api
        try {
            let response = await axios.get(`https://rebrickable.com/api/v3/lego/sets/${props.selectedSetNumber}/minifigs/`, {
                headers: {
                    Authorization: `key ${APIKEY}`,
                },
            });
            // this response returns the number of minifigs of the set
            reference.current = response.data.count;
            } catch (error) {
                console.log(error.response.data);
            }
        const numberOfMinifigs = reference.current
        const setInfo = {
            "set_num": props.selectedSetNumber,
            "set_name": props.selectedSetName,
            "release_year": props.releaseYear,
            "theme": themeName,
            "set_img_url":props.setImgUrl,
            "num_parts": props.setNumberParts,
            "purchase_date": purchaseDate,
            "build_completion_date": buildCompletionDate,
            "minifigs_num": numberOfMinifigs,
    
        }
        console.log(setInfo)
        try {
            await axios.post(`http://127.0.0.1:8000/${user.username}/collection/`, setInfo, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            setIsAddedToCollection(true)

        } catch (error) {
            console.log(error.response.data);
            if (error.response.status) {
                alert("duplicated")
            }
            console.error(error.response.status)
        } 

    }


    const handleAddToCollectionFormSubmission = (event) => {
        event.preventDefault();
        addToCollectionList(props.themeId, purchaseDate, buildCompletionDate)
    }

    return (  
    <div className='add-to-collection-form-wrapper'>
        <form onSubmit={(event) => handleAddToCollectionFormSubmission(event)} className="add-to-collection-form-flex flex">
            <div>
                <p>Purchase date (required)</p>
                <input type='date' onChange={(event) => setPurchaseDate(event.target.value)} required></input>
            </div>

            <div>
                <p>Build completion date (optional)</p>
                <input type='date' onChange={(event) => setBuildCompletionDate(event.target.value)}></input>
            </div>

            <button type='submit' className='primary-button' style={{margin:"1rem 0"}}>{!isAddedToCollection ? ("Add to Collection") : ("Added!")}</button>
        </form>
    </div>);
}
 
export default AddToCollectionForm;