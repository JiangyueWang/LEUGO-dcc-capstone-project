import React, { useState } from 'react';
import AddToWishList from '../AddToWishList/AddToWishList';
import AddToCollection from '../AddToCollection/AddToCollection';
const SearchResultsInfo = (props) => {
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
            <AddToCollection 
                selectedSetNumber={props.set.set_num} 
                selectedSetName={props.set.name} 
                releaseYear={props.set.year}
                themeId={props.set.theme_id}
                setImgUrl={props.set.set_img_url}
                setNumberParts={props.set.num_parts}
            />
    </div>
    );
}
 
export default SearchResultsInfo;