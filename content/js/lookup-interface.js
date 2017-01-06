var apiKey = require('./../.env').apiKey;
var Practitioner = require('./../content/js/lookup.js').practModule;

$('document').ready(function() {
  console.log("jQuery initialized");
  var doc = new Practitioner("Doc");
  console.log(doc.name + " initialized");
  $('#userCond').submit(function(event) {
    event.preventDefault();
    $('#searchResults').text("Condition submitted: " + $('#userCond > input').val());
  });
});
