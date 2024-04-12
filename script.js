const weatherdetails=document.getElementById("formdata")
const cityinput=document.getElementById("city")
const display=document.getElementById("card")
const apikey="9126a39fe664255aff88a43fc1b8a280"

weatherdetails.addEventListener("submit", async event=>{
    event.preventDefault()
    const city=cityinput.value
    if(city){
        try{
            const details= await getweatherinfo(city)
            displayweatherinfo(details)
        }
        catch(error){
            console.error(error)
            errormesssage(error)
        }
    }
    else{
        errormesssage("please enter a city")
    }
})

async function getweatherinfo(city){
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

    const response= await fetch(url)

    if(!response.ok){
        console.error("coudn't fetch the data")
    }

    return await response.json()
}

function displayweatherinfo(details){
    const {name:city, main:{temp,humidity}, weather:[{description,id}]}=details;

    display.innerHTML = `
        <div class="weather-info">
            <h1 class="cityweather">${city}</h1>
            <p class="temperature">Temperature: ${((temp-273.15)*(9/5)+32).toFixed(1)}°F</p>
            <p class="humid">Humidity: ${humidity}%</p>
            <p class="desc">Description: ${description}</p>
        </div>
    `;

    display.style.display = "flex";
}

function errormesssage(message){
    const error=document.createElement("p")
    error.textContent=message
    error.classList.add("errordisplay") // Fix here
    display.textContent="" // Clear any previous content
    display.style.display="flex"
    display.appendChild(error) // Append error instead of errordisplay
}
