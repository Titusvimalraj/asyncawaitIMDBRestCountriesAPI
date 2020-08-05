let parentElements = `    <main>
    <section>
        

        <nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <a class="nav-item nav-link active" id="nav-fetch-tab" data-toggle="tab" href="#nav-fetch" role="tab" aria-controls="nav-fetch" aria-selected="true">fetch Rest Countries</a>
    <a class="nav-item nav-link" id="nav-await-tab" data-toggle="tab" href="#nav-await" role="tab" aria-controls="nav-await" aria-selected="false">fetch Rest Countries with await</a>
    <a class="nav-item nav-link" id="nav-imdb-tab" data-toggle="tab" href="#nav-imdb" role="tab" aria-controls="nav-imdb" aria-selected="false">imdb</a>
  </div>
</nav>
<div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="nav-fetch" role="tabpanel" aria-labelledby="nav-fetch-tab">
  <h1>Rest Countries Bootstrap Card with fetch</h1>
  <div class="container-fluid" id="country-data">

  </div>
  </div>
  <div class="tab-pane fade" id="nav-await" role="tabpanel" aria-labelledby="nav-await-tab">
  <h1>Rest Countries Bootstrap Card with async await</h1>
  <div class="container-fluid" id="country-data-await">

  </div>
  </div>
  <div class="tab-pane fade" id="nav-imdb" role="tabpanel" aria-labelledby="nav-imdb-tab">
  <h1>Rest Countries Bootstrap Card with async await</h1>
  <div class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" id="search" type="search" placeholder="Search" aria-label="Search">
      <input type="button" id="search-button" onclick="getImdbResults()" value="Search">
    </div>
  <div class="container-fluid" id="imdb-data">

  </div>
  </div>
</div>
    </section>
</main>`
document.body.innerHTML = parentElements;





function getRestCountries(param, countryData, getWeatherData) {
    let tags = '';
    let count = 1;
    let divRow = document.createElement('div');
    for (let i = 0; i < param.length; i++) {

        divRow.setAttribute('class', 'row');
        let divCol = document.createElement('div');
        divCol.setAttribute('class', 'col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mt-3');
        tags = `
            <div class="card card-custom-css">
                <div class="card-header">
                   ${count}). ${param[i].name}
                </div>
                <img src="${param[i].flag}" id="${param[i].alpha2Code}" class="card-img-top cust-card-img" alt="${param[i].name}">
                <div class="card-body card-body-custom-css">
                    <p class="card-text">
                        Capital: <span class="badge badge-success"> ${param[i].capital} </span><br>
                        Country Codes: <span class="badge "> ${param[i].alpha2Code}, ${param[i].alpha3Code}</span><br>
                        Region: <span class="badge "> ${param[i].region}</span>
                    </p>
                </div>
                <div class="card-footer text-muted text-center">
                <button class="btn btn-sm btn-primary" data-toggle="alert" id="whoData" onclick="${getWeatherData}(${param[i].capital}','${param[i].alpha2Code}','${param[i].name}')">View Current Weather</button>
            </div>
            </div>
            `;
        count++;
        divCol.innerHTML = tags;
        divRow.appendChild(divCol);
        countryData.appendChild(divRow);
    }
}

loadCountries = () => {
    let url = 'https://restcountries.eu/rest/v2/all';
    let countryData = document.getElementById('country-data');
    fetch(url)
        .then(res => res.json())
        .then(data => {
            getRestCountries(data, countryData, 'getWeatherFetchData');
        })
        .catch(err => {
            console.log("Error:", err);
        });
}

loadCountries();


function getWeatherFetchData(value, code, country) {
    var urlValues = '';
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";
    var weatherAPIKey = '&appid=c3b4ef31feb237ca322297881c170281';
    var weatherMetric = '&units=metric';
    urlValues += weatherURL + value + ',' + code + weatherAPIKey + weatherMetric

    fetch(urlValues)
        .then(res => res.json())
        .then((data) => {
            alert('You selected Country: ' + country + ' with capital ' + data.name + ' and Temperature(in celsius) ' + data.main.temp);
        }).catch((err) => {
            alert("Couldn't find data for the selected country, Try again!");
            // console.log("Error:", err)
        });

}

let loadAsyncAwaitFunction = async() => {

    let url = 'https://restcountries.eu/rest/v2/all';
    let countryData = document.getElementById('country-data-await');
    try {
        let response = await fetch(url);
        let data = await response.json();
        getRestCountries(data, countryData, 'getWeatherAwaitData');
    } catch (error) {
        console.log("Error:", error);
    }
}


async function getWeatherAwaitData(value, code, country) {
    var urlValues = '';
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";
    var weatherAPIKey = '&appid=c3b4ef31feb237ca322297881c170281';
    var weatherMetric = '&units=metric';
    urlValues += weatherURL + value + ',' + code + weatherAPIKey + weatherMetric

    try {
        let response = await fetch(urlValues);
        let data = await response.json();
        alert('You selected Country: ' + country + ' with capital ' + data.name + ' and Temperature(in celsius) ' + data.main.temp);
    } catch (error) {
        alert("Couldn't find data for the selected country, Try again!");
        console.log("Error:", error);
    }

}

loadAsyncAwaitFunction();


let getImdbResults = async() => {
    try {
        let searchText = document.getElementById('search').value;
        console.log(searchText);
        let url = `https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?t=${searchText}&apikey=e9d1a1c3`
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        if (data != null && data.Response != 'False') {
            let imdbMovieCard = `
            <div class="col-12 col-md-6 imdb-card">
            
            <div class="card card-custom-css">
            <div class="card-header">
               ${data.Title}
            </div>
            <img src="${data.Poster || ''}" id="imdb-image" class="card-img-top cust-card-img" alt="no results image">
            <div class="card-body card-body-custom-css">
                <p class="card-text">
                    IMDB RATING: <span class="badge badge-success"> ${data.imdbRating} </span><br>
                    Language: <span class="badge "> ${data.Language}</span><br>
                    Genre: <span class="badge "> ${data.Genre}</span>
                </p>
            </div>
        </div>
            </div>
            
            `;

            document.getElementById('imdb-data').innerHTML = imdbMovieCard;
        } else {

            document.getElementById('imdb-data').innerHTML = '';
            throw data.Error;
        }

    } catch (error) {
        alert(`Error! No data found! ${error}`)
        console.log("Error:", error);
    }

}