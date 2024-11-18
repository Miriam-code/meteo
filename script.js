const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const SEARCH_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';


const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const months = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

const API_KEY = '&appid=66a5c265e6f8f883ff97fc6ceb4bef02';

const API = '66a5c265e6f8f883ff97fc6ceb4bef02';

setInterval(() => {

    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const minutes = time.getMinutes();

    timeEl.innerHTML = (hour < 10? '0'+ hour : hour) + ':' + (minutes < 10? '0'+minutes: minutes);
    
    dateEl.innerHTML = days[day] + ' ' + date + ' ' + months[month]

}, 1000);


function showWeatherData(data) {

    if (data) {

        let { main, sys, wind, visibility , weather, name , coord} = data;

        timezone.innerHTML = data.name;

        countryEl.innerHTML = data.coord.lat + 'N ' + data.coord.lon + 'E';

        currentWeatherItemsEl.innerHTML =

            `      
            <div class="now">
            <div>${name}</div>
            <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
            <div>${weather[0].description}</div>
            </div>

            <div class="weather-item">
              <div>Températures : </div>
              <div>Actuel : ${Math.round(main.temp - 273.15) * 100 / 100}°C </div>
              <div>Max : ${Math.round(main.temp_max - 273.15) * 100 / 100} °C </div>
              <div>Min : ${Math.round(main.temp_min - 273.15) * 100 / 100}°C </div>
            </div>

            <div class="weather-item">
                <div>Humidité</div>
                <div>${main.humidity}%</div>
            </div>
            <div class="weather-item">
                <div>Préssion</div>
                <div>${main.pressure} hPa</div>
            </div>
            <div class="weather-item">
                <div>Vent</div>
                <div>${wind.speed} km/h</div>
            </div>

            <div class="weather-item">
                <div>Levé du Soleil</div>
                <div>${window.moment(sys.sunrise * 1000).format(' HH:mm')}</div>
            </div>
            <div class="weather-item">
                <div>Coucher du Soleil</div>
                <div>${window.moment(sys.sunset * 1000).format(' HH:mm')}</div>
            </div>
            <div class="weather-item">
                <div>Visibilité</div>
                <div>${visibility} mètres</div>
            </div>`;

          const urlday = `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=66a5c265e6f8f883ff97fc6ceb4bef02`;

          fetch(urlday).then(res => res.json()).then(data => {

            weatherForecastEl.innerHTML = '';


            console.log(data.list)

             const meteo = data.list ;

            meteo.forEach( day => {

                console.log(day)
                
                const {city,dt_txt,main,weather,sys, wind} = day;

                // Date et heure d'origine
               const dateHeureOriginale = dt_txt;

                // Créer un nouvel objet Date à partir de la chaîne de caractères
                const date = new Date(dateHeureOriginale);

                // Obtenir les composants de date et d'heure
                const jour = date.getDate();
                const mois = date.getMonth() + 1; // Les mois commencent à partir de 0 dans JavaScript, donc on ajoute 1
                const heure = date.getHours();
                const minute = date.getMinutes();

               // Formater la date et l'heure dans le format souhaité
               const dateFormatee = `${jour < 10 ? '0' + jour : jour}/${mois < 10 ? '0' + mois : mois} ${heure < 10 ? '0' + heure : heure}h${minute < 10 ? '0' + minute : minute}`;

               console.log(dateFormatee); // Affiche "07/04 21h"


                meteocontainer = document.createElement('div');

                meteocontainer.innerHTML = `

                <div class="weather-forecast-item">
                 <div class="day">${dateFormatee}</div>
                  <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                  <div class="description">${weather[0].main}</div>
                  <div class="temp">Min -${Math.round(main.temp_min - 273.15) * 100 / 100}°C</div>
                  <div class="temp">Max - ${Math.round(main.temp_max - 273.15) * 100 / 100}°C</div>
               </div>
               ` 
               
               weatherForecastEl.appendChild(meteocontainer);
               
            });
            
          })

    }

}

function getCity (url) {

    fetch(url).then(res => res.json()).then(data => {

        console.log(data)

    showWeatherData(data);
        
  })
}

form.addEventListener('submit', (e) => {

    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm) {
          
        getCity(SEARCH_URL+searchTerm+API_KEY);
    }

})


