


var getWeatherInfo = function (city, lon, lat) {

    var apiKey = '29d178bf984c3810ca4482bb3d2b6ab0'
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&units=imperial&exclude=minutely,hourly,alerts&appid=' + apiKey

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data);

                        // variables for the current day
                        var getDate = new Date(data.current.dt * 1000);
                        var getTemp = data.current.temp;
                        var getWind = data.current.wind_speed;
                        var getHumidity = data.current.humidity;
                        var getUvi = data.current.uvi;
                        var getIcon = data.current.weather[0].icon;



                        // create html elements for page
                        var pageDay = document.querySelector("#current");

                        var thisDay = document.createElement("div");
                        thisDay.setAttribute("id", "this-day");
                        

                        var cityEl = document.createElement("h3");
                        cityEl.textContent = city + " " + getDate.toLocaleDateString();
                        

                        var tempEl = document.createElement("p");
                        tempEl.textContent = "Temp: " + getTemp + " °F";
                        

                        var windEl = document.createElement("p");
                        windEl.textContent = "Wind: " + getWind + " mph";
                        

                        var humidityEl = document.createElement("p");
                        humidityEl.textContent = "Humidity: " + getHumidity + " %";
                        
                        
                        var uviEl = document.createElement("p");
                        uviEl.setAttribute("id", "uvi");
                        uviEl.textContent = "UV Index: " + getUvi;
                        

                        var imageEl = document.createElement("img");
                        imageEl.setAttribute("src", "http://openweathermap.org/img/wn/" + getIcon + ".png");
                        imageEl.setAttribute("alt", "open weather icon");
                        

                        // append elements to the div
                        thisDay.appendChild(cityEl);
                        thisDay.appendChild(imageEl);
                        thisDay.appendChild(tempEl);
                        thisDay.appendChild(windEl);
                        thisDay.appendChild(humidityEl);
                        thisDay.appendChild(uviEl);
                        // append the div to the page
                        pageDay.appendChild(thisDay);

                    })
            }
        })
}
getWeatherInfo();