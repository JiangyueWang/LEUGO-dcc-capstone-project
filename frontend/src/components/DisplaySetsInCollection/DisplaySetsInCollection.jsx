import React from 'react';
import SetInfo from '../SetInfo/SetInfo';

const DisplaySetsInCollection = (props) => {
    return ( 
    <div>
            {props.setSetsinCollection.map((set) => {
                return (
                    <div>
                        <SetInfo set={set}/>
                    </div>
                )
            })}


    </div>
    );
}
 
export default DisplaySetsInCollection;