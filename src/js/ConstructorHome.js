import React from 'react';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/ConstructorHome.css'


function ConstructorHome(){
    return(
        <div className="constructor-home-main">
            <h1>Select a year to view the constructor results!</h1>
            <YearSearchForm></YearSearchForm>
            {/* <ListYears></ListYears> */}
        </div>
    );
}


function YearSearchForm(){
    const [year,setYear] = useState("")
    
    const navigate = useNavigate()

    const currentYear = new Date().getFullYear();
    const yearRegex = new RegExp(`^(19[5-9][8-9]|20[0-${Math.floor(currentYear / 10) % 10}]\\d|${currentYear})$`);

    const handleSubmit = (event) =>{
        event.preventDefault();
        if (!yearRegex.test(year)){
            alert("Please enter a year between 1958-present.")
            return
        }
        navigate(`/constructor/${year}`)
       }
    
    return(
        <form onSubmit={handleSubmit} className = "search-form">
            <input type = "text" placeholder='Enter Year' value={year}
            onChange={(e) => setYear(e.target.value)} 
            className = "search-input"></input>
            <br></br>
            <button className = 'search-button' type = "submit">View year!</button>
        </form>
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