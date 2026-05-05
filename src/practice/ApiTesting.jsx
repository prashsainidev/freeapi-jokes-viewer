import { useState, useEffect } from 'react';

function ApiTesting() {
  // 1. Jokes ka array (data.data.data) store karne ke liye
  const [jokesArray, setJokesArray] = useState([]);

  // 2. Pagination ka object (data.data) store karne ke liye
  const [paginationObject, setPaginationObject] = useState(null);

  // 3. Status aur success message (data.statusCode) store karne ke liye
  const [apiMetaData, setApiMetaData] = useState(null);

  // 4. Pura original API response (data) store karne ke liye
  const [fullApiResponse, setFullApiResponse] = useState(null);

  const fetchJokes = async () => {
    try {
      // Step 1: API ko call kiya
      const response = await fetch('https://api.freeapi.app/api/v1/public/randomjokes');

      // Step 2: Response ko JSON (JavaScript object) me badla
      const data = await response.json();

      // ---------------------------------------------
      // Ab hum alag-alag data ko nikal kar set kar rahe hain:
      // ---------------------------------------------

      // A) Pura data ek sath (Testing ke liye)
      setFullApiResponse(data);

      // B) Sirf bahar wala data jaise statusCode, success, message
      setApiMetaData({
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
      });

      // C) Andar ka pagination wala object
      setPaginationObject(data.data);

      // D) Sabse andar wala Array jisme actual jokes hain
      setJokesArray(data.data.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>API Fetching Practice</h1>

      {/* ==========================================
          BLOCK 1: Array Data (jokesArray)
          Isko hum .map() kar sakte hain kyunki ye ek list hai []
          ========================================== */}
      <div style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
        <h2>1. Array Data (Jokes List)</h2>
        {jokesArray &&
          jokesArray.slice(0, 2).map(joke => (
            <div key={joke.id}>
              <p>
                <b>{joke.id}:</b> {joke.content}
              </p>
            </div>
          ))}
      </div>

      {/* ==========================================
          BLOCK 2: Object Data (paginationObject)
          Ye ek object hai {}, isliye keys access kar rahe hain
          ========================================== */}
      <div style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
        <h2>2. Object Data (Pagination)</h2>
        {paginationObject && (
          <div>
            <p>Page: {paginationObject.page}</p>
            <p>Total Items: {paginationObject.totalItems}</p>
          </div>
        )}
      </div>

      {/* ==========================================
          BLOCK 3: Root API Metadata
          Ye bhi humne ek custom object banaya hai
          ========================================== */}
      <div style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
        <h2>3. API Status / Metadata</h2>
        {apiMetaData && (
          <div>
            <p>Status Code: {apiMetaData.statusCode}</p>
            <p>Success: {apiMetaData.success ? 'Yes' : 'No'}</p>
            <p>Message: {apiMetaData.message}</p>
          </div>
        )}
      </div>

      {/* ==========================================
          BLOCK 4: Full Raw Response
          Is pure object ko string me badal kar dekh rahe hain
          ========================================== */}
      <div style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
        <h2>4. Full Raw API Object</h2>
        {fullApiResponse && (
          <pre style={{ background: '#eee', padding: '5px' }}>
            {JSON.stringify(fullApiResponse, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}

export default ApiTesting;
