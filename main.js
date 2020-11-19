let arrayOfBreweries = []
let arrayOfStates = ["Alaska",
                  "Alabama",
                  "Arkansas",
                  "American Samoa",
                  "Arizona",
                  "California",
                  "Colorado",
                  "Connecticut",
                  "District of Columbia",
                  "Delaware",
                  "Florida",
                  "Georgia",
                  "Guam",
                  "Hawaii",
                  "Iowa",
                  "Idaho",
                  "Illinois",
                  "Indiana",
                  "Kansas",
                  "Kentucky",
                  "Louisiana",
                  "Massachusetts",
                  "Maryland",
                  "Maine",
                  "Michigan",
                  "Minnesota",
                  "Missouri",
                  "Mississippi",
                  "Montana",
                  "North Carolina",
                  " North Dakota",
                  "Nebraska",
                  "New Hampshire",
                  "New Jersey",
                  "New Mexico",
                  "Nevada",
                  "New York",
                  "Ohio",
                  "Oklahoma",
                  "Oregon",
                  "Pennsylvania",
                  "Puerto Rico",
                  "Rhode Island",
                  "South Carolina",
                  "South Dakota",
                  "Tennessee",
                  "Texas",
                  "Utah",
                  "Virginia",
                  "Virgin Islands",
                  "Vermont",
                  "Washington",
                  "Wisconsin",
                  "West Virginia",
                  "Wyoming"]
const arrayOfTypes = ["Micro", "Nano", "Regional", "Brewpub", "Large", "Planning", "Bar", "Contract", "Proprietor", "Closed"]


// This function waits for the web page to be loaded, when it does it will run the code inside of it which happens to be getPosts()
window.onload = function() {
  getUsers()
  appendStates()
  appendTypes()

}

// This function is going to make a fetch request to the URL inside its parameter brackets (). Then it will turn the response (data it's getting back), saved here as res. The res.json will not be saved as posts and saved into the variable, arrayOfPosts
const getUsers = () => {
    
        fetch('https://api.openbrewerydb.org/breweries?by_state=ohio')
    .then(res => res.json())
    .then(breweries => arrayOfBreweries = breweries)
    
    
    
  
}

// This function logs the results in your browser's console
const consoleUsers = () => {
    console.log(arrayOfBreweries)
}

// this function creates elements inside the all-posts ul, then appends text inside it with the posts that were returned in the request.
const displayBreweries = () => {
  const allPosts = document.getElementById('all-posts')
  removeAllChildNodes(allPosts)
  arrayOfBreweries.map((brewery, index) => {
    const div = document.createElement('div')
    div.classList.add("brewery-div")
    // let img = new Image()
    // const bar = document.createElement('div')
    // bar.classList.add("bar-div")
    // img.src = user.picture.medium
    div.id = index
    const text = document.createTextNode(`${brewery.name} ${brewery.brewery_type} ${brewery.street}${brewery.city}${brewery.state} ${brewery.postal_code} ${brewery.website_url} ${brewery.phone}`)
    // const showInfoButton = document.createElement("button")
    //     showInfoButton.id = `like-button${index}`
    //     showInfoButton.classList.add('like-button')
    const i = document.createElement('i')
    i.classList.add("far")
    i.classList.add("fa-heart")
    i.addEventListener('click', function() {heartLike(this)} )

    div.appendChild(i)
    //     showInfoButton.innerHTML = "Show Info"
    //     showInfoButton.addEventListener('click', function() {showInfo(user, index)} )
        // div.appendChild(bar)
        // div.appendChild(img)
        div.appendChild(text)
    // div.appendChild(showInfoButton)
    div.appendChild(i)
    allPosts.append(div)
  })
}

const appendStates = () => {
    const states = document.getElementById("states")
    arrayOfStates.map((state, index) => {
        const option = document.createElement('option')
        option.id = state
        option.innerHTML = state
        states.appendChild(option)
    })
}

const appendTypes = () => {
    const types = document.getElementById("types")
    arrayOfTypes.map((type, index) => {
        const option = document.createElement('option')
        option.id = type
        option.innerHTML = type
        types.appendChild(option)
    })
}



const submitButton = () => {
    // const states = document.getElementById("states")
    // console.log(states.id)
    const states = document.getElementById("states")
    const selectedOption = states.value.toLowerCase()
    console.log(selectedOption)
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${selectedOption}`)
    .then(res => {
        if(!res.ok) {
          throw Error(res.statusText)
        } return res.json()
      })
    .then(breweries => arrayOfBreweries = breweries)
    .then(console.log(arrayOfBreweries))

    displayBreweries()

}

const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const nearMeButton = () => {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
      function success(pos) {
        var crd = pos.coords;
      
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        getAddress(crd.latitude, crd.longitude)
      }
      
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      
      navigator.geolocation.getCurrentPosition(success, error, options);

}


function getAddress (latitude, longitude) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        var method = 'GET';
        var url = `https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=22966675611662723889x56226`;
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var data = JSON.parse(request.responseText);
                    var address = data.city
                    console.log(address)
                    const selectedOption = address.toLowerCase()
    console.log(selectedOption)
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${selectedOption}`)
    .then(res => {
        if(!res.ok) {
          throw Error(res.statusText)
        } return res.json()
      })
    .then(breweries => arrayOfBreweries = breweries)
    .then(console.log(arrayOfBreweries))

    displayBreweries()
                    resolve(address);
                }
                else {
                    reject(request.status);
                }
            }
        };
        request.send();
    });
};

const heartLike = (x) => {
    x.classList.toggle("filled-heart");
  }

