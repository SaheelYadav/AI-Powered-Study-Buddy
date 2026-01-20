import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

function Root() {
  const [theme, setTheme] = React.useState("light");

  React.useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return <App theme={theme} setTheme={setTheme} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
