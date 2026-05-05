const Header = ({ meta, loading }) => {
  return (
    <header className="header">
      <div className="header-glow"></div>
      <h1 className="header-title">FreeAPI Jokes</h1>
      <p className="header-subtitle">Your daily dose of premium comedy gold.</p>
      
      {!loading && meta && (
        <div className="stats-dashboard">
          <div className="stat-box">
            <span className="stat-value">{meta.totalItems}</span>
            <span className="stat-label">Total Jokes</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{meta.currentPageItems}</span>
            <span className="stat-label">In this set</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{meta.page} / {meta.totalPages}</span>
            <span className="stat-label">Page Info</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
