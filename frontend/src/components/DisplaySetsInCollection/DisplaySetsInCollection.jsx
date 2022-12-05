import React from 'react';
import SetInfo from '../SetInfo/SetInfo';
import "./DisplaySetsInCollection.css";
import MyCollectionIcon from "../../assests/MyCollectionIcon.svg"
/*
DisplaySetsInCollection component passes data of sets from backend into map function, passes into SetInfo component 
*/
const DisplaySetsInCollection = (props) => {
    return ( 
        <div>
            <div className='flex page-icon-and-name'>
                <img src={MyCollectionIcon}></img>
                <h1>Sets In Collection</h1>
            </div>
            
            <div className='sets-in-collection-wrapper grid'>
                {props.setSetsinCollection.map((set) => {
                    return (
                        <div className='set-info-outer-wrapper'>
                            <SetInfo set={set}  key={set.id} username={props.username} usertoken={props.usertoken} fetchSetsInCollection={props.fetchSetsInCollection}/>
                        </div>
                    )
                })}
            </div>
    </div>
    );
}
 
export default DisplaySetsInCollection;