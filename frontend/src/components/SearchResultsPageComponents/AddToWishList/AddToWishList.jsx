import React, { useEffect, useRef, useState } from 'react';
import useAuth from "../../../hooks/useAuth";
import axios from 'axios';
import AddToWishListIcon from "../../../assests/AddToWishListIcon.svg";
import AddedToWishListIcon from "../../../assests/WishListIcon.svg";
import "./AddToWishList.css";

/*
get the themeId by clicking the AddToWishListButton 
send the themeId to Rebriable API to get the name of the theme
store the name of the theme in themeName state variable
 */
const AddToWishList = (props) => {

    const [user, token] = useAuth();
    const [showDiv, setShowDiv] = useState(false);


    // this is the API key to read data from Rebriable database
    const APIKEY = `25b99659e1195c90ddfc10b563ba266c`;
    
    // use useRef() to access the theme information about the set
    const reference = useRef();

    const [isAddedSetToWishList, setIsAddedSetToWishList] = useState(false)
    
    const addSetToWishList = async (themeId) => {
        if(user) {
            try {
                let response = await axios.get(`https://rebrickable.com/api/v3/lego/themes/${themeId}`, {
                    headers: {
                        Authorization: `key ${APIKEY}`,
                    },
                });
                // name of the theme is stored in the "current" property of the reference
                reference.current = response.data.name;
                } catch (error) {
                    console.log(error.response.data);
                }
            
            // setInfo stores all the information about the that will add to the Wishlist table to backend 
            const setInfo = {
                "set_num": props.selectedSetNumber,
                "set_name": props.selectedSetName,
                "release_year": props.releaseYear,
                "theme": reference.current,
                "set_img_url":props.setImgUrl,
            }

            try {
                    await axios.post(`http://127.0.0.1:8000/${user.username}/wishlist/`, setInfo, {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    });
                    setIsAddedSetToWishList(!isAddedSetToWishList);
                    setShowDiv(true);
                } catch (error) {
                    if(error.response.status === 409) {
                        alert ("set already exist in your wish list")
                    }
                    console.log(error.response.status);
                    
                }
        } else {
            alert("please sign in...")
        }
    }
    const handleAddToWishLishClick = (e) => {
        e.preventDefault();
        addSetToWishList(props.themeId);
        setTimeout(() => {
            setShowDiv(false);
          }, 2500); // 2.5 seconds
    }


    return (
    <div className='add-to-wish-list-flex flex'>
        {showDiv ? (<p style={{color:"#000"}}>Added to wish list</p>) : null}
        <button type='button' onClick={(e) => handleAddToWishLishClick(e)}>
            <img src={!isAddedSetToWishList ? AddToWishListIcon : AddedToWishListIcon} />
        </button>

    </div>
    );
}
 
export default AddToWishList;