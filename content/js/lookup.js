var apiKey = require('./../../.env').apiKey;
var getPractitioners = require('./../../.env').getDoctors;

const MAXTODISPLAY = 5;

function Practitioner() {
  // this.fName = first;
  // this.lName = last;
  // this.pic = image;
  // this.bio = bio;
  // this.address = address;
  // this.phone = phone;
  // this.specialties = specialties;
}

Practitioner.getAll = function(condition, array) {
  // console.log("getAll called");
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ condition+'&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
   .then(function(result) {
      console.log(result);
      for (var i = 0; i < MAXTODISPLAY; i++) {
        // console.log("--Result Data: " + result.data[i]);
        array[i] = result.data[i];
        // console.log("--Array Data: " + array[i]);
      }
      return array;
    })
   .fail(function(error){
      console.log("fail");
    });
};

Practitioner.prototype.test = function (condition) {
  getPractitioners(condition);
  setTimeout(function() {
    for (var i = 0; i < 3; i++) {
      console.log(i + ": " + results.data[i]);
      console.log(i + ": " + results.data[i].profile.first_name);
    }
    console.log(practitioners[0]);
  }, 2000);

};

exports.practModule = Practitioner;

/*Object
  Array[20]
    i = Doctor Object
      educations[]
      group_affiliations[]
      hospital_affiliations[]
      insurances[]
      npi
      practices[]
        distance
        name
        phones[]
        visit_address
        lat
        lon
      profile
        bio
        first_name
        gender
        image_url
        languages[]
        last_name
        middle_name
        slug
        title
      ratings[]
      specialties[]
*/
