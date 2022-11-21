import React, { useEffect, useRef, useState } from 'react';
import "./SetInfoDetails.css"
const SetInfoDetails = (props) => {
    // const [isActive, setIsActive] = useState(false)
    // const [modalClass, setModalClass] = useState('modal-actice')
    const ref = useRef()
    useEffect(() => {
      const checkIfClickedOutside = (event) => {
        // console.log(ref.current)
        // console.log(ref.current.contains(event.target))
        if(!ref.current.contains(event.target)) {
            props.showModal(false)
        }
      }
      document.addEventListener("mousedown", checkIfClickedOutside)
    },[])
    const handleCloseModalClick = (event) => {
        props.showModal(false)
    }

    return (
    <div>
        <div className="modal-active">
            <div className='modal-content-wrapper' ref={ref}>

                    <img className='modal-img' src={props.setimgsrc}></img>

                    <button type='button' onClick={handleCloseModalClick}>close</button>
            </div>  
        </div>


        
    </div> );
}
 
export default SetInfoDetails;