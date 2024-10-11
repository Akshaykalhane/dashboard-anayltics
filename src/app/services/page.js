"use client"
import { usePlausible } from 'next-plausible'
import React, { useState } from 'react'


function Services() {
  const [isValid,setIsValid]=useState();
  const plausible = usePlausible();
  const onSubmit=()=>{
    if(isValid){
      plausible("canDrive");
    }else{
      plausible("can'tDrive");
    }
  }
  return (
    <>
    <div>Services</div>
    <div>
      <button onClick={()=>setIsValid(prev=>!prev)}>Switch is : {isValid ? "ON" : "OFF"}</button>
      <button onClick={onSubmit}>click to submit task</button>
    </div>
    </>
  )
}

export default Services