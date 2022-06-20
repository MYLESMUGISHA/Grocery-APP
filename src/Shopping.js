import React, { useEffect, useState } from 'react'
import {FaTrash, FaEdit} from "react-icons/fa";
import Alert from './Alert';
import Grocery from './Grocery';
// Get groceries from local storage
const getLocalStorageData = () => {
let returnItems = localStorage.getItem('storedItem');
if(returnItems){
  return (returnItems = JSON.parse(localStorage.getItem('storedItem')));
}else{
  return []
}
}
function Shopping() {
const [itemName, setItemName]= useState("")
const [itemNumber, setItemNumber] = useState("")
const [storedItem, setStoredItem] = useState(getLocalStorageData());
const [alert, setAlert] =useState({show: false, msg:"", type:""})
const [editId, setEditID] = useState(null);
const [isEditing, setIsEditing] = useState(false)
const deleteAll =()=>{
  setStoredItem([])
  showAlert(true, 'Items removed', 'danger');
}
const deleteBtn = (id)=>{
  let newProduct = storedItem.filter((form1)=> {
      return form1.id !== id
  })
  setStoredItem(newProduct)
  showAlert(true, 'Item removed', 'danger');
}
const editItem = (id) => {
// get the element which was clicked
const editedItems = storedItem.find((item) => item.id === id);
// get the text of the clicked item
setItemName(editedItems.itemName);
setItemNumber(editedItems.itemNumber);
// setItemName(editedItems.itemName);
//changing/updating the element
setEditID(id);
setIsEditing(true)
  // alert the message
showAlert(true, 'Item successfully updated', 'success');
}
const showAlert= (show = false, msg= "", type ="") =>{
  setAlert({show, msg, type});
}
const handleSubmit=(e)=> {
  e.preventDefault();
  if(!itemName && !itemNumber){
     //  when use click on empty submit form value
  showAlert(true, 'Please Enter whatever !', 'danger');
 } else if (itemName && itemNumber && isEditing ) {
  setStoredItem( storedItem.map((item) => {
    if(item.id === editId){
      return {...item, itemName, itemNumber };
    }
    return item;
   }))
    // empty the values
    setItemName('')
    setItemNumber('')
    // Set the edit value to null
     setEditID(null)
    // change the button text to submit
    setIsEditing(false)
  } else {
    // /create an object
    const newItem = {itemName, itemNumber ,id: new Date().getTime().toString()}
    // grab item and stored them in our empty array
    setStoredItem((storedItem)=> {
      return [...storedItem, newItem]
    })
    // console.log(item)
    showAlert(true, 'Item Added', 'success');
    setItemName('')
    setItemNumber('')
  }
}
// push a grocery to local storage
useEffect(() => {
  localStorage.setItem('storedItem', JSON.stringify(storedItem));
}, [storedItem])
// console.log(storedItem)
return (
  <section className='section-center'>
    {alert.show && <Alert {...alert}  storedItem ={storedItem} removeAlert= {showAlert}/> }
    <form className='grocery-form' onSubmit={handleSubmit}>
      <h3>grocery App</h3>
      <div className='form-control'>
        <input
          type='text'
          className='grocery'
          placeholder='e.g. eggs'
          value={itemName}
          onChange={(e)=>setItemName(e.target.value)}
          />
        <br/>
        <input
          type='text'
          className='grocery'
          placeholder='number'
          value={itemNumber}
          onChange={(e)=>setItemNumber(e.target.value)}
          />
        <button type='submit' className='submit-btn'>
          {isEditing ? 'Update' : 'Submit'}
        </button>
      </div>
    </form>
{storedItem.length > 0 &&  (
  <div className='grocery-container'>
  <Grocery dataItems={storedItem} deleteBtn={deleteBtn} editItem={editItem} />
<button className="clear-btn" onClick={()=>deleteAll()}>
  Delete all
  </button>
</div>
)}
  </section>
  );
}
export default  Shopping