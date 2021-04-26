var currentDay = document.querySelector("#current");
var citySearch = document.querySelector("#search");
var dayForecast = document.querySelector("#forecast");
var inputEl = document.querySelector("#inputSearch");
var buttonEl = document.querySelector("#button");
var savedEl = document.querySelector("#city-stored");


var cityLocation = function (city) {
    var apiKey = '29d178bf984c3810ca4482bb3d2b6ab0'
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + apiKey

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json()
            .then(function(data) {
                var lon = data.coord.lon;
                var lat = data.coord.lat
                

                getWeatherInfo(city, lon, lat);
            })
        }
        else {
            alert("error" + response.statusText);
        }
    })
}

var searchCity = function(event) {
    console.log("function ran");
    event.preventDefault();
    var city = inputEl.value.trim();
    
    console.log(city)

    if (city === null) {
        alert("search for a city");
        return;
    }
    else {
        cityLocation(city);
        savedCity(city);

        savedEl.value = ""
        
    }

   
};


$('#city-stored').on('click','button', function(event) {

    // prevent refresh
    event.preventDefault();
    // pull text out 
    var city = $(this).text().trim();
    // send to coord and display on page
    cityLocation(city);
});


var getWeatherInfo = function (city, lon, lat) {

    var apiKey = '29d178bf984c3810ca4482bb3d2b6ab0'
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=minutely,hourly,alerts&appid=' + apiKey

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        

                        // variables for the current day
                        var getDate = new Date(data.current.dt * 1000);
                        var getTemp = data.current.temp;
                        var getWind = data.current.wind_speed;
                        var getHumidity = data.current.humidity;
                        var getUvi = data.current.uvi;
                        var getIcon = data.current.weather[0].icon;



                        // create html elements for current day

                        var thisDay = document.createElement("div");
                        thisDay.setAttribute("id", "this-day");
                        thisDay.classList = "bg-info"


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
                        currentDay.innerHTML = "";
                        currentDay.appendChild(thisDay);



                        // five day forecast
                        dayForecast.innerHTML = "";
                        for (i = 1; i < 5; i++) {

                            var dateFive = new Date(data.daily[i].dt * 1000);
                            var tempFive = data.daily[i].temp.day;
                            var windFive = data.daily[i].wind_speed;
                            var humidFive = data.daily[i].humidity;
                            var iconFive = data.daily[i].weather[0].icon;


                            var fiveDay = document.createElement("div");
                            fiveDay.setAttribute("id", "five-day");
                            fiveDay.classList = "card-header col-4 col- m-2  bg-warning";
    
    
                            var cityFiveEl = document.createElement("h5");
                            cityFiveEl.textContent = city + " " + dateFive.toLocaleDateString();
    
    
                            var tempFiveEl = document.createElement("p");
                            tempFiveEl.textContent = "Temp: " + tempFive + " °F";
    
    
                            var windFiveEl = document.createElement("p");
                            windFiveEl.textContent = "Wind: " + windFive + " mph";
    
    
                            var humidityFiveEl = document.createElement("p");
                            humidityFiveEl.textContent = "Humidity: " + humidFive + " %";
    
                            var imageFiveEl = document.createElement("img");
                            imageFiveEl.setAttribute("src", "http://openweathermap.org/img/wn/" + iconFive + ".png");
                            imageFiveEl.setAttribute("alt", "open weather icon");

                            fiveDay.appendChild(cityFiveEl);
                            fiveDay.appendChild(imageFiveEl);
                            fiveDay.appendChild(tempFiveEl);
                            fiveDay.appendChild(windFiveEl);
                            fiveDay.appendChild(humidityFiveEl)
                            // append the div to the page

                            dayForecast.appendChild(fiveDay);
                        }
                    });   
            }
            else {
                alert("error" + response.statusText);
            }
        })
}

function loadCity() {
    console.log("loaded!")
    var locations = localStorage.getItem("locations");

    if (locations === null) {
        console.log("empty");
    }
    else {
        var locationsParse = JSON.parse(locations);

        for (i = 0; i < locationsParse.length; i++) {
            var loadButton = locationsParse[i].city;

            var savedButtonEl = document.createElement("button");
            savedButtonEl.classList = "btn btn-saved btn-info m-2 p-2 ";
            savedButtonEl.textContent = loadButton;

            savedEl.appendChild(savedButtonEl);
        }
    }
};

function savedCity(city) {
   
    var saveButton = document.createElement("button");
    saveButton.classList = "btn btn-saved btn-warning m-2 p-2";
    saveButton.textContent = city;

    
    savedEl.appendChild(saveButton);

   var locations = localStorage.getItem("locations");

    if (locations === null) {

        var objList = JSON.stringify([{city: city}]);
        var locations = localStorage.setItem("locations", objList);
    }
    else{
        locations = JSON.parse(locations);
        locations.push({city: city});
        localStorage.setItem("locations", JSON.stringify(locations));
    }

};



loadCity();



buttonEl.addEventListener("click", searchCity);

