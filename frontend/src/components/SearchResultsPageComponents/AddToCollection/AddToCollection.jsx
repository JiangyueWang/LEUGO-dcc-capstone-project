import React, { useState } from 'react';
import AddToCollectionForm from '../AddToCollectionForm/AddToCollectionForm';
import useAuth from "../../../hooks/useAuth";
const AddToCollection = (props) => {
    const [user, token] = useAuth();
    const [addToCollectionIsClicked, setAddToCollectionIsClicked] = useState(false);
    
    const handleAddToCollectionClick = (e) => {
        e.preventDefault();
        if (user) {
            setAddToCollectionIsClicked(!addToCollectionIsClicked);
        } else {
            alert("please sign in...");
        }
    }
;
    return (
    <div>
    {!addToCollectionIsClicked ?
        (<button type='button' className='primary-button' style={{width:"100%"}} onClick={(e) => handleAddToCollectionClick(e)}>Add to Collection</button>)
        : null
    }
        
    {addToCollectionIsClicked ? 
        <AddToCollectionForm 
            selectedSetNumber={props.selectedSetNumber} 
            selectedSetName={props.selectedSetName} 
            releaseYear={props.releaseYear}
            themeId={props.themeId}
            setImgUrl={props.setImgUrl}
            setNumberParts={props.setNumberParts}

        />
        : null}

    </div>);
}
 
export default AddToCollection;