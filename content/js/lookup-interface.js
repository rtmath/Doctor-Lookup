var Practitioner = require('./../content/js/lookup.js').practModule;

$('document').ready(function() {
  $('#userCond').submit(function(event) {
    event.preventDefault();
    var condition = $('#userCond > input').val();
    // $('#searchResults').text(condition);

    var docs = [];
    Practitioner.getAll(condition, docs);
    setTimeout(function() {
      // for (var i = 0; i < docs.length; i++) {
      //   console.log(docs[i].profile.first_name + " " +
      //               docs[i].profile.last_name);
      // }
      displayDoctors(docs);
    }, 1000);
  });
});

var displayDoctors = function(array) {
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
          "<span>" + profile.bio + "</span>" +
        "</div>" +
      "</div><br>"
    );
  };
};

var formatPhone = function(string) {
  console.log("formatPhone called");
  var areaCode = "(" + string[0] + string[1] + string[2] + ")";
  var coCode = string[3] + string[4] + string[5];
  var telCode = string[6] + string[7] + string[8] + string[9];
  return areaCode + " " + coCode + "-" + telCode;
};

var checkAddressName = function(name, address) {
  console.log(name);
  console.log(address);
  return (name === address) ? "" : address + "<br>";
}
