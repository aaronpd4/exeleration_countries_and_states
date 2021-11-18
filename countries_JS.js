/*This is the code that pulls GET and POST requests from the "https://xc-countries-api.herokuapp.com/api/countries/" site*/

let countriesURL = ("https://xc-countries-api.herokuapp.com/api/countries/");
//var countriesList = [];


//use fetch() to send a GET rquest and then it will return a list of objects of the different states.
//map this GET function to a button, so that when the button is clicked, it will send the request and get the objects,
//and then log the names of each object in the list. returns in form of: object[0].name = austrailia, object[1].name = canada, etc.


//"old way of doing it - use fetch instead"
function getHttpRequest () {
    url = new Request(countriesURL);
    fetch(url)
    .then(response => response.json())
    .then(data => console.log(data));
    /*var xmlHttpReq = new XMLHttpRequest;
    xmlHttpReq.open("GET", url, false);
    xmlHttpReq.send(null);
    return xmlHttpReq.responseText;*/
}

//getHttpRequest(countriesURL);
/*for (let i = 0; i < 32; i++) {
    countriesList.push(getHttpRequest(countriesURL));
}*/
