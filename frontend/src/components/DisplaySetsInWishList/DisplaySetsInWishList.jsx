import React from 'react';
import SetInfoInWishList from '../SetInfoInWishList/SetInfoInWishList';

const DisplaySetsInWishList = (props) => {
    return (
        <div>
            {props.setsInWishlist.map((set) => {
                return (
                    <SetInfoInWishList 
                        set={set} key={set.id} 
                        username={props.username} usertoken={props.usertoken}
                        fetchSetsInWishlist={props.fetchSetsInWishlist}
                        />
                )
            })}
        </div>
    );
}
 
export default DisplaySetsInWishList;