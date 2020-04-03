import React,{useState} from 'react';
const api={
  key:"250aa2a3b93c9e3cf0d569311a3ba2f3",
  base:"https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query,setQuery] = useState('');

  const [weather,setWeather] = useState({});
  
  const search = (e)=>{
    e.preventDefault()
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then(result=>{
        setWeather(result)
        setQuery("")
        console.log(result);
        
      })
  
    
  }

  const dateBuilder = (d)=>{
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear()


    return `${day} ${date} ${month} ${year}` 

  }


  return (

    <div className={(typeof weather.main!='undefined') 
    ?((weather.main.temp>16)? 
    "app warm":"app"):"app"}>
      <main>
        <div className="search-box">
          <form onSubmit={search}>
          <input type="text" required className="search-bar" 
          placeholder="search..." value={query} 
          onChange={(e)=>setQuery(e.target.value)} 
          />

          </form>
         
        </div>
        {(typeof weather.main!= 'undefined')? (
          <div>
          <div className="location-box">
          <div className="location">{weather.name},{weather.sys.country}</div>
          
           <div className="date">{dateBuilder(new Date())}</div>
          </div>
           <div className="weather-box">
          <div className="temp">
                {Math.round(weather.main.temp)}&deg;c
          </div>
        <div className="weather">{weather.weather[0].description}</div>
          <p className="copyright">created  by Ardato Belay</p>
        </div>
          </div>
        ) : <h1>weather app</h1>}
      </main>
    </div>
  );
}

export default App;
