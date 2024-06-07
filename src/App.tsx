import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface CookieResponse {
  status: any;
}

//settings='aHR0cHM6Ly9naXRodWIuY29tL0FrYXNoc2g5ODksYWthc2guc2g5ODlAZ21haWwuY29t'

function App() {
  const [secureNetflixId, setSecureNetflixId] = useState<string>('');
  const [netflixId, setNetflixId] = useState<string>('');

  useEffect(() => {
    const storedSecureNetflixId = localStorage.getItem('secureNetflixId') || '';
    const storedNetflixId = localStorage.getItem('netflixId') || '';
    setSecureNetflixId(storedSecureNetflixId);
    setNetflixId(storedNetflixId);
  }, []);

  const handleLoadClick = () => {
    localStorage.setItem('secureNetflixId', secureNetflixId);
    localStorage.setItem('netflixId', netflixId);
    chrome.runtime.sendMessage({
      action: "setCookies",
      secureNetflixId: secureNetflixId,
      netflixId: netflixId,
      url: "https://www.netflix.com"
    }, (response: CookieResponse) => {
      if (chrome.runtime.lastError) {
        console.log(`Error: ${chrome.runtime.lastError.message}`);
      } else if (response) {
        console.log(response.status);
      } else {
        console.log('No response received.');
      }
    });
    chrome.runtime.sendMessage({ action: "reloadTab" });
  };

  const handleGetClick = () => {
    chrome.cookies.get({ url: 'https://www.netflix.com', name: 'SecureNetflixId' }, (cookie: chrome.cookies.Cookie | null) => {
      if (cookie) {
        setSecureNetflixId(cookie.value);
      } else {
        console.log('SecureNetflixId cookie not found');
      }
    });

    chrome.cookies.get({ url: 'https://www.netflix.com', name: 'NetflixId' }, (cookie: chrome.cookies.Cookie | null) => {
      if (cookie) {
        setNetflixId(cookie.value);
      } else {
        console.log('NetflixId cookie not found');
      }
    });
  };

  const handleRemoveClick = () => {
    setSecureNetflixId('');
    setNetflixId('');
    localStorage.removeItem('secureNetflixId');
    localStorage.removeItem('netflixId');
    chrome.runtime.sendMessage({ action: "removeCookies", url: "https://www.netflix.com" });
  };

  return (
    <div className="card shadow-sm p-3 bg-body rounded">
      <div className="card-body">
        <h5 className="card-title mb-4">Yash Shop</h5>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={secureNetflixId}
            onChange={(e) => setSecureNetflixId(e.target.value)}
            placeholder="SecureNetflixId"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={netflixId}
            onChange={(e) => setNetflixId(e.target.value)}
            placeholder="NetflixId"
          />
        </div>
        <button className="btn btn-primary me-3 mb-2 " onClick={handleLoadClick}>Load</button>
        <button className="btn btn-secondary mb-2" onClick={handleGetClick}>Get</button>
        <button className="btn btn-danger" onClick={handleRemoveClick}>Remove</button>
      </div>
    </div>
  );
}

export default App;
