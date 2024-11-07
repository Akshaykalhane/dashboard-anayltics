"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import React, { Suspense } from "react";
import { usePlausible } from "next-plausible";
import { useSearchParams } from "next/navigation";

import ErrorBoundary from "@/component/errorBoundry";


// ErrorBoundary Component
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, error: null, errorInfo: null };
//   }

//   static getDerivedStateFromError(error) {
//     // Update state to display fallback UI
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     // Log the error to an error reporting service
//     this.setState({
//       error: error,
//       errorInfo: errorInfo,
//     });
//   }

//   render() {
//     if (this.state.hasError) {
//       // Fallback UI when an error occurs
//       return (
//         <div className={styles.error}>
//           <h2>Something went wrong. Please try again later.</h2>
//           <details>
//             <summary>Click for details</summary>
//             <pre>{this.state.error && this.state.error.toString()}</pre>
//             {/* <pre>{this.state.errorInfo.componentStack}</pre> */}
//           </details>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// Spinner component for loading state
function Spinner() {
  return <div className="spinner">Loading...</div>;
}

// Home Component
function Home() {
  const [showMessage, setShowMessage] = useState(false);

  const toggleMessage = () => setShowMessage((prev) => !prev);
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('username');
  const plausible = usePlausible();


  useEffect(()=>{
    if(queryParam){
      plausible("userCome",{
        props:{
          username:queryParam
        }
      })
    }
    console.log('page change')
  },[])

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>App Main Page</h2>

      {/* Image */}
      <div className={styles.imageWrapper}>
        
      </div>

      {/* Button to toggle message visibility */}
      <button onClick={toggleMessage} className={styles.button}>
        {showMessage ? "Hide" : "Show"} Message
      </button>

      {/* Conditionally render message */}
      {showMessage && <p className={styles.message}>This is a dynamic message!</p>}
    </div>
  );
}

// Wrapping the Home component in ErrorBoundary and Suspense
export default function HomePage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Home />
      </Suspense>
    </ErrorBoundary>
  );
}
