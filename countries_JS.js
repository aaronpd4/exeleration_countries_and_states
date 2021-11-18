/*This is the code that pulls GET and POST requests from the "https://xc-countries-api.herokuapp.com/api/countries/" site*/

let countriesURL = ("https://xc-countries-api.herokuapp.com/api/countries/");
let initForm = document.getElementById("init_countries");
var countriesList = [];


//use fetch() to send a GET rquest and then it will return a list of objects of the different states.
//map this GET function to a button, so that when the button is clicked, it will send the request and get the objects,
//and then log the names of each object in the list. returns in form of: object[0].name = austrailia, object[1].name = canada, etc.


//"old way of doing it - use fetch instead"
function getHttpRequest () {
    url = new Request(countriesURL);
    fetch(url)
    .then(response => response.json())
    .then(data => {
        countriesList = data;           //make countriesList have all the data from the GET call (countriesList[i] = {id=0, code=AU, name=Austrailia}, etc.)
        /*console.log(data)*/
    });
    showCountries();
}

function showCountries () {
    for (let i=0; i < countriesList.length; i++) {
        console.log(countriesList[i]);
    }
}

//now, need to take each index of countriesList and make an option in the drop down form of it

/* for (index in data) {
        initForm.options[initForm.options.length] = new Option(data.name[index], data.code[index]);
    }*/

    
/*<!--current bulky way which we don't want:--> --- easier to comment in a block here rather in html
                        <option value="AU">name1</option>
                        <option value="CA">name2</option>
                        <option value="US">name3</option>
                        <option value="MEX">name4</option>
                        <option value="SA">name5</option>
                        <option value="RUS">name6</option>
                        <option value="JP">name7</option>
                        <option value="CH">name8</option>
                        <option value="CB">name9</option>
                        <option value="TK">name10</option>
                        <option value="DK">name11</option>
                        <option value="TC">name12</option>
                        <option value="NC">name13</option>
                        <option value="N1">name14</option>
                        <option value="LC">name15</option>
                        <option value="N2">name16</option>
                        <option value="N3">name17</option>
                        <option value="N4">name18</option>
                        <option value="N5">name19</option>
                        <option value="N6">name20</option>
                        <option value="N7">name21</option>
                        <option value="N8">name22</option>
                        <option value="N9">name23</option>
                        <option value="N10">name24</option>
                        <option value="N11">name25</option>
                        <option value="FL">name26</option>
                        <option value="DC">name27</option>
                        <option value="TE">name28</option>
                        <option value="WO">name29</option>
                        <option value="SS">name30</option>
                        <option value="SZ">name31</option>
                        <option value="CO">name32</option>
                        <option value="UN">name33</option>
                        <option value="77">name34</option>*/
