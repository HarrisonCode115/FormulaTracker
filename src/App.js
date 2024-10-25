import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useParams, Link } from 'react-router-dom';

let passedInYear = 2024;

//Make a GET request
function App() {
  console.log(getWDC(passedInYear))
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <HamburgerMenu></HamburgerMenu>
          <Routes>
            {/* Define routes here */}
            <Route path="" element = {<HomePageBody />}></Route>
            <Route path="/constructor/:year" element={<ConstructorBody />} />
            <Route path="/driver/:year" element={<DriverBody />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}



function HamburgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // "Driver" or "Constructor"
  const [selectedYear, setSelectedYear] = useState(2024); // Default year

  let years = []; // Example year options
  for(let i = 0; i < 25; i++){
    years.push(2024-i)
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  return (
    <div className="hamburger-menu">
      <button onClick={toggleMenu}>
        &#9776; {/* Hamburger icon */}
      </button>

      {menuOpen && (
        <div className="dropdown">
          <ul>
            <li onClick={() => handleCategorySelect('driver')}>
              Driver
              {selectedCategory === 'driver' && (
                <ul className="submenu">
                  {years.map((year) => (
                      <Link to={`/driver/${year}`} onClick={() => handleYearSelect(year)}>
                        <li key={year}>
                        {year}
                        </li>
                      </Link>
                  ))}
                </ul>
              )}
            </li>
            <li onClick={() => handleCategorySelect('constructor')}>
              Constructor
              {selectedCategory === 'constructor' && (
                <ul className="submenu">
                  {years.map((year) => (
                      <Link to={`/constructor/${year}`} onClick={() => handleYearSelect(year)}>
                    <li key={year}>
                        {year}
                        </li>
                      </Link>
                  ))}
                </ul>
              )}
            </li>
              {/* Go to AI to ask questions */}
            <li onClick={() => handleCategorySelect('Extra')}>
              Extra
              {selectedCategory === 'Extra' && (
                <ul className="submenu">
                    
                      <Link to={`/question/`}>
                      <li key="questions">
                        Questions
                        </li>
                      </Link>
                    
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

function getConstrutorsAsList(standings) {
  let constructorsList = [];
  if (!standings) return constructorsList;
  for (let i = 0; i < standings.length; i++) {
    let standing = standings[i];
    let name = standing.Constructor.name;
    let points = standing.points;
    constructorsList.push([name, points]);
  }
  return constructorsList;
}


function ConstructorBody() {
  let {year } = useParams();
  year = year || 2024
  return (
    <div className="Constructor Body">
      <p>Constructor Standings for: {year}</p>
      <ConstructorList year={year} />
    </div>
  );
}


function DriverBody() {
  let {year } = useParams();
  year = year || 2024
  return (
    <div className="DriverBody">
      <p>Drivers Standings for: {year}</p>
      <DriverYearList year={year} />
    </div>
  );
}

function ConstructorList({ year }) {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data when the component mounts or year changes
    async function fetchData() {
      try {
        const data = await getConstrutor(year);
        setStandings(data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [year]);

  let champList = getConstrutorsAsList(standings);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ol>
      {champList.map((myList, index) => (
        <li key={index}>
          {myList[0]} : {myList[1]}
        </li>
      ))}
    </ol>
  );
}


function DriverYearList({ year }) {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data when the component mounts or year changes
    async function fetchData() {
      try {
        const data = await getWDC(year);
        setStandings(data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [year]);

  let champList = wdcList(standings);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ol>
      {champList.map((myList, index) => (
        <li key={index}>
          {myList[0]} , {myList[2]} : {myList[1]}
        </li>
      ))}
    </ol>
  );
}


async function getConstrutor(year) {
  const apiUrl = `http://ergast.com/api/f1/${year}/constructorStandings.json?`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const myData = await response.json();
    return myData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}



async function getWDC(year) {
  const apiUrl = `http://ergast.com/api/f1/${year}/driverStandings.json?`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const myData = await response.json();
    return myData.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

function wdcList(standings) {
  let wdcList = [];
  if (!standings) return wdcList;
  for (let i = 0; i < standings.length; i++) {
    let standing = standings[i];
    let name = standing.Driver.familyName;
    let points = standing.points;
    let constructor = standing.Constructors[0].name
    wdcList.push([name, points, constructor]);
  }
  return wdcList;
}


function HomePageBody(){
  return(
    <div ClassName = "homeBody">
      <h1>Welcome to F1 Tracker</h1>
      <p>View current WCC results <a href = "constructor/2024">here</a></p>
      <p>View current WDC results <a href = "driver/2024">here</a></p>
    </div>
  )
}

export default App;