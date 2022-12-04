import React, { useState } from 'react';
import SetInfoDetails from '../SetsInfoDetails/SetInfoDetails';
import "./SetInfo.css";

/** 
 * SetInfo component display basic information about every set on the page, an image of the set, name of the set and the number of the set
*/
const SetInfo  = (props) => {

    const [showModal, setShowModal] = useState(false);
    
    return ( 
            <div className='set-general-info-inner-wrapper'>
                <div className='set-general-info-content-wrapper grid'>
                    <img src={props.set.set_img_url} className="set-in-collection-img"></img>
                   
                    <div className='set-name-num-text-wrapper'>
                        <div className='set-name-text'>
                            <h2>{props.set.set_name}</h2>
                        </div>
                        <div>
                            <p>{props.set.set_num}</p>
                        </div>
                    </div>

    
                    <button type='button' className="primary-button" onClick={() => setShowModal((showModal) => !showModal)}>View Details</button>
                </div>
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