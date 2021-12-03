/*This is the code that pulls GET and POST requests from the "https://xc-countries-api.herokuapp.com/api/countries/" site*/

let countriesURL = ("https://xc-countries-api.herokuapp.com/api/countries/");
let statesURL = ("https://xc-countries-api.herokuapp.com/api/states/");
let emptyCountriesURL = ("https://xc-countries-api.herokuapp.com/api/countries/<country_code>/states/");

var countriesList = [];
var countryStatesList = [];

var numOfCountries;

var options = [];
var stateOptions = [];

var selectedCountryName = "";
var prevCountryName = "";
var created = false;

//use fetch() to send a GET rquest and then it will return a list of objects of the different states.
//map this GET function to a button, so that when the button is clicked, it will send the request and get the objects,
//and then log the names of each object in the list. returns in form of: object[0].name = austrailia, object[1].name = canada, etc.


/**
 * 
 */
function getHttpRequest () {
    url = new Request(countriesURL);
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (countriesList.length === 0) {
            countriesList = data;                                        //make countriesList have all the data from the GET call (countriesList[i] = {id=0, code=AU, name=Austrailia}, etc.)
        }
        numOfCountries = countriesList.length; 
        //console.log(numOfCountries);                                  //used to validate size of array
        countriesList.sort((a, b) => a.name.localeCompare(b.name));     //this line sorts the countries by name using "a.localeCompare(b)"
        showCountries();
        createOptions();                                                //this line HAS to go inside the data arrow function (for some reason?)
        addStateDropdown();
    });
    
}


/**
 * 
 */
function showCountries () {
    for (let i=0; i < countriesList.length; i++) {
        console.log(countriesList[i]);
    }
}


/**
 * 
 */
function showCountriesStates () {
    for (let i=0; i < countryStatesList.length; i++) {
        console.log(countryStatesList[i]);
    }
}


/**
 * 
 */
function createOptions () {
    let x = document.getElementById("initCountries");

    if (options.length === 0) {
        for (let i = 0; i < countriesList.length; i++) {
            options[i] = new Option(`${countriesList[i].name}`, `${countriesList[i].code}`);      //countriesList[i] to get the current country object, then get the name, [2], and the code, [1]
            x.appendChild(options[i], undefined);           //now append the children onto the form (look at bookmarked page)
        }
    }
    selectedOption();           //adding this line here gets rid of the need for a separate html button
}


/**
 * 
 */
function selectedOption () {
    var countriesDropdown = document.getElementById("initCountries");
    
    //get the actual selected value option (i.e., the name of the option chosen). countriesDropdown.options[] allows us to choose the which option what chosen by 
    //[countiresDropdown.selectedInex], which is the specific index that the user has clicked on. The .text means to get the actual 'name' of the option
    selectedCountryName = countriesDropdown.options[countriesDropdown.selectedIndex].text;
    var selectedCountryValue = countriesDropdown.options[countriesDropdown.selectedIndex].value;
    console.log(selectedCountryName);
    listStatesForSelCountry(selectedCountryValue);
    
}


/**
 * 
 */
function listStatesForSelCountry (countryCode) {
    url = new Request(`https://xc-countries-api.herokuapp.com/api/countries/${countryCode}/states/`);
    fetch(url)
    .then(response => response.json())
    .then(data => {
        countryStatesList = data;
        countryStatesList.sort((a,b) => a.name.localeCompare(b.name));          //this line sorts the countries by name using "a.localeCompare(b)""
        showCountriesStates();
        createStatesDropdown();
    });
}


/**
 * 
 */
function createStatesDropdown () {
        var x = document.getElementById("initStates");
        var size = (x.options.length - 1);

        for (let j = size; j >= 0; j--) {
            x.remove(j);
        }

        //clearing the stateOptions s.t. we can assign new options to the dropdown list
        stateOptions = [];

        for (let i = 0; i < countryStatesList.length; i++) {
            stateOptions[i] = new Option(`${countryStatesList[i].name}`, `${countryStatesList[i].code}`);      
            initStates.appendChild(stateOptions[i], undefined);
        }

        //resetting the values s.t. there are no duplicates and the country can change
        countryStatesList = [];
        prevCountryName = selectedCountryName;
}


/**
 * 
 */
function addCountryUsingHttpPushRequest() {
    var newCountry = document.getElementById("newCountryName").value;       //gets the input from the textbox (name)
    var newCountryCode = document.getElementById("newCountryCode").value;   //"                             " (code)

    //create a new text input for country code (new getElementId call needed)
    //Base the POST request off of the submit button

    //dont need to send id; its already generated, and code to be first 4 letters of name
    let jsonInputStringCountry = {"code": `${newCountryCode}`, "name": `${newCountry}`};
    console.log(jsonInputStringCountry);

    fetch(countriesURL, {
        // Adding method type
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify({
            code: `${newCountryCode}`,
            name: `${newCountry}`
        }),
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    document.getElementById("submitNewCountry").submit();

    // Converting to JSON
    //.then(response => response.json())
 
    // Displaying results to console
    //.then(json => console.log(json));

    //old ajax version (bad because have to include a whole library when you only use one functionailty of it)
    /* $.ajax({
       type: "POST",
       url: countriesURL,
       data: JSON.stringify({"code" : `${newCountryCode}`, "name": `${newCountry}`}),
       contentType: "application/json",
       success: function (result) {
         console.log(result);
       },
       error: function (result, status) {
         console.log(result);
       }
    }); */
}


/**
 * Helper function for the function below it (addStateUsingHttpPushRequest()). 
 * Creates new options for the drop down when adding a new state.
 * Called in the initial getHttpRequest() on initial page load
 */
function addStateDropdown() {
    let y = document.getElementById("newStateCountry");

    for (let i = 0; i < countriesList.length; i++) {
        options[i] = new Option(`${countriesList[i].name}`, `${countriesList[i].code}`);      //countriesList[i] to get the current country object, then get the name, [2], and the code, [1]
        y.appendChild(options[i], undefined);           //now append the children onto the form (look at bookmarked page)
    }
}


/**
 * 
 */
function addStateUsingHttpPushRequest() {
    var newStateName = document.getElementById("newStateName").value;
    var newStateCode = document.getElementById("newStateCode").value;
    var newStateCountry = document.getElementById("newStateCountry").value; //value gets the country code, not id
    var newStateCountryId;

    //loop through the countries list to see if the country the state to be added to exists
    for (let i = 0; i < countriesList.length; i++) {
        if (newStateCountry == countriesList[i].code) {     //changed condition to check for matching country codes as opposed to names
            newStateCountryId = countriesList[i].id;
            break;
        }
    }

    //truthy check to make sure that newStateCountryId isn't null (i.e. the country exists)
    if (newStateCountryId) {
        let jsonInputStringState = {"code": `${newStateCode}`, "name": `${newStateName}`, "countryId": `${newStateCountryId}`};
        console.log(jsonInputStringState);

        fetch(statesURL, {
            // Adding method type
            method: "POST",
            // Adding body or contents to send
            body: JSON.stringify({
                code: `${newStateCode}`,
                name: `${newStateName}`,
                countryId: `${newStateCountryId}`
            }),
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        document.getElementById("submitNewState").submit();

        //old ajax version (bad because have to include a whole library when you only use one functionailty of it)
        /* $.ajax({
            type: "POST",
            url: statesURL,
            data: JSON.stringify({"code": `${newStateCode}`, "name": `${newStateName}`, "countryId": `${newStateCountryId}`}),
            contentType: "application/json",
            success: function (result) {
                console.log(result);
            },
            error: function (result, status) {
                console.log(result);
            }
            }); */
    }
    else {
        window.alert("Country does not exist; please enter a valid country!");
    }
}
