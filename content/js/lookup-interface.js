var Practitioner = require('./../content/js/lookup.js').practModule;

$('document').ready(function() {
  $('#userCond').submit(function(event) {
    event.preventDefault();
    var condition = $('#userCond > input').val();
    $('#searchResults').text(condition);

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
    $('#searchResults').append(
      "<div class='profile'>" +
      "<img src='" + array[i].profile.image_url + "'>" + " " + "<br>" +
        "<span>" + array[i].profile.first_name + " " +
                   array[i].profile.last_name + " " +
                   array[i].profile.title + " " + "</span><hr>" +
        "<p>" + array[i].practices[0].name + "<br>" +
                array[i].practices[0].visit_address.street + " " +
                array[i].practices[0].visit_address.city + ", " +
                array[i].practices[0].visit_address.state + " " +
                array[i].practices[0].visit_address.zip + "<br>" +
                array[i].practices[0].phones[0].number + "</p>" +
      "</div><br>"
    );
  }
}
