import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import '../css/ListBody.css'

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
          <li key={index} className = "listItem">
            {myList[0]} : {myList[1]}
          </li>
        ))}
      </ol>
    );
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
  

export default ConstructorBody;



  