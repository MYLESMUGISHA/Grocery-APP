import React from 'react'
import { useEffect } from 'react';
const Alert= ({type,msg, show, storedItem,removeAlert})=> {
  useEffect(()=>{
    const timer= setTimeout(()=>{
removeAlert()
      }, 2000)
return ()=> clearTimeout(timer)
  },[storedItem]);
  return <p className={`alert alert-${type}`}>{msg}</p>
}
export default Alert
