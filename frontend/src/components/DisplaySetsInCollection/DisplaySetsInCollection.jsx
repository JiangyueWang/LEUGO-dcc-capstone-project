import React from 'react';
import SetInfo from '../SetInfo/SetInfo';
/*
DisplaySetsInCollection component passes data of sets from backend into map function, passes into SetInfo component 
*/
const DisplaySetsInCollection = (props) => {
    return ( 
    <div>
            {props.setSetsinCollection.map((set) => {
                return (
                    <div>
                        <SetInfo set={set}  key={set.id} username={props.username} usertoken={props.usertoken} fetchSetsInCollection={props.fetchSetsInCollection}/>
                    </div>
                )
            })}


    </div>
    );
}
 
export default DisplaySetsInCollection;