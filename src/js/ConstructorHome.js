import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ConstructorHome.css'


function ConstructorHome(){
    return(
        <div className="constructor-home-main">
            <h1>Select a year to view the constructor results!</h1>
            <ListYears></ListYears>
        </div>
    );
}


function ListYears(){
    //Works out years from 1958 to present day
   const currentYear = new Date().getFullYear();
   const navigate = useNavigate();
   let years = []
   for(let i = currentYear; i >= 1958; i--){
    years.push(i)
   }
   
   const chooseYear = (year) =>{
    navigate(`/constructor/${year.year}`)
   }

    return(
        <div className = "year-grid">
            {years.map((year) =>(
                <button key = {year} onClick = {()=> chooseYear({year})} className = "year-button  ">{year}</button>
            ))}
        </div>
    );
}

export default ConstructorHome;