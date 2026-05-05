import { useState, useEffect } from 'react';

function App() {
  const [jokes, setJokes] = useState([]);
  
  // Naya state: API se metadata nikalne ke liye
  const [meta, setMeta] = useState(null); 
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJokes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://api.freeapi.app/api/v1/public/randomjokes');
      const data = await response.json();
      
      // Jokes ka array set kiya
      setJokes(data.data.data);
      
      // API response se bacha hua data extract kiya taaki UI better bane
      setMeta({
        totalItems: data.data.totalItems,
        currentPageItems: data.data.currentPageItems,
        totalPages: data.data.totalPages,
        page: data.data.page,
      });
      
    } catch (err) {
      setError('Sorry! Something went wrong while fetching the jokes!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <div className="header-glow"></div>
        <h1 className="header-title">FreeAPI Jokes</h1>
        <p className="header-subtitle">Your daily dose of premium comedy gold.</p>
        
        {/* =======================================
            GLASSMORPHISM STATS DASHBOARD 
            (API ke metadata ko use karke)
        ======================================= */}
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

      {/* =======================================
          ACTION BAR (Refresh Data)
      ======================================= */}
      {!loading && !error && (
        <div className="action-bar">
           <button className="btn-refresh" onClick={fetchJokes}>
             <span className="btn-icon">↻</span> Load More Laughs
           </button>
        </div>
      )}

      {/* =======================================
          LOADING STATE
      ======================================= */}
      {loading && (
        <div className="loading-container">
          <div className="bouncing-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <p className="loading-text">Loading the laughs…</p>
        </div>
      )}

      {/* =======================================
          ERROR STATE
      ======================================= */}
      {error && (
        <div className="error-card">
          <div className="error-emoji">😵</div>
          <p>{error}</p>
          <button className="btn-refresh" onClick={fetchJokes} style={{marginTop: '20px', display: 'inline-flex'}}>
            Try Again
          </button>
        </div>
      )}

      {/* =======================================
          JOKES GRID (Masonry Vibe)
      ======================================= */}
      {!loading && !error && (
        <div className="jokes-grid">
          {jokes.map((joke) => (
            <div key={joke.id} className="joke-card">
              
              <div className="joke-card-header">
                <span className="joke-number">#{joke.id}</span>
                <div className="joke-tags">
                  {/* Category badging Logic */}
                  {joke.categories && joke.categories.length > 0 ? (
                    joke.categories.map((cat, index) => (
                      <span key={index} className={`badge ${cat === 'explicit' ? 'badge-explicit' : 'badge-normal'}`}>
                        {cat === 'explicit' ? '🔞 Explicit' : cat}
                      </span>
                    ))
                  ) : (
                    <span className="badge badge-clean">✅ Clean</span>
                  )}
                </div>
              </div>
              
              <div className="joke-content">{joke.content}</div>
              
              <div className="joke-card-footer">
                <button 
                  className="btn-share" 
                  onClick={() => {
                    navigator.clipboard.writeText(joke.content);
                    alert("Joke copied to clipboard! 😂");
                  }}
                >
                  Copy Joke
                </button>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
