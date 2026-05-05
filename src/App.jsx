import { useState, useEffect } from 'react';
import Header from './components/Header';
import Pagination from './components/Pagination';
import JokeCard from './components/JokeCard';
import Loader from './components/Loader';
import ErrorState from './components/ErrorState';

function App() {
  const [jokes, setJokes] = useState([]);
  const [meta, setMeta] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [page, setPage] = useState(1);

  const fetchJokes = async (currentPage) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`https://api.freeapi.app/api/v1/public/randomjokes?page=${currentPage}&limit=12`);
      const data = await response.json();
      
      // Artificial delay (800ms) for smooth loading animation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setJokes(data.data.data);
      setMeta({
        totalItems: data.data.totalItems,
        currentPageItems: data.data.currentPageItems,
        totalPages: data.data.totalPages,
        page: data.data.page,
      });
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError('Sorry! Something went wrong while fetching the jokes!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJokes(page);
  }, [page]);

  return (
    <div className="container">
      <Header meta={meta} loading={loading} />

      {/* Loading State */}
      {loading && <Loader />}

      {/* Error State */}
      {error && <ErrorState error={error} onRetry={() => fetchJokes(page)} />}

      {/* Successful Content */}
      {!loading && !error && (
        <>
          {/* Top Pagination */}
          {jokes.length > 0 && (
            <div className="top-pagination-wrapper">
              <Pagination meta={meta} page={page} setPage={setPage} />
            </div>
          )}

          {/* Jokes Grid */}
          <div className="jokes-grid">
            {jokes.map((joke) => (
              <JokeCard key={joke.id} joke={joke} />
            ))}
          </div>

          {/* Bottom Pagination */}
          <div className="bottom-pagination-wrapper">
            <Pagination meta={meta} page={page} setPage={setPage} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
