/*This is the code that pulls GET and POST requests from the "https://xc-countries-api.herokuapp.com/api/countries/" site*/

let countriesURL = ("https://xc-countries-api.herokuapp.com/api/countries/");
let emptyCountriesURL = ("https://xc-countries-api.herokuapp.com/api/countries/<country_code>/states/");
var countriesList = [];
var countryStatesList = [];
var options = [];
var stateOptions = [];
var selectedCountryName = "";
var prevCountryName = "";
var created = false;

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
        createOptions();                    //this line HAS to go inside the data arrow function (for some reason?)
    });
    
}

function showCountries () {
    for (let i=0; i < countriesList.length; i++) {
        console.log(countriesList[i]);
    }
}

function showCountriesStates () {
    for (let i=0; i < countryStatesList.length; i++) {
        console.log(countryStatesList[i]);
    }
}


function createOptions () {
    if (options.length === 0) {
        for (let i = 0; i < countriesList.length; i++) {
            options[i] = new Option(`${countriesList[i].name}`, `${countriesList[i].code}`);      //countriesList[i] to get the current country object, then get the name, [2], and the code, [1]
            initCountries.appendChild(options[i], undefined);           //now append the children onto the form (look at bookmarked page)
        }
    }
    selectedOption();           //adding this line here gets rid of the need for a separate html button
}

function selectedOption () {
    var countriesDropdown = document.getElementById("initCountries");
    
    //get the actual selected value option (i.e., the name of the option chosen). countriesDropdown.options[] allows us to choose the which option what chosen by 
    //[countiresDropdown.selectedInex], which is the specific index that the user has clicked on. The .text means to get the actual 'name' of the option
    selectedCountryName = countriesDropdown.options[countriesDropdown.selectedIndex].text;
    var selectedCountryValue = countriesDropdown.options[countriesDropdown.selectedIndex].value;
    console.log(selectedCountryName);
    listStatesForSelCountry(selectedCountryValue);
    
}

function listStatesForSelCountry (countryCode) {
    url = new Request(`https://xc-countries-api.herokuapp.com/api/countries/${countryCode}/states/`);
    fetch(url)
    .then(response => response.json())
    .then(data => {
        countryStatesList = data;
        showCountriesStates();
        createStatesDropdown();
    });
}

function createStatesDropdown () {
        //dynamically create an dropdown list
        /* if (!created) {
            //dynamically create the DDL
            var select = document.createElement("select");
            select.name = "initStates";
            select.id = "initStates";
            for (var k = 0; k < countryStatesList.length; k++) {
                var option = document.createElement("option");
                option.value = countryStatesList[k].code;
                option.text = countryStatesList[k].name;
                select.appendChild(option);
            }
        }
        created = true; */
        
        //remove all prev dropdown options
        var x = document.getElementById("initStates");
        var size = (x.options.length - 1);
        //if (selectedCountryName != prevCountryName) {
            for (let j = size; j >= 0; j--) {
                x.remove(j);
            }

            //clearing the stateOptions s.t. we can assign new options to the dropdown list
            stateOptions = [];

            for (let i = 0; i < countryStatesList.length; i++) {
                stateOptions[i] = new Option(`${countryStatesList[i].name}`, `${countryStatesList[i].code}`);      
                initStates.appendChild(stateOptions[i], undefined);
            }
        //}

        //resetting the values s.t. there are no duplicates and the country can change
        countryStatesList = [];
        prevCountryName = selectedCountryName;
}


//TODO: sort the countries and states by alpha, create a method to add new countries and then push them