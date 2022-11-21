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
                showModal && <SetInfoDetails setname={props.set.set_name} setimgsrc={props.set.set_img_url} showModal={setShowModal} showModalValue={showModal}/>
               }  

            </div>
    );
}
 
export default SetInfo;