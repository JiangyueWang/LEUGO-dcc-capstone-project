import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import "../MyCollectionPage/MyCollectionPage.css"

import DisplaySetsInWishList from '../../components/DisplaySetsInWishList/DisplaySetsInWishList';

const WishList = () => {
    const [user, token] = useAuth();

    const [setsInWishlist, setSetsInWishlist] = useState();


    const fetchSetsInWishlist = async () => {
        const getSetsInWishlistUrl = `http://127.0.0.1:8000/${user.username}/wishlist/`
        try {
            let response = await axios.get(`${getSetsInWishlistUrl}`, {
                headers: {
                    Authorization: "Bearer " + token,
                  }, 
            });
            setSetsInWishlist(() => response.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect( () => {
        fetchSetsInWishlist();
    }, []);


    return ( 
    <div>
        {setsInWishlist ? 
            (<div className='collection-page-content-wrapper'>
                    <DisplaySetsInWishList 
                    setsInWishlist={setsInWishlist} 
                    username={user.username} 
                    usertoken={token}
                    fetchSetsInWishlist={fetchSetsInWishlist}/>
            </div>) : null}
    </div> );
}
 
export default WishList;