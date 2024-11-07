"use client";
import { usePlausible } from "next-plausible";
import React, { Suspense, useState } from "react";
import ErrorBoundary from "@/component/errorBoundry";


function Spinner() {
  return <div className="spinner">Loading...</div>;
}

function Services() {
  const [isValid, setIsValid] = useState();
  const plausible = usePlausible();
  const onSubmit = () => {
    if (isValid) {
      plausible("canDrive", {
        props: {
          event: "validation age",
          eventType: "to check validation age",
        },
      });
    } else {
      plausible("can'tDrive");
    }
  };
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <div>Services</div>
          <div>
            <button onClick={() => setIsValid((prev) => !prev)}>
              Switch is : {isValid ? "ON" : "OFF"}
            </button>
            <button onClick={onSubmit}>click to submit task</button>
          </div>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default Services;
