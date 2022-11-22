import axios from 'axios';
import React from 'react';

const SetInfoInWishList = (props) => {
    
    const handleDeleteSetInWishListClick = async () => {
        const deleteSetInWishListUrl = `http://127.0.0.1:8000/${props.username}/wishlist/${props.set.set_num}` 
        try {
            await axios.delete(`${deleteSetInWishListUrl}`, {
                headers: {
                    Authorization: `Bearer ${props.usertoken}`,
                },
            });
            props.fetchSetsInWishlist();
        } catch (error) {
            console.log(error.response.data);
        }
    }
    
    return (
    <div>
        <img src={props.set.set_img_url}></img>
        <p>{props.set.set_name}</p>
        <p>{props.set.set_num}</p>
        <p>{props.set.release_year}</p>
        <p>{props.set.theme}</p>
        <button type='button' onClick={handleDeleteSetInWishListClick}>Delete</button>
    </div>
    );
}
 
export default SetInfoInWishList;