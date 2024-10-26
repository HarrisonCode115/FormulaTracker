import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import '../css/ListBody.css'


function DriverBody() {
    let {year } = useParams();
    year = year || 2024
    return (
      <div className="DriverBody">
        <h2>Drivers Standings for: {year}</h2>
        <DriverYearList year={year} />
      </div>
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
          <li key={index} className = "listItem">
            {myList[0]} , {myList[2]} : {myList[1]}
          </li>
        ))}
      </ol>
    );
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


export default DriverBody;