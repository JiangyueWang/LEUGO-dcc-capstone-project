import React from 'react';
import SetInfo from '../SetInfo/SetInfo';
import "./DisplaySetsInCollection.css";
/*
DisplaySetsInCollection component passes data of sets from backend into map function, passes into SetInfo component 
*/
const DisplaySetsInCollection = (props) => {
    return ( 
    <div className='sets-in-collection-wrapper grid'>
            {props.setSetsinCollection.map((set) => {
                return (
                    <div className='set-info-outer-wrapper'>
                        <SetInfo set={set}  key={set.id} username={props.username} usertoken={props.usertoken} fetchSetsInCollection={props.fetchSetsInCollection}/>
                    </div>
                )
            })}


    </div>
    );
}
 
export default DisplaySetsInCollection;