import React from 'react';
import AddToWishList from '../AddToWishList/AddToWishList';
import AddToCollection from '../AddToCollection/AddToCollection';
import "./SearchResultsInfo.css"
const SearchResultsInfo = (props) => {
    return ( 
    <div className='flex single-search-result-inner-wrapper-flex'>   
            <AddToWishList 
                selectedSetNumber={props.set.set_num} 
                selectedSetName={props.set.name} 
                releaseYear={props.set.year}
                themeId={props.set.theme_id}
                setImgUrl={props.set.set_img_url} />

            <div className="single-search-result-img">
                    <img src={props.set.set_img_url} ></img>
            </div>
            
                <div className='single-search-result-set-info'>
                    <h2 style={{color:"black"}}>{props.set.name}</h2>
                    <p style={{color:"black"}}>{props.set.set_num}</p>
                </div>
            <div>
                <AddToCollection 
                    selectedSetNumber={props.set.set_num} 
                    selectedSetName={props.set.name} 
                    releaseYear={props.set.year}
                    themeId={props.set.theme_id}
                    setImgUrl={props.set.set_img_url}
                    setNumberParts={props.set.num_parts}
                /> 
            </div>

    </div>
    );
}
 
export default SearchResultsInfo;