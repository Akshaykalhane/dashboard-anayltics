import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null, errorInfo: null };
    }
  
    static getDerivedStateFromError(error) {
      // Update state to display fallback UI
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // Log the error to an error reporting service
      this.setState({
        error: error,
        errorInfo: errorInfo,
      });
    }
  
    render() {
      if (this.state.hasError) {
        // Fallback UI when an error occurs
        return (
          <div className={styles.error}>
            <h2>Something went wrong. Please try again later.</h2>
            <details>
              <summary>Click for details</summary>
              <pre>{this.state.error && this.state.error.toString()}</pre>
              {/* <pre>{this.state.errorInfo.componentStack}</pre> */}
            </details>
          </div>
        );
      }
  
      return this.props.children;
    }
  }

  export default ErrorBoundary;
  