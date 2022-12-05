import React, { useEffect, useRef, useState} from 'react';
import axios from 'axios';
import UpdateDatesForm from '../UpdateDatesForm/UpdateDatesForm';
import CloseNavMenuIcon from "../../assests/CloseMenu.svg";
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
        <div className="modal-active grid">
            <div className='modal-content-wrapper-outer grid' ref={ref}>
                
                <div className='modal-content-wrapper-innter'>

                    <div className="close-modal-btn flex">                    
                        <button  type='button' onClick={() => {props.showModal(false)}}>
                            <img src={CloseNavMenuIcon}></img>
                        </button>
                    </div>
                    <div className='set-info-details-content grid'>

                        <img className='modal-img' src={props.setimgsrc}></img>
                        <div className='set-info-details-content-text'>
                        <h2>{props.setName}</h2>
                            <table className='set-info-table'>
                            <tbody>
                                <tr>
                                    <td><h3>Item Number</h3></td>
                                    <td><p>{props.setNum}</p></td>
                                </tr>
                                <tr>
                                    <td><h3>Release Year</h3></td>
                                    <td><p>{props.setReleaseYear}</p></td>
                                </tr>
                                <tr>
                                    <td><h3>Theme</h3></td>
                                    <td><p>{props.setTheme}</p></td>
                                </tr>
                                <tr>
                                    <td><h3>Purchase Date</h3></td>
                                    <td><p>{props.setPurchaseDate}</p></td>
                                </tr>
                                <tr>
                                    <td><h3>Build Completion Date</h3></td>
                                    <td><p>{props.setBuildCompletionDate}</p></td>
                                </tr>
                            </tbody>
                                
                            </table>
                            
                            {/* <h3>Item Number</h3>
                            <p>{props.setNum}</p>
                            <h3>Release Year</h3>
                            
                            <p>{props.setReleaseYear}</p>
                            <h3>Theme</h3>
                            <p>{props.setTheme}</p>
                            <h3>Purchase Date</h3>
                            <p>{props.setPurchaseDate}</p>
                            <h3>Build Completion Date</h3>
                            <p>{props.setBuildCompletionDate}</p>  */}
                        </div>
                    </div>
                    {!showUpdateDatesForm ? (
                            <div className='set-info-details-buttons flex'>
                            <button type='button' class="secondary-button wider-buttons" onClick={() => {setShowUpdateDatesForm((showUpdateDatesForm) => !showUpdateDatesForm)}}>Update</button>
                                <button type='button' class="secondary-button wider-buttons delete-buttons"  onClick={handleDeleteSetClick}>Delete</button>
                            </div>): null}
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
        </div>


        
    </div> );
}
 
export default SetInfoDetails;