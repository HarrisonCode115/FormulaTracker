import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from'./js/Header.js'
import Footer from'./js/Footer.js'
import ConstructorBody from './js/ConstructorBody.js';
import DriverBody from './js/DriverBody.js';
import ConstructorHome from './js/ConstructorHome.js'
import DriversHome from './js/DriversHome.js'

//Make a GET request
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header></Header>
        </header>
        <div className="App-main">
          <Routes>
            {/* Define routes here */}
            <Route path="" element = {<HomePageBody />}></Route>
            <Route path="/constructor/:year" element={<ConstructorBody />} />
            <Route path="/driver/:year" element={<DriverBody />} />
            <Route path="/constructorHome" element={<ConstructorHome></ConstructorHome>}/>
            <Route path="/driverHome" element={<DriversHome/>}/>
          </Routes>
        </div>
        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </Router>
  );
}





function HomePageBody(){
  let currentYear = new Date().getFullYear();

  const constructorRoute = `constructor/${currentYear}`
  const driversRoute = `driver/${currentYear}`
  return(
    
    <div ClassName = "homeBody">
      <h1>Welcome to the F1 Tracker</h1>
      <p>Here we have the results as far back as 1958 for Constructors and Drivers championships!</p>
      <br></br>
      <p>To see current standings select from below, if you wish to view a specific year, visit the constructor or driver tab on the navigation bar.</p>
      <br></br>
      <p>To view the current WCC standings click here: <a  className = "App-link" href = {constructorRoute}>{currentYear} standings</a></p>
      <p>To view the current WDC standings click here: <a className = "App-link" href = {driversRoute}> {currentYear} standings</a></p>
    </div>
  )
}

export default App;