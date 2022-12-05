import axios from 'axios';
import React from 'react';
import "../SetInfo/SetInfo.css";
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
    
    const handleSearchSetonLego = () => {
        const setNum = props.set.set_num;
        const setNumNew = setNum.substring(setNum.length - 2, setNum);
        const searchSetOnLegoURL = `https://www.lego.com/en-au/search?q=${setNumNew}`;
        window.open(searchSetOnLegoURL);
    } 
    const handleSearchSetonAmazon = () => {
        const setNum = props.set.set_num;
        const setNumNew = setNum.substring(setNum.length - 2, setNum);
        const searchSetOnLegoURL = `https://www.amazon.com.au/s?k=LEGO+${setNumNew}+${props.set.set_name}`;
        window.open(searchSetOnLegoURL);
    } 

    return (
    <div className='set-general-info-inner-wrapper'>
        <div className='set-general-info-content-wrapper grid'>
             <img  className="set-in-collection-img" src={props.set.set_img_url}></img>

            <div className='set-name-num-text-wrapper'>
                <h2>{props.set.set_name}</h2>
                <table>
                    <tbody>
                        <tr>
                            <td><h3>Item Number</h3></td>
                            <td><p>{props.set.set_num}</p></td>
                        </tr>
                        <tr>
                            <td><h3>Release Year</h3></td>
                            <td><p>{props.set.release_year}</p></td>
                        </tr>
                        <tr>
                            <td><h3>Theme</h3></td>
                            <td><p><p>{props.set.theme}</p></p></td>
                        </tr>
                        
                    </tbody>
                </table> 
            </div>
           
           <div className='flex check-price-buttons'>
                <button type='button' className="check-price-on-lego-site-button" onClick={() => handleSearchSetonLego()}>Price on Lego Official</button>
                <button type='button' className="check-price-on-amazon-site-button" onClick={() => handleSearchSetonAmazon()}>Price on Amazon</button>
            </div>
       <button type='button' className="primary-button" onClick={handleDeleteSetInWishListClick}>Delete</button></div>

    </div>
    );
}
 
export default SetInfoInWishList;