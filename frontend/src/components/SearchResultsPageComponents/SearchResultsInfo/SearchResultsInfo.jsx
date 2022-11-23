import React from 'react';
const SearchResultsInfo = (props) => {
    
    const handleAddCollectionClick = async () => {

    }
    
    
    return ( 
    <div>
            <img src={props.set.set_img_url}></img>
                <p>{props.set.name}</p>
                <p>{props.set.set_num}</p>
            <button type='button' onClick={handleAddCollectionClick}>add to my collection</button>
    </div>
    );
}
 
export default SearchResultsInfo;