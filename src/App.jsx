import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      setError('');
      try {
        // Making the request using axios
        const response = await axios.get(`http://<YOUR_BACKEND_URL>:3001/suggest`, {
          params: {
            prefix: query,
          },
        });

        // Handle the response data
        setSuggestions(response.data);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
        setError('Failed to load suggestions.');
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(fetchSuggestions, 300); // Debounce API calls
    return () => clearTimeout(delayDebounceFn); // Cleanup function
  }, [query]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Typeahead Suggestion System</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Start typing..."
        style={{
          width: '300px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          outline: 'none',
        }}
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {suggestions.length > 0 && (
        <ul style={{ listStyleType: 'none', padding: 0, marginTop: '10px' }}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              style={{
                padding: '8px',
                backgroundColor: '#f8f8f8',
                borderBottom: '1px solid #ddd',
                cursor: 'pointer',
              }}
              onClick={() => setQuery(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
