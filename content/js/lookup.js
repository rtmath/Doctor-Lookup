var apiKey = require('./../../.env').apiKey;
var getPractitioners = require('./../../.env').getDoctors;

const MAXRESULTS = 10;

function Practitioner() {

}

Practitioner.getAll = function(condition, array) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ condition+'&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
   .then(function(result) {
      for (var i = 0; i < MAXRESULTS; i++) {
        array[i] = result.data[i];
      }
      return array;
    })
   .fail(function(error){
      alert("API call failed");
    });
};

exports.practModule = Practitioner;
