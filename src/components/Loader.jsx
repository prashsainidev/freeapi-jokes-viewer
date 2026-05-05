const Loader = () => {
  return (
    <div className="loading-container">
      <div className="bouncing-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <p className="loading-text">Loading the laughs…</p>
    </div>
  );
};

export default Loader;
