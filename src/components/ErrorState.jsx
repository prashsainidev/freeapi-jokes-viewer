const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="error-card">
      <div className="error-emoji">😵</div>
      <p>{error}</p>
      <button className="page-btn" onClick={onRetry} style={{ marginTop: '20px' }}>
        Try Again
      </button>
    </div>
  );
};

export default ErrorState;
