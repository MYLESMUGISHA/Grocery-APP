import React from 'react'
import {FaTrash, FaEdit} from "react-icons/fa";
const Grocery = ({dataItems, deleteBtn, editItem}) => {
      return(
        <div className='grocery-list'>
   {dataItems.map((person)=>{
const {itemName,itemNumber,id} = person;
return(
  <div className='grocery-item' key={id}>
<h4>{itemName}</h4>
<p>{itemNumber}</p>
<button  onClick={()=>editItem(id)}><FaEdit className='edit-btn'/></button>
<button  onClick={()=>deleteBtn(id)}><FaTrash className='delete-btn'/></button>
  </div>
)}
)}
  </div>
)}
export default Grocery;
