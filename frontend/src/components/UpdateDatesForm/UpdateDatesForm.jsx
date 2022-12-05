import React, { useState } from 'react';
import axios from 'axios';

const UpdateDatesForm = (props) => {
    const [dateTypeToUpdate, setDateTypeToUpdate] = useState();
    const [newDateValue, setNewDateValue] = useState();

    const handleUpdateDateForm = async (event) => {
        event.preventDefault();
        const updateDateUrl = `http://127.0.0.1:8000/${props.username}/collection/${props.setnum}`;
        let infoToBeUpdated = {};
        infoToBeUpdated[dateTypeToUpdate] = newDateValue;
        try {
            await axios.patch(`${updateDateUrl}`, infoToBeUpdated, {
                headers: {
                    Authorization: `Bearer ${props.usertoken}`,
                }
            },);
            props.fetchSetsInCollection();
        } catch(error) {
            console.log(error.response.data);
        }
    }
    return ( 
    <div>
        <select value={dateTypeToUpdate} onChange={(event) => setDateTypeToUpdate(() => event.target.value)}>
            <option>which dates you want to modify</option>
            <option value="purchase_date">purchase date</option>
            <option value="build_completion_date">build completion date</option>
        </select>
        <form onSubmit={handleUpdateDateForm}>
            <input placeholder='enter new dates' type='date' onChange={(event) => setNewDateValue(event.target.value)}></input>
            <br></br>
            <button type='submit' className='secondary-button wider-buttons'>Update</button>
        </form>
    </div>);
}
 
export default UpdateDatesForm;