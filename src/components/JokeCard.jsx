const JokeCard = ({ joke }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(joke.content);
    alert("Joke copied to clipboard! 😂");
  };

  return (
    <div className="joke-card">
      <div className="joke-card-header">
        <span className="joke-number">#{joke.id}</span>
        <div className="joke-tags">
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
        <button className="btn-share" onClick={handleCopy}>
          Copy Joke
        </button>
      </div>
    </div>
  );
};

export default JokeCard;
