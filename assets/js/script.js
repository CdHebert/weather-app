


var getWeatherInfo = function (city, lon, lat) {

    var apiKey = '29d178bf984c3810ca4482bb3d2b6ab0'
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&units=imperial&exclude=minutely,hourly,alerts&appid=' + apiKey

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data);
                        var getDate = new Date(data.current.dt * 1000);
                        var getTemp = data.current.temp;
                        var getWind = data.current.wind_speed;
                        var getHumidity = data.current.humidity;
                        var getUvi = data.current.uvi;
                        var getIcon = data.current.weather[0].icon;



                        // create html elements for page
                        var cityEl = document.createElement("h3");
                        cityEl.textContent = "chicago" + getDate.toLocaleDateString();
                        
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


                        // append elements to the page
                        cityEl.append("#current")
                        tempEl.append("#current")

                    })
            }
        })
}
getWeatherInfo();