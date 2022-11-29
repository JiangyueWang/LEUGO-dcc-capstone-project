import React from 'react';
import AddToWishList from '../AddToWishList/AddToWishList';
const SearchResultsInfo = (props) => {
    
    const handleAddCollectionClick = async () => {

    }
    
    
    return ( 
    <div>   
            <AddToWishList 
                selectedSetNumber={props.set.set_num} 
                selectedSetName={props.set.name} 
                releaseYear={props.set.year}
                themeId={props.set.theme_id}
                setImgUrl={props.set.set_img_url} />

            <img src={props.set.set_img_url}></img>
                <p>{props.set.name}</p>
                <p>{props.set.set_num}</p>
            <button type='button' onClick={handleAddCollectionClick}>add to my collection</button>
    </div>
    );
}
 
export default SearchResultsInfo;