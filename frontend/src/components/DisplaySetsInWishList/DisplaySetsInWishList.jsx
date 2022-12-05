import React from 'react';
import SetInfoInWishList from '../SetInfoInWishList/SetInfoInWishList';
import MyWishListIcon from "../../assests/WishListIcon.svg";
import "../DisplaySetsInCollection/DisplaySetsInCollection.css";
const DisplaySetsInWishList = (props) => {
    return (
        <div>
        <div className='flex page-icon-and-name'>
            <img src={MyWishListIcon}></img>
            <h1>Sets In Wish List</h1>
        </div>
        <div className='sets-in-collection-wrapper grid'>
            {props.setsInWishlist.map((set) => {
                return (
                    <div className='set-info-outer-wrapper-wishlist'>
                    <SetInfoInWishList 
                        set={set} key={set.id} 
                        username={props.username} usertoken={props.usertoken}
                        fetchSetsInWishlist={props.fetchSetsInWishlist}
                        />
                    </div>
                )
            })}
        </div>
        </div>
    );
}
 
export default DisplaySetsInWishList;