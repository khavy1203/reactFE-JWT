import {
  BrowserRouter as Route,
} from "react-router-dom";
import './App.scss';
import NavHeader from './component/Navigation/NavHeader';
import AppRoutes from './Routes/AppRoute'
import { ToastContainer } from 'react-toastify';
import { useEffect, useState, useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Rings } from 'react-loader-spinner';
import { UserContext } from './context/UserContext';


function App() {
  const { user } = useContext(UserContext);
  return (

    <>
      <Route>
        {user && user.isLoading ?
          <>
            <div className="loading-container">
              <Rings
                height={100}
                with={100}
                color='#1877f2'
                ariaLabel='loading-indicator'
              />
              <div>Loading data...</div>
            </div>
          </>
          :
          <>
            <div className="app-header">
              <NavHeader />
            </div>
            <div className="app-container">
              <AppRoutes />
            </div>

          </>
        }


        {/* <div className="app-header">
          <Nav />
        </div>
        <div className="app-container">
          <AppRoutes />
        </div> */}



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
