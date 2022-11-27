import React, { useEffect, useState } from 'react';
import useAuth from "../../../hooks/useAuth";
import axios from 'axios';
/*
get the themeId by clicking the AddToWishListButton 
send the themeId to Rebriable API to get the name of the theme
store the name of the theme in themeName state variable

 */
const AddToWishList = (props) => {
    const [user, token] = useAuth();

     // this is the API key to read data from Rebriable database
     const APIKEY = `25b99659e1195c90ddfc10b563ba266c`;

    //const [themeName, setThemeName] = useState();
    const [setInfo, setSetInfo] = useState({});

    // const themeNameSetter = (themeName) => {
    //     setThemeName(themeName);
    // }

    const fetchThemeName = async (themeId) => {
        try {
            let response = await axios.get(`https://rebrickable.com/api/v3/lego/themes/${themeId}`, {
                headers: {
                    Authorization: `key ${APIKEY}`,
                },
            });
            setSetInfo({
                "set_num": props.setNum,
                "set_name": props.setName,
                "release_year": props.releaseYear,
                "theme": response.data.name,
                "set_img_url":props.setImgUrl,
            })
            } catch (error) {
                console.log(error.response.data);
            }
    }

    
    
    const addSetToWishList = async () => {
        fetchThemeName(props.themeId);
        console.log(setInfo);
        try {
                await axios.post(`http://127.0.0.1:8000/${user.username}/wishlist/`, setInfo, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });

            } catch (error) {
                console.log(error.response.data);
            }
    }
    const handleAddToWishLishClick = () => {
        addSetToWishList();
    }


    return (
    <div>
        <button type='button' onClick={(e) => handleAddToWishLishClick(e)}>Add to Wish List</button>
    </div>
    );
}
 
export default AddToWishList;