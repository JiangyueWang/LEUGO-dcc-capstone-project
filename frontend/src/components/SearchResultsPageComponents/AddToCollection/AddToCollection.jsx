import React, { useState } from 'react';
import AddToCollectionForm from '../AddToCollectionForm/AddToCollectionForm';
const AddToCollection = (props) => {
    const [addToCollectionIsClicked, setAddToCollectionIsClicked] = useState(false);
    return (
    <div>
    {!addToCollectionIsClicked ?
        (<button type='button' onClick={() => setAddToCollectionIsClicked(!addToCollectionIsClicked)}>Add to Collection</button>)
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