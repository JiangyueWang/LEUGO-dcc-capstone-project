import React, { useEffect, useRef, useState} from 'react';
import axios from 'axios';
import UpdateDatesForm from '../UpdateDatesForm/UpdateDatesForm';
import "./SetInfoDetails.css"

/*

SetInfoDetails component will show up as a modal on top of the screen which display all details information about the set
information of the set will be displayed: name of the set, release year, theme, purchase and build completion date

SetInfoDetails component also consists a delete button and a update button, the delete button allows user to delete the sets from the database 
and the update button will display a UpdateDatesForm to allow user to update the purchase or build completion date of the current set


*/
const SetInfoDetails = (props) => {
    const ref = useRef();
    const [showUpdateDatesForm, setShowUpdateDatesForm] = useState(false)
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

    const handleDeleteSetClick = async () => {
        // once the delete button clicked
        // this function triggers and send a delete request to the user collection table
        const deleteASetUrl = `http://127.0.0.1:8000/${props.username}/collection/${props.setNum}`;
        try {
            await axios.delete(`${deleteASetUrl}`, {
                headers: {
                    Authorization: `Bearer ${props.usertoken}`,
                },
            });
        } catch (error) {
            console.log(error)
        }
        props.fetchSetsInCollection();
    }
    
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
                    <button type='button' onClick={() => {setShowUpdateDatesForm((showUpdateDatesForm) => !showUpdateDatesForm)}}>update</button>
                    <button type='button' onClick={handleDeleteSetClick}>Delete</button>
                    {
                        showUpdateDatesForm && 
                        <UpdateDatesForm 
                            setnum={props.setNum} 
                            username={props.usertoken} 
                            usertoken={props.usertoken}
                            fetchSetsInCollection={props.fetchSetsInCollection}
                            />
                    }

            </div>  
        </div>


        
    </div> );
}
 
export default SetInfoDetails;