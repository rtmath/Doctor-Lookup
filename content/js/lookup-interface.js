var Practitioner = require('./../content/js/lookup.js').practModule;

$('document').ready(function() {
  $('#userCond').submit(function(event) {
    event.preventDefault();

    var condition = $('#userCond > input').val();
    var docs = [];

    Practitioner.getAll(condition, docs);

    setTimeout(function() {
      console.log("Length after getAll: " + docs.length);
      console.log(docs);
    }, 1500);

    setTimeout(function() {
      console.log("Length before displayDoctors: " + docs.length);
      if (typeof docs[0] != 'undefined') {
        displayDoctors(docs);
      } else {
        $('#searchResults').text("I'm sorry, we could not find any doctors based on your search terms. Please revise your search.");
      }
    }, 2000);
    setTimeout(function() {

    }, 2000);
  });
});

var displayDoctors = function(array) {
  $('#searchResults').empty();
  for (var i = 0; i < array.length; i++) {
    var profile = array[i].profile;
    var practice = array[i].practices[0];
    var name = profile.first_name + " " + profile.last_name + ", " + profile.title;
    $('#searchResults').append(
      "<div class='profile'>" +
        "<div class='left'>" +
          "<img src='" + profile.image_url + "'>" + " " + "<br>" +
            "<span>" + name + "</span><hr>" +
            "<p>" + checkAddressName(name, practice.name) +
                    practice.visit_address.street + "<br>" +
                    practice.visit_address.city + ", " +
                    practice.visit_address.state + " " +
                    practice.visit_address.zip + "<br>" +
                    formatPhone(practice.phones[0].number) + "</p>" +
        "</div>" +
        "<div class='right'>" +
          "<span class='bio'>" + profile.bio + "</span>" +
        "</div>" +
      "</div><br>"
    );
  }
};

var formatPhone = function(string) {
  var areaCode = "(" + string[0] + string[1] + string[2] + ")";
  var coCode = string[3] + string[4] + string[5];
  var telCode = string[6] + string[7] + string[8] + string[9];
  return areaCode + " " + coCode + "-" + telCode;
};

var checkAddressName = function(name, address) {
  return (name === address) ? "" : address + "<br>";
};
