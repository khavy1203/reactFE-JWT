import {
  BrowserRouter as Route,
} from "react-router-dom";
import './App.scss';
import Nav from './component/Navigation/Nav';
import AppRoutes from './Routes/AppRoute'
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [account, setAccount] = useState({});
  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, [])
  return (
    <>
      <Route>
        <div className="app-header">
          <Nav />
        </div>
        <div className="app-container">
          <AppRoutes />
        </div>
      </Route>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
