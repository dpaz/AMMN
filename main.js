$(document).ready(function() {
  $('#tabs').tab();

  var bambooCount = $('#bambooCounter');

  $('#getBamboo').click(function() {
    var nBamboo = parseInt(bambooCount.text());
    bambooCount.text( nBamboo + 1);
  });
});
