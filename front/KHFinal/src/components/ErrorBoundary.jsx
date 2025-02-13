import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('🚨 Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h1>🚨 오류가 발생했습니다.</h1>
          <p>문제가 발생했습니다. 새로고침하거나 잠시 후 다시 시도해주세요.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
