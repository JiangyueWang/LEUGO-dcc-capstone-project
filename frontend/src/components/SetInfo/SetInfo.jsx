import React, { useState } from 'react';
import SetInfoDetails from '../SetsInfoDetails/SetInfoDetails';

const SetInfo  = (props) => {

    const [showModal, setShowModal] = useState(false);
    
    return ( 
            <div>
               <img src={props.set.set_img_url}></img>
                <p>{props.set.set_name}</p>
                <p>{props.set.set_num}</p>
                <button type='button' onClick={() => setShowModal((showModal) => !showModal)}>view details</button>
               
               {
                showModal && 
                <SetInfoDetails setName={props.set.set_name} 
                                setimgsrc={props.set.set_img_url} 
                                setNum = {props.set.set_num}
                                setReleaseYear={props.set.release_year}
                                setTheme = {props.set.theme}
                                setPurchaseDate = {props.set.purchase_date}
                                setBuildCompletionDate = {props.set.build_completion_date}
                                showModal={setShowModal} showModalValue={showModal}
                                username={props.username}
                                usertoken={props.usertoken}
                                fetchSetsInCollection={props.fetchSetsInCollection}

                />
               }  

            </div>
    );
}
 
export default SetInfo;