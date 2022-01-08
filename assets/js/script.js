// global variables 
const search = document.querySelector('#search');
const historyEl = document.querySelector('#history');
const curForecast = document.querySelector('#todayForecast');
const fiveDayForecast = document.querySelector('#fiveDay');
const inputEl = document.querySelector('#searched');
const buttonEl = document.querySelector('#searchBtn');
const saveBtn = document.querySelector('#saveBtn')
// apiKey for both api calls

const apiKey = '8d11ee23127ece86a8e45e07590427e7'

const getWeather = (city, lat, lon) => {
    // api call to grab the detailed weather information.
    const apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=minutely,hourly,alerts&appid=' + apiKey;
    // grabbing information from api call
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {

                        // putting all current data into variables
                        let curDate = new Date(data.current.dt * 1000);
                        let curImg = data.current.weather[0].icon
                        let curTemp = data.current.temp;
                        let curWind = data.current.wind_speed;
                        let curHumid = data.current.humidity;
                        let curUvIndex = data.current.uvi;
                        // creating elements for each data type and putting the info into that element and appending it to the page when searched
                        const today = document.createElement('h3');
                        const icon = document.createElement('img');
                        const temp = document.createElement('h4');
                        const wind = document.createElement('h4');
                        const humidity = document.createElement('h4');
                        const uvIndex = document.createElement('h4');

                        today.innerHTML = city + ' (' + curDate.toLocaleDateString() + ')';
                        icon.setAttribute('src', "http://openweathermap.org/img/wn/" + curImg + ".png");
                        icon.setAttribute('alt', 'weather icon');
                        temp.innerHTML = 'Temp: ' + curTemp + '°F';
                        wind.innerHTML = 'Wind Speed: ' + curWind + " MPH";
                        humidity.innerHTML = 'Humidity: ' + curHumid + ' %';
                        uvIndex.innerHTML = 'UVI: ' + curUvIndex;

                        curForecast.append(today);
                        today.append(icon);
                        curForecast.append(temp);
                        curForecast.append(wind);
                        curForecast.append(humidity);
                        curForecast.append(uvIndex);

                        // 5-day Forecast

                        for (let i = 0; i < 5; i++) {
                            // creating variables for the daily data and running it through a for loop
                            const fiveDate = new Date(data.daily[i].dt * 1000);
                            const fiveImg = data.daily[i].weather[0].icon
                            const fiveTemp = data.daily[i].temp.day;
                            const fiveWind = data.daily[i].wind_speed;
                            const fiveHumid = data.daily[i].humidity;
                            // same as above just with daily forecast
                            const fiveContain = document.createElement('div');
                            const dateDaily = document.createElement('h3');
                            const iconDaily = document.createElement('img');
                            const tempDaily = document.createElement('p');
                            const windDaily = document.createElement('p');
                            const humidityDaily = document.createElement('p');

                            fiveContain.className = 'container'
                            dateDaily.innerHTML = ' (' + fiveDate.toLocaleDateString() + ')';
                            iconDaily.setAttribute('src', "http://openweathermap.org/img/wn/" + fiveImg + ".png");
                            iconDaily.setAttribute('alt', 'weather icon');
                            windDaily.innerHTML = 'Wind Speed: ' + fiveWind + " MPH";
                            tempDaily.innerHTML = 'Temp: ' + fiveTemp + '°F';
                            humidityDaily.innerHTML = 'Humidity: ' + fiveHumid + ' %';

                            fiveContain.append(dateDaily);
                            dateDaily.append(iconDaily);
                            fiveContain.append(tempDaily);
                            fiveContain.append(windDaily);
                            fiveContain.append(humidityDaily);
                            fiveDayForecast.append(fiveContain);

                        }
                    })
                curForecast.innerHTML = ''
                fiveDayForecast.innerHTML = '';
            } else {
                // if the call is bad alert will popup.
                alert("error" + response.statusText);
            }
        })
}

const findCity = (city) => {

    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        const lat = data.coord.lat;
                        const lon = data.coord.lon;

                        getWeather(city, lat, lon)
                    })
            } else {
                alert("error" + response.statusText);
            }

        })
}

const saveCity = (city) => {
    // create a local save to store the city that was searched.
    const cityContainer = document.createElement('div');
    const savedCity = document.createElement('button');
    savedCity.setAttribute('id', 'saveBtn');
    savedCity.innerHTML = city;
    cityContainer.append(savedCity);
    historyEl.append(cityContainer);

    let location = localStorage.getItem('location');

    if (location === null) {
        let saveCityObj = JSON.stringify([{ city: city }])
        location = localStorage.setItem('location', saveCityObj)
    } else {
        console.log(location);
        location = JSON.parse(location);
        location.push({ city: city });
        localStorage.setItem('location', JSON.stringify(location));
    }
}

const loadCity = () => {

    let location = localStorage.getItem('location');

    if (location === null) {
        console.log("empty");
    } else {
        let locationParse = JSON.parse(location);

        for (let i = 0; i < locationParse.length; i++) {
            let loadButton = locationParse[i].city;
            console.log(locationParse[i].city)

            const savedCity = document.createElement('button');
            savedCity.textContent = loadButton;
            savedCity.setAttribute('id', 'saveBtn')
            historyEl.append(savedCity);
        }
    }
}

const searchedCity = (event) => {
    // take in the value from the input element and search for that city in the api
    event.preventDefault();
    let city = inputEl.value.trim();

    if (city === "") {
        alert("please lookup a City!")
    } else {
        findCity(city);
        saveCity(city);
    }

}

const storedHistory = (event) => {
    event.preventDefault();

    let city = event.target.innerHTML;
    console.log(city)

    findCity(city);
    console.log("working");
}

loadCity();

buttonEl.addEventListener("click", searchedCity);
historyEl.addEventListener('click', storedHistory);