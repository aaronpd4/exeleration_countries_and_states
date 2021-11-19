/*This is the code that pulls GET and POST requests from the "https://xc-countries-api.herokuapp.com/api/countries/" site*/

let countriesURL = ("https://xc-countries-api.herokuapp.com/api/countries/");
var countriesList = [];
var options= [];


//use fetch() to send a GET rquest and then it will return a list of objects of the different states.
//map this GET function to a button, so that when the button is clicked, it will send the request and get the objects,
//and then log the names of each object in the list. returns in form of: object[0].name = austrailia, object[1].name = canada, etc.


//"old way of doing it - use fetch instead"
function getHttpRequest () {
    url = new Request(countriesURL);
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (countriesList.length === 0) {
            countriesList = data;           //make countriesList have all the data from the GET call (countriesList[i] = {id=0, code=AU, name=Austrailia}, etc.)
        }
        showCountries();
    });
}

function showCountries () {
    for (let i=0; i < countriesList.length; i++) {
        console.log(countriesList[i]);
    }
}


function createOptions () {
    if (options.length === 0) {
        for (let i = 0; i < countriesList.length; i++) {
            //document.createElement("option");          //each index in options is now an option (i.e. option[0] is an option, option[1], etc.)
            options[i] = new Option(`${countriesList[i].name}`, `${countriesList[i].code}`);      //countriesList[i] to get the current country object, then get the name, [2], and the code, [1]
            initCountries.appendChild(options[i], undefined);           //now append the children onto the form (look at bookmarked page)
        }
    }
}
