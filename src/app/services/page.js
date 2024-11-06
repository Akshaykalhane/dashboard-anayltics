"use client"
import { usePlausible } from 'next-plausible'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'




function Services() {
  const [isValid,setIsValid]=useState();
  const plausible = usePlausible();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('username');
  console.log(queryParam);

  const onSubmit=()=>{
    if(isValid){
      plausible("canDrive",{ props: {
        event: 'validation age',
        eventType: 'to check validation age',
        username:queryParam
      }});
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