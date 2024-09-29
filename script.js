
const app = document.querySelector('.weather-app')
const temp = document.querySelector('.temp')
const time = document.querySelector('.time')
const name = document.querySelector('.name')
const date = document.querySelector('.date')
const icon = document.querySelector('.icon')
const condition = document.querySelector('.condition')
const search = document.querySelector('.search')
const submit = document.querySelector('.submit')
const cities = document.querySelectorAll('.city')
const details = document.querySelector('.details')
const cloud = document.querySelector('.cloud')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const form = document.querySelector('#locationInput')

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        searchInput = e.target.innerText;
        console.log(searchInput)
        app.style.opacity = "0"
        getWeatherData()
    })
})

form.addEventListener('submit',(e)=>{
    if(search.value.length==0){
        alert('Please type in a city name')
    }else{
        searchInput = search.value
        app.style.opacity = "0"
        getWeatherData()
        search.value = ""
    }
    e.preventDefault()
})

function getWeatherData() {
    
    
    
    const APIKey = 'f4c229066f4410663c8fbd35513f8852';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${APIKey}`)
        .then(response => {
            // console.log(response);
            response = response.json();
            return response;
        }).then(response => {
            // console.log(response);
            temp.innerHTML = `${parseFloat(response.main.temp - 273).toFixed(0)}°`
            name.innerHTML = response.name
            condition.innerHTML = response.weather[0].main
            cloud.innerHTML = `${response.clouds.all}%`
            humidity.innerHTML = `${response.wind.speed}km/hr`
            wind.innerHTML = `${response.main.humidity}%`

            const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const currentdate = new Date()
            time.innerHTML = `${currentdate.getHours()}:${currentdate.getMinutes()}`
            date.innerHTML = `${weekdays[currentdate.getDay()]} ${currentdate.toLocaleString('default', { month: 'long' }).slice(0, 3)} ${currentdate.getDate()}`

            const iconCode = response.weather[0].icon
            console.log("icon code: ",iconCode)
            icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

            {
                if (iconCode == '01d') {
                    app.style.backgroundImage = "url('day/clear.png')";
                } else if (iconCode == '02d') {
                    app.style.backgroundImage = "url('day/fewclouds.png')";
                } else if (iconCode == '03d') {
                    app.style.backgroundImage = "url('day/scatteredclouds.png')";
                } else if (iconCode == '04d') {
                    app.style.backgroundImage = "url('day/cloudy.png')";
                } else if (iconCode == '09d') {
                    app.style.backgroundImage = "url('day/showerrain.png')";
                } else if (iconCode == '10d') {
                    app.style.backgroundImage = "url('day/rainy.png')";
                } else if (iconCode == '11d') {
                    app.style.backgroundImage = "url('day/thunderstorm.png')";
                } else if (iconCode == '13d') {
                    app.style.backgroundImage = "url('day/haze.png')";
                } else if (iconCode == '50d') {
                    app.style.backgroundImage = "url('day/rainy.png')";
                } else if (iconCode == '01n') {
                    app.style.backgroundImage = "url('night/clear.png')";
                } else if (iconCode == '02n') {
                    app.style.backgroundImage = "url('night/cloudy.png')";
                } else if (iconCode == '03n') {
                    app.style.backgroundImage = "url('night/cloudy.png')";
                } else if (iconCode == '04n') {
                    app.style.backgroundImage = "url('night/cloudy.png')";
                } else if (iconCode == '09n') {
                    app.style.backgroundImage = "url('night/showerrain.png')";
                } else if (iconCode == '10n') {
                    app.style.backgroundImage = "url('night/rainy.png')";
                } else if (iconCode == '11n') {
                    app.style.backgroundImage = "url('night/thunderstorm.png')";
                } else if (iconCode == '13n') {
                    app.style.backgroundImage = "url('night/snowy.png')";
                } else if (iconCode == '50n') {
                    app.style.backgroundImage = "url('night/haze.png')";
                }
            }

            updateRecentCities(response.name)

            app.style.opacity = "1"
            
        }).catch(err => {
            alert("Please enter a valid location")
            app.style.opacity = "1"
        })
}




function updateRecentCities(city) {
    // Convert NodeList to an array to work with array methods
    const cityArray = Array.from(cities).map(c => c.innerText);

    // Check if the city is already in the recent search list
    const cityIndex = cityArray.indexOf(city);

    // If the city is already in the list, remove it
    if (cityIndex !== -1) {
        cityArray.splice(cityIndex, 1);
    }

    // Add the new city to the top of the list
    cityArray.unshift(city);

    // Update the DOM with the new city list
    cityArray.slice(0, 4).forEach((cityName, index) => {
        cities[index].innerText = cityName;
    });
}

