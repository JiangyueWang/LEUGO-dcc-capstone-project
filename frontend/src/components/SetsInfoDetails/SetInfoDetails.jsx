import React, { useEffect, useRef} from 'react';
import "./SetInfoDetails.css"
const SetInfoDetails = (props) => {
    const ref = useRef();
    
    useEffect(() => {
      const checkIfClickedOutside = (event) => {
        // console.log(ref.current)
        // console.log(ref.current.contains(event.target))
        // if clicked outside the modal-content-wrapper div, showModal turns to false, close the modal
        if(!ref.current.contains(event.target)) {
            props.showModal(false);
        }
      }
      document.addEventListener("mousedown", checkIfClickedOutside)
    },[])

    return (
    <div>
        <div className="modal-active">
            <div className='modal-content-wrapper' ref={ref}>
                    <button type='button' onClick={() => {props.showModal(false)}}>close</button>
                    <div>
                       <img className='modal-img' src={props.setimgsrc}></img>
                        <p>{props.setName}</p>
                        <p>{props.setNum}</p>
                        <p>ReleaseYear{props.setReleaseYear}</p>
                        <p>Theme{props.setTheme}</p>
                        <p>PurchaseDate{props.setPurchaseDate}</p>
                        <p>BuildCompletionDate{props.setBuildCompletionDate}</p> 
                    </div>

            </div>  
        </div>


        
    </div> );
}
 
export default SetInfoDetails;