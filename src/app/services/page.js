"use client"
import { usePlausible } from 'next-plausible'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, Suspense, Component } from 'react';

// ErrorBoundary Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details>
            <summary>Click for details</summary>
            <pre>{this.state.error && this.state.error.toString()}</pre>
            <pre>{this.state.errorInfo.componentStack}</pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Services Component
function Services() {
  const [isValid, setIsValid] = useState();
  const plausible = usePlausible();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('username');
  console.log(queryParam);

  const onSubmit = () => {
    if (isValid) {
      plausible("canDrive", { props: {
        event: 'validation age',
        eventType: 'to check validation age',
        username: queryParam
      }});
    } else {
      plausible("can'tDrive");
    }
  };

  return (
    <>
      <div>Services</div>
      <div>
        <button onClick={() => setIsValid(prev => !prev)}>
          Switch is : {isValid ? "ON" : "OFF"}
        </button>
        <button onClick={onSubmit}>Click to submit task</button>
      </div>
    </>
  );
}

// ServicesPage Component wrapping Services in Suspense and ErrorBoundary
export default function ServicesPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Services />
      </Suspense>
    </ErrorBoundary>
  );
}
